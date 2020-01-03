const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

const code = `const a = 1 ?? 1`;
  
const ast = parser.parse(code);

traverse.default(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  }
});
console.log('ast is', ast);

