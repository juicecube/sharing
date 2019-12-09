指定tsconfig路径：tsc -p(or--project) tsconfig的路径所在的文件夹

```js
  {
    "compilerOptions": {
      "target": "es5", // 指定ECMAScript版本默认"ES3":"es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext"
      "module": "commonjs", // 指定编译后使用的模块: "commonjs", "amd", "umd", "system", "es6", "es2015", "esnext", "none"
      "lib": ["dom", "es2016"], // 执行编译中需要加入的库文件
      "declaration": false, // 生成.d.ts的声明文件
      "isolatedModules": false, // 不知道干啥的
      "moduleResolution": "node", // 模块解析策略在mode为amd|system|es2015时默认是classic，其他情况是node
      "jsx": "preserve", // "preserve"-会输出.jsx且dom编译后还是原dom方便后续babel等编译; "react"-会输出.js, React.createComponent不需要进行进一步转换; "react-native"-会输出.js且规则和preserve模式一样
      "baseUrl": '.', // 用于非相对模块的基础路径
      "paths": {}, // 基于baseUrl进行的模块名解析路径映射列表
      "rootDirs": [], // 虚拟路径
      "experimentalDecorators": true, // 装饰器设置
      "resolveJsonModule": true // 允许json文件作为module引入
    }
  }
```