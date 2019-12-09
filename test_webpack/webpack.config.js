const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
exports.default = {
  mode: 'production',
  entry: {
    index: './index.js',
    _lodash: './lodash.js',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyLibrary'
  },
  devtool: 'cheap-module',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: { // 一般不会变的依赖，配置好的
          test: vendors_reg,
          name: 'vendors_lib',
          chunks: 'all',
          priority: 12,
        },
        commons: { // 第三方依赖
          test: /[\\/]node_modules[\\/]/,
          name: 'vender',
          chunks: 'all',
          priority: 11,
        },
      },
    },
  }
}


// 打包成模块
// exports.default = {
//   entry: './const.js',
//   mode: 'development',
//   devtool: 'cheap-module', // 为了让打包后的模块更好阅读
//   output: {
//     filename: 'index.dist.js',
//     path: path.resolve(__dirname, './dist/'),
//     library: 'MyLibrary',
//     libraryTarget: 'umd' // 依次使用 'var', 'commonjs', 'commonjs2', 'amd', 'umd'
//   },
// }