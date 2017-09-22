const {
    minify
} = require('html-minifier');

module.exports = html => minify(html, {
    removeAttributeQuotes: true,
    removeComments: true,
    collapseWhitespace: true,
});
