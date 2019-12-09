// 删除一个不定长数组内不符合规则的所有项

export function delete_item(arr, num) {
  return arr.filter(item => item.time > num)
}

// 删除数组内指定位置的项

export function delete_one(arr, index) {
  if (index < 1) throw '值必须大于1'
  arr.splice(index - 1, 1)
  return arr
}

// 怎么判断一个变量是不是数组

export function is_arr(arr) {
  return arr instanceof Array
}



// 数组去重

export function rest_arr(arr) {
  return [...new Set(arr)]
}


// 怎么扁平化一个数组
export function flat_arr(arr) {
  return arr.flat()
}