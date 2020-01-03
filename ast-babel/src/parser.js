// parser
const babelParser = require("@babel/parser");

const code = 'var name = "hello ast";';

let ast = babelParser.parse(code);
console.log(ast);