// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Signature } from '@aptos-labs/ts-sdk'
import { UserResponse } from '../misc'
import { AccountInfo } from '../AccountInfo'

/**
 * AIP: [Sign in with Aptos](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-116.md)
 */

/** Version of the feature. */
export type AptosSignInVersion = '1.0.0'
/** Name of the feature. */
export const AptosSignInNamespace = 'aptos:signIn'

export type AptosSignInFeature = {
  /** Namespace for the feature. */
  [AptosSignInNamespace]: {
    /** Version of the feature API. */
    version: AptosSignInVersion
    signIn: AptosSignInMethod
  }
}

export type AptosSignInMethod = (
  input: AptosSignInInput
) => Promise<UserResponse<AptosSignInOutput>>

/**
 * Input fields to the `signIn` signing request to the wallet.
 */
export type AptosSignInInput = {
  /**
   * [`dnsauthority`](https://www.rfc-editor.org/rfc/rfc4501.html) that is requesting the signing.
   *
   * @example 'example.com'
   */
  domain: string
  /**
   * Randomized token to prevent signature replay attacks.
   */
  nonce: string
  /**
   * Blockchain address performing the signing.
   *
   * @example '0x10d7cf502f8571b5b6e402221cafb142547103da9c2847ffcf708f065a78b8d1'
   */
  address?: string
  /**
   * [URI](https://www.rfc-editor.org/rfc/rfc3986) referring to the resource that is the subject of the signing i.e. the subject of the claim.
   *
   * @example 'https://example.com'
   */
  uri?: string
  /**
   * Current version of the message.
   *
   * @example '1'
   */
  version?: string
  /**
   * Human-readable ASCII assertion that the user will sign. It MUST NOT contain `\n`.
   */
  statement?: string
  /**
   * Identifier for the network where the address above lives (e.g., for Aptos mainnet, the identifier would be `aptos:mainnet`)
   *
   * @example 'aptos:mainnet'
   */
  chainId?: string
  /**
   * ISO 8601 [`date-time`](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) that indicates the issuance time of the message.
   *
   * @example '2025-05-23T12:00:00Z'
   */
  issuedAt?: string
  /**
   * ISO 8601 [`date-time`](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) that indicates when the signed authentication message is no longer valid.
   *
   * @example '2025-05-23T12:00:00Z'
   */
  expirationTime?: string
  /**
   * ISO 8601 [`date-time`](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) that indicates when the signed authentication message starts being valid.
   *
   * @example '2025-05-23T12:00:00Z'
   */
  notBefore?: string
  /**
   * System-specific identifier used to uniquely refer to the authentication request.
   */
  requestId?: string
  /**
   * List of information or references to information the user wishes to have resolved as part of the authentication by the relying party.
   *
   * @example ['https://example.com/resource']
   */
  resources?: string[]
}

/**
 * Fields that are bound by the wallet if not provided in the `AptosSignInInput`.
 */
export type AptosSignInBoundFields = {
  /**
   * @see AptosSignInInput.domain
   */
  domain: string
  /**
   * @see AptosSignInInput.address
   */
  address: string
  /**
   * @see AptosSignInInput.uri
   */
  uri: string
  /**
   * @see AptosSignInInput.version
   */
  version: string
  /**
   * @see AptosSignInInput.chainId
   */
  chainId: string
}

/**
 * Output fields from the `signIn` signing request to the wallet.
 */
export type AptosSignInOutput = {
  /**
   * Account information of the user.
   */
  account: AccountInfo
  /**
   * Input fields to the `signIn` signing request to the wallet. The wallet will ensure that any bound fields not included in the `AptosSignInInput` are included in the output.
   */
  input: AptosSignInInput & AptosSignInBoundFields
  /**
   * Signature of the SIWA Signing Message constructed from the `input` fields.
   */
  signature: Signature
  /**
   * The type of signing scheme used to sign the message.
   *
   * @example 'ed25519' | 'multi_ed25519' | 'single_key' | 'multi_key'
   */
  type: string
}
