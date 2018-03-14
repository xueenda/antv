#!/usr/bin/env node
process.env.DEBUG = 'lib:*,app:*';
var debug = require('debug')('app:indexing');
var program = require('commander');
var _ = require('lodash');
var forIn = _.forIn;
var walk = require('walk').walk;
var shelljs = require('shelljs');
var mkdir = shelljs.mkdir;
var fs = require('fs');
var readFileSync = fs.readFileSync;
var writeFile = fs.writeFile;
var path = require('path');
var extname = path.extname;
var join = path.join;
var relative = path.relative;
var loadConfig = require('../lib/load-config');
var indexHtml = require('../lib/index-html');
var pkg = require('../package.json');

program.version(pkg.version).option('-c, --config', 'configuration').parse(process.argv);

var CONFIG = loadConfig(program.config);
var assets = CONFIG.assets;
var dest = CONFIG.dest;
var indices = CONFIG.indices;

var destData = join(dest, assets, './data');

// assets
mkdir('-p', destData);

indices.forEach(function (indexing) {
    var result = {
        docs: [],
        invertedList: {}
    };
    var indexingSrc = join(dest, indexing.src);
    var indexingDest = join(dest, indexing.dest);
    var indexingMeta = indexing.meta;
    // indexing
    var walker = walk(indexingSrc, { followLinks: false });
    walker.on('file', function (root, stat, next) {
        var filename = join(root, stat.name);
        var relativeName = relative(dest, filename);
        debug('[file]: ' + relativeName);
        var ext = extname(stat.name);
        var weight = relativeName.split('/').length + 1;
        if (ext === '.html') {
            var _indexHtml = indexHtml(readFileSync(filename, 'utf8'), {
                weight: weight
            }, indexingMeta),
                doc = _indexHtml.doc,
                invertedList = _indexHtml.invertedList;

            doc.href = join('/', relativeName);
            result.docs.push(doc);
            forIn(invertedList, function (item, key) {
                if (result.invertedList[key]) {
                    result.invertedList[key] = result.invertedList[key].concat(item);
                } else {
                    result.invertedList[key] = item;
                }
            });
        }
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
        writeFile(indexingDest, JSON.stringify(result, null, 4), 'utf8', function (err) {
            if (err) {
                debug(err.message || err.code + ': ' + err.path);
            } else {
                debug(indexing.dest + ' written');
            }
        });
        debug('all done');
    });
});
