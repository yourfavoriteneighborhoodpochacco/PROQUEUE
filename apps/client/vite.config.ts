import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/players': 'http://localhost:3000',
      '/matches': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
});