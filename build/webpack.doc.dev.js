const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: {
    'vant-docs': './docs/src/index.js',
    'vant-preview': './docs/src/preview.js'
  },
  output: {
    path: path.join(__dirname, '../docs/dist'),
    publicPath: '/',
    chunkFilename: 'async_[name].js'
  },
  stats: {
    modules: false,
    children: false
  },
  serve: {
    open: true,
    devMiddleware: {
      logLevel: 'warn'
    },
    hotClient: {
      logLevel: 'warn'
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|postcss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          'vue-loader',
          'fast-vue-md-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vant-docs'],
      template: 'docs/src/index.tpl',
      filename: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      chunks: ['vant-preview'],
      template: 'docs/src/index.tpl',
      filename: 'preview.html',
      inject: true
    })
  ]
};
