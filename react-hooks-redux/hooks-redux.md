# Hooks与Redux的配合

Hooks面世已有一段时间，但目前在状态管理方面，还未正式推出官方解决方案。因此目前社区中hooks主要有这么三种方案来解决应用的状态管理问题
1. 使用[Redux-React-Hook](https://github.com/facebookincubator/redux-react-hook)库替代React-redux，与Redux一同配合
2. 使用useReducer、useContext等纯hook函数替代react-redux，与Redux一同配合
3. 使用useReducer、useContext等纯hook函数完全替代react-redux与Redux，完全通过hooks的方式管理应用的状态

在这几个方案之中，个人认为暂时最有前景的就是第一种方案：[Redux-React-Hooks](https://github.com/facebookincubator/redux-react-hook)，现已在Facebook incubator中，也就是成为正式官方方案的机会相当大，因此本次分享会将主要讲述第一个方案。

相信大家都已经注意到，不管是哪种方案，react-redux都会在使用hooks进行状态管理的情况下被替代。
我们先将react-redux的特征列举出来，完成这些特性才算是替代了react-redux：

+ 全局维护一个store。
+ 任何组件都可以获取到store，最好props可以定制（mapStatetoProps）。
+ 提供可以派发action的能力（mapDispatchtoProps）。

那么如果想要了解react-redux为什么会被替代？hooks解决了状态管理的哪些痛点？为什么使用hooks方式能更好的进行状态管理？要了解这些，那么首先需要了解以下几个hook，实际上，Redux-React-Hook也是在这几个hook基础上的一个封装。

## [useReducer](https://react.docschina.org/docs/hooks-reference.html#usereducer)
```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
通过useReducer这个hook，我们可以模拟一部分的react-redux的特性了，即状态由派发的action改变（触发一个dispatch操作），进行单向数据流改变store。

## [useContext](https://react.docschina.org/docs/hooks-reference.html#usecontext)

```javascript
const value = useContext(MyContext);
```
要想知道useContext这个hook是什么作用，首先需要先了解16.3推出的新Context API，Context API可以直接通过上下文跨层级获取数据和方法，换言之，不再需要在组件中层层嵌套，层层传递。

+ React.createContext  用于初始化一个 Context。
+ XXXContext.Provider 作为顶层组件接收一个名为 value的prop，可以接收任意需要被放入 Context 中的字符串，数字，甚至是函数。
+ XXXContext.Consumer  作为目标组件可以出现在组件树的任意位置，接收 children prop，这里的 children 必须是一个函数（context => ()）用来接收从顶层传来的 Context。

我们可以通过useContext这个hook，来解决全局的状态问题。

说了这么多，不如来看一个小例子，来大概描述下这两个hook的作用

下面是一个计数器实例
```javascript
import React, { useState, useReducer } from "react";
import "./App.css";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  return (
    <div className="App">
      Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default Counter;
```

乍一看好像react利用hook已经可以使用redux的机制了，状态由派发的action改变，单向数据流，但是hook不会让状态共享，也就是每次useReducer保持的数据都是独立的。比如下面这个例子：
```javascript

function CountWrapper() {
  return (
    <section>
      <Counter initialCount={1}/>
      <Counter initialCount={1}/>
    </setion>
  )
}
```
我们还需要解决组件之间的状态共享问题，解决全局状态的问题可以参照react-redux的做法，提供一个Provider，使用context的方式来做。 这里可以使用useContext，这个内置的hook。

它接受一个由React.createContext返回的上下文对象， 当provider更新时，本文中这里理解为传入的store更新时，useContext就可以返回最新的值。
```javascript
import {createContext, useContext} from 'react';

const context = createContext(null);
export const StoreProvider = context.provider;

const store = useContext(context);
```
接下来如果要完整的模拟react-redux，还需要自定义一个名为useDispatch的hook，暴露出一个hook来返回store上的dispatch派发action，来更改state；同时还需要自定义一个名为useStoreState，通过调用store.getStore()即可拿到全局的状态，着眼于组件拿到store上数据

虽然把状态拿到了，但忽略了一个非常重要的问题， 当store上的数据变化时，如何通知组件再次获取新的数据，当store变化过后，并没有和视图关联起来以及其他问题......鉴于篇幅和时间的关系不再多进行详细分享，使用纯hooks的方式确实可以解决状态管理的问题，但是过于繁琐，需要编写大量的自定义hook函数。如果需要在项目中使用，我们可以采用对这些hook方法的一个上层封装，即第一种方案：**Redux-React-Hooks**

## [Redux-React-Hooks](https://github.com/facebookincubator/redux-react-hook)
我们可以来看下redux-react-hook-demo这个项目，这是一个使用redux-react-hook与redux管理状态的例子

在store.js之内，只是很简单运用createStore建立一个新的Redux Store，任何对状态（state）的更动都必须经由reducer去改动。

```javascript
import {createStore} from 'redux';
import reducer from './reducers';

export const store  = createStore(reducer);
```
reducers.js还是熟悉的配方
```javascript
const initialState = {
    counter: 0
}

export default function reducer(state = initialState,action){
    switch(action.type){
        case "INCREMENT":
            return {counter: state.counter+1}
        case "DECREMENT":
            return {counter: state.counter-1}
        default:
            return state;
    }
}
```
### 对比：react-redux
如果使用react-redux连接react与redux，indexWithoutHooks.js需如下：
```javascript
import * as React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { store } from "./store";
import Counter from "./CounterWithoutHooks.";

ReactDOM.render(
  <Provider store={store}>
    <Counter name="Sara" />
  </Provider>,
  document.getElementById("root")
);
```
CounterWithoutHooks.js 则需如此:

```javascript
import * as React from "react";
import "./styles.css";

import { connect } from "react-redux";

export function Counter(props) {
  const { counter, increment, decrement } = props;
  return (
    <div>
      <h1>
        You pressed it {counter} times
      </h1>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```
### 对比：Redux-React-Hooks

如果使用redux-react-hooks，那么在index.js有一些不同:

```javascript
import * as React from "react";
import { StoreContext } from "redux-react-hook";
import ReactDOM from "react-dom";
import { store } from "./store";
import Counter from "./Counter";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Counter />
  </StoreContext.Provider>,
  document.getElementById("root")
);
```
redux-react-hook暴露出的StoreContext.Provider替代了react-redux的Provider，其他无异

最大的更动在Counter.js中，由于redux-react-hooks提供了useMappedState及useDispatch，连接Counter的代码可以大大简化。

```javascript
import * as React from "react";
import "./styles.css";
import { useMappedState, useDispatch } from "redux-react-hook";

export default function Counter(props) {
  const counter = useMappedState(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>
        You pressed it {counter} times
      </h1>
      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      </div>
    </div>
  );
}
```
一个useMappedState，就扮演了mapStateToProps的角色，使用useDispatch，更可以直接于组件里使用dispatch，无需任何特殊函数。其中一个更明显的好处，不再需要通过props传递通过react-redux封装的state状态树与dispatch函数，直接在组件内部定义并调用，这无疑大大简化了代码量

## 总结
通过简单的使用redux-react-hooks可见，Hooks确实简化了连接React及Redux之间的代码，同时令组件的状态管理逻辑更加清晰。而Hooks的本质接近函数式编程思维，也与redux的纯函数原则不谋而合。当然如前面所言，redux-react-hooks尚未正式成为官方方案，大家也可以尝试其他方法或库，不过无论如何，react-redux在未来都大概率会被hooks的方式逐渐替代，但不仅仅是在状态管理方面，在如表单处理、动画、订阅声明等场景使用hooks都是更优的解决方案。通过hooks的方式构建应用，这也是react的未来发展方向。
