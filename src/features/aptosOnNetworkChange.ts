// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from '../misc'

/** Version of the feature. */
export type AptosOnNetworkChangeVersion = '1.0.0'
/** Name of the feature. */
export const AptosOnNetworkChangeNamespace = 'aptos:onNetworkChange'
/** TODO: docs */
export type AptosOnNetworkChangeFeature = {
  /** Namespace for the feature. */
  [AptosOnNetworkChangeNamespace]: {
    /** Version of the feature API. */
    version: AptosOnNetworkChangeVersion
    onNetworkChange: AptosOnNetworkChangeMethod
  }
}
/** TODO: docs */
export type AptosOnNetworkChangeMethod = (input: AptosOnNetworkChangeInput) => Promise<void>
/** TODO: docs */
export type AptosOnNetworkChangeInput = (newNetwork: NetworkInfo) => void
