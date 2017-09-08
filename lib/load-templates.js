const {
    readdirSync,
    readFileSync
} = require('fs');
const {
    basename,
    extname,
    join,
} = require('path');
const {
    Environment,
    FileSystemLoader,
    compile
} = require('nunjucks');

const TEMPLATE_EXTS = [
    '.html',
    '.njk'
];

function loadTemplates(root) {
    const templateMap = {};
    const files = readdirSync(root);
    const env = new Environment(new FileSystemLoader(root));
    files.forEach(file => {
        const ext = extname(file);
        if (TEMPLATE_EXTS.indexOf(ext) > -1) {
            const key = basename(file, ext);
            templateMap[key] = compile(
                readFileSync(join(root, file), 'utf8'),
                env
            );
        }
    });
    return templateMap;
}

module.exports = loadTemplates;
