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

function scriptTag(code) {
    return `<script>
(function(){
'use strict';
${code}
})();
</script>`;
}

function highlightTag(pre) {
    return `<div class="highlight">${pre}</div>`;
}

module.exports = mdPath => {
    debug(mdPath);
    const userScripts = [];
    const md = new MarkdownIt({
        html: true,
        highlight: function (str, lang) {
            if (lang) {
                if (getLanguage(lang)) { // normal syntax
                    try {
                        return highlightTag(highlight(lang, str).value);
                    } catch (e) {
                        debug(e);
                    }
                } else if (/^js\+/.exec(lang) || /^javascript\+/.exec(lang)) { // ```js+
                    try {
                        // print javascript code and execute it
                        userScripts.push(scriptTag(str));
                        return highlightTag(highlight('js', str).value);
                    } catch (e) {
                        debug(e);
                    }
                } else if (/^js-/.exec(lang) || /^javascript-/.exec(lang)) { // ```js-
                    // execute only
                    userScripts.push(scriptTag(str));
                    return '<pre></pre>'; // fooling markdown-it
                }
            }
            return ''; // use external default escaping
        }
    });
    md.use(betterMeta);
    const content = readFileSync(mdPath, 'utf8');
    const doc = md.render(content).replace(/<pre><\/pre>/g, ''); // hacky trick
    return {
        doc,
        md,
        meta: md.meta,
        userScripts,
    };
};
