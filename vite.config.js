/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // All requests starting with /api/  →  forward to json-server
      '/api': {
        target: 'http://localhost:3000',       // json-server port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')   // remove /api prefix
      }
    }
  }
})
