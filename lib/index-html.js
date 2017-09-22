/*
 * indexing html
 */
const debug = require('debug')('lib:index-html');
const cheerio = require('cheerio');
const {
    forIn,
    startCase,
    trim,
    uniqueId
} = require('lodash');

function indexing(html, options = {}, meta = {}) {
    let {
        id,
        weight
    } = options;
    if (!id) {
        id = parseInt(uniqueId(), 10);
    }
    if (!weight) {
        weight = 0;
    }
    let alias = meta.alias || {};

    const doc = {
        id,
        weight,
        navigator: {
        }
    };
    const invertedList = {};
    let i = 0;

    const $ = cheerio.load(html);
    // navigators
    // #
    doc.navigator['#'] = {
        id: i,
        href: '#',
        level: 1,
        title: $('title').text(),
    };
    // #headers
    $('h1,h2,h3,h4,h5,h6').each(function () {
        const $header = $(this);
        const $anchor = $header.find('.anchor');
        if ($anchor) {
            const id = $anchor.attr('id');
            if (id) {
                i ++;
                debug(id);
                const _startCase = startCase(id);
                const href = `#${id}`;
                doc.navigator[href] = {
                    id: i,
                    href,
                    level: parseInt($header.prop('tagName').replace(/h/i, ''), 10),
                    title: _startCase
                };
            }
        }
    });
    forIn(doc.navigator, nav => { // alias
        const title = nav.title;
        if (alias[title]) {
            nav.alias = alias[title];
        }
    });

    // meta
    // keywords
    const keywords = $('meta[name=keywords]').attr('content').split(',');
    const indexMeta = {
        id,
        navId: 0,
    };
    keywords.forEach(keyword => {
        keyword = trim(keyword);
        if (keyword) {
            invertedList[keyword] = [indexMeta];
        }
    });
    // description
    const description = trim($('meta[name=description]').attr('content'));
    if (description) {
        invertedList[description] = [indexMeta];
    }
    return {
        doc,
        invertedList
    };
}

module.exports = indexing;
