import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

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
