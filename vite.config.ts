import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  ssr: {
    noExternal: ["react-router", "@react-router/node", "@react-router/serve"]
  },
  optimizeDeps: {
    exclude: ["@react-router/dev"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(__dirname, "app/styles/colors.scss")}" as *;`
      }
    }
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        }
      }
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    css: true
  }
});
