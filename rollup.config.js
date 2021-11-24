import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';

import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import { generateSW  } from 'rollup-plugin-workbox';

export default {
  // Add extra entry points here if there are multiple to build
  input: 'src/index.html',

  output: [
    // ES module build
    {
      dir: 'dist',
      entryFileNames: '[name].[hash].[format].js',
    },
  ],

  // disable external module warnings
  // (JSPM / the import map handles these for us instead)
  onwarn(warning, warn) {
    if (warning.code === 'UNRESOLVED_IMPORT') return;
    warn(warning);
  },
  plugins: [
    generateSW({
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
    }),
    html({
      absoluteBaseUrl: 'https://michaelwestcott.me',
      minify: true,
      injectServiceWorker: true,
      serviceWorkerPath: 'dist/sw.js',
    }),
    nodeResolve({
      exportConditions: ['production'],
    }),
    terser({
      mangle: false,
    }),
    copy({
      targets: [
        { src: 'src/data.json', dest: 'dist' },
        { src: 'src/assets', dest: 'dist' },
      ],
    }),
  ],
};
