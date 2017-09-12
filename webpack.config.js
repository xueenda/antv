const webpack = require('webpack');
const {
    resolve
} = require('path');
const pkg = require('./package.json');

module.exports = {
    entry: {
        'common': resolve(__dirname, './theme/default/src/common.js')
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, `./theme/default/assets/${pkg.version}/`)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        plugins: [
                            'transform-remove-strict-mode'
                        ],
                        presets: [
                            'es2015',
                            'stage-0'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
