// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierRecord, WalletWithFeatures } from '@wallet-standard/core'
import type { AptosChangeNetworkFeature } from './aptosChangeNetwork.js'
import type { AptosConnectFeature } from './aptosConnect.js'
import type { AptosDisconnectFeature } from './aptosDisconnect.js'
import type { AptosGetAccountFeature } from './aptosGetAccount.js'
import type { AptosGetNetworkFeature } from './aptosGetNetwork.js'
import type { AptosOnAccountChangeFeature } from './aptosOnAccountChange.js'
import type { AptosOnNetworkChangeFeature } from './aptosOnNetworkChange.js'
import type { AptosOpenInMobileAppFeature } from './aptosOpenInMobileApp.js'
import type { AptosSignAndSubmitTransactionFeature } from './aptosSignAndSubmitTransaction.js'
import type { AptosSignInFeature } from './aptosSignIn.js'
import type { AptosSignMessageFeature } from './aptosSignMessage.js'
import type { AptosSignTransactionFeature } from './aptosSignTransaction.js'

/**
 * Wallet Standard features that are unique to Aptos, and that all Aptos wallets are expected to implement.
 */
export type AptosFeatures = AptosConnectFeature &
  AptosGetAccountFeature &
  AptosGetNetworkFeature &
  AptosOnAccountChangeFeature &
  AptosOnNetworkChangeFeature &
  AptosSignMessageFeature &
  AptosSignTransactionFeature &
  //AptosChangeNetworkFeature is optional
  Partial<AptosChangeNetworkFeature> &
  //AptosOpenInMobileAppFeature is optional
  Partial<AptosOpenInMobileAppFeature> &
  //AptosSignAndSubmitTransactionFeature is optional
  Partial<AptosSignAndSubmitTransactionFeature> &
  //AptosSignInFeature is optional
  Partial<AptosSignInFeature> &
  AptosDisconnectFeature
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

export * from './aptosChangeNetwork.js'
export * from './aptosConnect.js'
export * from './aptosDisconnect.js'
export * from './aptosGetAccount.js'
export * from './aptosGetNetwork.js'
export * from './aptosOnAccountChange.js'
export * from './aptosOnNetworkChange.js'
export * from './aptosOpenInMobileApp.js'
export * from './aptosSignAndSubmitTransaction.js'
export * from './aptosSignIn.js'
export * from './aptosSignMessage.js'
export * from './aptosSignTransaction.js'
