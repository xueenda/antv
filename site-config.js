const {
    resolve
} = require('path');
const pkg = require('./package.json');

module.exports = {
    dest: '_site',
    pkg,
    port: 2047,
    src: 'site',
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates',
    },
    path: {
        assets: '/assets',
        base: '/',
    },
};