// @ts-check
import { readFileSync } from 'node:fs';
import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { externals } from 'rollup-plugin-node-externals';

const root = process.cwd();
const pkgPath = path.resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const config = defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        format: "cjs",
        dir: path.dirname(pkg.main),
        preserveModules: true,
        preserveModulesRoot: "src",
        interop: "auto",
        exports: "named",
        sourcemap: true,
        entryFileNames: "[name].cjs",
      },
      {
        format: "esm",
        dir: path.dirname(pkg.module),
        preserveModules: true,
        preserveModulesRoot: "src",
        interop: "auto",
        exports: "named",
        sourcemap: true,
        generatedCode: "es2015",
        entryFileNames: "[name].mjs",
      },
    ],
    plugins: [
      externals({ deps: true, packagePath: pkgPath }),
      nodeResolve({
        extensions: [".ts"],
      }),
      esbuild({
        target: "es2021",
        jsx: "automatic",
      }),
      commonjs(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
]);

export default config;
