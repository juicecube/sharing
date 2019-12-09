/**
 * 元组
 * 实现方法tuple
 * 任意参数state类型为: 任意类型
 * 限制返回值为参数组成的数组的类型
 * 如：参数为：1,2,'a',{a:1} 返回值：[number, number, string, {a:1}]
 */
function tuple<T extends any[]>(...state:T) : T {
  return state;
}

const tupleTest = tuple(1, 2, 3, 'a', 'b', {a: 1});

/**
 * 枚举
 */

enum Example {
  C0,
  C1 = 2,
  C2,
}
let ex = Example.C0;
ex = 4;
console.log(Example.C2); // 3

enum SExample {
  C0 = '',
  C1 = '1',
  C2 = '2',
}
let sEx = SExample.C0;
console.log(Example.C2);

// const enum
const enum CExamples {
  C0,
  C1,
}
let cEx = CExamples.C0;
let cEx2 = CExamples['C0'];
/**
 * 泛型
 * 实现方法setPartState
 * 参数state类型为: 任意对象类型
 * 限制参数key类型为state的key类型
 * 限制返回值为state中对应的key的value
 */
function getPartState<K extends keyof T, T>(state:T, key:K) : T[K] {
  return state[key];
}

const value = getPartState({isShow: false, num: 1}, 'num');

/**
 * 装饰器
 */
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


// 联合交叉类型 
type A = {a:number, c:number};
type B = {b:string, c:number};

const c:A | B = {a: 1, c: 1};
const d:A & B = {a: 1, b:'', c: 1};

// 联合交叉类型升级版
type Maybe<T> = T | void;
function isDefined<T>(v:Maybe<T>) : v is T {
  return v !== undefined && v !== null;
}
function isUndefined<T>(v:Maybe<T>) : v is void {
  return v === undefined || v === null;
}
function getValue<T>(v:Maybe<T>, defaultV:T) : T {
  return isDefined(v) ? v : defaultV;
}

let x:Maybe<string>;
let x1 = getValue(x, '');
let x2 = isDefined(x) ? x : '';
let x3 = isUndefined(x) ? '' : x;

let y:Maybe<number>;
let y1 = getValue(y, 1);
let y2 = isDefined(y) ? y : 1;
let y3 = isUndefined(y) ? 2 : y;
 
// 类型收窄
type Cat = {
  type:'cat';
}
type Dog = {
  type:'dog';
}

function isCat(a:any): a is Cat {
  return a.type === 'cat';
}
let a:Cat|Dog;
if (isCat(a)) {
  console.log(a.type);
}