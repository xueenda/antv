'use strict';

var debug = require('debug')('lib:load-config');

var _require = require('path'),
    resolve = _require.resolve;

var assignDeep = require('./assign-deep');
var resolvePlaceholders = require('./resolve-placeholders');

function loadConfig(pathname) {
    var config = {};
    try {
        config = require(pathname);
    } catch (e) {
        debug(e);
    }
    return config;
}

module.exports = function (configPath) {
    var config = {};
    debug(configPath);
    assignDeep(config, loadConfig('../site-config'), loadConfig(resolve(process.cwd(), './site-config')), configPath ? loadConfig(resolve(process.cwd(), configPath)) : {});
    resolvePlaceholders(config, config);
    return config;
};
