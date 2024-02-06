// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { WalletWithAptosFeatures } from './features'

export interface AptosWallet extends WalletWithAptosFeatures {
  /**
   * Website URL of the Wallet
   */
  readonly url: string
}
