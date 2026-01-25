import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import obfuscator from "rollup-plugin-obfuscator";

// https://vite.dev/config/
export default defineConfig({
  // 1. Base URL untuk sub-folder

  plugins: [
    react(),
    tailwindcss(),

    // 2. Setting Obfuscator (Hanya jalan saat build)
    obfuscator({
      apply: "build",
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
      },
    }),
  ],
});
