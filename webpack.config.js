const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack');

new webpack.DefinePlugin({
  "process.env": JSON.stringify(process.env),
}),

module.exports = {
  entry: './server.js', // your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
