const path = require('path');
const SRC_PATH = path.resolve(__dirname, './src');
module.exports = {
  webpack: {
    devServer: {
      port: 3001
    },
    htmlPlugin: {
      filename: 'index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    },
    babel: {
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ],
    },
    libs:{
      vender1: ['react'],
      vernder2: ['react-dom'],

    },
    // analyzePlugin: true
  },
};