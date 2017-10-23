import meta from 'meta';
import $ from 'jquery';
import _ from 'lodash';
import './common.less';

// search
function buildFlattenIndices(docs, invertedList) {
    const indices = [];
    const uniqueIndices = [];

    // docs
    docs.forEach(doc => {
        doc.anchors.forEach(anchor => {
            indices.push({
                value: anchor.title,
                // level: anchor.level,
                id: doc.id,
                anchorId: anchor.id,
            });
        });
    });

    // inverted list
    _.forIn(invertedList, (referenceIds, word) => {
        referenceIds.forEach(ids => {
            const [ id, anchorId ] = ids;
            indices.push({
                value: word,
                id,
                anchorId,
            });
        });
    });

    // filter duplicated indices
    const groups = _.groupBy(indices, row => `${row.id}-${row.anchorId}`);
    _.forIn(groups, rows => {
        const valuesToken = {};
        rows.forEach(row => {
            if (!valuesToken[row.value]) {
                uniqueIndices.push(row);
                valuesToken[row.value] = true;
            }
        });
    });
    return uniqueIndices;
}

// search
$.getJSON(`${meta.dist}/_indexing.${meta.locale}.json`, data => {
    const {
        docs,
        invertedList
    } = data;

    const docById = {};
    docs.forEach(doc => {
        docById[doc.id] = doc;
        doc.anchorById = {};
        doc.anchors.forEach(anchor => {
            doc.anchorById[anchor.id] = anchor;
        });
    });

    function onSelect(suggestion) {
        const doc = docById[suggestion.id];
        window.location = `${doc.href}${doc.anchorById[suggestion.anchorId].href}`;
    }

    const flattenIndices = buildFlattenIndices(docs, invertedList);
    $('#query').autocomplete({
        lookup: flattenIndices,
        triggerSelectOnValidInput: false,
        onSelect,
    });

    // for doc filtering
    const $docFilteringQuery = $('#doc-filtering-query');
    const filteringCategories = [
        'api',
        'demo',
        'doc',
        'tutorial',
    ];
    if ($docFilteringQuery.length) { // filtering feature enabled
        const pathParts = meta.href.split('/');
        while (pathParts.length && filteringCategories.indexOf(pathParts[pathParts.length - 1]) === -1) {
            pathParts.pop();
        }
        const matchedPath = pathParts.join('/');
        const matchedIds = [];
        _.forIn(docById, doc => {
            if (doc.href.indexOf(matchedPath) > -1) {
                matchedIds.push(doc.id);
            }
        });
        const docIndices = flattenIndices.filter(index => matchedIds.indexOf(index.id) > -1);
        $docFilteringQuery.autocomplete({
            lookup: docIndices,
            triggerSelectOnValidInput: false,
            onSelect,
        });
    }
});

// smooth and accurate scrolling
// $('a[href*="#"]')
// // Remove links that don't actually link to anything
//     .not('[href="#"]')
//     .not('[href="#0"]')
//     .click(function(event) {
//         // On-page links
//         if (
//             location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
//             &&
//             location.hostname == this.hostname
//         ) {
//             // Figure out element to scroll to
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//             // Does a scroll target exist?
//             if (target.length) {
//                 // Only prevent default if animation is actually gonna happen
//                 event.preventDefault();
//                 $('html, body').animate({
//                     scrollTop: target.offset().top + 64
//                 }, 1000, function() {
//                     // Callback after animation
//                     // Must change focus!
//                     var $target = $(target);
//                     $target.focus();
//                     if ($target.is(":focus")) { // Checking if the target was focused
//                         return false;
//                     } else {
//                         $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
//                         $target.focus(); // Set focus again
//                     };
//                 });
//             }
//         }
//     });

// FIXME doc filtering is in ./common.js
