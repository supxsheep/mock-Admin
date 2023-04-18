import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
//引入resolve
import { resolve } from "path";
// const { nprogressPlugin } = require('@vuepress/plugin-nprogress')
import vueI18n from "@intlify/vite-plugin-vue-i18n";

console.log(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //配置vueI18n
    vueI18n({
      include: resolve(__dirname, "./path/to/src/locales/**"),
    }),
    // nprogressPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "*": path.resolve(""),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 9090,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000", //目标url
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
        //重写路径,替换/api
      },
    },
  },
});
