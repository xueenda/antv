var webpackConfig = require('./webpack.config');
var merge = require('lodash').merge;

module.exports = merge({
    devtool: 'cheap-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}, webpackConfig);
