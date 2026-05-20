import { describe, expect, it } from 'vitest'

import { AptosWalletError, AptosWalletErrorCode, AptosWalletErrors } from './errors.js'

describe('AptosWalletError', () => {
  it('populates code, status, and default message for known codes', () => {
    const err = new AptosWalletError(AptosWalletErrorCode.Unauthorized)
    expect(err.code).toBe(AptosWalletErrorCode.Unauthorized)
    expect(err.status).toBe('Unauthorized')
    expect(err.message).toBe(AptosWalletErrors[AptosWalletErrorCode.Unauthorized].message)
    expect(err.name).toBe('AptosWalletError')
    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(AptosWalletError)
  })

  it('lets callers override the message while keeping the canonical status', () => {
    const err = new AptosWalletError(AptosWalletErrorCode.Unsupported, 'custom message')
    expect(err.message).toBe('custom message')
    expect(err.status).toBe('Unsupported')
  })

  it('falls back to "Unknown error" for unrecognized codes', () => {
    const err = new AptosWalletError(9999)
    expect(err.code).toBe(9999)
    expect(err.status).toBe('Unknown error')
    expect(err.message).toBe('Unknown error occurred')
  })
})

describe('AptosWalletErrors', () => {
  it('is frozen at runtime to prevent tampering', () => {
    expect(Object.isFrozen(AptosWalletErrors)).toBe(true)
    expect(Object.isFrozen(AptosWalletErrors[AptosWalletErrorCode.Unauthorized])).toBe(true)
  })
})
