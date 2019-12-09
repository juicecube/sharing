import * as _ from 'lodash-es';

const fun1 = function() {
  return _.assign({});
}

const fun2 = function() {
  return {};
}

export {
  fun1,
  fun2,
}