const {
    resolve
} = require('path');
const pkg = require('./package.json');

module.exports = {
    assets: '/assets',
    base: '/',
    dest: resolve(process.cwd(), './dist'),
    home: 'zh-cn/index.html',
    pkg,
    port: 2047,
    src: resolve(process.cwd(), './site'),
    brand: {
        logo: '',
        name: 'AntV',
    },
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates',
    },
};