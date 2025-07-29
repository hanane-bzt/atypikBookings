import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssr: {
    noExternal: ['react-loader-spinner'], // Ajoute ici les modules CommonJS
  },
  build: {
    ssr: 'src/ssr.jsx',
    outDir: 'dist/server',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/ssr.jsx'),
    },
  },
});
