export enum AptosWalletErrorCode {
  Unauthorized = 4100,
  Unsupported = 4200,
  InternalError = -30001
}

export const AptosWalletErrors = Object.freeze({
  [AptosWalletErrorCode.Unauthorized]: Object.freeze({
    status: 'Unauthorized',
    message: 'The requested method and/or account has not been authorized by the user.'
  } as const),
  [AptosWalletErrorCode.InternalError]: Object.freeze({
    status: 'Internal error',
    message: 'Something went wrong within the wallet.'
  } as const),
  [AptosWalletErrorCode.Unsupported]: Object.freeze({
    status: 'Unsupported',
    message: 'The requested feature is not supported.'
  } as const)
} as const) satisfies Record<AptosWalletErrorCode, { status: string; message: string }>

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
