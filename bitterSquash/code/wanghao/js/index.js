export const delete_wh = (array, num) => array.filter(item => item.time > num);
export const remove_wh = (array, num) => array.filter(item => item.time !== num);
export const isArray_wh = array => Array.isArray(array);
export const deepClone_wh = obj => {};

//找出数组的某个值出现的最后一个index
export const lastIndex_wh = (array, num) => {
  let index;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) {
      index = i;
    }
  }
  return index;
};

 // 数组去重
 export const uniqueArr = (arr) => {
  return [...new Set(arr)];
}

//如何扁平化一个数组(多维数组)
export const deepFlatten_wh = arr => {
  const flatten = arr => [].concat(...arr);
  return flatten(arr.map(item => (Array.isArray(item) ? deepFlatten_wh(item) : item)));
};

//实现数组的find方法(找到后终止循环)
export const find_wh = (arr, func) => {
  for (let i of arr) {
    if (func(i)) {
      return i;
    }
  }
  return undefined;
};

// {
//   a: 1,
//   b: {
//     c: [1, 2, 3, 1]
//   }
// },
// {
//   a: 1,
//   b: {
//     c: [1, 2, 3, 4]
//   }
// }

//比较两个对象的值是否相等(值相等)
export const isEqual_wh = (obj1, obj2) => {
  const _typeof = value => Object.prototype.toString.call(value);
  const obj1_type = _typeof(obj1);
  const obj2_type = _typeof(obj2);

  if (obj1_type !== obj2_type) {
    return false;
  }
  if (obj1_type === "[object Array]" && obj2_type === "[object Array]") {
    for (let i = 0; i < obj1.length; i++) {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
  } else if (obj1_type === "[object Object]" && obj2_type === "[object Object]") {
    const obj1_keys = Object.keys(obj1);
    const obj2_keys = Object.keys(obj2);
    if (obj1_keys.length !== obj2_keys.length) {
      return false;
    }
    for (let i of obj1_keys) {
      if (_typeof(obj1[i]) === "[object Array]" && _typeof(obj2[i]) === "[object Array]") {
        for (let j = 0; j < obj1[i].length; j++) {
          if (obj1[i][j] !== obj2[i][j]) {
            console.log('obj2[i][j]: ', obj2[i][j]);
            console.log('obj1[i][j]: ', obj1[i][j]);
            return false;
          }
        }
      } else if (_typeof(obj1[i]) === "[object Object]" && _typeof(obj2[i]) === "[object Object]") {
        isEqual_wh(obj1[i], obj2[i]);
      } else if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
  } else if (obj1 !== obj2) {
    return false;
  }
  return true;
};
