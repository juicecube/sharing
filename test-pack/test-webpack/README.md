# webpack 打包优化

## css,js,img

使用optimize-css-assets-webpack-plugin 来压缩css。在webpack4的配置项中，需在optimization下的minimizer对象中去使用

```
  minimizer: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
      canPrint: true,
    }),
  ]
```

使用mini-css-extract-plugin来抽离内联css到外联文件

```
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),

  test: /\.s?css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
  ]
```

使用terser-webpack-plugin压缩js,parallel属性可以提高打包速度

```
  new TerserPlugin({
    sourceMap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false
      }
    },
  }),
```

图片压缩

```
  new ImageminPlugin({
    bail: false, // Ignore errors on corrupted images
    name: '[name]__[hash:5].[ext]',
    imageminOptions: {
      plugins: [
        ['@mlz/imagemin-mozjpeg', { quality: 50 }],
        ['@mlz/imagemin-optipng', { optimizationLevel: 5 }],
      ],
    },
  }),
```

## 代码分割

webpack4.x中使用splitChunks来进行拆包,抽离第三方依赖库。默认情况下，webpack将会基于以下条件自动分割代码块:

新的代码块被共享或者来自node_modules文件夹

新的代码块大于30kb(在min+giz之前)

按需加载代码块的请求数量应该<=5

页面初始化时加载代码块的请求数量应该<=3

```
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    cacheGroups: {
      vendors: {
        test: /node_modules/,
        chunks: 'all',
        name(module) {
          let name = 'venderLibs';
          if (libraries) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            const names = Object.keys(libraries);
            names.map((val) => {
              if (libraries[val].indexOf(packageName) >= 0) {
                name = val;
              }
            });
          }
          return name;
        },
      },
    },
```

一般还需配合runtimeChunk使用。

## 缓存与增量构建

webpack构建中,一般需要使用许多loader来预处理文件,以babel-loader为例。可以通过设置cacheDirectory或cacheDirectory=true来达到缓存的目的

```
  {
    test: /\.(ts|tsx)?$/,
    use: [
      'cache-loader',
      {
        loader: 'babel-loader',
        options: getBabelConfig(),
      },
    ],
    exclude: /(node_modules)/,
  },
```

增量构建对于未修改的部分不会再重新编译,对于rebuild能够大大提高编译速度。对于开发阶段,可以使用webpack-dev-server来达到增量编译的目的,对于生产阶段,可以通过给生成的文件添加hash(或chunkhash 或contenthash )来实现增量构建

```
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
```

## 优化模块查找路径

通过配置resolve.modules来告诉webpack解析模块时应该搜索的目录。默认配置采用向上递归搜索的方式去寻找，设置特定搜索目录有助于webpack更快搜索到目标。

```
  resolve: {
    modules: [
      config.rootPath,
      'node_modules',
    ],
    alias: {
      'root': config.rootPath,
      raf: path.resolve(config.rootPath, 'node_modules/raf/'),
      ...config.alias,
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [new TsconfigPathsPlugin(tsconfig)],
  },
```


