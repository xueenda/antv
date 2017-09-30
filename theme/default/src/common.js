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

    const flattenIndices = buildFlattenIndices(docs, invertedList);
    $('#query').autocomplete({
        lookup: flattenIndices,
        triggerSelectOnValidInput: false,
        onSelect(suggestion) {
            const doc = docById[suggestion.id];
            window.location = `${doc.href}${doc.anchorById[suggestion.anchorId].href}`;
        }
    });
});
