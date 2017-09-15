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

module.exports = (mdPath, root, config, templateMap, isDev) => {
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

    // step1: render doc
    data.content = renderString(doc, data);

    // step2: render template with doc content
    debug(`render with template ${data.template}`);
    const template = templateMap[data.template];
    if (template) {
        return template.render(data);
    }
    return data.content;
};
