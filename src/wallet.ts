// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { WalletWithAptosFeatures } from './features/index.js'

export interface AptosWallet extends WalletWithAptosFeatures {
  /**
   * Website URL of the Wallet
   */
  readonly url: string
}
