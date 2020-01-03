const acorn = require('acorn');
const code = 'var name = "hello ast";';
const ast = acorn.parse(code)

// https://github.com/acornjs/acorn/blob/master/acorn/src/tokentype.js
// [
//   {
//       "type": "Keyword",
//       "value": "var"
//   },
//   {
//       "type": "Identifier",
//       "value": "name"
//   },
//   {
//       "type": "Punctuator",
//       "value": "="
//   },
//   {
//       "type": "String",
//       "value": "'hello ast'"
//   },
//   {
//       "type": "Punctuator",
//       "value": ";"
//   }
// ]
console.log(ast);
