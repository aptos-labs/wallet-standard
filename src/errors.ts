export enum AptosWalletErrorCode {
  Unauthorized = 4100,
  InternalError = -30001
}

export const AptosWalletErrors = Object.freeze({
  [AptosWalletErrorCode.Unauthorized]: {
    status: 'Unauthorized',
    message: 'The requested method and/or account has not been authorized by the user.'
  },
  [AptosWalletErrorCode.InternalError]: {
    status: 'Internal error',
    message: 'Something went wrong within the wallet.'
  }
})

export class AptosWalletError extends Error {
  readonly code: number
  readonly status: string

  constructor(code: number, message?: string) {
    super(
      message ??
        AptosWalletErrors[code as keyof typeof AptosWalletErrors]?.message ??
        'Unknown error occurred'
    )
    this.code = code
    this.status =
      AptosWalletErrors[code as keyof typeof AptosWalletErrors]?.status ?? 'Unknown error'
    this.name = 'AptosWalletError'
    Object.setPrototypeOf(this, AptosWalletError.prototype)
  }
}
