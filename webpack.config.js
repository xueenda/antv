var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var resolve = path.resolve;
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
    palette: resolveTheme('palette.js'),
    demo: resolveTheme('demo.js'),
    demos: resolveTheme('demos.js'),
    doc: resolveTheme('doc.js'),
    // headroom: resolveTheme('headroom.js'),
    gallery: resolveTheme('gallery.js'),
    home: resolveTheme('home.js'),
    'home-index': resolveTheme('Home/index.jsx'),
    scroll2top: resolveTheme('scroll2top.js'),
    'mobile-demos': resolveTheme('mobile-demos.js'),
    'f2-naked-demo': resolveTheme('f2-naked-demo'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, './theme/default/assets/dist/' + pkg.version + '/'),
  },
  module: {
    rules: [{
      test: /\.js(?:x|$)$/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'transform-decorators-legacy',
            ['import', { libraryName: 'antd', style: true }]
          ]
        }
      }
    },
    {
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
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
  },
  externals: {
    'react-dom': 'ReactDOM',
    'wolfy87-eventemitter': 'EventEmitter',
    clipboard: 'Clipboard',
    codemirror: 'CodeMirror',
    jquery: 'jQuery',
    lodash: '_',
    meta: '__meta',
    react: 'React',
    routie: 'Routie',
    tocbot: 'tocbot',
  },
  plugins: [
    extractLess,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
