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
    }),
    // Temporary workaround to suppress Chrome DevTools warning about the missing
    {
      name: "suppress-chrome-devtools-route",
      configureServer(server) {
        server.middlewares.use(
          "/.well-known/appspecific/com.chrome.devtools.json",
          (_, res) => {
            res.statusCode = 204;
            res.end();
          }
        );
      },
    },
  ],
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
