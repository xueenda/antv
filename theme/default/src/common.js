import meta from 'meta';
import $ from 'jquery';
import './common.less';

// search
function buildFlattenIndices(data) {
    const indices = [];
    const {
        docs,
        invertedList
    } = data;

    // docs
    const docById = {};
    docs.forEach(doc => {
        docById[doc.id] = doc;
    });

    // inverted list
    const indexKeys = [];
    $.each(invertedList, (value, key) => {
        indexKeys.push(key);
    });

    return indices;
}
$.getJSON(`${meta.dist}/_indexing.${meta.locale}.json`, data => {
    const flattenIndices = buildFlattenIndices(data);
    $.autocomplete({
        lookup: flattenIndices
    });
});
