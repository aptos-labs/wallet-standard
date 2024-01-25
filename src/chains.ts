// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

export type ChainsId = `${string}:${string}` // e.g. 'aptos:devnet'
/** APTOS Devnet */
export const APTOS_DEVNET_CHAIN = 'aptos:devnet'

/** APTOS Testnet */
export const APTOS_TESTNET_CHAIN = 'aptos:testnet'

/** APTOS Localnet */
export const APTOS_LOCALNET_CHAIN = 'aptos:localnet'

/** APTOS Mainnet */
export const APTOS_MAINNET_CHAIN = 'aptos:mainnet'

export const APTOS_CHAINS = [
  APTOS_DEVNET_CHAIN,
  APTOS_TESTNET_CHAIN,
  APTOS_LOCALNET_CHAIN,
  APTOS_MAINNET_CHAIN
] as const

export type AptosChain =
  | typeof APTOS_DEVNET_CHAIN
  | typeof APTOS_TESTNET_CHAIN
  | typeof APTOS_LOCALNET_CHAIN
  | typeof APTOS_MAINNET_CHAIN
