import baseConfig from './rollup.base';
import serve from 'rollup-plugin-serve';

export default {
  input: baseConfig.input,
  output: [
    {
      file: "build/bundle.js",
      format: "umd",
      name: "app",
      sourcemap: true
    },
    {
      file: "build/bundle1.js",
      format: "cjs",
      name: "app",
      sourcemap: true
    },
    {
      file: "build/bundle2.js",
      format: "esm",
      name: "app",
      sourcemap: true
    }
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 8080,
      contentBase: ['']
    })
  ]
}