const webpackConfig = require('./webpack.config');
const {
    merge
} = require('lodash');

module.exports = merge({
    devtool: 'cheap-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}, webpackConfig);
