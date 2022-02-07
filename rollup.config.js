import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { generateSW } from 'rollup-plugin-workbox';
import esbuild from 'rollup-plugin-esbuild'

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  // Add extra entry points here if there are multiple to build
  input: 'src/index.html',

  output: [
    // ES module build
    {
      dir: 'dist',
      entryFileNames: '[name].[hash].[format].js',
      chunkFileNames: 'chunk.[hash].[format].js',
      format: 'es',
    },
  ],

  // disable external module warnings
  // (JSPM / the import map handles these for us instead)
  onwarn(warning, warn) {
    if (warning.code === 'UNRESOLVED_IMPORT') return;
    warn(warning);
  },
  plugins: [
    esbuild({
      tsconfig: 'tsconfig.app.json',
      minify: true
    }),
    generateSW({
      navigateFallback: '/index.html',
      // where to output the generated sw
      swDest: path.join('dist', 'sw.js'),
      // directory to match patterns against to be precached
      globDirectory: path.join('dist'),
      // cache any html js and css by default
      globPatterns: ['**/*.{html,js,css,webmanifest,json,jpg}'],
      skipWaiting: true,
      clientsClaim: true,
    }),
    html({
      absoluteBaseUrl: 'https://michaelwestcott.me',
      minify: true,
      injectServiceWorker: true,
      serviceWorkerPath: 'dist/sw.js',
    }),
    nodeResolve({
      exportConditions: ['production'],
      extensions
    }),   
    copy({
      targets: [
        { src: 'src/data.json', dest: 'dist' },
        { src: 'src/assets/images', dest: 'dist/assets' },
      ],
    }),
  ],
};
