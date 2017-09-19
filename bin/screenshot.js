#!/usr/bin/env node
const debug = require('debug')('app:screenshot');
const MAX_POOL_SIZE = require('os').cpus().length;
const Nightmare = require('nightmare');
const DataURI = require('datauri');
const program = require('commander');
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

const DELAY = 6000;
const q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);

function renderFile(filename, template) {
    filename = resolve(src, filename);
    const templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    const config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, template, program.dev);
}

screenshots.forEach(task => {
    const demoSrc = join(src, task.src);
    const screenshotDest = join(dest, task.dest);
    const template = task.template;

    debug(demoSrc, screenshotDest, template);

    const walker = walk(demoSrc, { followLinks: false });
    walker.on('file', (root, stat, next) => {
        const relativeName = relative(demoSrc, join(root, stat.name));
        debug(`[file]: ${relativeName}`);
        const ext = extname(stat.name);
        if (ext === '.html' || ext === '.md') {
            const htmlContent = renderFile(resolve(root, stat.name), template);
            const datauri = new DataURI();
            datauri.format('.html', htmlContent);
            const fileBasename = relativeName
                .replace(/\.html$/, '')
                .replace(/\.md$/, '');
            const outputFilename = join(screenshotDest, `${fileBasename}.png`);
            q.defer(callback => {
                const t0 = Date.now();
                const nightmare = Nightmare({
                    show: true
                });
                nightmare
                    .viewport(800, 450)
                    .goto(datauri.content)
                    .wait('#mountNode canvas')
                    .wait(DELAY)
                    .click('#mountNode')
                    .screenshot(outputFilename, () => {
                        debug(`${fileBasename} toke ${Date.now() - t0} to take a screenshot.`);
                        callback(null);
                    })
                    .end()
                    .catch(e => {
                        callback(e);
                    });
            });
        }
        next();
    });
    walker.on('directory', (root, stat, next) => {
        const relativeName = relative(demoSrc, join(root, stat.name));
        debug(`[directory]: ${relativeName}`);
        mkdir(resolve(screenshotDest, relativeName));
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
    });
});
