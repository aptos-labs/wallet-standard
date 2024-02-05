import { WalletAccount } from '@wallet-standard/core'

// TODO should use TS SDK enum
export enum AptosAccountVariant {
  Ed25519,
  MultiEd25519,
  SingleKey,
  MultiKey
}

export interface AptosWalletAccount extends WalletAccount {
  readonly variant: AptosAccountVariant
}
