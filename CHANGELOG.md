# aptos-wallet-standard Changelog

All notable changes to the aptos-wallet-standard tool will be captured in this file. This changelog is written by hand for now. It adheres to the format set out by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

# 2.0.0 (2026-05-21)

- Add **Vitest** test runner with V8 coverage (`pnpm test`, `pnpm test:watch`, `pnpm test:coverage`).
- Add unit tests covering the public behaviors of the package: `AccountInfo` BCS wire format and round-trip for every `SigningScheme` variant, `detect.isWalletWithRequiredFeatureSet` / `getAptosWallets` filtering, `AptosWalletError` invariants, and the externally observable chain identifiers, feature namespaces, and `UserResponseStatus` values.
- Add a `Test + Coverage` CI job that uploads `lcov` to Codecov via tokenless OIDC (`codecov/codecov-action@v5`); add `codecov.yml`.
- Publish the package as **ESM-only**: set `type` to `module`, expose a single `./dist/index.js` entry (no `require` / CommonJS branch), and build with `tsc` using `module` / `moduleResolution` `NodeNext`.
- Emit TypeScript declarations (`declaration` / `declarationMap`) into `dist` alongside compiled JS.
- Use `.js` file extensions on relative import and export specifiers so the published output resolves under Node’s native ESM loader.
- Drop the top-level `main` field and point `types` and `exports` at the unified `dist` layout (remove the previous `dist/common` and `dist/esm` split and remove **tsup** from the toolchain).
- Change the `dev` script to `tsc --watch` (watch mode is passed to the compiler directly).
- Update `example/basic` for ESM: add `type: module` and declare direct dependencies on `@aptos-labs/ts-sdk` and `@wallet-standard/core` (in addition to the workspace package).

# 1.0.0 (2026-03-12)

- Remove support for Node < 22
- Support ts-sdk version 6.x.x, remove support for ts-sdk version < 5.x.x
- Replace Prettier with Biome for formatting and linting
- Add recommended Biome lint rules (import type enforcement, import sorting)
- Fix `.map()` misuse in `detect.ts` (changed to `.forEach()` for side-effect-only iteration)
- Clean up build configuration (tsconfig, tsup, package.json)
- Add `isolatedModules` to tsconfig for esbuild compatibility
- Remove stale tsconfig options (`declarationDir`, `experimentalDecorators`, `allowJs`, `declarationMap`)
- Remove non-existent `packages` from tsconfig include
- Use single entry point for both CJS and ESM builds (removes excessive chunk files)
- Set `platform: 'neutral'` for runtime-agnostic output
- Move `splitting` to ESM config only
- Remove stale `build:tsup` and `build:types` scripts
- Simplify `clean` script
- Add `sideEffects: false` for better tree-shaking

# 0.5.2 (2025-09-15)

- Support ts-sdk version 5.x.x in addition to 4.x.x
- Support ts-sdk version 4.x.x in addition to 3.x.x

# 0.5.0 (2025-05-26)

- [breaking] Update `signIn` interfaces to match the interface requirements in [AIP-116](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-116.md). Renamed `AptosSignInRequiredFields` to `AptosSignInBoundFields`.

# 0.4.0 (2025-05-07)

- Bump aptos ts-sdk version to 2.0.0
