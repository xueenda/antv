const {
    lstatSync,
    readdirSync
} = require('fs');
const {
    basename,
    extname,
    join
} = require('path');
const {
    plotByName
} = require('../data');
const renderMd = require('../../../../../lib/render-md');

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);

const demosByCategory = {};
const demoDirs = getDirectories(__dirname);
demoDirs.forEach(dir => {
    const category = basename(dir);
    const files = getFiles(dir).filter(file => extname(file) === '.html');
    demosByCategory[category] = {
        title: plotByName[category] ? plotByName[category].name : category,
        category,
        plot: plotByName[category],
        demos: [],
    };
    files.forEach(file => {
        const {
            meta
        } = renderMd(file);
        const {
            title
        } = meta;
        demosByCategory[category].demos.push({
            name: basename(file, '.html'),
            title,
        });
    });
});

module.exports = {
    demosByCategory,
    footer: {
        isFixed: true
    }
};