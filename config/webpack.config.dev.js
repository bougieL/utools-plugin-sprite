const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./_paths')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { getHostIP } = require('./_utils')

const publicPath = '/'

module.exports = {
  entry: [paths.appIndexJs],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath
  },
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    modules: [paths.appNodeModules, 'node_modules'],
    alias: {
      '@': paths.appSrc
    },
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.scss',
      '.less'
    ]
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          },
          {
            loader: require.resolve('eslint-loader')
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: require.resolve('style-loader')
          }, {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true
            }
          }, {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        exclude: [/\.(js|jsx|mjs|ts|tsx|html|json|scss|css)$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${getHostIP()}:3001`],
        notes: ['Hot module replacement is enabled']
      },
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    disableHostCheck: false,
    hot: true,
    contentBase: paths.appPublic,
    hotOnly: false,
    overlay: true,
    quiet: true,
    inline: true,
    watchContentBase: true,
    publicPath: publicPath,
    open: true,
    stats: {
      colors: true
    },
    clientLogLevel: 'none'
  }
}