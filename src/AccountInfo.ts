import {
  AccountAddress, AccountAddressInput, AnyPublicKey,
  Deserializer,
  Ed25519PublicKey,
  MultiEd25519PublicKey, MultiKey,
  PublicKey,
  Serializable,
  Serializer, SigningScheme
} from '@aptos-labs/ts-sdk'

export interface AccountInfoInput {
  address: AccountAddressInput
  publicKey: PublicKey
  ansName?: string
}

export class AccountInfo extends Serializable {
  readonly address: AccountAddress
  readonly publicKey: PublicKey
  readonly ansName?: string

  constructor({ address, publicKey, ansName }: AccountInfoInput) {
    super()
    this.address = AccountAddress.from(address)
    this.publicKey = publicKey
    this.ansName = ansName
  }

  serialize(serializer: Serializer) {
    this.address.serialize(serializer)
    if (this.publicKey instanceof Ed25519PublicKey) {
      serializer.serializeU32AsUleb128(SigningScheme.Ed25519)
    } else if (this.publicKey instanceof MultiEd25519PublicKey) {
      serializer.serializeU32AsUleb128(SigningScheme.MultiEd25519)
    } else if (this.publicKey instanceof AnyPublicKey) {
      serializer.serializeU32AsUleb128(SigningScheme.SingleKey)
    } else if (this.publicKey instanceof MultiKey) {
      serializer.serializeU32AsUleb128(SigningScheme.MultiKey)
    } else {
      throw new Error('Unsupported public key')
    }
    this.publicKey.serialize(serializer)
    serializer.serializeStr(this.ansName ?? '')
  }

  static deserialize(deserializer: Deserializer) {
    const address = AccountAddress.deserialize(deserializer)
    const variant = deserializer.deserializeUleb128AsU32()
    let publicKey: PublicKey
    switch (variant) {
      case SigningScheme.Ed25519:
        publicKey = Ed25519PublicKey.deserialize(deserializer)
        break
      case SigningScheme.MultiEd25519:
        publicKey = MultiEd25519PublicKey.deserialize(deserializer)
        break
      case SigningScheme.SingleKey:
        publicKey = AnyPublicKey.deserialize(deserializer)
        break
      case SigningScheme.MultiKey:
        publicKey = MultiKey.deserialize(deserializer)
        break
      default:
        throw new Error(`Unknown variant index for WrappedPublicKey: ${variant}`)
    }
    const ansName = deserializer.deserializeStr() || undefined
    return new AccountInfo({ address, publicKey, ansName })
  }
}
