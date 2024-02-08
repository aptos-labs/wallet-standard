// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Signature } from '@aptos-labs/ts-sdk'
import { UserResponse } from '../misc'

/** Version of the feature. */
export type AptosSignMessageVersion = '1.0.0'
/** Name of the feature. */
export const AptosSignMessageNamespace = 'aptos:signMessage'

/** TODO: docs */
export type AptosSignMessageFeature = {
  /** Namespace for the feature. */
  [AptosSignMessageNamespace]: {
    /** Version of the feature API. */
    version: AptosSignMessageVersion
    signMessage: AptosSignMessageMethod
  }
}
/** TODO: docs */
export type AptosSignMessageMethod = (
  input: AptosSignMessageInput
) => Promise<UserResponse<AptosSignMessageOutput>>

/** TODO: docs */
export type AptosSignMessageInput = {
  address?: boolean
  application?: boolean
  chainId?: boolean
  message: string
  nonce: string
}

/** TODO: docs */
export type AptosSignMessageOutput = {
  address?: string
  application?: string
  chainId?: number
  fullMessage: string
  message: string
  nonce: string
  prefix: 'APTOS'
  signature: Signature
}
