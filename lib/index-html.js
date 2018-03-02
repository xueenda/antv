var debug = require('debug')('lib:index-html');
var cheerio = require('cheerio');
var _ = require('lodash');
var trim = _.trim;
var uniqueId = _.uniqueId;

function indexing(html) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var id = options.id;
    var weight = options.weight;

    if (!id) {
        id = parseInt(uniqueId(), 10);
    }
    if (!weight) {
        weight = 0;
    }
    var alias = meta.alias || {};

    var doc = {
        id: id,
        weight: weight,
        anchors: []
    };
    var invertedList = {};
    var i = 0;

    var $ = cheerio.load(html);
    // navigators
    // #
    var usedTitle = {};
    var docTitle = _.trim($('title').first().text().replace('- AntV', ''));
    doc.anchors.push({
        id: i,
        href: '#',
        level: 1,
        title: docTitle
    });
    usedTitle[docTitle] = true;

    // #headers
    $('h1,h2,h3,h4,h5,h6').each(function () {
        var $header = $(this);
        // const $anchor = $header.find('.anchor');
        // if ($anchor) {
        var id = $header.attr('id');
        if (id) {
            i++;
            debug(id);
            var title = trim(id.replace(/[#_]+/g, '').replace(/-/g, ' '));
            if (!usedTitle[title]) {
                var href = '#' + id;
                doc.anchors.push({
                    id: i,
                    href: href,
                    level: parseInt($header.prop('tagName').replace(/h/i, ''), 10),
                    title: title
                });
            }
        }
        // }
    });
    doc.anchors.forEach(function (nav) {
        // alias
        var title = nav.title;
        if (alias[title]) {
            nav.alias = alias[title];
        }
    });

    var indexMeta = [id, 0]; // id, subId
    // meta
    // keywords
    var keywordsStr = $('meta[name=keywords]').attr('content');
    if (keywordsStr) {
        var keywords = $('meta[name=keywords]').attr('content').split(',');
        keywords.forEach(function (keyword) {
            keyword = trim(keyword);
            if (keyword) {
                invertedList[keyword] = [indexMeta];
            }
        });
    }
    // description
    var description = trim($('meta[name=description]').attr('content'));
    if (description) {
        invertedList[description] = [indexMeta];
    }
    return {
        doc: doc,
        invertedList: invertedList
    };
}

module.exports = indexing;
