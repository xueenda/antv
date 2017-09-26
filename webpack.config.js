const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const {
    resolve
} = require('path');
const pkg = require('./package.json');

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
});
function resolveTheme(src) {
    return resolve(__dirname, './theme/default/src/', src);
}

module.exports = {
    entry: {
        'demo-detail': resolveTheme('demo-detail.js'),
        common: resolveTheme('common.js'),
        demo: resolveTheme('demo.js'),
        doc: resolveTheme('doc.js'),
        home: resolveTheme('home.js'),
        scroll2top: resolveTheme('scroll2top.js'),
        toc: resolveTheme('toc.js'),
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, `./theme/default/assets/dist/${pkg.version}/`)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            'es2015',
                            'stage-0'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "less-loader" // compiles Less to CSS
                        }
                    ]
                })
            }
        ]
    },
    externals: {
        'wolfy87-eventemitter': 'EventEmitter',
        codemirror: 'CodeMirror',
        jquery: 'jQuery',
        routie: 'Routie',
    },
    plugins: [
        extractLess,
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
