// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from '../misc'

/** Version of the feature. */
export type AptosGetNetworkVersion = '1.0.0'
/** Name of the feature. */
export const AptosGetNetworkNamespace = 'aptos:network'

export type AptosGetNetworkFeature = {
  /** Namespace for the feature. */
  [AptosGetNetworkNamespace]: {
    /** Version of the feature API. */
    version: AptosGetNetworkVersion
    network: AptosGetNetworkMethod
  }
}

export type AptosGetNetworkMethod = () => Promise<AptosGetNetworkOutput>

export type AptosGetNetworkOutput = NetworkInfo
