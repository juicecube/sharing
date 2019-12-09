// 1、删除一个不定长数组内不符合规则的所有项
/**
 * 输入：
  const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
  条件：time大于2
  输出：
  a = [{time:3, time:4}]
 */
let arr = [{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }];
arr = arr.filter((item) => { item.time > 2; });

// 2、删除数组内指定位置的项
/**
 * 输入：
 * const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
 *  const index = 2
 * 输出：
 *  a = [{time: 1}, {time:2}, {time: 4}]
 */
let arr = [{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }];
const index = 2;
arr.splice(index, 1);

// 3、判断一个变量是不是数组
const isArray = (arr) => {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return true;
  } else {
    return false;
  }
}

// 4、实现一个对象格式的深拷贝
let cp = JSON.parse(JSON.stringify(obj));

// 法二：递归实现
function deepCopy(target) {
  let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 
  function _deepCopy(target) {
    if ((typeof target !== 'object') || !target) { return target; }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = [];//处理target是数组的情况 
    }
    copyed_objs.push({ target: target, copyTarget: obj })
    Object.keys(target).forEach(key => {
      if (obj[key]) { return; }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(target);
}

// 5、reduce实现Array.map的方法

// 6、数组去重(值相等)
function unique(arr) {
  return Array.from(new Set(arr))
}
console.log('task6: ', unique([1, 1, 2, 2, 3, null, null, NaN, NaN]));

function remove_duplicates(array) {  // by yanzhu
  return [...new Set(array)];
}

// 7、实现Array.sort方法

// 8、比较两个对象的值是否相等

// 9、实现数组的find方法(找到后终止循环)
const find = (arr, func) => {
  let res;
  for (let i of arr) {
    if (func(i)) {
      res = i;
      break;
    }
  };
  return res;
}

// 10、怎么扁平化一个数组(多维数组)

// 11、找出数组的某个值出现的最后一个index
const findLastIndex = (arr, val) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === val) {
      return i;
    }
  }
}