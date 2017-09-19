const {
    resolve
} = require('path');
const pkg = require('./package.json');

module.exports = {
    screenshotRoot: '${assets}/dist/${pkg.version}/screenshots',
    screenshots: [
        {
            src: 'zh-cn/g2/3.x/demo',
            dest: '${assets}/dist/${pkg.version}/g2/3.x',
            template: 'g2-demo-standalone'
        },
    ],
    assets: '/assets',
    dist: '${assets}/dist/${pkg.version}',
    base: '/',
    dest: resolve(process.cwd(), './_site'),
    home: 'zh-cn/index.html',
    pkg,
    port: 2047,
    src: resolve(process.cwd(), './site'),
    brand: {
        logo: 'http://via.placeholder.com/48x48',
        name: 'AntV',
    },
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates',
    },
};