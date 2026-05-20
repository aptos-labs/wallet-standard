import type { Wallet } from '@wallet-standard/core'
import { describe, expect, it } from 'vitest'

import { isWalletWithRequiredFeatureSet } from './detect.js'

const REQUIRED_FEATURES = {
  'aptos:account': { account: () => undefined },
  'aptos:connect': { connect: () => undefined },
  'aptos:disconnect': { disconnect: () => undefined },
  'aptos:network': { network: () => undefined },
  'aptos:onAccountChange': { onAccountChange: () => undefined },
  'aptos:onNetworkChange': { onNetworkChange: () => undefined },
  'aptos:signMessage': { signMessage: () => undefined },
  'aptos:signTransaction': { signTransaction: () => undefined }
} as const

function makeWallet(features: Record<string, unknown>): Wallet {
  return { features } as unknown as Wallet
}

describe('isWalletWithRequiredFeatureSet', () => {
  it('returns true when every required feature exposes its method', () => {
    expect(isWalletWithRequiredFeatureSet(makeWallet({ ...REQUIRED_FEATURES }))).toBe(true)
  })

  it('returns false when a required feature namespace is missing entirely', () => {
    const { 'aptos:connect': _omitted, ...rest } = REQUIRED_FEATURES
    expect(isWalletWithRequiredFeatureSet(makeWallet({ ...rest }))).toBe(false)
  })

  it('returns false when a required feature is null', () => {
    expect(
      isWalletWithRequiredFeatureSet(makeWallet({ ...REQUIRED_FEATURES, 'aptos:account': null }))
    ).toBe(false)
  })

  it('returns false when a required method is not a function', () => {
    expect(
      isWalletWithRequiredFeatureSet(
        makeWallet({ ...REQUIRED_FEATURES, 'aptos:signMessage': { signMessage: 'nope' } })
      )
    ).toBe(false)
  })

  it('honors additionalFeatures requirements', () => {
    const wallet = makeWallet({ ...REQUIRED_FEATURES, 'custom:extra': {} })
    expect(isWalletWithRequiredFeatureSet(wallet, ['custom:extra'])).toBe(true)
    expect(isWalletWithRequiredFeatureSet(wallet, ['custom:missing'])).toBe(false)
  })
})
