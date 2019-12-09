// 实现数组的find方法(找到后终止循环)
function find(array, func) {
  var result;
  for (let i of array) {
    if (func(i)) {
      result = i;
      break;
    }
  };
  return result;
}

//test 
var a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
console.log(find(a, function(item) {
  return item.time > 2;
}));