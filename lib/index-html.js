/*
 * indexing html
 */
const debug = require('debug')('lib:index-html');
const cheerio = require('cheerio');
const {
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
        anchors: []
    };
    const invertedList = {};
    let i = 0;

    const $ = cheerio.load(html);
    // navigators
    // #
    const usedTitle = {};
    const docTitle = $('title').text();
    doc.anchors.push({
        id: i,
        href: '#',
        level: 1,
        title: docTitle,
    });
    usedTitle[docTitle] = true;

    // #headers
    $('h1,h2,h3,h4,h5,h6').each(function () {
        const $header = $(this);
        // const $anchor = $header.find('.anchor');
        // if ($anchor) {
        const id = $header.attr('id');
        if (id) {
            i ++;
            debug(id);
            const title = trim(id.replace(/[#_]+/g, '').replace(/-/g, ' '));
            if (!usedTitle[title]) {
                const href = `#${id}`;
                doc.anchors.push({
                    id: i,
                    href,
                    level: parseInt($header.prop('tagName').replace(/h/i, ''), 10),
                    title
                });
            }
        }
        // }
    });
    doc.anchors.forEach(nav => { // alias
        const title = nav.title;
        if (alias[title]) {
            nav.alias = alias[title];
        }
    });

    // meta
    // keywords
    const keywords = $('meta[name=keywords]').attr('content').split(',');
    const indexMeta = [id, 0]; // id, subId
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
