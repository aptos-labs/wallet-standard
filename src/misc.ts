// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { AccountAddress, PublicKey, Network } from '@aptos-labs/ts-sdk'

/** TODO: docs */
export type TransactionHash = `0x${string}`

/** TODO: docs */
export interface NetworkInfo {
  name: Network // Name of the network.
  chainId: number // Chain ID of the network.
  url?: string // RPC URL of the network.
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
