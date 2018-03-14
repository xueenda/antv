#!/usr/bin/env node
process.env.DEBUG = 'lib:*,app:*';
var debug = require('debug')('app:server');
var connect = require('connect');
var getPort = require('get-port');
var http = require('http');
var open = require('open');
var parseurl = require('parseurl');
var program = require('commander');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var connectRedirection = require('connect-redirection');
var try2getOne = require('@lite-js/try2get').one;
var path = require('path');
var extname = path.extname;
var join = path.join;
var resolve = path.resolve;
var loadConfig = require('../lib/load-config');
var loadTemplates = require('../lib/load-templates');
var md2html = require('../lib/md2html');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .option('-o, --open', 'open')
    .option('-d, --dev', 'developing')
    .parse(process.argv);

var CONFIG = loadConfig(program.config);
var dest = CONFIG.dest;
var dist = CONFIG.dist;
var port = CONFIG.port;
var src = CONFIG.src;
var assets = CONFIG.assets;
var base = CONFIG.base;
var theme = CONFIG.theme;
var TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

function renderFile(filename) {
    filename = resolve(src, filename);
    var templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    var config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, null, program.dev).content;
}

var app = connect();
// static server
app.use(assets, serveStatic(resolve(theme.root, theme.assets)));
app.use(base, serveIndex(process.cwd()));
app.use(dist + '/', serveIndex(join(dest, dist + '/')));
app.use(dist + '/', serveStatic(join(dest, dist + '/')));
app.use(connectRedirection());
// markdown rendering
app.use((req, res, next) => {
    if (req.method === 'GET') {
        var pathname = parseurl(req).pathname;
        var ext = extname(pathname);
        if (pathname.indexOf(base) === 0 && (ext === '.md' || ext === '.html')) {
            debug(pathname);
            var relativeHtml = pathname.replace(base, '');
            var relativeMd = relativeHtml.replace(/\.html$/, '.md');
            var content = try2getOne(
                function () {
                    return renderFile(relativeMd);
                },
                function () {
                    return renderFile(relativeHtml);
                }
            );
            res.end(content);
        }
    }
    next();
});
app.use((req, res, next) => {
    if (req.method === 'GET') {
        var url = parseurl(req);
        var pathname = url.pathname;
        if (/\/$/.test(pathname)) {
            debug('redirecting...');
            debug(url);
            res.redirect(join(pathname, './index.html'));
        }
    }
    next();
});

function serve(port) {
    http.createServer(app).listen(port);
    var url = 'http://127.0.0.1:' + port + '/index.html';
    debug('server is ready on port: ' + port + '! url: ' + url);
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
