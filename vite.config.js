import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
  plugins: [
    react(),
    qrcode(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/react-auth-backend',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split React and ReactDOM into a separate chunk
        },
      },
    },
  },
});