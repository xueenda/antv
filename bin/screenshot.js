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
var fs = require('fs');
var writeFileSync = fs.writeFileSync;
var d3Queue = require('d3-queue');
var queue = d3Queue.queue;
var walk = require('walk').walk;
var shelljs = require('shelljs');
var mkdir = shelljs.mkdir;
var path = require('path');
var extname = path.extname;
var join = path.join;
var relative = path.relative;
var resolve = path.resolve;
var loadConfig = require('../lib/load-config');
var loadTemplates = require('../lib/load-templates');
var md2html = require('../lib/md2html');
var imageminDir = require('../lib/imagemin-dir');
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
function renderFile(filename, overrideConfig) {
    filename = resolve(src, filename);
    var templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    var config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, overrideConfig, program.dev);
}

getPort().then(function (port) {
    http.createServer(app).listen(port);
    var url = 'http://127.0.0.1:' + port;
    debug('server is ready on port ' + port + '! url: ' + url);
    var DELAY = 6000;

    function screenshotTasks(tasks, index) {
        var task = tasks[index];
        if (!task) {
            debug('screenshots are all captured!');
            process.exit();
        }
        var taskQueue = [];
        var q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);
        var demoSrc = join(src, task.src);
        var screenshotDest = join(dest, task.dest);
        var template = task.template;
        var demoTheme = task.demoTheme;

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
                var renderedFile = renderFile(resolve(root, stat.name), {
                    template: template,
                    demoTheme: demoTheme,
                });
                var htmlContent = renderedFile.content;
                var htmlMeta = renderedFile.data;
                var fileBasename = relativeName.replace(/\.html$/, '').replace(/\.md$/, '');
                var targetFilename = join(screenshotDest, fileBasename + (demoTheme ? ('-' + demoTheme) : '') + '.html');
                writeFileSync(targetFilename, htmlContent, 'utf8');

                var relativeUrl = relative(dest, targetFilename);
                var targetUrl = join(url, relativeUrl);

                var outputFilename = join(screenshotDest, fileBasename + (demoTheme ? ('-' + demoTheme) : '') + '.png');
                debug(screenshotDest, fileBasename);
                if (htmlMeta.screenshot) {
                    debug('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> skipping file because screenshot is specified......');
                } else {
                    taskQueue.push({
                        fileBasename: fileBasename,
                        outputFilename: outputFilename,
                        targetUrl: targetUrl,
                    });
                }
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
            debug('stop walking');
            taskQueue.forEach(function (t) {
                q.defer(function (callback) {
                    debug('target: ' + t.outputFilename);
                    var t0 = Date.now();
                    var nightmare = Nightmare({
                        // show: true,
                        show: false,
                        gotoTimeout: 600000,
                    });
                    nightmare.viewport(800, 450) // 16 x 9
                        .goto(t.targetUrl)
                        // .wait('#mountNode canvas')
                        .wait(DELAY)
                        // .click('canvas')
                        .screenshot(t.outputFilename, function () {
                            debug(t.fileBasename + ' took ' + (Date.now() - t0) + ' to take a screenshot.');
                            callback(null);
                        })
                        .end()
                        .catch(function (e) {
                            debug(t.fileBasename + ' failed to take a screenshot: ' + e);
                            // callback(e);
                        });
                });
            });
            q.awaitAll(function (error) {
                imageminDir(screenshotDest, {
                    callback: function () {
                        if (error) {
                            debug(error);
                            // process.exit(1);
                        } else {
                            index ++;
                            screenshotTasks(tasks, index);
                        }
                    }
                });
            });
        });
    }

    screenshotTasks(screenshots, 0);
});
