'use strict';

var debug = require('debug')('lib:md2html');
// const meta = require('markdown-it-meta');
// const implicitFigures = require('markdown-it-implicit-figures');

var _require = require('path'),
    relative = _require.relative;

var _require2 = require('nunjucks'),
    renderString = _require2.renderString;

var _require3 = require('lodash'),
    has = _require3.has;

var assignDeep = require('./assign-deep');


var resolveData = require('./resolve-data');
var renderMd = require('./render-md');
var tocify = require('./tocify');

module.exports = function (mdPath, root, config, templateMap, overrideConfig, isDev) {
    debug(mdPath);

    var _renderMd = renderMd(mdPath),
        doc = _renderMd.doc,
        meta = _renderMd.meta,
        userScripts = _renderMd.userScripts;

    var data = resolveData(mdPath, root, config, meta, isDev);
    var relativePath = relative(data.src, mdPath);
    if (!has(data, 'isDev')) {
        data.isDev = isDev;
    }

    data.__relativePath = relativePath;
    var href = data.__href = '/' + relativePath.replace(/\.md$/, '.html');
    if (data.isDev) {
        data.__self = JSON.stringify(data);
    }
    data.__userScripts = userScripts;
    data.__meta = JSON.stringify({
        assets: data.assets,
        dist: data.dist,
        href: href,
        locale: data.locale,
        version: data.pkg.version
    });

    // step1: render doc
    data.content = renderString(doc, data);

    // step2: merge overrideConfig
    assignDeep(data, overrideConfig);

    // step3: render template with doc content
    var templateKey = data.template;
    debug('render with template ' + templateKey);
    var template = templateMap[templateKey];
    var result = void 0;
    if (template) {
        result = template.render(data);
    } else {
        result = data.content;
    }
    // post processing
    // toc
    result = tocify(result);
    return result;
};
