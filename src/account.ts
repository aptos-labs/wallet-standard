import { SigningScheme } from '@aptos-labs/ts-sdk'
import { WalletAccount } from '@wallet-standard/core'

/**
 * Interfaces of a **AptosWalletAccount**, **AptosWalletMultiSigAccount**. Extend a base **WalletAccount**
 * {@link https://github.com/wallet-standard/wallet-standard/blob/master/packages/core/base/src/wallet.ts#L131}
 */

/**
 * Interafce for a single signer Aptos account
 */
export interface AptosWalletAccount extends WalletAccount {
  readonly signingScheme: SigningScheme
}

/**
 * Interafce for a multi signers Aptos account (aka multisig account v2)
 *
 * We omit the required `publicKey` property from the WalletAccount class, as multisig accounts currently dont have a public key
 */
export interface AptosWalletMultiSigAccount extends Omit<WalletAccount, 'publicKey'> {
  readonly signingScheme: SigningScheme
  readonly isMultiSigAccount: true
}
