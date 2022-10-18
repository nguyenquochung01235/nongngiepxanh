import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getThemeVariables } from "antd/dist/theme.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...getThemeVariables({
            dark: false,
            // compact: true,
          }),
          "@primary-color": "#40aa41",
        },
        javascriptEnabled: true,
      },
    },
  },
});
