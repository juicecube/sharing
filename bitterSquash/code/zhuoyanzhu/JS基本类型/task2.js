// task: 删除数组内指定位置的项
function delete_by_index(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1, array[array.length]));
}

// test
const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
const index = 2
console.log(delete_by_index(a, index));
