// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

export type { Wallet } from '@wallet-standard/core';

export interface AptosWallet extends Wallet {

	/**
 		* Website URL of the Wallet
 		*/
	readonly url: string;

}

