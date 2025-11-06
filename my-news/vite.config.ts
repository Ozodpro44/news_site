import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Позволяет заходить на сайт с других устройств в локальной сети
    port: 8080, // Порт, на котором запустится dev-сервер
  },
  plugins: [
    react(), // Используем SWC для компиляции React
    mode === "development" && componentTagger(), // Только при dev-режиме
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Чтобы можно было писать "@/components/..."
    },
  },
}));
