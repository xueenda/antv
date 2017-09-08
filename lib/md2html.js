const debug = require('debug')('lib:md2html');
const MarkdownIt = require('markdown-it');
const meta = require('markdown-it-meta');
const {
    readFileSync
} = require('fs');
const {
    renderString
} = require('nunjucks');
const assignDeep = require('./assign-deep');
const resolveData = require('./resolve-data');

module.exports = (mdPath, templateMap) => {
    debug(mdPath);
    const md = new MarkdownIt();
    md.use(meta);

    const content = readFileSync(mdPath, 'utf8');
    const doc = md.render(content);
    const data = assignDeep({}, resolveData(mdPath), md.meta);

    // step1: render doc
    data.content = renderString(doc, data);

    // step2: render template with doc content
    debug(`render with template ${data.template}`);
    const template = templateMap(data.template);
    return template.render(data);
};
