import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"; 
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
      // ↓解析配置
    resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src")
      }
    }
})