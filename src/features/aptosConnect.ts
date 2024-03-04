// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { AccountInfo } from '../AccountInfo'
import { NetworkInfo, UserResponse } from '../misc'

/** Version of the feature. */
export type AptosConnectVersion = '1.0.0'
/** Name of the feature. */
export const AptosConnectNamespace = 'aptos:connect'
/** TODO: docs */
export type AptosConnectFeature = {
  /** Namespace for the feature. */
  [AptosConnectNamespace]: {
    /** Version of the feature API. */
    version: AptosConnectVersion
    connect: AptosConnectMethod
  }
}
/** TODO: docs */
export type AptosConnectMethod = (
  ...args: AptosConnectInput
) => Promise<UserResponse<AptosConnectOutput>>

/** TODO: docs */
export type AptosConnectInput = [silent?: boolean, networkInfo?: NetworkInfo]
/** TODO: docs */
export type AptosConnectOutput = AccountInfo
