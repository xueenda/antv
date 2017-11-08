import meta from 'meta';
import $ from 'jquery';
import _ from 'lodash';
import './common.less';

const $query = $('#query');

// search
function buildFlattenIndices(docs, invertedList) {
    const indices = [];
    const uniqueIndices = [];
    const docById = {};

    // docs
    docs.forEach(doc => {
        docById[doc.id] = doc;
        doc.anchors.forEach(anchor => {
            indices.push({
                data: {
                    title: doc.anchors[0].title,
                },
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
                data: {
                    title: docById[id].anchors[0].title,
                },
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

    function escapeRegExChars(value) {
        return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
    }

    function wrapResult(suggestion, formattedValue) {
        return `<div class="keyword">${formattedValue}</div><div class="doc-title">${suggestion.data.title}</div>`;
    }

    function formatResult(suggestion, currentValue) {
        // Do not replace anything if the current value is empty
        if (!currentValue) {
            return suggestion.value;
        }
        const pattern = '(' + escapeRegExChars(currentValue) + ')';
        const value = suggestion.value
            .replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/&lt;(\/?strong)&gt;/g, '<$1>');
        return wrapResult(suggestion, value);
    }

    const flattenIndices = buildFlattenIndices(docs, invertedList);
    $query.autocomplete({
        lookupLimit: 20,
        // groupBy: 'title',
        width: 278,
        lookup: flattenIndices,
        triggerSelectOnValidInput: false,
        onSelect,
        formatResult,
    });

    // for doc filtering
    const $docFilteringQuery = $('#doc-filtering-query');
    const filteringCategories = [
        'api',
        'blog',
        'chart',
        'demo',
        'design',
        'resource',
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
            lookupLimit: 20,
            // groupBy: 'title',
            width: 278,
            lookup: docIndices,
            triggerSelectOnValidInput: false,
            onSelect,
            formatResult,
        });
    }
});

// FIXME doc filtering is in ./common.js
