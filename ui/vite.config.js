import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("react")) {
                        return "vendor";
                    }
                    if (id.includes("framer-motion")) {
                        return "motion";
                    }
                },
            },
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
