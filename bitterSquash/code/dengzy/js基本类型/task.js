
const arr = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
const obj = {
  a: 1,
  b: {
    b1: 1
  },
  c: new Date(),
  d: [1,2,3],
  e: undefined,
  f: () => {
    console.log('函数')
  },
};
// task1:删除一个不定长数组内不符合规则的所有项
removeArrayItemByFunc = (arr, func) => arr.filter(func);
console.log('task1', removeArrayItemByFunc(arr, item => item.time > 2));

// task3:怎么判断一个变量是不是数组
// isArray = (arr) => Array.isArray(arr);
isArray = (arr) => Object.prototype.toString.call(arr)  === '[object Array]';
console.log('task3', isArray(arr))

// task2:删除数组内指定位置的项
removeArrayItemByIndex = (arr, indexItem) => {
  if (typeof indexItem === 'number') {
    return removeArrayItemByFunc(arr, (item, index) => indexItem !== index);
  }
  if (isArray(arr)) {
    return removeArrayItemByFunc(arr, (item, index) => indexItem.indexOf(index) === -1);
  }
  return '参数格式有误';
};
console.log('task2', removeArrayItemByIndex(arr, [0,2]));

// task4:实现一个对象格式的深拷贝
deepClone = (obj) => {
  const newObj = Object.assign({}, obj);
  const keys = Object.keys(obj);
  for (let i of keys) {
    if (newObj[i] === undefined) {
      continue;
    }
    if (newObj[i].constructor === Object) {
      newObj[i] = deepClone(newObj[i]);
      continue;
    }
    if (newObj[i].constructor === Date) {
      newObj[i] = new Date(newObj[i].getTime());
      continue;
    }
    if (newObj[i].constructor === Function) {
      newObj[i] = new Function(newObj[i].toString());
      continue;
    }
  }
  return newObj;
}
console.log('task4', deepClone(obj))


