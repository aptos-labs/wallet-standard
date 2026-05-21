import {
  AccountAddress,
  AnyPublicKey,
  Deserializer,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  MultiEd25519PublicKey,
  MultiKey,
  Serializer,
  SigningScheme
} from '@aptos-labs/ts-sdk'
import { describe, expect, it } from 'vitest'

import { AccountInfo } from './AccountInfo.js'

function ed25519PublicKey(): Ed25519PublicKey {
  return Ed25519PrivateKey.generate().publicKey()
}

function roundTrip(info: AccountInfo): AccountInfo {
  const serializer = new Serializer()
  info.serialize(serializer)
  return AccountInfo.deserialize(new Deserializer(serializer.toUint8Array()))
}

function variantByteOf(info: AccountInfo): number {
  const serializer = new Serializer()
  info.serialize(serializer)
  const bytes = serializer.toUint8Array()
  // BCS layout: AccountAddress (32 bytes) || ULEB128 variant || pubkey || ULEB128 ansName length || ansName
  return bytes[AccountAddress.LENGTH] as number
}

const ADDRESS = AccountAddress.from('0x1')

describe('AccountInfo BCS wire format', () => {
  it('tags Ed25519PublicKey with SigningScheme.Ed25519', () => {
    const info = new AccountInfo({ address: ADDRESS, publicKey: ed25519PublicKey() })
    expect(variantByteOf(info)).toBe(SigningScheme.Ed25519)
  })

  it('tags MultiEd25519PublicKey with SigningScheme.MultiEd25519', () => {
    const publicKey = new MultiEd25519PublicKey({
      publicKeys: [ed25519PublicKey(), ed25519PublicKey()],
      threshold: 1
    })
    const info = new AccountInfo({ address: ADDRESS, publicKey })
    expect(variantByteOf(info)).toBe(SigningScheme.MultiEd25519)
  })

  it('tags AnyPublicKey with SigningScheme.SingleKey', () => {
    const info = new AccountInfo({
      address: ADDRESS,
      publicKey: new AnyPublicKey(ed25519PublicKey())
    })
    expect(variantByteOf(info)).toBe(SigningScheme.SingleKey)
  })

  it('tags MultiKey with SigningScheme.MultiKey', () => {
    const publicKey = new MultiKey({
      publicKeys: [new AnyPublicKey(ed25519PublicKey()), new AnyPublicKey(ed25519PublicKey())],
      signaturesRequired: 1
    })
    const info = new AccountInfo({ address: ADDRESS, publicKey })
    expect(variantByteOf(info)).toBe(SigningScheme.MultiKey)
  })

  it('throws on serialize when given an unsupported public key', () => {
    const fakePublicKey = { serialize() {} } as unknown as Ed25519PublicKey
    const info = new AccountInfo({ address: ADDRESS, publicKey: fakePublicKey })
    expect(() => info.serialize(new Serializer())).toThrow(/Unsupported public key/)
  })

  it('throws on deserialize when the variant byte is unknown', () => {
    const serializer = new Serializer()
    ADDRESS.serialize(serializer)
    serializer.serializeU32AsUleb128(99)
    expect(() => AccountInfo.deserialize(new Deserializer(serializer.toUint8Array()))).toThrow(
      /Unknown variant index/
    )
  })
})

describe('AccountInfo round-trip', () => {
  it('round-trips an Ed25519 account with no ansName', () => {
    const publicKey = ed25519PublicKey()
    const original = new AccountInfo({ address: ADDRESS, publicKey })
    const decoded = roundTrip(original)
    expect(decoded.address.equals(original.address)).toBe(true)
    expect(decoded.publicKey).toBeInstanceOf(Ed25519PublicKey)
    expect((decoded.publicKey as Ed25519PublicKey).toUint8Array()).toEqual(publicKey.toUint8Array())
    expect(decoded.ansName).toBeUndefined()
  })

  it('round-trips a non-empty ansName', () => {
    const original = new AccountInfo({
      address: ADDRESS,
      publicKey: ed25519PublicKey(),
      ansName: 'alice.apt'
    })
    expect(roundTrip(original).ansName).toBe('alice.apt')
  })

  it('decodes an omitted ansName back to undefined (not empty string)', () => {
    const original = new AccountInfo({ address: ADDRESS, publicKey: ed25519PublicKey() })
    const decoded = roundTrip(original)
    expect(decoded.ansName).toBeUndefined()
    expect(decoded.ansName).not.toBe('')
  })

  it('round-trips an AnyPublicKey through the SingleKey variant', () => {
    const original = new AccountInfo({
      address: ADDRESS,
      publicKey: new AnyPublicKey(ed25519PublicKey())
    })
    expect(roundTrip(original).publicKey).toBeInstanceOf(AnyPublicKey)
  })

  it('round-trips a MultiEd25519PublicKey', () => {
    const publicKey = new MultiEd25519PublicKey({
      publicKeys: [ed25519PublicKey(), ed25519PublicKey()],
      threshold: 1
    })
    const original = new AccountInfo({ address: ADDRESS, publicKey })
    expect(roundTrip(original).publicKey).toBeInstanceOf(MultiEd25519PublicKey)
  })

  it('round-trips a MultiKey', () => {
    const publicKey = new MultiKey({
      publicKeys: [new AnyPublicKey(ed25519PublicKey()), new AnyPublicKey(ed25519PublicKey())],
      signaturesRequired: 1
    })
    const original = new AccountInfo({ address: ADDRESS, publicKey })
    expect(roundTrip(original).publicKey).toBeInstanceOf(MultiKey)
  })
})

describe('AccountInfo constructor', () => {
  it('normalizes a string address through AccountAddress.from()', () => {
    const info = new AccountInfo({ address: '0x1', publicKey: ed25519PublicKey() })
    expect(info.address).toBeInstanceOf(AccountAddress)
    expect(info.address.equals(AccountAddress.ONE)).toBe(true)
  })

  it('accepts an AccountAddress instance directly', () => {
    const info = new AccountInfo({ address: AccountAddress.ONE, publicKey: ed25519PublicKey() })
    expect(info.address.equals(AccountAddress.ONE)).toBe(true)
  })
})
