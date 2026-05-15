// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import type { Network } from '@aptos-labs/ts-sdk'

export type TransactionHash = `0x${string}`

export interface NetworkInfo {
  /** Name of the network. */
  name: Network
  /** Chain ID of the network. */
  chainId: number
  /**
   * RPC URL of the network. Should be an `https:` URL.
   *
   * @remarks
   * **Security:** When returned by a wallet (e.g., from `aptos:network` or
   * `aptos:onNetworkChange`), this value is wallet-supplied and not validated by
   * this library. Consumers that use this URL to issue RPC calls MUST validate
   * the scheme and authority against an allowlist for the claimed `chainId`;
   * otherwise a malicious wallet can redirect on-chain reads and transaction
   * submission to an attacker-controlled node.
   */
  url?: string
}

export enum UserResponseStatus {
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface UserApproval<TResponseArgs> {
  status: UserResponseStatus.APPROVED
  args: TResponseArgs
}

export interface UserRejection {
  status: UserResponseStatus.REJECTED
}

export type UserResponse<TResponseArgs> = UserApproval<TResponseArgs> | UserRejection
