import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import path from "node:path";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    VueRouter(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        VueRouterAutoImports,
        {
          pinia: [
            "defineStore",
            "createPinia",
            "storeToRefs",
            "acceptHMRUpdate",
          ],
        },
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: ["src/stores"],
    }),
    Components({
      /* options */
    }),
    vueDevTools(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith("iconify-icon"),
        },
      },
    }),
    AutoImport({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
