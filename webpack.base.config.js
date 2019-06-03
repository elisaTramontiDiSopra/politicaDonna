const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const { ProvidePlugin, ProgressPlugin, DefinePlugin, ContextReplacementPlugin } = require('webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ['inline', 'polyfills', 'sw-register', 'vendor', 'main'];


function buildConfig(env) {
  let endpoint = "'/api'";
  switch (env.ENDPOINT) {
    case 'local':
      endpoint = "'http://localhost:4000/api'";
      break;
    case 'prod':
      endpoint = "'https://someendpoint/api'";
    default:
      break;
  }
  const config = {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.join(process.cwd(), 'src'), './node_modules']
    },
    resolveLoader: {
      modules: ['./node_modules']
    },
    entry: {
      main: [
        './src/main.ts'
      ],
      polyfills: [
        './src/polyfills.ts'
      ],
      vendor: [
        './src/vendor.ts'
      ]
    },
    output: {
      path: path.join(process.cwd(), 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              attrs: ['video:src', 'img:src', 'source:src'],
              root: path.resolve(__dirname, 'src/public')
            }
          }],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              outputPath: 'assets/fonts/'
            }
          }]
        },
        {
          test: /\.(jpg|gif|png|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              outputPath: 'assets/images/'
            }
          }]
        },
        {
          test: /\.(mp4|webm)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              outputPath: 'assets/video/'
            }
          }]
        },
        {
          test: /\.(scss|sass)$/,
          include: [root('src', 'app'), root('node_modules/reboard-angular'), root('node_modules/tadaboard-widgets')],
          use: [
            { loader: 'to-string-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
          // Removing this will cause deprecation warnings to appear.
          test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
          parser: { system: true },  // enable SystemJS
        }
      ]
    },
    plugins: [
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Tether: 'tether',
        // Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        // Button: 'exports-loader?Button!bootstrap/js/dist/button',
        // Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        // Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        // Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        // Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        // Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        // Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        // Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
        Util: 'exports-loader?Util!bootstrap/js/dist/util'
      }),
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: './index.html',
        hash: false,
        inject: true,
        compile: true,
        favicon: false,
        minify: false,
        cache: true,
        showErrors: true,
        chunks: 'all',
        excludeChunks: [],
        xhtml: true,
        chunksSortMode: function sort(left, right) {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          }
          else if (leftIndex < rightindex) {
            return -1;
          }
          else {
            return 0;
          }
        }
      }),
      new DefinePlugin({
        // Environment helpers
        PRODUCTION: env.production,
        ENDPOINT: endpoint
      }),
      new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/,
        root('src')
      )
    ],
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  return config;
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = buildConfig
