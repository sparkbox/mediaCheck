const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'mediaCheck-demo': './src/js/mediaCheck-demo.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
};