// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Wallet, WalletWithFeatures } from '@wallet-standard/core'

import { MinimallyRequiredFeatures } from './features'

// These features are absolutely required for wallets to function in the Aptos ecosystem.
// Eventually, as wallets have more consistent support of features, we may want to extend this list.
const REQUIRED_FEATURES: (keyof MinimallyRequiredFeatures)[] = [
  'aptos:connect',
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
