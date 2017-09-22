const debug = require('debug')('lib:md2html');
// const meta = require('markdown-it-meta');
// const implicitFigures = require('markdown-it-implicit-figures');
const {
    renderString
} = require('nunjucks');
const {
    has
} = require('lodash');
const resolveData = require('./resolve-data');
const renderMd = require('./render-md');
const tocify = require('./tocify');

module.exports = (mdPath, root, config, templateMap, templateKey, isDev) => {
    debug(mdPath);
    const {
        doc,
        meta
    } = renderMd(mdPath);
    const data = resolveData(mdPath, root, config, meta, isDev);
    if (!has(data, 'isDev')) {
        data.isDev = isDev;
    }
    if (data.isDev) {
        data.__self = JSON.stringify(data);
    }
    data.__meta = JSON.stringify({
        locale: data.locale
    });

    // step1: render doc
    data.content = renderString(doc, data);

    // step2: render template with doc content
    templateKey = templateKey || data.template;
    debug(`render with template ${templateKey}`);
    const template = templateMap[templateKey];
    let result;
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
