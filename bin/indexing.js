#!/usr/bin/env node
const debug = require('debug')('app:indexing');
const program = require('commander');
const {
    forIn
} = require('lodash');
const {
    walk
} = require('walk');
const {
    mkdir
} = require('shelljs');
const {
    readFileSync,
    writeFile
} = require('fs');
const {
    extname,
    join,
    relative,
} = require('path');
const loadConfig = require('../lib/load-config');
const indexHtml = require('../lib/index-html');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-c, --config', 'configuration')
    .parse(process.argv);

const CONFIG = loadConfig(program.config);
const {
    assets,
    dest,
    indices
} = CONFIG;
const destData = join(dest, assets, './data');

// assets
mkdir('-p', destData);

indices.forEach(indexing => {
    const result = {
        docs: [],
        invertedList: {}
    };
    const indexingSrc = join(dest, indexing.src);
    const indexingDest = join(dest, indexing.dest);
    const indexingMeta = indexing.meta;
    // indexing
    const walker = walk(indexingSrc, { followLinks: false });
    walker.on('file', (root, stat, next) => {
        const filename = join(root, stat.name);
        const relativeName = relative(dest, filename);
        debug(`[file]: ${relativeName}`);
        const ext = extname(stat.name);
        const weight = relativeName.split('/').length + 1;
        if (ext === '.html') {
            const {
                doc,
                invertedList
            } = indexHtml(readFileSync(filename, 'utf8'), {
                weight,
            }, indexingMeta);
            doc.href = join('/', relativeName);
            result.docs.push(doc);
            forIn(invertedList, (item, key) => {
                if (result.invertedList[key]) {
                    result.invertedList[key] = result.invertedList[key].concat(item);
                } else {
                    result.invertedList[key] = item;
                }
            });
        }
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
        writeFile(indexingDest, JSON.stringify(result, null, 4), 'utf8', err => {
            if (err) {
                debug(err.message || `${err.code}: ${err.path}`);
            } else {
                debug(`${indexing.dest} written`);
            }
        });
        debug('all done');
    });
});

