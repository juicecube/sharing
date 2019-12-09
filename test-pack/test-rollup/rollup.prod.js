import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';

import baseConfig from './rollup.base';

export default {
  input: baseConfig.input,
  output: [
    {
      file: "build/bundle.js",
      format: "umd",
      name: "app",
      sourcemap: true
    },
  ],
  plugins: [
    ...baseConfig.plugins,
    terser(),
    // logs the filesize in cli when done
    filesize(),

    // Progress while building
    progress({ clearLine: false }),
  ]
}