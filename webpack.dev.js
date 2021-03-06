const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env.development' });
process.env = dotenv.parsed;

const VENDOR_LIBS = [
  'axios',
  'prop-types',
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'react-select',
  'react-toastify',
  'redux',
  'redux-saga',
  '@reduxjs/toolkit',
  'react-bootstrap'
]

module.exports = {

  // the output bundle won't be optimized for production but suitable for development
  mode: process.env.NODE_ENV,
  // Enable beautify source
  devtool: 'source-map',
  // the app entry point is /src/index.js
  entry: {
    bundle: path.resolve(__dirname, 'src', 'index.tsx'),
    vendor: VENDOR_LIBS
  },
  output: {
    publicPath: '/demo/',
    // the output of the webpack build will be in /build directory
    path: path.resolve(__dirname, 'build'),
    // the filename of the JS bundle will be bundle.js
    filename: 'bundle.js',
    chunkFilename: `[id].chunk.js`
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-warnings',
    port: 4400,
    writeToDisk: true,
    disableHostCheck: true,
    lazy: false,
    https: false,
    open: 'chrome'
  },
  module: {
    rules: [
      {
        // for any file with a suffix of js or jsx
        test: /\.tsx?$/,
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        // for any file with a suffix of js or jsx
        test: /\.jsx?$/,
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'babel-loader',
        options: {
          // attach the presets to the loader (most projects use .babelrc file instead)
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ]
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  // optimization: {
  //   splitChunks: {
  //     minSize: 10000,
  //     maxSize: 250000,
  //   }
  // },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' }
      ]
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
  ]
};
