#!/usr/bin/env node
var debug = require('debug')('app:build');
var program = require('commander');
var walk = require('walk').walk;
var shelljs = require('shelljs');
var cp = shelljs.cp;
var mkdir = shelljs.mkdir;
var fs = require('fs');
var writeFile = fs.writeFile;
var path = require('path');
var extname = path.extname;
var join = path.join;
var relative = path.relative;
var resolve = path.resolve;
var loadConfig = require('../lib/load-config');
var loadTemplates = require('../lib/load-templates');
var md2html = require('../lib/md2html');
var minifyHtml = require('../lib/minify-html');
var pkg = require('../package.json');

program.version(pkg.version).option('-c, --config', 'configuration').parse(process.argv);

var CONFIG = loadConfig(program.config);
var dest = CONFIG.dest,
    src = CONFIG.src,
    assets = CONFIG.assets,
    theme = CONFIG.theme;

var TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

var themeAssets = join(theme.root, theme.assets);
var destAssets = join(dest, assets);

// assets
mkdir('-p', destAssets);
cp('-R', join(themeAssets, './*'), join(destAssets, '/'));

function renderFile(filename) {
    filename = resolve(src, filename);
    var templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    var config = program.dev ? loadConfig(program.config) : CONFIG;
    debug(config);
    return md2html(filename, src, config, templateMap, null, program.dev).content;
}

var walker = walk(src, { followLinks: false });
walker.on('file', function (root, stat, next) {
    var relativeName = relative(src, join(root, stat.name));
    debug('[file]: ' + relativeName);
    var ext = extname(stat.name);
    if (ext === '.html' || ext === '.md') {
        var htmlContent = minifyHtml(renderFile(resolve(root, stat.name)));
        var destFilename = join(dest, relativeName).replace(/\.md$/, '.html');
        writeFile(destFilename, htmlContent, 'utf8', function (err) {
            if (err) {
                debug(err.message || err.code + ': ' + err.path);
            } else {
                debug(relativeName + ' written');
            }
        });
    }
    next();
});
walker.on('directory', function (root, stat, next) {
    var relativeName = relative(src, join(root, stat.name));
    debug('[directory]: ' + relativeName);
    mkdir(resolve(dest, relativeName));
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
    debug('all done');
});
