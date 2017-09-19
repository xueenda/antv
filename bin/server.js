#!/usr/bin/env node
const debug = require('debug')('app:server');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const open = require('open');
const parseurl = require('parseurl');
const program = require('commander');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const {
    one: try2getOne
} = require('@lite-js/try2get');
const {
    extname,
    resolve
} = require('path');
const loadConfig = require('../lib/load-config');
const loadTemplates = require('../lib/load-templates');
const md2html = require('../lib/md2html');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .option('-o, --open', 'open')
    .option('-d, --dev', 'developing')
    .parse(process.argv);

const CONFIG = loadConfig(program.config);
const {
    port,
    src,
    assets,
    base,
    theme
} = CONFIG;
const TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

function renderFile(filename) {
    filename = resolve(src, filename);
    const templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    const config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, null, program.dev);
}

const app = connect();
// static server
app.use(assets, serveStatic(resolve(theme.root, theme.assets)));
app.use(base, serveIndex(process.cwd()));
// markdown rendering
app.use((req, res, next) => {
    if (req.method === 'GET') {
        const pathname = parseurl(req).pathname;
        const ext = extname(pathname);
        if (pathname.indexOf(base) === 0 && (ext === '.md' || ext === '.html')) {
            debug(pathname);
            const relativeHtml = pathname
                .replace(base, '');
            const relativeMd = relativeHtml.replace(/\.html$/, '.md');
            const content = try2getOne(
                () => renderFile(relativeMd),
                () => renderFile(relativeHtml)
            );
            res.end(content);
        }
    }
    next();
});

function serve(port) {
    http.createServer(app).listen(port);
    const url = `http://127.0.0.1:${port}`;
    debug(`server is ready on port ${port}! url: ${url}`);
    if (program.open) {
        open(url);
    }
}

if (port) {
    serve(port);
} else {
    getPort().then(availablePort => {
        serve(availablePort);
    });
}
