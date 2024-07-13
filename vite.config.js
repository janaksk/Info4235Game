import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    nodePolyfills(),
  ],
});
