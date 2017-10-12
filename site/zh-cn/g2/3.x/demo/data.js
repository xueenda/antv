const {
    forIn
} = require('lodash');
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
const {
    base,
    assets,
    pkg
} = require('../../../../../site-config');

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);

const demosByCategory = {};
const demoDirs = getDirectories(__dirname);
const categoryByHref = {};
demoDirs.forEach(dir => {
    const category = basename(dir);
    const files = getFiles(dir).filter(file => extname(file) === '.html');
    const plotInfo = plotByName[category] || {
        index: 0,
        title: category,
    };
    demosByCategory[category] = {
        index: plotInfo.index,
        title: plotInfo.name || plotInfo.title,
        category,
        plot: plotInfo,
        demos: [],
    };
    files.forEach(file => {
        const {
            meta
        } = renderMd(file);
        const {
            index,
            title
        } = meta;
        const name = basename(file, '.html');
        const href = `${base}zh-cn/g2/3.x/demo/${category}/${name}.html`;
        demosByCategory[category].demos.push({
            screenshot: join(`${assets}/dist/${pkg.version}/g2/3.x/`, `${category}/${name}.png`),
            href,
            index,
            name,
            title,
        });
        categoryByHref[href] = category;
    });
});
const demos = [];
forIn(demosByCategory, item => {
    demos.push(item);
    item.demos.sort((a, b) => a.index - b.index);
});
demos.sort((a, b) => a.index - b.index);

module.exports = {
    demos,
    template: 'g2-demo',
    demosByCategory,
    categoryByHref,
    showFooter: false,
};