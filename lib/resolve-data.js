const debug = require('debug')('lib:resolve-data');
const {
    eachRight,
} = require('lodash');
const {
    dirname,
    join
} = require('path');
const assignDeep = require('./assign-deep');
const requireNoCache = require('./require-no-cache');
const resolvePlaceholders = require('./resolve-placeholders');


module.exports = (filename, root, config, meta, isDev) => {
    const result = {};
    const dataList = [ meta ];
    let dir = dirname(filename);
    while (dir.length >= root.length) {
        const dataModule = join(dir, './data.js');
        debug(`resolving ${dataModule}`);
        try {
            const data = isDev ? requireNoCache(dataModule) : require(dataModule);
            dataList.push(data);
        } catch (e) {
            debug(e);
        }
        dir = dirname(dir);
    }
    dataList.push(config);
    eachRight(dataList, data => {
        assignDeep(result, data);
    });
    resolvePlaceholders(result, result);
    return result;
};
