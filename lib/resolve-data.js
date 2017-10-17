'use strict';
var debug = require('debug')('lib:resolve-data');

var _require = require('lodash'),
    eachRight = _require.eachRight;

var _require2 = require('path'),
    dirname = _require2.dirname,
    join = _require2.join;

var assignDeep = require('./assign-deep');
var requireNoCache = require('./require-no-cache');
var resolvePlaceholders = require('./resolve-placeholders');

module.exports = function (filename, root, config, meta, isDev) {
    var result = {};
    var dataList = [meta];
    var dir = dirname(filename);
    while (dir.length >= root.length) {
        var dataModule = join(dir, './data.js');
        debug('resolving ' + dataModule);
        try {
            var data = isDev ? requireNoCache(dataModule) : require(dataModule);
            dataList.push(data);
        } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }
        }
        dir = dirname(dir);
    }
    dataList.push(config);
    eachRight(dataList, function (data) {
        assignDeep(result, data);
    });
    debug('starting to resolve placeholders!');
    resolvePlaceholders(result, result);
    debug('placeholders are resolved!');
    return result;
};
