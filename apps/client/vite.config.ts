import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@proqueue/shared': resolve(__dirname, '../../packages/shared'),
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