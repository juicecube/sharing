/** 
 * Task1: 删除一个不定长数组内不符合规则的所有项，例如:
 * 输入: const a = [{time: 1}, {time:2}, {time: 3}, {time: 4}];
 * 条件: time大于2;
 * 输出: a = [{time:3, time:4}];
*/
let remove = (array, fn) => array.filter(fn);