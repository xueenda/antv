'use strict';

var _require = require('html-minifier'),
    minify = _require.minify;

module.exports = function (html) {
    return minify(html, {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true
    });
};
