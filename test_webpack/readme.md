## webpack
#### 主题
1. 什么是chunk
2. 为什么会存在chunk
3. code splitting的配置
4. code splitting切割chunk的基础原理
5. 代码切割之后为什么能够提升性能（废话）
6. hash、chunkhash、contenthash区别
7. tree shaking（看情况讲不讲）

#### 问题
1. 能不能一个包切一个chunk
2. 动态加载的chunk，里面的依赖是否需要提升到公共层级
3. ...现场提

### step_1
运行会发现，及时你没有用lodash，lodash整个包还是会在bundle里面
明明webpack4内置tree shaking但是还是全部引用进来了呢？
思考一下，是为什么？

### step_2
简单讲一下tree shaking（具体可以百度或者谷歌）
tree shaking其实依赖的是es6的静态语法分析来做的
但是有bug，如果函数具有副作用，就会出无效
> 副作用就是纯函数的反义，纯函数是指函数输入一样，输出就都一样，不依赖于外部环境，也不改变外部环境

简单讲下就好了，具体可以参照
[tree shaking](https://juejin.im/post/5c6618275188256261128d8d)

### step_3
chunk是什么
下面是webpack china的解释
>Chunk: This webpack-specific term is used internally to manage the bundling process. Bundles are composed out of chunks, of which there are several types (e.g. entry and child). Typically, chunks directly correspond with the output bundles however, there are some configurations that don't yield a one-to-one relationship.

> Chunk: 这是 webpack 特定的术语被用在内部来管理 building 过程。bundle 由 chunk 组成，其中有几种类型（例如，入口 chunk(entry chunk) 和子 chunk(child chunk)）。通常 chunk 会直接对应所输出的 bundle，但是有一些配置并不会产生一对一的关系。

当我们配置两个入口的时候，会发现两个bundle里面都有lodash这个包，那么是不是就会造成浪费。。
举个例子：我们react-router做按需加载就会出现这个问题，每个chunk切割出来都会有一个react，这就是浪费。

### step_4_1
现在是把两个模块公用的部分提取出来

我们看下打包出来的代码有什么问题
```
_lodash.bundle.js              1.47 KiB       2  [emitted]  _lodash
      _lodash~index.bundle.js  256 bytes       0  [emitted]  _lodash~index
              index.bundle.js   1.55 KiB       3  [emitted]  index
                    index.html  400 bytes          [emitted]
vendors~_lodash~index.bundle.js   6.77 KiB       1  [emitted]  vendors~_lodash~index
```

有一个vendors~_lodash~index.bundle还有一个_lodash~index.bundle，为什么会有两个？

### step_4_2
简单的提取所有node_module里面的包

### 小结
其实code splitting是分两步
1. 代码切割
2. 公共模块的提取

代码切割其实就是动态加载相关的，怎么做呢？
就是require.ensure还是就是import()这几个标志位

会将从这里开始的module标志位async module，然后进行切分

然后就是公共代码的提取

怎么加载其他，用的就是jsonp，重写了push，push会插入一个script标签进行加载

更详细的，其实也不是很知道了

### 额外内容
hash、chunkhash、contenthash区别
hash：就是webpack每次编译的时候生成一个compiler对象，这个对象的hash值就是hash
chunkhash: webpack一个chunk里面所有的module 标志位的值的hash，
contenthash: module内容的值hash