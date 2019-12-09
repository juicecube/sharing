### Tasks
  - [ ] 实现一个可缓存函数执行结果的cacheFn高阶函数
  ```
  example：
  const add = (a, b) => a + b;
  const cacheAdd = cacheFn(add);
  cacheAdd(1, 2) ; // 3;
  cacheAdd(1,4); // 5;
  cacheAdd(1, 2); // 不执行add方法，直接返回缓存的执行结果。
  ```
### Summary

### Mvp
