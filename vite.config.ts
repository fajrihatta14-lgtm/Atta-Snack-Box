import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // 1. Wajib untuk GitHub Pages + Custom Domain (attasnackbox.shop)
    base: '/',

    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // 2. Ubah '.' menjadi './src' agar impor @/ mengarah ke folder src
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});