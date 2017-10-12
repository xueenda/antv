'use strict';

/*
 * @reference: https://github.com/CaliStyle/markdown-it-meta
 * why? to protect meta statements (which is in YML format) from html/markdown code formatting in editors and IDEs.
 */
var _require = require('js-yaml'),
    safeLoad = _require.safeLoad;

function get(state, line) {
    var pos = state.bMarks[line];
    var max = state.eMarks[line];
    return state.src.substr(pos, max - pos);
}

function betterMeta(md, state, start, end /* , silent */) {
    if (start !== 0 || state.blkIndent !== 0) {
        return false;
    }
    if (state.tShift[start] < 0) {
        return false;
    }
    if (!get(state, start).match(/^<!--$/)) {
        return false;
    }
    var data = [];
    var line = start;
    while (line < end) {
        line++;
        var str = get(state, line);
        if (str.match(/^-->$/)) {
            break;
        }
        if (state.tShift[line] < 0) {
            break;
        }
        data.push(str);
    }
    // if (line >= end) {
    //   return false
    // }

    md.meta = safeLoad(data.join('\n'), { json: true }) || {};
    state.line = line + 1;
    return true;
}

var meta = function meta(md) {
    return betterMeta.bind(null, md);
};

function BetterMetaPlugin(md) {
    md.meta = md.meta || {};
    md.block.ruler.before('code', 'meta', meta(md), { alt: [] });
}

module.exports = BetterMetaPlugin;
