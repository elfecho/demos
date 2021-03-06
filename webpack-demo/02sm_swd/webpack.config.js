const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    port: 8888,
    compress: true,
    disableHostCheck: true,
    before: function(app, server) {
      app.get('/list', function(req, res) {
        const fileName = `./mock/list_${req.query.tab}.json`;
        const backupFileName = `./mock/list.json`;
        fs.exists(fileName, function (exists) {
          fs.readFile(exists ? fileName : backupFileName, function(err, content) {
            res.send(content)
          })
        })
      })
    }
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          // placeholder 占位符
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240
        }
      }]
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader'
      }
    }, {
      test: /\.scss$/,
      // css编译执行顺序，从下到上，从右到左
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2 // 无论js引入scss文件还是scss引入scss文件都会调用这些loader
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), new CleanWebpackPlugin(['dist'])],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}