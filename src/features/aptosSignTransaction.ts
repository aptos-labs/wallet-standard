// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import {
  AccountAddress,
  AccountAuthenticator,
  AnyRawTransaction,
  InputGenerateTransactionPayloadData,
  Network,
  PublicKey,
  TransactionPayload
} from '@aptos-labs/ts-sdk'
import { UserResponse } from '../misc'

// region Feature definition

/** Name of the feature. */
export const AptosSignTransactionNamespace = 'aptos:signTransaction'

export type AptosSignTransactionFeatureV1_0 = {
  [AptosSignTransactionNamespace]: {
    version: '1.0.0',
    signTransaction: AptosSignTransactionMethod
  }
}

export type AptosSignTransactionFeatureV1_1 = {
  [AptosSignTransactionNamespace]: {
    version: '1.1'
    signTransaction: AptosSignTransactionMethod & AptosSignTransactionMethodV1_1
  }
}

/**
 * A Wallet Standard feature for signing an Aptos transaction, and returning the
 * account authenticator.
 */
export type AptosSignTransactionFeature =
  AptosSignTransactionFeatureV1_0 | AptosSignTransactionFeatureV1_1;

// endregion

// region V1.0

export type AptosSignTransactionOutput = AccountAuthenticator;

export type AptosSignTransactionMethod = (
  transaction: AnyRawTransaction,
  asFeePayer?: boolean
) => Promise<UserResponse<AptosSignTransactionOutput>>

// endregion

// region V1.1

export interface AccountInput {
  address: AccountAddress;
  publicKey?: PublicKey;
}

export interface AptosSignTransactionInputV1_1 {
  expirationSecondsFromNow?: number; // defaults to 30 seconds (depends on wallet)
  expirationTimestamp?: number;
  feePayer?: AccountInput; // defaults to no fee payer
  gasUnitPrice?: number; // defaults to estimated gas unit price
  maxGasAmount?: number; // defaults to simulation result with fuzz factor
  network?: Network; // defaults to active network
  payload: TransactionPayload | InputGenerateTransactionPayloadData;
  secondarySigners?: AccountInput[]; // defaults to no secondary signers
  sender?: AccountInput; // defaulting to active account (if applicable)
  sequenceNumber?: number | bigint; // defaulting to sender's sequence number
  signerAddress?: AccountAddress;
}

export interface AptosSignTransactionOutputV1_1 {
  authenticator: AccountAuthenticator;
  rawTransaction: AnyRawTransaction;
}

export type AptosSignTransactionMethodV1_1 = (
  input: AptosSignTransactionInputV1_1
) => Promise<UserResponse<AptosSignTransactionOutputV1_1>>;
