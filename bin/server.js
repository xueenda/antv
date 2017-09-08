#!/usr/bin/env node
const debug = require('debug')('app:server');
const program = require('commander');
const connect = require('connect');
const http = require('http');
const getPort = require('get-port');
const {
    resolve
} = require('path');
const pkg = require('../package.json');
const loadConfig = require('../lib/load-config');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .parse(process.argv);

const config = loadConfig(program.config);

const app = connect();
app.use(
    config.path.assets,
    serveStatic(resolve(config.theme.root, config.theme.assets))
);

app.use(config.path.base, serveIndex(process.cwd()));

if (config.port) {
    http.createServer(app).listen(config.port);
    debug(config.port);
} else {
    getPort().then(port => {
        http.createServer(app).listen(port);
        debug(port);
    });
}
