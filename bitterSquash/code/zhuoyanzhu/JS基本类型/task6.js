//task: 数组去重
function remove_duplicates(array) {
  var new_array = [];
  for (let i = 0; i < array.length; i++) {
    new_array.indexOf(array[i]) < 0 && new_array.push(array[i]);
  }
  return new_array;
}

function remove_duplicates(array) {
  return [...new Set(array)];
}

// test
var b = [1, 2, 3, 4, 4]
var a = [{time: 1}, b, {time: 3}, b];
console.log(remove_duplicates(a));