const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const exec = require('child_process').exec;
const buildHTMLFileName = "build/html/index.html";
const jsPath = "js/bundles/[name].js";
const jsChunkPath = "js/bundles/[id].[chunkhash:8].js";
const shouldUseSourceMap = false;
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  // Disable generate source map
  devtool: shouldUseSourceMap ? 'source-map': false,
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
    filename: jsPath,
    chunkFilename: jsChunkPath,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
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
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
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
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      name: jsChunkPath,
      chunks: 'all',
      cacheGroups: {
        default: {
          name: 'common',
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          priority: -20
        }
      }
    }
  },
  // add a custom index.html as the template
  plugins: 
  [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html'),
      inject: false,
      filename: path.resolve(__dirname, buildHTMLFileName),
      minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }, }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' }
      ]
    }),
   // new BundleAnalyzerPlugin
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec('node copy-file.js', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ]
};
