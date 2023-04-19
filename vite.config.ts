import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    target: "ESNext",
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      {
        find: "~bootstrap",
        replacement: path.resolve(__dirname, "node_modules/bootstrap"),
      },
    ],
  },
});
