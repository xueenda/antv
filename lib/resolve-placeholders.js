const debug = require('debug')('lib:resolve-placeholders');
const {
    forIn,
    isArray,
    isPlainObject,
    isString
} = require('lodash');
// '${variable}/foo/bar' => 'hello/foo/bar' (data.variable = 'hello')
// '${variable}' => 0 (data.variable = 0)
function resolvePlaceholder(str, data) { // eslint-disable-line no-unused-vars
    const matched = str.match(/^\${[^}]+}$/);
    if (matched) {
        const key = str
            .replace(/^\${/, '')
            .replace(/}$/, '');
        try {
            return eval(`data.${key}`);
        } catch (e) {
            debug(e);
        }
    }
    return str.replace(/(\${[^}]+})/g, (s, p) => {
        const key = p
            .replace(/^\${/, '')
            .replace(/}/, '');
        let value = p;
        try {
            value = eval(`data.${key}`);
        } catch (e) {
            debug(e);
        }
        return value;
    });
}
function resolveArrayPlaceholders(arr, data) {
    arr.forEach((item, index) => {
        if (isString(item)) {
            arr[index] = resolvePlaceholder(item, data);
        } else if (isPlainObject(item) || isArray(item)) {
            resolvePlaceholders(item, data);
        }
    });
}
function resolvePlaceholders(part, data) {
    if (isPlainObject(part)) {
        forIn(part, (value, key) => {
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

