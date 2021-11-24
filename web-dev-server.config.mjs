import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

export default {
  open: true,
  nodeResolve: {
    exportConditions: ['development'],
  },
  appIndex: 'index.html',
  rootDir: 'src',
  plugins: [
    hmrPlugin({
      include: ['src/**/*'],
      presets: [presets.litElement]
    }),
  ],
};
