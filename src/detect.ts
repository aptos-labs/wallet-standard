// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import {
  getWallets,
  type Wallet,
  type WalletsEventsListeners,
  type WalletWithFeatures
} from '@wallet-standard/core'

import type { MinimallyRequiredFeatures } from './features'
import type { AptosWallet } from './wallet'

// These features are absolutely required for wallets to function in the Aptos ecosystem.
// Eventually, as wallets have more consistent support of features, we may want to extend this list.
const REQUIRED_FEATURES: (keyof MinimallyRequiredFeatures)[] = [
  'aptos:account',
  'aptos:connect',
  'aptos:disconnect',
  'aptos:network',
  'aptos:onAccountChange',
  'aptos:onNetworkChange',
  'aptos:signMessage',
  'aptos:signTransaction'
]

export function isWalletWithRequiredFeatureSet<AdditionalFeatures extends Wallet['features']>(
  wallet: Wallet,
  additionalFeatures: (keyof AdditionalFeatures)[] = []
): wallet is WalletWithFeatures<MinimallyRequiredFeatures & AdditionalFeatures> {
  return [...REQUIRED_FEATURES, ...additionalFeatures].every(
    (feature) => feature in wallet.features
  )
}

/**
 * Helper function to get only Aptos wallets
 * @returns Aptos compatible wallets and `on` event to listen to wallets register event
 */
export function getAptosWallets(): {
  aptosWallets: AptosWallet[]
  on: <E extends keyof WalletsEventsListeners>(
    event: E,
    listener: WalletsEventsListeners[E]
  ) => () => void
} {
  const { get, on } = getWallets()

  const wallets = get()

  const aptosWallets: Wallet[] = []

  wallets.forEach((wallet: Wallet) => {
    const isAptos = isWalletWithRequiredFeatureSet(wallet)

    if (isAptos) {
      aptosWallets.push(wallet)
    }
  })

  return { aptosWallets: aptosWallets as AptosWallet[], on }
}
