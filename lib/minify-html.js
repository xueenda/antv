'use strict';

var minifier = require('html-minifier');
var minify = minifier.minify;

module.exports = function (html) {
    return minify(html, {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true
    });
};
