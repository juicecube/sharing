## keyof和查找类型

输入索引类型查询或keyof，索引类型查询keyof T产生的类型是T的属性名称。keyof T的类型被认为是string的子类型。

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type K = keyof Person; // 'name' | 'age' | 'location'
type K1 = keyof { [x:string]:Person }; // string | number(????)
```

## 映射类型

将现有的类型的每个属性完全可选，例如：

```ts
type Person = {
  name:string;
  age:number;
  sex:'male' | 'female';
}

// 可选类型
type PartialPerson = {
  name?:string;
  age?:number;
  sex?:'male' | 'female';
}

// PartialPerson可以写成下面这种形式
Partial<Person>

type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

## 条件类型

TypeScript 2.8引入了有条件类型，它能够表示非统一的类型。 有条件的类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一：

```
T extends U ? X : Y
```

上面的类型意思是，若T能够赋值给U，那么类型是X，否则为Y

***分布式有条件类型***

例如，实例化T extends U ? X : Y，T的类型为A | B | C，会被解析为(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)

```ts
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";
type T10 = TypeName<string | (() => void)>;  // "string" | "function"
type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
type T11 = TypeName<string[] | number[]>;  // "object"
```
利用这些可以做到很多约束方法

***有条件类型中的类型推断***

现在在有条件类型的extends子语句中，允许出现infer声明，它会引入一个待推断的类型变量。 这个推断的类型变量可以在有条件类型的true分支中被引用。 允许出现多个同类型变量的infer


