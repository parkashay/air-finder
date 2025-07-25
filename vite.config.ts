import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const pathsConfig: () => PluginOption = () => ({
  name: "paths-alias",
  config: () => ({
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  }),
});

export default defineConfig({
  plugins: [react(), tailwindcss(), pathsConfig()],
});
