import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import copy from 'rollup-plugin-copy';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    root: './src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        plugins: [
          copy({
            targets: [
              { src: 'src/assets/**/*', dest: 'dist/assets' }
            ]
          })
        ]
      }
    },
    define: {
      'import.meta.env': {
        ...env, // Include the loaded environment variables
      },
    },
    plugins: [
      nodePolyfills(),
    ],
  };
});
