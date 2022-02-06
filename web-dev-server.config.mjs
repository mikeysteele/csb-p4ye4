import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  open: true,
  nodeResolve: {
    exportConditions: ['development'],
  },
  appIndex: 'index.html',
  rootDir: 'src',
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
  ],
};
