import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG', '**/*.mp4'],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
          gsap: ['gsap'], // Pisahkan GSAP untuk performa lebih baik
          ogl: ['ogl'],   // Pisahkan OGL (WebGL library untuk cursor/threads)
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Optimasi tambahan
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Hapus console.log juga
      },
    },
    // CSS optimization
    cssCodeSplit: true,
    // Reduce initial bundle
    target: 'esnext',
    // Improve source map for production debugging
    sourcemap: false,
  },
  // Optimasi development
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Optimasi dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['gsap'], // Exclude GSAP from pre-bundling untuk performa dev
  },
})
