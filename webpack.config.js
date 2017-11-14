'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var _require = require('path'),
    resolve = _require.resolve;

var pkg = require('./package.json');

var extractLess = new ExtractTextPlugin({
    filename: "[name].css"
});
function resolveTheme(src) {
    return resolve(__dirname, './theme/default/src/', src);
}

module.exports = {
    entry: {
        // 'demo-detail': resolveTheme('demo-detail.js'),
        blog: resolveTheme('blog.js'),
        common: resolveTheme('common.js'),
        demo: resolveTheme('demo.js'),
        demos: resolveTheme('demos.js'),
        doc: resolveTheme('doc.js'),
        // headroom: resolveTheme('headroom.js'),
        home: resolveTheme('home.js'),
        scroll2top: resolveTheme('scroll2top.js')
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, './theme/default/assets/dist/' + pkg.version + '/')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['es2015', 'stage-0']
                }
            }
        }, {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            })
        }]
    },
    externals: {
        'wolfy87-eventemitter': 'EventEmitter',
        codemirror: 'CodeMirror',
        jquery: 'jQuery',
        routie: 'Routie',
        lodash: '_',
        tocbot: 'tocbot',
        clipboard: 'Clipboard',
        meta: '__meta'
    },
    plugins: [extractLess, new webpack.NoEmitOnErrorsPlugin(), new webpack.optimize.AggressiveMergingPlugin()]
};
