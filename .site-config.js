const semver = require('semver');
const pkg = require('./package.json');

const major = semver.major(pkg.version);

module.exports = {
    base: `/${major}.x/`,
    dest: '_site',
    pkg,
    port: 2047,
    src: 'site',
    theme: 'default',
    assets: '/static',
};