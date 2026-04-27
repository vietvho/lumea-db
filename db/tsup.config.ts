import {defineConfig} from "tsup";

export default defineConfig ({
    entry: {
        index: "src/index.ts",
        schema: "src/schema.ts"
    },
    format: ["esm"],
    dts:{
        resolve: true
    },
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    target: "es2022"
})