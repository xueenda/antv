const debug = require('debug')('lib:resolve-data');
const {
    each,
    eachRight,
    forIn,
    isArray,
    isPlainObject,
    isString
} = require('lodash');
const {
    dirname,
    join
} = require('path');
const assignDeep = require('./assign-deep');
const requireNoCache = require('./require-no-cache');

// '${variable}/foo/bar' => 'hello/foo/bar' (data.variable = 'hello')
function resolvePlaceholder(str, data) { // eslint-disable-line no-unused-vars
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
    each(arr, (item, index) => {
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

module.exports = (filename, root, config, isDev) => {
    const result = {};
    const dataList = [ config ];
    let dir = dirname(filename);

    while (dir.length >= root.length) {
        const dataModule = join(dir, './data.js');
        try {
            const data = isDev ? requireNoCache(dataModule) : require(dataModule);
            dataList.push(data);
        } catch (e) {
            debug(e);
        }
        dir = dirname(dir);
    }
    eachRight(dataList, data => {
        assignDeep(result, data);
    });
    resolvePlaceholders(result, result);
    return result;
};
