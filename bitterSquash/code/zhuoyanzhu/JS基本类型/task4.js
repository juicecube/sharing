// task:实现一个对象格式的深拷贝

// function deepClone(obj) {
//   return JSON.parse(JSON.stringify(obj));
// }

function deepClone(obj) {
  var obj = Object.assign({}, obj);
  const keys = Object.keys(obj);
  for (let key of keys) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      obj[key] = deepClone(obj[key]);
    }
  }
  return obj;
}
//test
var a = { a: {b: 2, c: {c: 2}}};
console.log(deepClone(a).a === a.a);