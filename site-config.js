const {
    resolve
} = require('path');
const pkg = require('./package.json');

module.exports = {
    url: {
        dataSet: 'https://unpkg.alipay.com/@alipay/data-set@0.4.1/build/data-set.js',
        g2: 'https://gw.alipayobjects.com/os/rmsportal/cGsyueQNDXhNXPHALEjQ.js',
        jquery: '${assets}/lib/jquery-3.2.1.min.js',
    },
    assets: '/assets',
    base: '/',
    dest: resolve(process.cwd(), './_site'),
    dist: '${assets}/dist/${pkg.version}',
    home: 'zh-cn/index.html',
    pkg,
    port: 2047,
    src: resolve(process.cwd(), './site'),
    brand: {
        logo: 'http://via.placeholder.com/48x48',
        name: 'AntV',
    },
    screenshots: [
        {
            src: 'zh-cn/g2/3.x/demo',
            dest: '${assets}/dist/${pkg.version}/g2/3.x',
            template: 'g2-demo-standalone'
        },
    ],
    indices: [
        {
            src: 'zh-cn',
            meta: require('./site/zh-cn/data'),
            dest: '${assets}/data/_indexing.zh-cn.json',
        }
    ],
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates',
    },
};
