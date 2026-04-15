# Aptos Wallet Standard

The Aptos Wallet Standard defines TypeScript interfaces and utilities for wallet and dapp interactions in the Aptos ecosystem. It implements [AIP-62](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md), providing a consistent way for wallets to integrate with applications.

Built on top of the chain-agnostic [Wallet Standard](https://github.com/wallet-standard/wallet-standard), this library extends it with Aptos-specific features like transaction signing, network management, and account handling.

## Installation

```bash
# npm
npm install @aptos-labs/wallet-standard

# pnpm
pnpm add @aptos-labs/wallet-standard
```

### Peer Dependencies

This package requires the following peer dependencies:

- [`@aptos-labs/ts-sdk`](https://github.com/aptos-labs/aptos-ts-sdk) `^6.3.1`
- [`@wallet-standard/core`](https://github.com/wallet-standard/wallet-standard) `^1.0.3`

## For Dapp Developers

### Detecting Wallets

Use `getAptosWallets()` to discover all registered Aptos-compatible wallets. This function filters for wallets that implement the [required feature set](#required-features).

```typescript
import { getAptosWallets } from "@aptos-labs/wallet-standard";

const { aptosWallets, on } = getAptosWallets();

// Use currently registered wallets
console.log("Available wallets:", aptosWallets);

// Listen for new wallets that register after page load
const removeListener = on("register", (wallet) => {
  console.log("New wallet registered:", wallet);
});
```

### Checking for Optional Features

Use `isWalletWithRequiredFeatureSet()` to check if a wallet supports additional features beyond the required set:

```typescript
import { isWalletWithRequiredFeatureSet } from "@aptos-labs/wallet-standard";
import type { AptosSignAndSubmitTransactionFeature } from "@aptos-labs/wallet-standard";

if (
  isWalletWithRequiredFeatureSet<AptosSignAndSubmitTransactionFeature>(wallet, [
    "aptos:signAndSubmitTransaction",
  ])
) {
  // Wallet supports sign-and-submit
}
```

## For Wallet Developers

To make your wallet compatible with the Aptos Wallet Standard, implement the `AptosWallet` interface and register it using `registerWallet` from `@wallet-standard/core`.

### 1. Implement the Wallet Interface

```typescript
import type { AptosWallet, AptosFeatures } from "@aptos-labs/wallet-standard";

class MyWallet implements AptosWallet {
  readonly name = "My Wallet";
  readonly url = "https://mywallet.com";
  readonly version = "1.0.0";
  readonly icon = "data:image/png;base64,...";
  readonly chains = APTOS_CHAINS;
  accounts = [];

  get features(): AptosFeatures {
    return {
      "aptos:connect": { version: "1.0.0", connect: this.connect },
      "aptos:disconnect": { version: "1.0.0", disconnect: this.disconnect },
      "aptos:account": { version: "1.0.0", account: this.account },
      "aptos:network": { version: "1.0.0", network: this.network },
      "aptos:signTransaction": {
        version: "1.0.0",
        signTransaction: this.signTransaction,
      },
      "aptos:signMessage": {
        version: "1.0.0",
        signMessage: this.signMessage,
      },
      "aptos:onAccountChange": {
        version: "1.0.0",
        onAccountChange: this.onAccountChange,
      },
      "aptos:onNetworkChange": {
        version: "1.0.0",
        onNetworkChange: this.onNetworkChange,
      },
    };
  }

  // ... implement each feature method
}
```

### 2. Register the Wallet

For browser extension wallets, call `registerWallet` when the page loads:

```typescript
import { registerWallet } from "@aptos-labs/wallet-standard";

const myWallet = new MyWallet();
registerWallet(myWallet);
```

See the full [example wallet implementation](./example/basic/wallet.ts) for a complete template with detailed guidance.

## API Reference

### Interfaces

| Interface | Description |
| --- | --- |
| `AptosWallet` | Main wallet interface extending `WalletWithAptosFeatures` with a `url` property |
| `AptosWalletAccount` | Account interface extending `WalletAccount` with a `signingScheme` field |
| `AccountInfo` | Serializable account info class with `address`, `publicKey`, and optional `ansName` |
| `NetworkInfo` | Network details including `name`, `chainId`, and optional `url` |

### Required Features

All Aptos wallets must implement these features:

| Feature | Description |
| --- | --- |
| `aptos:connect` | Connect a user's account to the dapp |
| `aptos:disconnect` | Disconnect the account from the dapp |
| `aptos:account` | Get the currently connected account info |
| `aptos:network` | Get the current network the wallet is connected to |
| `aptos:signTransaction` | Sign a transaction without submitting |
| `aptos:signMessage` | Sign an arbitrary message |
| `aptos:onAccountChange` | Listen for account change events |
| `aptos:onNetworkChange` | Listen for network change events |

### Optional Features

| Feature | Description |
| --- | --- |
| `aptos:signAndSubmitTransaction` | Sign and submit a transaction in one step |
| `aptos:changeNetwork` | Request the wallet to switch networks |
| `aptos:openInMobileApp` | Open the wallet's mobile app |
| `aptos:signIn` | Sign in with the wallet |

### Chains

Pre-defined chain identifiers:

```typescript
import {
  APTOS_MAINNET_CHAIN, // "aptos:mainnet"
  APTOS_TESTNET_CHAIN, // "aptos:testnet"
  APTOS_DEVNET_CHAIN, // "aptos:devnet"
  APTOS_LOCALNET_CHAIN, // "aptos:localnet"
  APTOS_CHAINS, // All of the above
} from "@aptos-labs/wallet-standard";
```

### Error Handling

The library provides structured errors via `AptosWalletError`:

```typescript
import {
  AptosWalletError,
  AptosWalletErrorCode,
} from "@aptos-labs/wallet-standard";

// Error codes:
// 4100 - Unauthorized: method/account not authorized by the user
// 4200 - Unsupported: requested feature is not supported
// -30001 - InternalError: something went wrong within the wallet
```

### User Responses

All user-facing wallet methods return a `UserResponse<T>`, which is a discriminated union:

```typescript
import { UserResponseStatus } from "@aptos-labs/wallet-standard";

const response = await wallet.features["aptos:connect"].connect();

if (response.status === UserResponseStatus.APPROVED) {
  console.log("Connected:", response.args); // AccountInfo
} else {
  console.log("User rejected the connection");
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```

## License

Apache-2.0
