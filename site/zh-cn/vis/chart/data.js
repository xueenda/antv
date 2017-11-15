'use strict';

var fs = require('fs'),
    lstatSync = fs.lstatSync,
    readdirSync = fs.readdirSync;

var path = require('path'),
    basename = path.basename,
    extname = path.extname,
    join = path.join;

var _ = require('lodash');

var renderMd = require('../../../../lib/render-md');

var siteConfig = require('../../../../site-config'),
    base = siteConfig.base;

var isFile = function isFile(source) {
    return lstatSync(source).isFile();
};
var getFiles = function getFiles(source) {
    return readdirSync(source).map(function (name) {
        return join(source, name);
    }).filter(isFile);
};

// docsByTag
// docByName

var docList = [];
var docFiles = getFiles(__dirname).filter(function (file) {
    return extname(file) === '.md';
});
var docNamesByTag = {};
var docByName = {};
var tagDocByName = {};
docFiles.forEach(function(file) {
    var _renderMd = renderMd(file),
        meta = _renderMd.meta,
        tags = meta.tags || [];

    var index = _.isNumber(meta.index) ? meta.index : 999,
        title = meta.title;

    var name = basename(file, '.md');
    var doc = {
        href: base + 'zh-cn/vis/chart/' + name + '.html',
        index: index,
        name: name,
        title: title,
        hideFromNav: true,
    };
    if (/^tag-/.test(name)) {
        var tag = name.replace(/^tag-/, '');
        tagDocByName[tag] = doc;
        doc.hideFromNav = false;
    }
    if (name === 'index') {
        doc.hideFromNav = false;
    }
    docByName[name] = doc;
    tags.forEach(function (tag) {
        docNamesByTag[tag] = docNamesByTag[tag] || [];
        docNamesByTag[tag].push(name);
    });
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
    navName: 'chart',
    docList: docList,
    docIndexByHref: indexByHref,
    docNamesByTag,
    docByName,
    tagDocByName,
    docsCount: docList.length,
    template: 'doc',
    docMenuHeader: '${resource.translate.visChart}',
    showFooter: false,
    docFilteringSupport: true,
    resource: {
        jsFiles: [
            '${url.g2}',
            '${url.dataSet}'
        ],
    }
};
