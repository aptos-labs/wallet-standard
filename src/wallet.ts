// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Wallet } from '@wallet-standard/core'

export type { Wallet } from '@wallet-standard/core'

export interface AptosWallet extends Wallet {
  /**
   * Website URL of the Wallet
   */
  readonly url: string

  /**
   * Unique identifier of the Wallet.
   *
   * If not provided, the wallet name will be used as the identifier.
   */
  readonly id?: string
}
