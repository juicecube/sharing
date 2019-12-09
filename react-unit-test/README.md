## 单元测试demo
1. npm install
2. unit test: `npm run test`
3. cypress: `npm run cypress`

## 测试目录
- jest basic `./src/utils/__test__/base.test.ts`
- jest mock `./src/utils/__test__/mock.test.ts`
- jest + enzyme component `./src/__test__/AddTodo.test.tsx`

## 调研报告
![前端测试大纲](https://github.com/juicecube/react-unit-test/blob/master/images/summary.png)

### 一. 单元测试是什么？为什么需要单元测试？
按照测试对象的级别可以将测试划分为：单元测试，集成测试，端到端测试。而单元测试从字面意思来理解也就是对每一小段代码单元的测试，被测对象往往就是一个函数。
做好单元测试可以做到保证代码质量，有利于代码维护和重构，防止代码腐化。但是很多时候写单元测试花费的时间是比写代码的时间还多好几倍，并且当需求发生变更的时候，除了让维护
功能代码，还要维护测试代码。这也是很多开发者不愿意写单元测试的原因，但是不可否认的是开发者有义务保证自己代码的质量，而单元测试有效的方法，先不管怎么样可以先尝试了解一下测试方法，总有用得上的时候。

### 二. 测试框架jest
#### jest常用配置
  - typescript项目中接入jest常用配置如下：

    ```js
    //jest.config.js
    module.exports = {
      // 指定测试环境,默认为jsdom，jsdom库为一个用js实现的WHATWG DOM and HTML标准库，这样就可以在测试用例中直接使用类型document浏览器API
      testEnviroment: 'jsdom',
      // 测试预处理，typescript项目中需要先将ts文件编译为js再交给jest执行
      transform: ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
      // 指定模块加载目录
      moduleDirectories: ['node_modules', path.join(__dirname, 'src')]
      moduleNameMapper: {
        // identity-obj-proxy 支持在 jest 中引入 css, 同时支持 css 的模块化
        "\\.(css|scss)$": "identity-obj-proxy",
        // 项目中配置的别名定义
        "^src/(.*)$": "<rootDir>/src/$1",
      },
      // 在执行每次测试前需要配置的测试环境，比如使用enzyme的时候需要配置enzyme reactv16的适配器
      setupTestFrameworkScriptFile: require.resolve('./setup_enzyme.js')
      // 测试覆盖率收集目录
      collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!src/**/*.d.ts',
      ],
      // 测试覆盖率结果输出目录
      coverageDirectory: coverage
      // 当前目录下会被测试的文件，默认为如下正则表达式，
      testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'
    }
    ```
 
  - enzyme适配配置：`./setup_enzyme.js`
    ```js
      const enzyme = require("enzyme");
      const Adapter = require("enzyme-adapter-react-16");

      enzyme.configure({ adapter: new Adapter() });
    ```
    
#### jest global API
  在jest中，每个测试用例用一个`it函数`代表，`it`函数的第一个参数是一个字符串，代表的是测试用例名称用来描述测试用例，第二个参数是一个函数，包含的就是一个实际的测试用例过程，一个最简单的测试用例代码如下：
  ```js
    it('should return object when invoked', () => {
      //断言语句
    })
  ```
  通常一个被测对象都会有多种被测情况，需要多个单元测试用例，因此，就需要构建测试套件，在`jest`中用`describe`函数描述测试套件，一个测试套件的代码例子如下：
  ```js
    describe('actions', () => {
      it('should return object when invoked', () => {

      })
      // 更多的it函数调用
    })
  ```
  `describe`和`it`的区别在于describe可以包含it或者另一个describe函数调用。这样的目的是为重用相同的环境设置，比如：
  ```js
    describe('Examining the syntax of Jest tests', () => {
      let user;
      beforeEach(() => {
        const getUserInfo = new Promise((resolve, reject) => {
          setTimeout(() => {
            user = {
              name: 'john',
              age: 21
            }
            resolve(user);
          }, 3000);
        })
        return getUserInfo
      })
      test('name is john', () => {
        expect(user.name).toEqual('john');
      });

      test('age is 21', () => {
        expect(user.age).toEqual(21);
      });
    });

    describe('test describe is a scope', () => {
      const myBeverage1 = {
        delicious: true,
        sour: false,
      };
      test('is delicious', () => {
        expect(myBeverage1.delicious).toBeTruthy();
      });

      test('is not sour', () => {
        expect(myBeverage1.sour).toBeFalsy();
      });
    });
  ```
  以上代码中用到了jest提供的`beforeEach`函数，这个函数会在执行测试用例之前执行，如果返回值是一个promise或者generator会到等到promise resolve后执行测试用例。除了这个特殊函数之外还有：
    1. afterAll(fn, timeout)：所有测试用例跑完以后执行的方法
    2. beforeAll(fn, timeout)：所有测试用例执行之前执行的方法
    3. afterEach(fn, timeout)：在每个测试用例执行完后执行的方法

#### mock
  jest提供了很多方便的mock方法，mock方法在测试用例中有你不可控制的时候非常有用，比如说一个函数需要传入一个`callback`，这个`callback`是不可控的，所以你不能简单的测试函数的输出是否符合预期，这个时候就可以用上`mock`。除此之外mock在测试异步函数也非常实用，比如：
  ```js
  test('async test', async () => {
    const asyncMock = jest.fn().mockResolvedValue(43);

    await asyncMock(); // 43
  });
  ```
  常用的mock方法包括：
  1. `jest.fn()` mock一个函数
  2. `jest.mock('module_path')` mock一个模块
  3. `jest.spyOn` mock一个模块内部的函数，通常和`mockImplementation`搭配使用
  具体的代码实例可以参考：[mock demo](https://github.com/juicecube/react-unit-test/blob/master/src/utils/__test__/mock.test.ts)

#### 三. enzyme
enzyme是airbnb提供的组件测试库，enzyme提供三种渲染方法，主要就是这样三种渲染方法加一些类似jquery语法的选择器。
1. shallow：浅渲染，是对官方的Shallow Renderer的封装。将组件渲染成虚拟DOM对象，只会渲染第一层，子组件将不会被渲染出来，使得效率非常高。不需要DOM环境， 并可以使用jQuery的方式访问组件的信息
2. render：静态渲染，它将React组件渲染成静态的HTML字符串，然后使用Cheerio这个库解析这段字符串，并返回一个Cheerio的实例对象，可以用来分析组件的html结构
3. mount：完全渲染，它将组件渲染加载成一个真实的DOM节点，用来测试DOM API的交互和组件的生命周期。用到了jsdom来模拟浏览器环境
[enzyme demo](https://github.com/juicecube/react-unit-test/blob/master/src/__test__/AddTodo.test.tsx)

个人不是很喜欢enzyme的测试，因为它太专注于组件具体实现细节的测试，有时候可能会发生实际代码没有错但是测试用例不通过的情况，比如说你测试一个轮播组件的state值，你需要断言：
```js
expect(wrapper.state('index')).toBe(0)
```
如果有一天你觉得index变量名字不妥将组件中state的名字重构为`currentPage`,这个时候就会出现测试用例不通过，但是实际上这个程序没有错的情况，你又得去改测试代码。所以一种的更好的测试方法应该是脱离了组件内部实现细节，接近用户行为测试的方法。相较于 enzyme, react官方推荐了`react-testing-library` 所提供的api更加贴近用户的使用行为，而更贴近用户测试行为的方法就是端到端测试，这次调研了一个比较新的工具cypress

#### 四. cypress
cypress是一个端到端测试框架，它提供了一个强大的GUI工具，GUI方式的测试使用真实浏览器，非GUI方式使用chrome-headless，不是用模拟方式进行测试，更真实的展现实际环境中的测试过程和结果。模拟用户的操作过程进行测试。就是用脚本来控制用户的交互和UI界面的预期结果是否是符合的。在测试ajax请求的时候可以拦截请求和mock响应，这样就可以方便的测试接口在不同响应下前端是否能够正确的响应。

[todolist cypress demo](https://github.com/juicecube/react-unit-test)

[cypress-example-recipes 集合很多cypress特性的demo，很值得参考](https://github.com/cypress-io/cypress-example-recipes)



##### 五. 测试策略
1. 目前可在项目中的utils工具函数添加单元测试，尽量保证函数的纯度，方便测试
2. react项目测试策略：
   - 组件层：
    1. 分支渲染逻辑、事件、交互需要测试，目前调研阶段的感受是使用cypress端到端的测试方法比enzyme专注组件内部测试的成本更低
    2. 纯 UI 一般不测，复杂的可以使用jest快照测试功能
   - redux层：
    1. 复杂reducer需测试
    2. saga（副作用）层：测试是否拿到了正确的参数、是否调用了正确的 API、是否保存了正确的数据、业务逻辑、异常逻辑五个层面

当然有效的测试策略实施的基础是方便测试的代码，TDD(测试驱动开发)的理念提出了很久，但是都没有实施很大的程度的原因是前端代码中涉及到较多的副作用。所以在推进前端测试的落地的前提也是需要有合适的编码规范。

  
##### 参考:
1. [使用Jest进行React单元测试](https://juejin.im/post/5b6c39bde51d45195c079d62#heading-6)
2. [React单元测试策略及落地](https://zhuanlan.zhihu.com/p/72627206)
