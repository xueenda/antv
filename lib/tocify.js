'use strict';

var debug = require('debug')('lib:tocify');
var cheerio = require('cheerio');

var _require = require('lodash'),
    escape = _require.escape,
    some = _require.some,
    trim = _require.trim,
    unescape = _require.unescape;

var PREFIX = '_';
var SEPARATOR = '-';
var IGNORE_SELECTORS = ['.menu', '.nav', '.site-map', '.toc', '.card-extra', 'footer'];

function shouldIgnore($target) {
    debug($target.text());
    if (!trim($target.text())) {
        return true;
    }
    return some(IGNORE_SELECTORS, function (selector) {
        return !!$target.parents(selector).length;
    });
}

module.exports = function (str) {
    var $ = cheerio.load(str);
    var headerById = {};
    $('h1,h2,h3,h4,h5,h6').each(function () {
        var $header = $(this);
        if (!shouldIgnore($header)) {
            var text = trim(unescape(escape($header.text())));
            var id = $header.attr('id');
            if (!id) {
                id = '' + PREFIX + text.replace(/["'&<>\s()/\\]+/g, SEPARATOR);
            }
            while (headerById[id]) {
                id = '' + PREFIX + id;
            }
            $header.attr('id', id);
            var level = $header.prop('tagName').replace(/h/i, '');
            debug('id: ' + id + ', level: ' + level);
            // $header.append(`<a class="anchor" data-text="${text}" data-level="${level}" id=${id} href="#${id}">#</a>`);
            headerById[id] = true;
        }
    });
    return $.html();
};
