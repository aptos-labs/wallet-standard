import { SigningScheme } from '@aptos-labs/ts-sdk'
import { WalletAccount } from '@wallet-standard/core'

export interface AptosWalletAccount extends WalletAccount {
  readonly signingScheme: SigningScheme
}
