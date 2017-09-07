const {
    assign,
    eachRight
} = require('lodash');
const fs = require('fs');
const {
    dirname,
    join
} = require('path');
const assignDeep = require('./assign-deep');
const requireNoCache = require('./require-no-cache');

module.exports = (filename, root, isDev) => {
    const result = {};
    const dataList = [];
    let dir = dirname(filename);

    while (dir.length >= root.length) {
        const dataModule = join(dir, './data.js');
        try {
            const data = isDev ? requireNoCache(dataModule) : require(dataModule);
            dataList.push(data);
        } catch (e) {
        }
        dir = dirname(dir);
    }
    eachRight(dataList, data => {
        assignDeep(result, data);
    });
    return result;
};
