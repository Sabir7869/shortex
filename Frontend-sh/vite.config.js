import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    open: false
  },
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    outDir: 'dist',
    sourcemap: true
  },
  esbuild: {
    target: 'es2015'
  },
  define: {
    global: 'globalThis'
  }
})
