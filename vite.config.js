import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/dev-portfolio-react-tailwind/',
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
})
