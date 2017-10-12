'use strict';

var debug = require('debug')('lib:render-md');
var MarkdownIt = require('markdown-it');

var _require = require('fs'),
    readFileSync = _require.readFileSync;

var _require2 = require('highlight.js'),
    getLanguage = _require2.getLanguage,
    _highlight = _require2.highlight;

var betterMeta = require('./markdown-it-plugins/better-meta');

function scriptTag(code) {
    return '<script>\n(function(){\n\'use strict\';\n' + code + '\n})();\n</script>';
}

function highlightTag(pre) {
    return '<div class="highlight">' + pre + '</div>';
}

module.exports = function (mdPath) {
    debug(mdPath);
    var userScripts = [];
    var md = new MarkdownIt({
        html: true,
        highlight: function highlight(str, lang) {
            if (lang) {
                if (getLanguage(lang)) {
                    // normal syntax
                    try {
                        return highlightTag(_highlight(lang, str).value);
                    } catch (e) {
                        debug(e);
                    }
                } else if (/^js\+/.exec(lang) || /^javascript\+/.exec(lang)) {
                    // ```js+
                    try {
                        // print javascript code and execute it
                        userScripts.push(scriptTag(str));
                        return highlightTag(_highlight('js', str).value);
                    } catch (e) {
                        debug(e);
                    }
                } else if (/^js-/.exec(lang) || /^javascript-/.exec(lang)) {
                    // ```js-
                    // execute only
                    userScripts.push(scriptTag(str));
                    return '<pre></pre>'; // fooling markdown-it
                }
            }
            return ''; // use external default escaping
        }
    });
    md.use(betterMeta);
    var content = readFileSync(mdPath, 'utf8');
    var doc = md.render(content).replace(/<pre><\/pre>/g, ''); // hacky trick
    return {
        doc: doc,
        md: md,
        meta: md.meta,
        userScripts: userScripts
    };
};
