// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Wallet, WalletWithFeatures, getWallets } from '@wallet-standard/core'

import { MinimallyRequiredFeatures, WalletWithAptosFeatures } from './features'

// These features are absolutely required for wallets to function in the Aptos ecosystem.
// Eventually, as wallets have more consistent support of features, we may want to extend this list.
const REQUIRED_FEATURES: (keyof MinimallyRequiredFeatures)[] = [
  'aptos:account',
  'aptos:connect',
  'aptos:disconnect',
  'aptos:onAccountChange',
  'aptos:onNetworkChange',
  'aptos:signAndSubmitTransaction',
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

export function getAptosWallets(): WalletWithAptosFeatures[] {
  const { get } = getWallets()

  const wallets = get()

  const aptosWallets: Wallet[] = []

  wallets.map((wallet: Wallet) => {
    const isAptos = isWalletWithRequiredFeatureSet(wallet)

    if (isAptos) {
      aptosWallets.push(wallet)
    }
  })

  return aptosWallets as WalletWithAptosFeatures[]
}
