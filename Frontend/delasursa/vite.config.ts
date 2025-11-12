import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // adresa serverului backend
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // opțional, dacă backend-ul nu are prefix /api
      },
    },
  },
});
