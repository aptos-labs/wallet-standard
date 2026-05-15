// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import {
  getWallets,
  type Wallet,
  type WalletsEventsListeners,
  type WalletWithFeatures
} from '@wallet-standard/core'

import type { MinimallyRequiredFeatures } from './features/index.js'
import type { AptosWallet } from './wallet.js'

// These features are absolutely required for wallets to function in the Aptos ecosystem.
// Eventually, as wallets have more consistent support of features, we may want to extend this list.
// Each required feature is paired with the method name it must expose, so that a stub wallet
// registering empty/null feature objects fails the check rather than passing the type predicate
// and throwing later when the dApp invokes the missing method.
const REQUIRED_FEATURE_METHODS: { readonly [K in keyof MinimallyRequiredFeatures]: string } = {
  'aptos:account': 'account',
  'aptos:connect': 'connect',
  'aptos:disconnect': 'disconnect',
  'aptos:network': 'network',
  'aptos:onAccountChange': 'onAccountChange',
  'aptos:onNetworkChange': 'onNetworkChange',
  'aptos:signMessage': 'signMessage',
  'aptos:signTransaction': 'signTransaction'
}

export function isWalletWithRequiredFeatureSet<AdditionalFeatures extends Wallet['features']>(
  wallet: Wallet,
  additionalFeatures: (keyof AdditionalFeatures)[] = []
): wallet is WalletWithFeatures<MinimallyRequiredFeatures & AdditionalFeatures> {
  for (const [feature, method] of Object.entries(REQUIRED_FEATURE_METHODS)) {
    const impl = (wallet.features as Record<string, unknown>)[feature]
    if (typeof impl !== 'object' || impl === null) return false
    if (typeof (impl as Record<string, unknown>)[method] !== 'function') return false
  }
  return additionalFeatures.every((feature) => (feature as string) in wallet.features)
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
  const aptosWallets = get().filter((w) => isWalletWithRequiredFeatureSet(w)) as AptosWallet[]
  return { aptosWallets, on }
}
