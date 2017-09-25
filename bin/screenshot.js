#!/usr/bin/env node
const debug = require('debug')('app:screenshot');
const MAX_POOL_SIZE = require('os').cpus().length;
const Nightmare = require('nightmare');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const serveStatic = require('serve-static');
const program = require('commander');
const {
    writeFileSync
} = require('fs');
const {
    queue
} = require('d3-queue');
const {
    walk
} = require('walk');
const {
    mkdir
} = require('shelljs');
const {
    extname,
    join,
    relative,
    resolve
} = require('path');
const loadConfig = require('../lib/load-config');
const loadTemplates = require('../lib/load-templates');
const md2html = require('../lib/md2html');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .parse(process.argv);

const CONFIG = loadConfig(program.config);
const {
    screenshots,
    dest,
    src,
    assets,
    theme
} = CONFIG;
const TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

const destAssets = join(dest, assets);
debug(screenshots);

// assets
mkdir('-p', destAssets);

const app = connect();
app.use('/', serveStatic(dest));

// markdown rendering
function renderFile(filename, template) {
    filename = resolve(src, filename);
    const templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    const config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, template, program.dev);
}

getPort().then(port => {
    http.createServer(app).listen(port);
    const url = `http://127.0.0.1:${port}`;
    debug(`server is ready on port ${port}! url: ${url}`);
    const DELAY = 6000;
    const q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);


    screenshots.forEach(task => {
        const demoSrc = join(src, task.src);
        const screenshotDest = join(dest, task.dest);
        const template = task.template;

        debug(demoSrc, screenshotDest, template);

        const walker = walk(demoSrc, { followLinks: false });
        walker.on('file', (root, stat, next) => {
            const relativeName = relative(demoSrc, join(root, stat.name));
            debug(`[file]: ${relativeName}`);
            // if (relativeName !== 'point/bubble.html') { next(); return; };
            if (relativeName === 'index.html') {
                next();
                return;
            }
            const ext = extname(stat.name);
            if (ext === '.html' || ext === '.md') {
                const htmlContent = renderFile(resolve(root, stat.name), template);
                const fileBasename = relativeName
                    .replace(/\.html$/, '')
                    .replace(/\.md$/, '');
                const targetFilename = join(screenshotDest, `${fileBasename}.html`);
                writeFileSync(targetFilename, htmlContent, 'utf8');

                const relativeUrl = relative(dest, targetFilename);
                const targetUrl = join(url, relativeUrl);

                const outputFilename = join(screenshotDest, `${fileBasename}.png`);
                debug(`target: ${outputFilename}`);
                q.defer(callback => {
                    const t0 = Date.now();
                    const nightmare = Nightmare({
                        // show: true,
                        show: false,
                    });
                    nightmare
                        .viewport(800, 450) // 16 x 9
                        .goto(targetUrl)
                        .wait('#mountNode canvas')
                        .wait(DELAY)
                        .screenshot(outputFilename, () => {
                            debug(`${fileBasename} took ${Date.now() - t0} to take a screenshot.`);
                            callback(null);
                        })
                        .end()
                        .catch(e => {
                            debug(`${fileBasename} failed to take a screenshot`);
                            callback(e);
                        });
                });
            }
            next();
        });
        walker.on('directory', (root, stat, next) => {
            const relativeName = relative(demoSrc, join(root, stat.name));
            debug(`[directory]: ${relativeName}`);
            mkdir('-p', resolve(screenshotDest, relativeName));
            next();
        });
        walker.on('errors', (root, nodeStatsArray, next) => { // plural
            nodeStatsArray.forEach(function (n) {
                debug(`[ERROR] ${n.name}`);
                debug(n.error.message || `${n.error.code}: ${n.error.path}`);
            });
            next();
        });
        walker.on('end', () => {
            debug('stop walking');
            q.awaitAll(error => {
                if (error) {
                    debug(error);
                    process.exit(1);
                } else {
                    debug('screenshots are all captured!');
                    process.exit();
                }
            });
        });
    });
});
