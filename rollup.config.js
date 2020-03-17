import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import vars from 'postcss-simple-vars';
import prefixer from 'postcss-prefix-selector';
import {
  USER_NAME_SELECTOR,
  PREFIX,
  SEE_NO_EVIL_IMAGE,
  MONKEY_FACE_IMAGE,
} from './src/css-variables';

export default [
  {
    input: 'src/content.js',
    output: {
      file: 'dist/content.js',
      format: 'iife',
    },
    plugins: [
      copy({
        targets: [{ src: 'src/manifest.json', dest: 'dist' }],
      }),
      postcss({
        extract: 'dist/content.css',
        plugins: [
          vars({
            variables: {
              USER_NAME_SELECTOR,
              SEE_NO_EVIL_IMAGE,
              MONKEY_FACE_IMAGE,
            },
          }),
          prefixer({
            prefix: PREFIX,
            // Ignore prefixing if the selector starts with html
            exclude: [/^html/],
          }),
        ],
      }),
      resolve(),
    ],
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background.js',
      format: 'cjs',
    },
    plugins: [resolve()],
  },
];
