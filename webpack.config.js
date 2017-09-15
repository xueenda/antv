const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    resolve
} = require('path');
const pkg = require('./package.json');

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
});

module.exports = {
    entry: {
        common: resolve(__dirname, './theme/default/src/common.js'),
        demo: resolve(__dirname, './theme/default/src/demo.js'),
        'demo-detail': resolve(__dirname, './theme/default/src/demo-detail.js'),
        scroll2top: resolve(__dirname, './theme/default/src/scroll2top.js'),
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
        codemirror: 'CodeMirror',
        jquery: 'jQuery',
    },
    plugins: [
        extractLess,
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
