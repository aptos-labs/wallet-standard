// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { AccountInfo } from '../AccountInfo'

/** Version of the feature. */
export type AptosOnAccountChangeVersion = '1.0.0'
/** Name of the feature. */
export const AptosOnAccountChangeNamespace = 'aptos:onAccountChange'
/** TODO: docs */
export type AptosOnAccountChangeFeature = {
  /** Namespace for the feature. */
  [AptosOnAccountChangeNamespace]: {
    /** Version of the feature API. */
    version: AptosOnAccountChangeVersion
    onAccountChange: AptosOnAccountChangeMethod
  }
}
/** TODO: docs */
export type AptosOnAccountChangeMethod = (input: AptosOnAccountChangeInput) => Promise<void>
/** TODO: docs */
export type AptosOnAccountChangeInput = (newAccount: AccountInfo) => void
