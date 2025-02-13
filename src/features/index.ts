// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierRecord, WalletWithFeatures } from '@wallet-standard/core'

import type { AptosSignAndSubmitTransactionFeature } from './aptosSignAndSubmitTransaction'
import { AptosSignMessageFeature } from './aptosSignMessage'
import { AptosGetAccountFeature } from './aptosGetAccount'
import { AptosConnectFeature } from './aptosConnect'
import { AptosGetNetworkFeature } from './aptosGetNetwork'
import { AptosOnAccountChangeFeature } from './aptosOnAccountChange'
import { AptosOnNetworkChangeFeature } from './aptosOnNetworkChange'
import { AptosSignTransactionFeature } from './aptosSignTransaction'
import { AptosDisconnectFeature } from './aptosDisconnect'
import { AptosOpenInMobileAppFeature } from './aptosOpenInMobileApp'
import { AptosChangeNetworkFeature } from './aptosChangeNetwork'
import { AptosSignInFeature } from './aptosSignIn'

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

export * from './aptosSignAndSubmitTransaction'
export * from './aptosSignMessage'
export * from './aptosGetAccount'
export * from './aptosConnect'
export * from './aptosGetNetwork'
export * from './aptosOnAccountChange'
export * from './aptosOnNetworkChange'
export * from './aptosChangeNetwork'
export * from './aptosDisconnect'
export * from './aptosSignTransaction'
export * from './aptosOpenInMobileApp'
export * from './aptosSignIn'
