#!/usr/bin/env node
'use strict';

var debug = require('debug')('app:screenshot');
var MAX_POOL_SIZE = require('os').cpus().length;
var Nightmare = require('nightmare');
var connect = require('connect');
var getPort = require('get-port');
var http = require('http');
var serveStatic = require('serve-static');
var program = require('commander');

var _require = require('fs'),
    writeFileSync = _require.writeFileSync;

var _require2 = require('d3-queue'),
    queue = _require2.queue;

var _require3 = require('walk'),
    walk = _require3.walk;

var _require4 = require('shelljs'),
    mkdir = _require4.mkdir;

var _require5 = require('path'),
    extname = _require5.extname,
    join = _require5.join,
    relative = _require5.relative,
    resolve = _require5.resolve;

var loadConfig = require('../lib/load-config');
var loadTemplates = require('../lib/load-templates');
var md2html = require('../lib/md2html');
var pkg = require('../package.json');

program.version(pkg.version).option('-c, --config', 'configuration').parse(process.argv);

var CONFIG = loadConfig(program.config);
var screenshots = CONFIG.screenshots,
    dest = CONFIG.dest,
    src = CONFIG.src,
    assets = CONFIG.assets,
    theme = CONFIG.theme;

var TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

var destAssets = join(dest, assets);
debug(screenshots);

// assets
mkdir('-p', destAssets);

var app = connect();
app.use('/', serveStatic(dest));

// markdown rendering
function renderFile(filename, template) {
    filename = resolve(src, filename);
    var templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    var config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, template, program.dev);
}

getPort().then(function (port) {
    http.createServer(app).listen(port);
    var url = 'http://127.0.0.1:' + port;
    debug('server is ready on port ' + port + '! url: ' + url);
    var DELAY = 6000;
    var q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);
    var walkingEnded = 0;
    var screenshotTasksCount = screenshots.length;

    screenshots.forEach(task => {
        var demoSrc = join(src, task.src);
        var screenshotDest = join(dest, task.dest);
        var template = task.template;

        debug(demoSrc, screenshotDest, template);

        var walker = walk(demoSrc, { followLinks: false });
        walker.on('file', function (root, stat, next) {
            var relativeName = relative(demoSrc, join(root, stat.name));
            debug('[file]: ' + relativeName);
            // if (relativeName !== 'point/bubble.html') { next(); return; };
            if (relativeName === 'index.html') {
                next();
                return;
            }
            var ext = extname(stat.name);
            if (ext === '.html' || ext === '.md') {
                var htmlContent = renderFile(resolve(root, stat.name), template);
                var fileBasename = relativeName.replace(/\.html$/, '').replace(/\.md$/, '');
                var targetFilename = join(screenshotDest, fileBasename + '.html');
                writeFileSync(targetFilename, htmlContent, 'utf8');

                var relativeUrl = relative(dest, targetFilename);
                var targetUrl = join(url, relativeUrl);

                var outputFilename = join(screenshotDest, fileBasename + '.png');
                debug(screenshotDest, fileBasename);
                debug('target: ' + outputFilename);
                q.defer(function (callback) {
                    var t0 = Date.now();
                    var nightmare = Nightmare({
                        // show: true,
                        show: false
                    });
                    nightmare.viewport(800, 450) // 16 x 9
                        .goto(targetUrl)
                        // .wait('#mountNode canvas')
                        .wait(DELAY).screenshot(outputFilename, function () {
                        debug(fileBasename + ' took ' + (Date.now() - t0) + ' to take a screenshot.');
                        callback(null);
                    }).end().catch(function (e) {
                        debug(fileBasename + ' failed to take a screenshot');
                        callback(e);
                    });
                });
            }
            next();
        });
        walker.on('directory', function (root, stat, next) {
            var relativeName = relative(demoSrc, join(root, stat.name));
            debug('[directory]: ' + relativeName);
            mkdir('-p', resolve(screenshotDest, relativeName));
            next();
        });
        walker.on('errors', function (root, nodeStatsArray, next) {
            // plural
            nodeStatsArray.forEach(function (n) {
                debug('[ERROR] ' + n.name);
                debug(n.error.message || n.error.code + ': ' + n.error.path);
            });
            next();
        });
        walker.on('end', function () {
            walkingEnded ++;
            debug('stop walking');
            if (walkingEnded === screenshotTasksCount) {
                q.awaitAll(function (error) {
                    if (error) {
                        debug(error);
                        process.exit(1);
                    } else {
                        debug('screenshots are all captured!');
                        process.exit();
                    }
                });
            }
        });
    });
});
