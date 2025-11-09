import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  base: isProduction ? "/eventflow/" : "/",
  // Add this line to build to docs folder instead of dist
  build: {
    outDir: "docs",
  },
});
