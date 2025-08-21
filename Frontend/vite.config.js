import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      include: "**/*.{jsx,tsx,js,ts}",
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]s$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
