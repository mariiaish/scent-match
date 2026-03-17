import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/openrouter-api': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openrouter-api/, ''),
        secure: false,
      },
    },
  },
});
