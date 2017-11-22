var debug = require('debug')('lib:tocify');
var cheerio = require('cheerio');
var _ = require('lodash');
var escape = _.escape;
var some = _.some;
var trim = _.trim;
var unescape = _.unescape;

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

function anchorElement(id, level) {
    return '<a href="#' + id + '" class="anchor">' +
        (level > 1 ? '<span class="iconfont icon-link"></span>' : '') +
    '</a>';
}

function generateInnerPageToc(headers) {
    var $ = cheerio.load('<div class="inner-page-toc row"></div>');
    headers.forEach(function (header) {
        $('.row').append(
            '<a class="col-md-3 level-' + header.level + '" href="#' + header.id + '">' + header.text + '</a>'
        );
    });
    return $.html();
}

module.exports = function (str, withAnchor, withInnerPageToc) {
    var $ = cheerio.load(str);
    var headerById = {};
    var innerTocHeaders = [];
    $('h1,h2,h3,h4,h5,h6').each(function () {
    // $('h1,h2,h3,h4,h5,h6').each(function () {
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
            var level = parseInt($header.prop('tagName').replace(/h/i, ''), 10);
            if (level >= 2 && level <= 3) { // navigates only h2~h4 for inner page toc
                innerTocHeaders.push({
                    id: id,
                    level: level,
                    text: text,
                });
            }
            debug('id: ' + id + ', level: ' + level);
            if (withAnchor) {
                $header.prepend(anchorElement(id, level));
            }
            headerById[id] = true;
        }
    });
    if (withInnerPageToc) {
        var $h1 = $('article h1').first();
        if ($h1) {
            $h1.after(generateInnerPageToc(innerTocHeaders));
        }
    }
    return $.html();
};
