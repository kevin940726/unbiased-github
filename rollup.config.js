import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import vars from 'postcss-simple-vars';
import { USER_NAME_SELECTOR } from './src/css-variables';

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
        extract: true,
        plugins: [
          vars({
            variables: {
              USER_NAME_SELECTOR,
            },
          }),
        ],
      }),
    ],
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background.js',
      format: 'cjs',
    },
  },
];
