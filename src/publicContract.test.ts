import { describe, expect, it } from 'vitest'

import {
  APTOS_CHAINS,
  APTOS_DEVNET_CHAIN,
  APTOS_LOCALNET_CHAIN,
  APTOS_MAINNET_CHAIN,
  APTOS_TESTNET_CHAIN
} from './chains.js'
import {
  AptosChangeNetworkNamespace,
  AptosConnectNamespace,
  AptosDisconnectNamespace,
  AptosGetAccountNamespace,
  AptosGetNetworkNamespace,
  AptosOnAccountChangeNamespace,
  AptosOnNetworkChangeNamespace,
  AptosOpenInMobileAppNamespace,
  AptosSignAndSubmitTransactionNamespace,
  AptosSignInNamespace,
  AptosSignMessageNamespace,
  AptosSignTransactionNamespace
} from './features/index.js'
import { UserResponseStatus } from './misc.js'

// Every string in this file is observable by external wallets and dApps. Changing any value here
// is a breaking change to the wire contract and requires a coordinated ecosystem rollout —
// these tests are intentionally a snapshot of the public API surface.

describe('Aptos chain identifiers', () => {
  it('pins the four canonical chain strings', () => {
    expect(APTOS_DEVNET_CHAIN).toBe('aptos:devnet')
    expect(APTOS_TESTNET_CHAIN).toBe('aptos:testnet')
    expect(APTOS_LOCALNET_CHAIN).toBe('aptos:localnet')
    expect(APTOS_MAINNET_CHAIN).toBe('aptos:mainnet')
  })

  it('enumerates exactly those four chains in APTOS_CHAINS', () => {
    expect([...APTOS_CHAINS]).toEqual([
      APTOS_DEVNET_CHAIN,
      APTOS_TESTNET_CHAIN,
      APTOS_LOCALNET_CHAIN,
      APTOS_MAINNET_CHAIN
    ])
  })
})

describe('Aptos feature namespaces', () => {
  it('pins every feature namespace string', () => {
    expect(AptosConnectNamespace).toBe('aptos:connect')
    expect(AptosDisconnectNamespace).toBe('aptos:disconnect')
    expect(AptosGetAccountNamespace).toBe('aptos:account')
    expect(AptosGetNetworkNamespace).toBe('aptos:network')
    expect(AptosOnAccountChangeNamespace).toBe('aptos:onAccountChange')
    expect(AptosOnNetworkChangeNamespace).toBe('aptos:onNetworkChange')
    expect(AptosSignMessageNamespace).toBe('aptos:signMessage')
    expect(AptosSignTransactionNamespace).toBe('aptos:signTransaction')
    expect(AptosChangeNetworkNamespace).toBe('aptos:changeNetwork')
    expect(AptosOpenInMobileAppNamespace).toBe('aptos:openInMobileApp')
    expect(AptosSignAndSubmitTransactionNamespace).toBe('aptos:signAndSubmitTransaction')
    expect(AptosSignInNamespace).toBe('aptos:signIn')
  })
})

describe('UserResponseStatus', () => {
  it('pins the approved/rejected wire values', () => {
    expect(UserResponseStatus.APPROVED).toBe('Approved')
    expect(UserResponseStatus.REJECTED).toBe('Rejected')
  })
})
