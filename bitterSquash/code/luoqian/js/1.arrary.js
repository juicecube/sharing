const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
// 删除一个不定长数组内不符合规则的所有项
const filterArr = (arr, func) => arr.filter(func);
console.log('task1:', filterArr(a, (item) => item.time > 2));


// 删除数组内指定位置的项
const deleteItemByIndex = (arr, index) => {
  arr.splice(index, 1);
  return arr;
}
console.log('task2:', deleteItemByIndex(a, 2));


// 怎么判断一个变量是不是数组
// es6
const isArray = (arr) => Array.isArray(arr);
const isArray1 = (arr) => Object.prototype.toString.call(arr) === '[object Array]'
console.log('task3:', isArray(a, []));


// 实现一个对象格式的深拷贝
const obj = {
  a: {c: 0, d: 1},
  b: 2
}
const deepCloneObj = (obj) => {
  let clonedObj = {};
  for ( let key in obj ) {
    if (typeof obj[key] === 'object') {
      clonedObj[key] = deepCloneObj(obj[key])
    } else {
      clonedObj[key] = obj[key]
    }
  }
  return clonedObj;
}
const obj1 = deepCloneObj(obj);
obj1.a.c = 3;
console.log('task4: obj.a.c === obj1.a.c' , obj.a.c === obj1.a.c);


// 利用reduce去实现Array.map的方法
const mapByReduce = (arr, cb) => {
  let res = [];
  arr.reduce((current, prev, index, arr) => {     
    res.push(cb(prev, index, arr))
  }, null);
  return res
}
const b = [1,2,3]
console.log('task5: ', mapByReduce(b, (item) => item + 1 ));


// 数组去重
const uniqueArr = (arr) => {
  return Array.from(new Set(arr));
}
console.log('task6: ', uniqueArr([1,1,2,3,null,null]));


// 实现Array.sort方法
const quickSort = function (arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr.splice(0, 1)[0]
  let left = arr.filter(item => item <= pivot);
  let right = arr.filter(item => item > pivot);
  return quickSort(left).concat([pivot], quickSort(right));
};
const arr = [10,5,2,3]
console.log('task7: ', quickSort(arr));


// 比较两个对象的值
const compareObj = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for (key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] !== 'object') {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        } else {
          return compareObj(obj1[key], obj2[key])
        }
      } else {
        return false;
      }
    }
    return true;
  }
}
console.log('task8: ', compareObj({a:{b:1},c:2}, {a:{b:1},c:2}));


// 数组的find方法 找到后终止
const find = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
}
console.log('task9: ', find([1, 2, 3, 4, 5], (item) => item > 2));


// 扁平数组 [5, [1,2,[3]],[4]] => [1,2,3,4]
// Array.flat()
const deepFlatten = (arr) => {
  return arr.reduce((prev, current) => Array.isArray(current) ? prev.concat(deepFlatten(current)) : prev.concat(current), [])
}
console.log('task10', deepFlatten([5,[1,2,[3]],[4]]));


// 找出数组的某个值出现的最后一个index
const lastIndexOf = (arr, value) => {
  for (let i = arr.length; i > 0; i--) {
    if (arr[i] === value) {
      return i;
    }
  }
}
console.log('task11', lastIndexOf([4,2,3,4],4));








