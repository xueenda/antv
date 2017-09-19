const debug = require('debug')('lib:render-md');
const MarkdownIt = require('markdown-it');
const {
    readFileSync
} = require('fs');
const {
    getLanguage,
    highlight
} = require('highlight.js');
const betterMeta = require('./markdown-it-plugins/better-meta');

module.exports = mdPath => {
    debug(mdPath);
    const md = new MarkdownIt({
        html: true,
        highlight: function (str, lang) {
            if (lang) {
                if (getLanguage(lang)) { // normal syntax
                    try {
                        return highlight(lang, str).value;
                    } catch (e) {
                        debug(e);
                    }
                } else if (/^js\+/.exec(lang)) { // ```js+
                    try {
                        // print javascript code and execute it
                        return `${highlight('js', str).value}\n<script>${str}</script>`;
                    } catch (e) {
                        debug(e);
                    }
                }
            }
            return ''; // use external default escaping
        }
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
