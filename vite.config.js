import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Uključujemo oba paketa koja rade probleme s CommonJS uvozom
    include: ['@hello-pangea/dnd', 'react-helmet-async']
  },
  build: {
    commonjsOptions: {
      // Regularnim izrazom obuhvaćamo oba paketa unutar node_modules
      include: [/@hello-pangea\/dnd/, /react-helmet-async/, /node_modules/]
    }
  }
})