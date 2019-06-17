const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/server/dev.tpl.html',
    }),
    new ManifestPlugin({ publicPath: '/assets/' }),
    new EnvironmentPlugin(['NODE_ENV']),
  ].filter(Boolean),
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: !devMode,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: devMode,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 2000000,
      maxSize: 2000000,
      minChunks: 3,
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  },
  performance: false,
}
