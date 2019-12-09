// 删除不合规则的项
let arr = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
arr = arr.filter((item) => item.time > 2);

for (let i = 0;i < arr.length; i++) {
	if (arr[i].time <= 2) {
		arr.splice(i, 1); 
		i = i - 1;
	}
}

for (let i = arr.length - 1;i >= 0; i--) {
	if (arr[i].time <= 2) {
		arr.splice(i, 1); 
	}
}
// 删除指定位置项
arr.splice(1, 1);

// 是否是数组
const isArray = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return true;
  }
  return false;
}

// 对象深拷贝
JSON.parse(JSON.stringify(obj));

const cloneDeep = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const objType = Object.prototype.toString.call(obj);
  if (objType === '[object Array]') {
    const tmp = [];
    obj.map((item, key) => {
      tmp.push(cloneDeep(item));
    });
    return tmp;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  const tmp_obj = {};
  Object.keys(obj).map((item) => {
    tmp_obj[item] = cloneDeep(obj[item]);
  });
  return tmp_obj;
}

// reduce实现Array.map方法
Array.prototype.mapReduce = function(func) {
  const tmp = [];
  const _self = Object(this);
  _self.reduce((prev, cur, curIndex, arr) => {
    if (prev) {
      tmp.push(func(prev, curIndex - 1));
    } else {
      tmp.push(func(cur, curIndex));
    }
  });
  return tmp;
}


Array.prototype.map2 = function(fn) {
  const res = [];
  this.reduce((cur, pre, index, arr) => {
    res.push(fn(cur));
    return pre
  }, this[0]);
  return res;
}
// 数组去重