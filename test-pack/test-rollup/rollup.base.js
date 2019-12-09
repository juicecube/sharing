import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import typescript from "rollup-plugin-typescript";
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

export default {
  input: "src/index.tsx",
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        'react': ['createElement', 'Component' ],
        'react-dom': ['render']
      }
    }),
    postcss({
      minimize: true, // uses cssnano behind scene
      modules: false, // enable css modules
      extensions: ['.css', '.scss', '.sass'], // uses node-sass
    }),
    image(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    typescript(),
    // babel({
    //   runtimeHelpers: true,
    //   exclude: 'node_modules/**' // only transpile our source code
    // })
  ]
}