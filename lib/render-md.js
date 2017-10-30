'use strict';

var debug = require('debug')('lib:render-md');
var MarkdownIt = require('markdown-it');
var fs = require('fs');
var highlightJS = require('highlight.js');
var replaceLink = require('markdown-it-replace-link');

var betterMeta = require('./markdown-it-plugins/better-meta');

var readFileSync = fs.readFileSync;
var getLanguage = highlightJS.getLanguage;
var _highlight = highlightJS.highlight;

function scriptTag(code) {
    return '<script>\n(function(){\n\'use strict\';\n' + code + '\n})();\n</script>';
}

function highlightTag(pre) {
    return '<pre></pre><div class="highlight">' + '<pre>' + pre + '</pre></div>';
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
        },
        linkify: true,
        replaceLink: function (link) {
            return link.replace(/%7B/g, '{').replace(/%7D/g, '}');
        }
    });
    md
        .use(replaceLink)
        .use(betterMeta);

    var content = readFileSync(mdPath, 'utf8');
    var doc = md.render(content).replace(/<pre><\/pre>/g, ''); // hacky trick
    return {
        doc: doc,
        md: md,
        meta: md.meta,
        userScripts: userScripts
    };
};
