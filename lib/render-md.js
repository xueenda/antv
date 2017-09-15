const debug = require('debug')('lib:render-md');
const MarkdownIt = require('markdown-it');
const {
    readFileSync
} = require('fs');
const betterMeta = require('./markdown-it-plugins/better-meta');

module.exports = (mdPath) => {
    debug(mdPath);
    const md = new MarkdownIt({
        html: true,
    });
    md.use(betterMeta);

    const content = readFileSync(mdPath, 'utf8');
    const doc = md.render(content);
    return {
        doc,
        md,
        meta: md.meta
    };
};
