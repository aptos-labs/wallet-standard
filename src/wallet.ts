// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { WalletWithAptosFeatures } from './features/index.js'

export interface AptosWallet extends WalletWithAptosFeatures {
  /**
   * Website URL of the Wallet. Should be an `https:` URL.
   *
   * @remarks
   * **Security:** This value is supplied by the wallet itself when it self-registers
   * with `@wallet-standard/core`. It is not validated by this library. Consumers
   * that render this URL as a link or pass it to `window.open()` MUST validate the
   * scheme (e.g., reject anything other than `https:`) to avoid `javascript:`
   * URI injection from a malicious wallet.
   */
  readonly url: string
}
