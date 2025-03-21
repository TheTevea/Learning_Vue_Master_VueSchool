import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import path from "node:path";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    VueRouter(),
    vueDevTools(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith("iconify-icon"),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
