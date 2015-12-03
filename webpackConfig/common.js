var path = require('path');
var webpack = require('webpack');

var PATH_ROOT = path.resolve(__dirname, '../');
var PATH_SRC = path.join(PATH_ROOT, '/src');
var PATH_DIST = path.join(PATH_ROOT, '/www');

module.exports = {
  context: PATH_SRC,

  entry: {
    client: './www/client'
  },

  output: {
    path: PATH_DIST,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: [PATH_SRC]
    }, {
      test: /\.less/,
      loader: 'style!css!less'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
    { test: /domInit\/js\//, loader: 'imports?jQuery=jquery' },
    // the url-loader uses DataUrls.
    // the file-loader emits files.
    { test: /\.(woff|woff2).*$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    { test: /\.ttf.*$/,    loader: "file-loader" },
    { test: /\.eot.*$/,    loader: "file-loader" },
    { test: /\.svg.*$/,    loader: "file-loader" },
    {
      test: /\.rt/,
      loader: 'react-templates-loader'
    },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + process.env.NODE_ENV + '"',
        'CLIENT': true
      }
    })
  ]
};
