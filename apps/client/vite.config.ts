import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@proqueue/shared': resolve(__dirname, '../../packages/shared'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimizeDeps: {
    include: ['@proqueue/shared'],
    extensions: ['.ts', '.tsx'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    proxy: {
      '/players': 'http://localhost:3000',
      '/matches': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
});