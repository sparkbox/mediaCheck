const path = require('path');

module.exports = {
  entry: './src/js/demo.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'demo.js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }]
  }
};
