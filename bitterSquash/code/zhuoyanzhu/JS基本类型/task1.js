// task:删除一个不定长数组内不符合规则的所有项
function remove(array, func) {
  return array.filter(func);
}

// test
var a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
console.log(remove(a, function(item) {
  return item.time > 2
}));