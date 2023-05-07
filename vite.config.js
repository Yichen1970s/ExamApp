import { fileURLToPath, URL } from "node:url";
  
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [vue()],

  server: {
    port: "5174",
    proxy: {
      "/api": {
        target: "https://lite.yfhl.net/",
        // target: "http://192.168.60.130:8101/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true
  },
});
