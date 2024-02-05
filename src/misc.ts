// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Account, Network } from '@aptos-labs/ts-sdk'

/** TODO: docs */
export type TransactionHash = `0x${string}`
/** TODO: docs */
export type AccountInfo = {
  account: Account
  ansName?: string
}
/** TODO: docs */
export interface NetworkInfo {
  name: Network // Name of the network.
  chainId: string // Chain ID of the network.
  url?: string // RPC URL of the network.
}

export interface UserApproval<TResponseArgs> {
  status: 'approved'
  args: TResponseArgs
}

export interface UserRejection {
  status: 'rejected'
}

export type UserResponse<TResponseArgs> = UserApproval<TResponseArgs> | UserRejection
