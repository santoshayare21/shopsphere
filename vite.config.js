import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown expects a function form of manualChunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux'
          }
          if (id.includes('formik') || id.includes('node_modules/yup')) {
            return 'formik'
          }
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            /node_modules\/react\//.test(id)
          ) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
}))
