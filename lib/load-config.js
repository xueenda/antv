var debug = require('debug')('lib:load-config');
var path = require('path');
var resolve = path.resolve;
var assignDeep = require('./assign-deep');
var requireWithoutCache = require('./require-without-cache');
var resolvePlaceholders = require('./resolve-placeholders');

function loadConfig(pathname) {
    var config = {};
    try {
        config = requireWithoutCache(pathname);
    } catch (e) {
        debug(e);
    }
    return config;
}

module.exports = function (configPath) {
    var config = {};
    debug(configPath);
    assignDeep(
        config,
        loadConfig('../site-config'),
        loadConfig(resolve(process.cwd(), './site-config')),
        configPath ? loadConfig(resolve(process.cwd(), configPath)) : {}
    );
    resolvePlaceholders(config, config);
    return config;
};
