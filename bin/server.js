#!/usr/bin/env node
const debug = require('debug')('app:server');
const program = require('commander');
const connect = require('connect');
const http = require('http');
const open = require('open');
const parseurl = require('parseurl');
const getPort = require('get-port');
const {
    extname,
    resolve
} = require('path');
const pkg = require('../package.json');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const loadConfig = require('../lib/load-config');
const loadTemplates = require('../lib/load-templates');
const md2html = require('../lib/md2html');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .option('-o, --open', 'open')
    .option('-d, --dev', 'developing')
    .parse(process.argv);

const config = loadConfig(program.config);
const {
    assets,
    base,
    theme
} = config;
const templateMap = loadTemplates(resolve(theme.root, theme.templates));

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
            const relativePathname = pathname
                .replace(base, '')
                .replace(/\.html$/, '.md');
            const filename = resolve(config.src, relativePathname);
            const content = md2html(filename, config.src, config, templateMap, program.dev);
            res.end(content);
        }
    }
    next();
});

function serve(port) {
    http.createServer(app).listen(port);
    debug(config.port);
    if (program.open) {
        open(`http://127.0.0.1:${port}`);
    }
}

if (config.port) {
    serve(config.port);
} else {
    getPort().then(port => {
        serve(port);
    });
}
