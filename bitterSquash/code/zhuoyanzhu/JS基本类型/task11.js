// 找出数组的某个值出现的最后一个index
function findLastIndex(array, value) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (value === array[i]) {
      return i;
    }
  }
}

// test
var a = [1, 3, 4, 5, 1];
console.log(findLastIndex(a, 1));