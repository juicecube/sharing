// 怎么扁平化一个数组(多维数组)
function flatten(array) {
  return array.flat(Infinity);
}

function flatten(array) {
  return array.reduce(function(pre_value, current_value, index) {
    return !Array.isArray(current_value) ? pre_value.concat(current_value) : 
      pre_value.concat(flatten(current_value));
  }, []);
}

// test
var a = [1, 2, 3, [4, 5, [ 6 ]]];
console.log(flatten(a));