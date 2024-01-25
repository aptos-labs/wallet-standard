// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type {
  IdentifierRecord,
  StandardDisconnectFeature,
  WalletWithFeatures
} from '@wallet-standard/core'

import type { AptosSignAndSubmitTransactionFeature } from './aptosSignAndSubmitTransaction'
import { AptosSignMessageFeature } from './aptosSignMessage'
import { AptosGetAccountFeature } from './aptosGetAccount'
import { AptosConnectFeature } from './aptosConnect'
import { AptosGetNetworkFeature } from './aptosGetNetwork'
import { AptosOnAccountChangeFeature } from './aptosOnAccountChange'
import { AptosOnNetworkChangeFeature } from './aptosOnNetworkChange'
import { AptosChangeNetworkFeature } from './aptosChangeNetwork'
import { AptosSignTransactionFeature } from './aptosSignTransaction'

/**
 * Wallet Standard features that are unique to Aptos, and that all Aptos wallets are expected to implement.
 */
export type AptosFeatures = AptosSignAndSubmitTransactionFeature &
  AptosSignTransactionFeature &
  AptosSignMessageFeature &
  AptosConnectFeature &
  AptosOnAccountChangeFeature &
  AptosOnNetworkChangeFeature &
  AptosGetNetworkFeature &
  AptosChangeNetworkFeature &
  AptosGetAccountFeature &
  StandardDisconnectFeature

/**
 * Represents a wallet with all Aptos features.
 */
export type WalletWithAptosFeatures = WalletWithFeatures<AptosFeatures>
/**
 * Represents a wallet with the absolute minimum feature set required to function in the Aptos ecosystem.
 */
export type WalletWithRequiredFeatures = WalletWithFeatures<
  MinimallyRequiredFeatures & IdentifierRecord<unknown>
>
/**
 * Represents the absolute minimum feature set required to function in the Aptos ecosystem.
 */
export type MinimallyRequiredFeatures = AptosFeatures

export * from './aptosSignAndSubmitTransaction'
export * from './aptosSignMessage'
export * from './aptosGetAccount'
export * from './aptosConnect'
export * from './aptosGetNetwork'
export * from './aptosOnAccountChange'
export * from './aptosOnNetworkChange'
export * from './aptosChangeNetwork'
