#!/usr/bin/env node
const debug = require('debug')('app:build');
const program = require('commander');
const {
    walk
} = require('walk');
const {
    cp,
    mkdir
} = require('shelljs');
const {
    writeFile
} = require('fs');
const {
    extname,
    join,
    relative,
    resolve
} = require('path');
const loadConfig = require('../lib/load-config');
const loadTemplates = require('../lib/load-templates');
const md2html = require('../lib/md2html');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .parse(process.argv);

const CONFIG = loadConfig(program.config);
const {
    dest,
    src,
    assets,
    theme
} = CONFIG;
const TEMPLATE_MAP = loadTemplates(resolve(theme.root, theme.templates));

const themeAssets = join(theme.root, theme.assets);
const destAssets = join(dest, assets);

// assets
mkdir('-p', destAssets);
cp('-R', join(themeAssets, './*'), join(destAssets, '/'));

function renderFile(filename) {
    filename = resolve(src, filename);
    const templateMap = program.dev ? loadTemplates(resolve(theme.root, theme.templates)) : TEMPLATE_MAP;
    const config = program.dev ? loadConfig(program.config) : CONFIG;
    return md2html(filename, src, config, templateMap, program.dev);
}

const walker = walk(src, { followLinks: false });
walker.on('file', (root, stat, next) => {
    const relativeName = relative(src, join(root, stat.name));
    debug(`[file]: ${relativeName}`);
    const ext = extname(stat.name);
    if (ext === '.html' || ext === '.md') {
        const htmlContent = renderFile(resolve(root, stat.name));
        writeFile(join(dest, relativeName), htmlContent, 'utf8', err => {
            if (err) {
                debug(err.message || `${err.code}: ${err.path}`);
            } else {
                debug(`${relativeName} written`);
            }
        });
    }
    next();
});
walker.on('directory', (root, stat, next) => {
    const relativeName = relative(src, join(root, stat.name));
    debug(`[directory]: ${relativeName}`);
    mkdir(resolve(dest, relativeName));
    next();
});
walker.on('errors', (root, nodeStatsArray, next) => { // plural
    nodeStatsArray.forEach(function (n) {
        debug(`[ERROR] ${n.name}`);
        debug(n.error.message || `${n.error.code}: ${n.error.path}`);
    });
    next();
});
walker.on('end', () => {
    debug('all done');
});
