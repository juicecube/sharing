 ## 元组
```ts
/**
 * 实现方法tuple
 * 多个任意参数state类型为: 任意类型
 * 限制返回值为参数组成的数组的类型
 * 如：参数为：1,2,'a',{a:1} 返回值：[number, number, string, {a:1}]
 */
function tuple() {}
```

## 枚举

### 数字类型枚举

允许将数字类型兼容的类型赋值给枚举类型，并且以赋值的项开始递增

```ts
enum Example {
  C0,
  C1,
  C2,
}
let ex = Example.C0;
ex = 0; // true
ex = ''; // false

// 编译后
var Example;
(function(Example) {
  Example[(Example['C0'] = 0)] = 'C0';
  Example[(Example['C1'] = 1)] = 'C1';
  Example[(Example['C2'] = 2)] = 'C2';
})(Example || (Example = {}));

// 从2开始递增
enum Example {
  C0 = 2,
  C1, // 3
  C2, // 4
}

enum Example {
  C0,
  C1 = 2,
  C2, // 3
}
```

### 字符串类型枚举

不允许兼容性类型的赋值

```ts
enum Example {
  C0 = '',
  C1 = '1',
  C2 = '2',
}
let ex = Example.C0;
ex = ''; // false
```

### 常量枚举

常量枚举类型获得性能提升，因为常量枚举会直接编译为值，不产生中间变量，取值时只能使用string作为key，如果还是想要枚举类型作为编译后的变量可以通过preserveConstEnums控制
```ts
const enum CExample {
  C0,
  C1,
  C2,
}

const cEx = CExample.C0;
const cEx1 = CExample['C0'];
const cEx2 = CExample[0]; // error
// 编译后将不存在CExample变量
let cEx = 0
```

## 泛型

```ts
 /**
 * 实现方法setPartState
 * 参数state类型为: 任意对象类型
 * 限制参数key类型为state的key类型
 * 限制返回值为state中对应的key的value
 **/
function getPartState(state, key) {}
```

## 导出

ts支持export前缀导出如果需要可以使用as指定导出的名称，同时可以使用as指定不同的导入名称

```ts
function a {}
export { a as b };

import { a as b } from './base.ts';
```

使用from语句可以从指定模块导出到当前模块.

export * 可以用来重新导入另一个模块所有的导出项.

```ts
export { a, b, c as d } from './base.ts';

export * from './base';
```

默认导出项利用export default表示

```ts
export default const a = 1;

import a from './base.ts';
```

无导入加载用来加载某些模块

```ts
import './base.ts';
```

参考[es6 modules](https://github.com/Microsoft/TypeScript/issues/2242)

## 装饰器

装饰器使用@expression形式，expression求值后必须为一个函数，会在运行时被调用，被装饰的声明信息作为参数传入。如：
```ts
function sealed(target) {
  target.a = 1;
}
```

***装饰器工厂***
```ts
function color(value) { // 装饰器工厂
  return function(target) { // 装饰器
    target.a = 1;
  }
}
```

***装饰器组合***

多个装饰器应用时，从上到下求值，求值结果被当做函数从下到上调用

```ts
@a @b x

@a
@b
x

function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {}
}

// 结果是

f(): evaluated
g(): evaluated
g(): called
f(): called
```

[各种装饰器](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)
