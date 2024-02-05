import { defineConfig } from 'tsup'
import type { Options, Format } from 'tsup'

// Ensure that these option fields are not undefined
type MandatoryOptions = Options & {
  outDir: string
  platform: string
  format: Format | Format[]
}

// Default config, used as a base template
const DEFAULT_CONFIG: Options = {
  bundle: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  minify: true,
  entry: ['src/index.ts'], // include all files under src
  skipNodeModulesBundle: true,
  sourcemap: true,
  splitting: true,
  target: 'es2020'
}

// Common.js config
const COMMON_CONFIG: MandatoryOptions = {
  ...DEFAULT_CONFIG,
  format: 'cjs',
  outDir: 'dist/common',
  platform: 'node'
}

// ESM config
const ESM_CONFIG: MandatoryOptions = {
  ...DEFAULT_CONFIG,
  entry: ['src/**/*.ts'],
  format: 'esm',
  outDir: 'dist/esm',
  platform: 'node'
}

export default defineConfig([COMMON_CONFIG, ESM_CONFIG])
