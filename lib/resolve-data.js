var debug = require('debug')('lib:resolve-data');
var _ = require('lodash');
var eachRight = _.eachRight;
var path = require('path');
var dirname = path.dirname;
var join = path.join;
var assignDeep = require('./assign-deep');
var requireWithoutCache = require('./require-without-cache');
var resolvePlaceholders = require('./resolve-placeholders');

module.exports = function (filename, root, config, meta/*, isDev*/) {
    var result = {};
    var dataList = [meta];
    var dir = dirname(filename);
    while (dir.length >= root.length) {
        var dataModule = join(dir, './data.js');
        debug('resolving ' + dataModule);
        try {
            // var data = isDev ? requireWithoutCache(dataModule) : require(dataModule);
            var data = requireWithoutCache(dataModule);
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
    resolvePlaceholders(result, result);
    return result;
};
