import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'

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
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: '0.0.0.0', // Add this to allow external connections
    port: 5173, // Explicitly set the port (optional)
  }
})