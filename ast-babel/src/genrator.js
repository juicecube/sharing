// generator
const babelParser = require("@babel/parser");
const generate = require("@babel/generator");

const astA = babelParser.parse("var a = 1;");
const astB = babelParser.parse("var b = 2;");
const ast = {
  type: "Program",
  body: [].concat(astA.program.body, astB.program.body)
};

const { code } = generate.default(ast);
console.log(code);