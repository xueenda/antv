'use strict';

var _require = require('path'),
    resolve = _require.resolve;

var pkg = require('./package.json');

module.exports = {
    url: {
        // TODO FIXME: use global CDN urls instead
        dataSet: 'https://unpkg.alipay.com/@alipay/data-set@0.5.0/build/data-set.js',
        g2: 'https://unpkg.alipay.com/@alipay/g2@3.0.0-rc4.2/build/g2.js',
        g6: 'http://unpkg.alipay.com/@ali/g6@1.2.0-beta.29/dist/g6-all.js',
        jquery: 'https://gw.alipayobjects.com/as/g/datavis/assets/1.0.1/jquery-3.2.1.min.js'
    },
    assets: '/assets',
    base: '/',
    dest: resolve(process.cwd(), './_site'),
    dist: '${assets}/dist/${pkg.version}',
    home: 'zh-cn/index.html',
    pkg: pkg,
    port: 2047,
    src: resolve(process.cwd(), './site'),
    brand: {
        logo: '${assets}/image/logo.svg',
        name: 'AntV'
    },
    screenshots: [
        {
            src: 'zh-cn/g2/3.x/demo',
            dest: '${assets}/dist/${pkg.version}/g2/3.x',
            template: 'g2-demo-standalone'
        },
        {
            src: 'zh-cn/g6/1.x/demo',
            dest: '${assets}/dist/${pkg.version}/g6/1.x',
            template: 'g6-demo-standalone'
        },
    ],
    indices: [{
        src: 'zh-cn',
        meta: require('./site/zh-cn/data'),
        dest: '${assets}/dist/${pkg.version}/_indexing.zh-cn.json'
    }],
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates'
    }
};
