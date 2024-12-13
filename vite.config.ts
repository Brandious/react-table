import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default () => {
    
  return defineConfig({
      plugins: [react()],
      server: {
            proxy: {
            '/api': {
              target: process.env.VITE_IP,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
            }
  }})
}