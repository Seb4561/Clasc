import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Asegúrate de que esta línea tenga el nombre del repo correctamente:
export default defineConfig({
  base: 'clasc.co', // Cambia a '/' para dominio personalizado
  plugins: [react()]
})
