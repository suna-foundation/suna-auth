import {defineConfig} from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/types/index.ts",
    "src/client/index.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  splitting: true, //codegen splitting
  sourcemap: true,
  clean: false,
  dts: {
    entry: ['src/index.ts', 'src/client/index.ts', 'src/types/index.ts'],
  },
});