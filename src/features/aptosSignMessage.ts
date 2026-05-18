// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { Signature } from '@aptos-labs/ts-sdk'
import type { UserResponse } from '../misc.js'

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

/**
 * @remarks
 * **Security:** Every field other than `signature` is the wallet's self-reported
 * claim of what was signed. Relying parties MUST verify `signature` against the
 * connected account's public key over `fullMessage`, and MUST confirm that
 * `fullMessage` actually incorporates the fields the dApp requested via
 * `AptosSignMessageInput` (e.g., if `input.address === true`, the dApp should
 * verify that the expected address appears in `fullMessage`). A malicious wallet
 * can omit requested bindings, substitute values, or return a `fullMessage` that
 * differs from what `address` / `application` / `chainId` claim.
 */
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
