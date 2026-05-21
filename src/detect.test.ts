import type { Wallet } from '@wallet-standard/core'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getAptosWallets, isWalletWithRequiredFeatureSet } from './detect.js'

vi.mock('@wallet-standard/core', () => {
  const get = vi.fn<() => readonly Wallet[]>()
  const on = vi.fn()
  return { getWallets: () => ({ get, on }) }
})

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

describe('getAptosWallets', () => {
  afterEach(async () => {
    const core = (await import('@wallet-standard/core')) as unknown as {
      getWallets: () => { get: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn> }
    }
    core.getWallets().get.mockReset()
    core.getWallets().on.mockReset()
  })

  it('returns only wallets satisfying the required-feature predicate', async () => {
    const aptosCompatible = makeWallet({ ...REQUIRED_FEATURES })
    const nonAptosWallet = makeWallet({ 'solana:signTransaction': {} })
    const core = (await import('@wallet-standard/core')) as unknown as {
      getWallets: () => { get: ReturnType<typeof vi.fn> }
    }
    core.getWallets().get.mockReturnValue([aptosCompatible, nonAptosWallet])

    const { aptosWallets } = getAptosWallets()
    expect(aptosWallets).toHaveLength(1)
    expect(aptosWallets[0]).toBe(aptosCompatible)
  })

  it('returns an empty array when no compatible wallets are registered', async () => {
    const core = (await import('@wallet-standard/core')) as unknown as {
      getWallets: () => { get: ReturnType<typeof vi.fn> }
    }
    core.getWallets().get.mockReturnValue([])
    expect(getAptosWallets().aptosWallets).toEqual([])
  })

  it('forwards the `on` listener from @wallet-standard/core unchanged', async () => {
    const core = (await import('@wallet-standard/core')) as unknown as {
      getWallets: () => { get: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn> }
    }
    core.getWallets().get.mockReturnValue([])
    const { on } = getAptosWallets()
    expect(on).toBe(core.getWallets().on)
  })
})
