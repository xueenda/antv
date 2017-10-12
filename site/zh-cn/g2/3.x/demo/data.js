'use strict';

var _require = require('lodash'),
    forIn = _require.forIn;

var _require2 = require('fs'),
    lstatSync = _require2.lstatSync,
    readdirSync = _require2.readdirSync;

var _require3 = require('path'),
    basename = _require3.basename,
    extname = _require3.extname,
    join = _require3.join;

var _require4 = require('../data'),
    plotByName = _require4.plotByName;

var renderMd = require('../../../../../lib/render-md');

var _require5 = require('../../../../../site-config'),
    base = _require5.base,
    assets = _require5.assets,
    pkg = _require5.pkg;

var isDirectory = function isDirectory(source) {
    return lstatSync(source).isDirectory();
};
var isFile = function isFile(source) {
    return lstatSync(source).isFile();
};
var getDirectories = function getDirectories(source) {
    return readdirSync(source).map(function (name) {
        return join(source, name);
    }).filter(isDirectory);
};
var getFiles = function getFiles(source) {
    return readdirSync(source).map(function (name) {
        return join(source, name);
    }).filter(isFile);
};

var demosByCategory = {};
var demoDirs = getDirectories(__dirname);
var categoryByHref = {};
demoDirs.forEach(function (dir) {
    var category = basename(dir);
    var files = getFiles(dir).filter(function (file) {
        return extname(file) === '.html';
    });
    var plotInfo = plotByName[category] || {
        index: 0,
        title: category
    };
    demosByCategory[category] = {
        index: plotInfo.index,
        title: plotInfo.name || plotInfo.title,
        category: category,
        plot: plotInfo,
        demos: []
    };
    files.forEach(function (file) {
        var _renderMd = renderMd(file),
            meta = _renderMd.meta;

        var index = meta.index,
            title = meta.title;

        var name = basename(file, '.html');
        var href = base + 'zh-cn/g2/3.x/demo/' + category + '/' + name + '.html';
        demosByCategory[category].demos.push({
            screenshot: join(assets + '/dist/' + pkg.version + '/g2/3.x/', category + '/' + name + '.png'),
            href: href,
            index: index,
            name: name,
            title: title
        });
        categoryByHref[href] = category;
    });
});
var demos = [];
forIn(demosByCategory, function (item) {
    demos.push(item);
    item.demos.sort(function (a, b) {
        return a.index - b.index;
    });
});
demos.sort(function (a, b) {
    return a.index - b.index;
});

module.exports = {
    demos: demos,
    template: 'g2-demo',
    demosByCategory: demosByCategory,
    categoryByHref: categoryByHref,
    showFooter: false
};
