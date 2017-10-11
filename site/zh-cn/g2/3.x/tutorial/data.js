const {
    lstatSync,
    readdirSync
} = require('fs');
const {
    basename,
    extname,
    join
} = require('path');
const renderMd = require('../../../../../lib/render-md');
const {
    base,
} = require('../../../../../site-config');

const isFile = source => lstatSync(source).isFile();
const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);

const docList = [];
const docFiles = getFiles(__dirname).filter(file => extname(file) === '.md');
docFiles.forEach(file => {
    const {
        meta
    } = renderMd(file);
    const {
        index,
        title
    } = meta;
    const name = basename(file, '.md');
    docList.push({
        href: `${base}zh-cn/g2/3.x/tutorial/${name}.html`,
        index,
        name,
        title,
    });
});
docList.sort((a, b) => a.index - b.index);
const indexByHref = {};
docList.forEach((doc, index) => {
    indexByHref[doc.href] = index;
});

module.exports = {
    docList,
    docIndexByHref: indexByHref,
    docsCount: docList.length,
    template: 'doc',
    docMenuHeader: '${resource.translate.tutorial}',
    docFilteringSupport: true
};
