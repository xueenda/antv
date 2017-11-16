'use strict';
var fs = require('fs');
var lstatSync = fs.lstatSync;
var readdirSync = fs.readdirSync;
var path = require('path');
var basename = path.basename;
var extname = path.extname;
var join = path.join;
var _ = require('lodash');
var renderMd = require('../../../../lib/render-md');
var siteConfig = require('../../../../site-config');

var base = siteConfig.base;
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
docFiles.forEach(function(file) {
    var _renderMd = renderMd(file);
    var meta = _renderMd.meta;
    var authors = meta.authors || [];
    var author = authors[0] || {
        name: 'AntV',
        avatar: 'xxx',
    };
    var landscape = meta.landscape;
    var date = meta.date || '2017-11-22';
    var index = _.isNumber(meta.index) ? meta.index : 999;
    var title = meta.title;

    var name = basename(file, '.md');
    var doc = {
        href: base + 'zh-cn/vis/blog/' + name + '.html',
        index: index,
        name: name,
        title: title,
        date: date,
        authors: authors,
        author: author,
        landscape: landscape,
        // hideFromNav: true,
    };
    docList.push(doc);

});
docList.sort(function (a, b) {
    return a.index - b.index;
});
var indexByHref = {};
docList.forEach(function (doc, index) {
    indexByHref[doc.href] = index;
});

module.exports = {
    docIcon: '',
    navName: 'blog',
    docList: docList,
    docIndexByHref: indexByHref,
    docsCount: docList.length,
    template: 'blog',
    docMenuHeader: '${resource.translate.visBlog}',
    showFooter: false,
    docFilteringSupport: true,
    resource: {
        jsFiles: [
            '${url.g2}',
            '${url.dataSet}'
        ],
    }
};
