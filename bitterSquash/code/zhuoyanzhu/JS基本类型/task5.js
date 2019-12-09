// task: 怎么利用reduce去实现Array.map的方法
function map(array, func) {
  return array.reduce(function(result, currentValue, index, array) {
    return result === undefined ? [].concat(func(currentValue)) : result.concat(func(currentValue));
  }, undefined);
}

//test
var a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
console.log(map(a, function(item) {
  return item.time * 2;
}));