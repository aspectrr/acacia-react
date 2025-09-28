import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';
import { readFileSync } from 'fs';

// Load package.json using fs
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

// List external dependencies to exclude from the bundle
const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  'react/jsx-runtime',
];

export default defineConfig([
  // ESM build configuration
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      dir: 'lib/esm',
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
        inlineSources: true,
        outDir: 'lib/esm',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      postcss({
        minimize: true,
        modules: true,
        extract: 'lib/styles/index.css',
      }),
      terser(),
    ],
  },
  // CommonJS build configuration
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      dir: 'lib/cjs',
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
        inlineSources: true,
        outDir: 'lib/cjs',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      postcss({
        minimize: true,
        modules: true,
        extract: 'lib/styles/index.css',
        inject: false,
      }),
    ],
  },
  // Type declarations build
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib/types',
      format: 'es',
    },
    external,
    plugins: [dts()],
  },
]);
