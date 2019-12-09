/**
 * keyof
 */

interface Person {
  name:string;
  age:number;
  location:string;
}

type StringArr = {
  [x:string]:number;
};

type K = keyof Person; // 'name' | 'age' | 'location'
type K1 = keyof StringArr; // string | number

const a:K1 = 1;
const a1:K1 = '';

function getProperty<T, K extends keyof T>(obj:T, key:K) : T[K] {
  return obj[key];
}

function setProperty<T, K extends keyof T>(obj:T, key:K, value:T[K]) {
  obj[key] = value;
}

getProperty({ a: 1 }, 'a');
setProperty({ a: 1 }, 'a', 2);

/**
 * Partial
 */

// 可选类型
type PartialPerson = {
  name?:string;
  age?:number;
  location?:string;
}

// PartialPerson可以写成下面这种形式
type PartialP = Partial<Person>

// Partial的原始样子
type Partial1<T> = {
  [P in keyof T]?: T[P];
}
type Partial1P = Partial1<Person>;

/**
 * Readonly
 */

type Readonly1<T> = {
  readonly [P in keyof T]: T[P];
}

type ReadonlyP = Readonly1<Person>;

/**
 * Record
 */

type Record1<K extends keyof any, T> = {
  [P in K]: T;
};
type RecordP = Record1<'d'|'b', Person>;

/**
 * Pick
 */
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
};

type PickPName = Pick1<Person, 'name'>;
type PickP = Pick1<Person, keyof Person>;

/**
 * 条件语句的联合类型
 */

type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;
type NoNullType<T> = Diff<T, null|undefined>;

type Ex1 = Diff<'a'|'b'|'c', 'c'>;
type Ex2 = Filter<'a'|'b'|'c', 'a'|'b'>;
type Ex3 = Diff<string | number | (() => void), Function>;
type Ex4 = Filter<string | number | (() => void), Function>;
type Ex5 = NoNullType<string | number | undefined>;  

function n1<T extends string | undefined>(x:T, y:NoNullType<T>) {
  let a:string = x; // ? string|undefined => string;
  let b = y;
}

/**
 * 条件语句和映射类型结合
 */
type FunctionName<T> = {[key in keyof T] : T[key] extends Function ? key : never}[keyof T];

type Test = {
  a: number;
  b: string;
  c: (name:string) => void;
  d(age:number) : void;
}

type FTest = FunctionName<Test>;

export const Raw = <T extends string>(a:T) => a;
export declare const createModel:<T, U extends {[name:string]:{
  name:string;
}}>(models:{state:T; reducers:U}) => {
  keys:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:
  {[kk in keyof U]: U[kk]['name'] extends key ? kk : never}[keyof U]};
};

const testModel = createModel({
  state: [],
  reducers: {
    test: {
      name: Raw('test_action'),
    }
  }
});

type ModelKeys<U extends {[name:string]:{
  name:string;
}}> = {[key in {[k in keyof U]:U[k]['name']}[keyof U]]:
{[kk in keyof U]: U[kk]['name'] extends key ? kk : never}[keyof U]};

type TestModel = ModelKeys<{key:{name: 'keyName'}}>;

/**
 * 有条件类型中的类型推断
 */

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type ParamType<T> = T extends (param:infer P) => any ? P : any;
type PickFirstParam<T> = T extends (param1:infer P, ...args:any) => any ? P : any;

type TypeFunc = (a:'a', b:'b') => number;
type TypeFunc1 = (a:'a') => void;
type TypeFunc2 = (a:'a', b:'b', c:'c') => void;

type ReturnTest = ReturnType<TypeFunc>;
type TestParam = ParamType<TypeFunc1>;
type TestFirstParam = PickFirstParam<TypeFunc2>;
