import type { Format, Options } from 'tsup'
import { defineConfig } from 'tsup'

// Ensure that these option fields are not undefined
type MandatoryOptions = Options & {
  outDir: string
  platform: string
  format: Format | Format[]
}

// Default config, used as a base template
const DEFAULT_CONFIG: Options = {
  bundle: true,
  clean: true,
  dts: true,
  minify: true,
  entry: ['src/index.ts'],
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: 'es2022'
}

// Common.js config
const COMMON_CONFIG: MandatoryOptions = {
  ...DEFAULT_CONFIG,
  format: 'cjs',
  outDir: 'dist/common',
  platform: 'neutral'
}

// ESM config
const ESM_CONFIG: MandatoryOptions = {
  ...DEFAULT_CONFIG,
  format: 'esm',
  outDir: 'dist/esm',
  platform: 'neutral',
  splitting: true
}

export default defineConfig([COMMON_CONFIG, ESM_CONFIG])
