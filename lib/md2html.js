const MarkdownIt = require('markdown-it');
const debug = require('debug')('lib:md2html');
// const meta = require('markdown-it-meta');
const implicitFigures = require('markdown-it-implicit-figures');
const {
    readFileSync
} = require('fs');
const {
    renderString
} = require('nunjucks');
const betterMeta = require('./markdown-it-plugins/better-meta');
const assignDeep = require('./assign-deep');
const resolveData = require('./resolve-data');

module.exports = (mdPath, root, config, templateMap, isDev) => {
    debug(mdPath);
    const md = new MarkdownIt({
        html: true,
    });
    md.use(betterMeta);
    md.use(implicitFigures, {
        dataType: true,
        figcaption: true,
        tabindex: true
    });

    const content = readFileSync(mdPath, 'utf8');
    const doc = md.render(content);
    const data = assignDeep({}, resolveData(mdPath, root, config, isDev), md.meta);

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
