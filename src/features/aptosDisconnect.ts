// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/** Version of the feature. */
export type AptosDisconnectVersion = '1.0.0'
/** Name of the feature. */
export const AptosDisconnectNamespace = 'aptos:disconnect'

export type AptosDisconnectFeature = {
  /** Namespace for the feature. */
  [AptosDisconnectNamespace]: {
    /** Version of the feature API. */
    version: AptosDisconnectVersion
    disconnect: AptosDisconnectMethod
  }
}

export type AptosDisconnectMethod = () => Promise<void>
