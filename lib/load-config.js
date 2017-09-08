const debug = require('debug')('lib:load-config');
const {
    resolve
} = require('path');
const assignDeep = require('./assign-deep');

function loadConfig(pathname) {
    let config = {};
    try {
        config = require(pathname);
    } catch (e) {
        debug(e);
    }
    return config;
}

module.exports = configPath => {
    const config = {};
    debug(configPath);
    assignDeep(
        config,
        loadConfig('../site-config'),
        loadConfig(resolve(process.cwd(), './site-config')),
        configPath ? loadConfig(resolve(process.cwd(), configPath)) : {}
    );
    return config;
};
