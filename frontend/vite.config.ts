import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  // preview/dev: same-origin /api so the DB-down 503 path matches production
  preview: {
    proxy: { "/api": { target: "https://www.4yang-xyao.site", changeOrigin: true } },
  },
  build: {
    // split stable vendors into cacheable chunks; routes are lazy-loaded in App.tsx
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]framer-motion[\\/]/.test(id)) return "vendor-motion";
          if (/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id))
            return "vendor-react";
          if (/[\\/]@tanstack[\\/]react-query[\\/]/.test(id)) return "vendor-query";
          if (/[\\/](i18next|react-i18next)[\\/]/.test(id)) return "vendor-i18n";
        },
      },
    },
  },
});
