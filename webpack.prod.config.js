const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function (env) {
  return merge(baseConfig.call(this, env), {
    mode: 'production',
    devtool: env.sourcemap ? 'nosources-source-map' : false,
    output: {
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
      rules: [
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          include: root('src', 'style'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ]
        },
        // all css in src/style will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          include: root('src', 'style'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: ['@ngtools/webpack']
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'assets/css/[name].[hash].bundle.css',
        chunkFilename: "[id].css"
      }),
      new AngularCompilerPlugin({
        mainPath: './src/main.ts',
        tsConfigPath: 'tsconfig.json',
        sourceMap: env.sourcemap
      }),
      new CopyWebpackPlugin([
        { from: root('src/public/i18n'), to: 'i18n' }
      ])
    ]
  })
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
