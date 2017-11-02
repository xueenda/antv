'use strict';
// var debug = require('debug')('lib:resolve-placeholders');
var _require = require('lodash'),
    forIn = _require.forIn,
    isArray = _require.isArray,
    isPlainObject = _require.isPlainObject,
    isString = _require.isString;

// '${variable}/foo/bar' => 'hello/foo/bar' (data.variable = 'hello')
// '${variable}' => 0 (data.variable = 0)
function resolvePlaceholder(str, data) { // eslint-disable-line no-unused-vars
    var matched = str.match(/^\${[^}]+}$/);
    if (matched) {
        var key = str.replace(/^\${/, '').replace(/}$/, '');
        try {
            return eval('data.' + key);
        } catch (e) {
            // debug(e);
        }
    }
    return str.replace(/(\${[^}]+})/g, function (s, p) {
        var key = p.replace(/^\${/, '').replace(/}/, '');
        var value = p;
        try {
            value = eval('data.' + key);
        } catch (e) {
            // debug(e);
        }
        return value;
    });
}
function resolveArrayPlaceholders(arr, data) {
    arr.forEach(function (item, index) {
        if (isString(item)) {
            arr[index] = resolvePlaceholder(item, data);
        } else if (isPlainObject(item) || isArray(item)) {
            resolvePlaceholders(item, data);
        }
    });
}
function resolvePlaceholders(part, data) {
    if (isPlainObject(part)) {
        forIn(part, function (value, key) {
            if (isString(value)) {
                part[key] = resolvePlaceholder(value, data);
            } else if (isArray(value)) {
                resolveArrayPlaceholders(value, data);
            } else if (isPlainObject(value)) {
                resolvePlaceholders(value, data);
            }
        });
    } else if (isArray(part)) {
        resolveArrayPlaceholders(part, data);
    }
}

module.exports = resolvePlaceholders;
