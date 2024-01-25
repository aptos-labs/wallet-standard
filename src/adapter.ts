// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { StandardDisconnectMethod } from '@wallet-standard/core'
import {
  AptosGetAccountMethod,
  AptosChangeNetworkMethod,
  AptosConnectMethod,
  AptosGetNetworkMethod,
  AptosOnAccountChangeMethod,
  AptosOnNetworkChangeMethod,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageMethod,
  AptosFeatures
} from './features'
import { ChainsId } from './chains'

export interface AptosAdapter {
  name: string
  chains: ChainsId[]
  features: AptosFeatures
  url: string
  icon: `data:image/${'svg+xml' | 'webp' | 'png' | 'gif'};base64,${string}`
  getAccount: AptosGetAccountMethod
  getNetwork: AptosGetNetworkMethod
  connect: AptosConnectMethod
  disconnect: StandardDisconnectMethod
  changeNetwork: AptosChangeNetworkMethod
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod
  signMessage: AptosSignMessageMethod
  onAccountChange: AptosOnAccountChangeMethod
  onNetworkChange: AptosOnNetworkChangeMethod
}
