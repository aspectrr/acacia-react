import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
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
  'react',
  'react-dom',
  'react/jsx-runtime',
];

// Components that should have 'use client' directive
const clientComponents = ['AcaciaWrapper', 'AcaciaDashboard'];

// Plugin to add 'use client' directive to component files
const addUseClientDirective = () => {
  return {
    name: 'add-use-client-directive',
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName];
        // Check if this chunk is one of our client components
        if (
          chunk.type === 'chunk' &&
          clientComponents.some((comp) => fileName.includes(comp))
        ) {
          chunk.code = `'use client';\n\n${chunk.code}`;
        }
      });
    },
  };
};

// Shared plugins to reduce duplication
const basePlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }),
  commonjs(),
  postcss({
    minimize: true,
    modules: true,
    extract: 'lib/styles/index.css',
    inject: false,
  }),
];

export default defineConfig([
  // ESM build configuration
  {
    input: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
      'components/AcaciaWrapper': 'src/components/AcaciaWrapper.tsx',
      'components/AcaciaDashboard': 'src/components/AcaciaDashboard.tsx',
      'utils/index': 'src/utils/index.ts',
      'types/index': 'src/types/index.ts',
    },
    output: {
      format: 'esm',
      dir: 'lib/esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    external,
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
        outDir: './lib/esm',
        rootDir: './src',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      addUseClientDirective(),
    ],
  },
  // CommonJS build configuration
  {
    input: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
      'components/AcaciaWrapper': 'src/components/AcaciaWrapper.tsx',
      'components/AcaciaDashboard': 'src/components/AcaciaDashboard.tsx',
      'utils/index': 'src/utils/index.ts',
      'types/index': 'src/types/index.ts',
    },
    output: {
      format: 'cjs',
      dir: 'lib/cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named',
      sourcemap: true,
    },
    external,
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
        outDir: './lib/cjs',
        rootDir: './src',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      addUseClientDirective(),
    ],
  },
  // Type declarations
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib/types',
      format: 'esm',
    },
    external,
    plugins: [dts()],
  },
]);
