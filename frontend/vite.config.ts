import { fileURLToPath, URL } from 'node:url'
import { defineConfig, ServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // server: (() => {
  //   const data: ServerOptions = {
  //     host: true,
  //     proxy: {
  //       '/api': {
  //         target: 'http://127.0.0.1:8000', // 'https://cix.proto-dev.netsdl.co.jp/api',
  //         changeOrigin: true,
  //         secure: false,
  //         rewrite: (path) => path.replace(/^\/api/, '')
  //       }
  //     }
  //   }
  //   return data
  // })()
})
