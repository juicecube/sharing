# IIFE

IIFE 标准简单说就是执行一个匿名函数, 模块代码放入匿名函数中, 隔离变量作用域,内存释放等问题;

```
  (function(global){
    // code
  })(this)
```

## AMD 和 CMD

介绍 AMD 不得不说 RequireJS, 它的出现解决了模块依赖的问题, 使得前端模块化进程加速发展, AMD规范其实是RequireJS出来之后再提出来的.

```
  define('module1','module2'],function(m1,m2){    
    require(['module3'],function(m3){
      // code
    })
  });

  // commonjs 风格:
  define(function(require, exports, module){
      var m1 = require('module1');
      var m2 = require('module2');
  })
```

SeaJS最初以 就近加载 以及支持 加载 CSS 等特点吸引了很多用户, 并提出了 CMD规范. 但在 RequireJS 也支持这些特性之后, 渐渐淡出

## CJS

ComminJS 是服务器端广泛使用的模块化机制。该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

CommonJS 中的模块加载是同步的, 不适合在浏览器中使用

```
  var m1 = require('module1');
  //code
  module.exports = {}
```

## UMD

UMD 其实不是什么标准, 可以看成是 IIFE amd + cjs 的兼容版

也就是一个js文件, 可以用 script 标签引用加载, 用 RequireJS 加载, 也可以在 node 当成 CommonJS 模块加载

```
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.NAME = factory());
    }(this, (function () {
        //code
        return obj;
    })));
```

## ES6

ES6 模块是 ECMAScript 2015 标准 在语言层面上,实现了模块功能

import 引入 export 导出

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

```
  //按需加载依赖
  import { stat, exists, readFile } from 'fs';

  //暴露接口
  export default obj; // 默认对外接口
  export var foo = 'str'; // 名称为`foo`的对外接口
```
