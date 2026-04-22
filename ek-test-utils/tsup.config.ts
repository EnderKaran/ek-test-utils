import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@testing-library/jest-dom',
  ],
  treeshake: true,
  target: 'es2020',
  tsconfig: './tsconfig.json',
});