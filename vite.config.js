import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  base: isVercel ? "/" : isProduction ? "/eventflow/" : "/",
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: `[name]-${Date.now()}.js`,
        chunkFileNames: `[name]-${Date.now()}.js`,
        assetFileNames: `[name]-${Date.now()}.[ext]`,
      },
    },
  },
  emptyOutDir: true,
});
