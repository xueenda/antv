'use strict';

var _require = require('fs'),
    lstatSync = _require.lstatSync,
    readdirSync = _require.readdirSync;

var _require2 = require('path'),
    basename = _require2.basename,
    extname = _require2.extname,
    join = _require2.join;

var renderMd = require('../../../../../lib/render-md');

var _require3 = require('../../../../../site-config'),
    base = _require3.base;

var isFile = function isFile(source) {
    return lstatSync(source).isFile();
};
var getFiles = function getFiles(source) {
    return readdirSync(source).map(function (name) {
        return join(source, name);
    }).filter(isFile);
};

var docList = [];
var docFiles = getFiles(__dirname).filter(function (file) {
    return extname(file) === '.md';
});
docFiles.forEach(function (file) {
    var _renderMd = renderMd(file),
        meta = _renderMd.meta;

    var index = meta.index,
        title = meta.title;

    var name = basename(file, '.md');
    docList.push({
        href: base + 'zh-cn/g2/3.x/tutorial/' + name + '.html',
        index: index,
        name: name,
        title: title
    });
});
docList.sort(function (a, b) {
    return a.index - b.index;
});
var indexByHref = {};
docList.forEach(function (doc, index) {
    indexByHref[doc.href] = index;
});

module.exports = {
    navName: 'tutorial',
    docList: docList,
    docIndexByHref: indexByHref,
    docsCount: docList.length,
    template: 'doc',
    docMenuHeader: '${resource.translate.tutorial}',
    showFooter: false,
    tocifyWithAnchor: true,
    docFilteringSupport: true
};
