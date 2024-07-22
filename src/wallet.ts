// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { AptosWalletAccount, AptosWalletMultiSigAccount } from './account'
import { WalletWithAptosFeatures } from './features'

/**
 * Interafce for a single signer Aptos wallet
 */
export interface AptosWallet extends Omit<WalletWithAptosFeatures, 'accounts'> {
  /**
   * Website URL of the Wallet
   */
  readonly url: string

  readonly accounts: AptosWalletAccount[] | AptosWalletMultiSigAccount[]
}
