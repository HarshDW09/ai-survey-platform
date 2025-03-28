import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-survey-platform/', // Important for GitHub Pages
  build: {
    outDir: 'dist'
  }
})