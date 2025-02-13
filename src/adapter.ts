import { StandardDisconnectMethod } from '@wallet-standard/core'
import { ChainsId } from './chains'
import {
  AptosFeatures,
  AptosGetAccountMethod,
  AptosGetNetworkMethod,
  AptosConnectMethod,
  AptosChangeNetworkMethod,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageMethod,
  AptosOnAccountChangeMethod,
  AptosOnNetworkChangeMethod,
  AptosSignTransactionMethod,
  AptosOpenInMobileAppMethod
} from './features'

/**
 * A helper wallet interface a wallet adapter can use to define a wallet with
 */
export interface AptosWalletAdapter {
  name: string
  url: string
  icon: `data:image/${'svg+xml' | 'webp' | 'png' | 'gif'};base64,${string}`
  features: AptosFeatures
  getAccount: AptosGetAccountMethod
  getNetwork: AptosGetNetworkMethod
  connect: AptosConnectMethod
  disconnect: StandardDisconnectMethod
  signMessage: AptosSignMessageMethod
  signTransaction: AptosSignTransactionMethod
  onAccountChange: AptosOnAccountChangeMethod
  onNetworkChange: AptosOnNetworkChangeMethod
  signAndSubmitTransaction?: AptosSignAndSubmitTransactionMethod
  changeNetwork?: AptosChangeNetworkMethod
  openInMobileApp?: AptosOpenInMobileAppMethod
  chains?: ChainsId[]
}
