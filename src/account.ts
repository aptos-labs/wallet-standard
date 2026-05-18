// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { SigningScheme } from '@aptos-labs/ts-sdk'
import type { WalletAccount } from '@wallet-standard/core'

export interface AptosWalletAccount extends WalletAccount {
  readonly signingScheme: SigningScheme
}
