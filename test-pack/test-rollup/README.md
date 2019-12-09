# rollup

## 简介

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。它最大的亮点是利用 ES6 模块设计，生成更简洁、更简单的代码。尽可能高效地构建出能够直接被其它 JavaScript 库引用的模块

## 优点

Tree Shaking: 自动移除未使用的代码, 输出更小的文件

Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高

ES2015模块打包支持: 不需要通过babel将import转化成Commonjs的require方式

可以一次输出多种格式: IIFE, AMD, CJS, UMD, ESM

## 缺点

Rollup 目前还不支持代码拆分（Code Splitting）和模块的热更新（HMR）

## 使用场景

一般而言，对于应用使用 Webpack，对于类库使用 Rollup；需要代码拆分(Code Splitting)，或者很多静态资源需要处理，再或者构建的项目需要引入很多 CommonJS 模块的依赖时，使用 webpack。代码库是基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 Rollup

## 配置

```
  export default {
    input: "src/index.tsx",
    output: [
      {
        file: "build/bundle.js",
        format: "umd",
        name: "app",
        sourcemap: true
      }
    ],
    plugins: [
      resolve({ // 解析node-module中的模块
        jsnext: true,
        main: true // 使用main.js/index.js, 需要转换cjs->es6
      }),
      commonjs({ // 转换cjs -> esm
        include: "node_modules/**",
        namedExports: { // 显式指定无法解析的命名导出
          'react': ['createElement', 'Component' ],
          'react-dom': ['render']
        }
      }),
      postcss({
        minimize: true, // uses cssnano behind scene
        modules: false, // enable css modules
        extensions: ['.css', '.scss', '.sass'], // uses node-sass
      }),
      image(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      typescript(),
      // babel({
        // runtimeHelpers: true,
        // exclude: 'node_modules/**' // only transpile our source code
      // }),
      terser(),
      filesize(),

      progress({ clearLine: false }),
      serve({
        port: 8080,
        contentBase: ['']
      })
    ],
  }
```

## 跟webpack的对比

https://www.webpackjs.com/comparison/#%E6%89%93%E5%8C%85-vs-%E5%8A%A0%E8%BD%BD



