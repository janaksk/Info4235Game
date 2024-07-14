import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    root: './src',
    build: {
      outDir: '../dist',
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
