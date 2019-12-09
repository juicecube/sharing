/** 
 * Task2: 删除数组内指定位置的项，例如:
 * 输入: const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
 * 条件: const index = 2;
 * 输出: a = [{time: 1}, {time:2}, {time: 4}];
*/
let remove_by_index = (array, index) => array.filter((o, i) => i != index);