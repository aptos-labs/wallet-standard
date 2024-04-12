// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo, UserResponse } from '../misc'

/** Version of the feature. */
export type AptosChangeNetworkVersion = '1.0.0'
/** Name of the feature. */
export const AptosChangeNetworkNamespace = 'aptos:changeNetwork'

export type AptosChangeNetworkFeature = {
  /** Namespace for the feature. */
  [AptosChangeNetworkNamespace]: {
    /** Version of the feature API. */
    version: AptosChangeNetworkVersion
    changeNetwork: AptosChangeNetworkMethod
  }
}

export type AptosChangeNetworkMethod = (
  input: AptosChangeNetworkInput
) => Promise<UserResponse<AptosChangeNetworkOutput>>

export type AptosChangeNetworkInput = NetworkInfo

export interface AptosChangeNetworkOutput {
  success: boolean
  reason?: string
}
