const babel = require('@babel/core');
const types = require('babel-types');
// https://www.npmjs.com/package/babel-types


let visitor = {
  // path是当前遍历的路径节点
  ArrowFunctionExpression(path) {
    // 当前箭头函数节点的参数  
    let params = path.node.params;
    // blockStatement
    let blockStatement = types.blockStatement([
        types.returnStatement(types.binaryExpression(
            '+',
            types.identifier('a'),
            types.identifier('b')
        ))
    ])
    let func = types.functionExpression(null, params, blockStatement, false, false )
    path.replaceWith(func);
  }
}

//源代码
const code = `const add = (a,b) => a + b;` 

// babel暴露了一个transform的方法，完成这个三个过程
// https://babeljs.io/docs/en/options#plugins
babel.transform(code, {
  plugins: [
    {
      visitor // visitor is a plugin object, 可以对特定类型的节点进行处理
    }
  ]
}, (err, result) => {
  if (err) {
    console.log('err is', err);
  }
  console.log('result is', result.code);
})

