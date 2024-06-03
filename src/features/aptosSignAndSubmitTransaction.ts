// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk'
import { UserResponse } from '../misc'

/** Version of the feature. */
export type AptosSignAndSubmitTransactionVersion = '1.1.0'
/** Name of the feature. */
export const AptosSignAndSubmitTransactionNamespace = 'aptos:signAndSubmitTransaction'
/**
 * A Wallet Standard feature for signing a transaction, and returning the
 * hash of the transaction.
 */
export type AptosSignAndSubmitTransactionFeature = {
  /** Namespace for the feature. */
  [AptosSignAndSubmitTransactionNamespace]: {
    /** Version of the feature API. */
    version: AptosSignAndSubmitTransactionVersion
    signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod
  }
}

export type AptosSignAndSubmitTransactionMethod = (
  transaction: AptosSignAndSubmitTransactionInput
) => Promise<UserResponse<AptosSignAndSubmitTransactionOutput>>

export interface AptosSignAndSubmitTransactionInput {
  gasUnitPrice?: number;  // defaults to estimated gas unit price
  maxGasAmount?: number;  // defaults to estimated max gas amount
  payload: InputGenerateTransactionPayloadData;
}

export interface AptosSignAndSubmitTransactionOutput {
  hash: string;
}
