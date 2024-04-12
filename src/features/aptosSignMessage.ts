// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Signature } from '@aptos-labs/ts-sdk'
import { UserResponse } from '../misc'

/** Version of the feature. */
export type AptosSignMessageVersion = '1.0.0'
/** Name of the feature. */
export const AptosSignMessageNamespace = 'aptos:signMessage'

export type AptosSignMessageFeature = {
  /** Namespace for the feature. */
  [AptosSignMessageNamespace]: {
    /** Version of the feature API. */
    version: AptosSignMessageVersion
    signMessage: AptosSignMessageMethod
  }
}

export type AptosSignMessageMethod = (
  input: AptosSignMessageInput
) => Promise<UserResponse<AptosSignMessageOutput>>

export type AptosSignMessageInput = {
  address?: boolean
  application?: boolean
  chainId?: boolean
  message: string
  nonce: string
}

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
