import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//const backendTarget = process.env.VITE_API_BASE_URL || 'http://localhost:8080'
const backendTarget = process.env.VITE_API_BASE_URL || 'https://kreditnikalkulator.eu-central-1.elasticbeanstalk.com'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
