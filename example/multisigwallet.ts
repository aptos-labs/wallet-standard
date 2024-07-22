import {
  Account,
  AccountAuthenticator,
  AnyRawTransaction,
  Aptos,
  AptosConfig,
  Network,
  SigningScheme
} from '@aptos-labs/ts-sdk'
import {
  APTOS_CHAINS,
  AccountInfo,
  AptosConnectMethod,
  AptosDisconnectMethod,
  AptosGetAccountMethod,
  AptosGetNetworkMethod,
  AptosOnAccountChangeMethod,
  AptosSignMessageInput,
  AptosSignMessageMethod,
  AptosSignMessageOutput,
  AptosSignTransactionMethod,
  AptosWallet,
  IdentifierArray,
  NetworkInfo,
  UserResponse,
  AptosOnNetworkChangeMethod,
  AptosFeatures,
  UserResponseStatus,
  AptosWalletMultiSigAccount
} from '../'

/**
 * This class is a template you can modify to implement an AIP-62 Wallet.
 *
 * Sections of the code which need to be revised will be marked with a "REVISION" comment.
 * We recommend using the REVISION comments like a checklist and deleting them as you go.
 * Ex. REVISION - Update this section.
 *
 * Function implementations are for DEMONSTRATION PURPOSES ONLY. Please ensure you rewrite all features
 * to use your Wallet as the method of communicating on-chain.
 */

/**
 * Interface of a **AptosWalletMultiSigAccount**, also referred to as an **Account**.
 *
 * An account is a _read-only data object_ that is provided from the Wallet to the app, authorizing the app to use it.
 *
 * The app can use an account to display and query information from a chain.
 *
 * The app can also act using an account by passing it to functions of the Wallet.
 *
 * Wallets may use or extend {@link "@wallet-standard/wallet".ReadonlyWalletAccount} which implements this interface.
 *
 */
// REVISION - Replace the "MyWallet" in "MyWalletAccount" with the name of your wallet. Ex. "PetraAccount"
export class MyWalletAccount implements AptosWalletMultiSigAccount {
  /** Address of the account, corresponding with a public key. */
  address: string

  /**
   * Chains supported by the account.
   *
   * This must be a subset of ["aptos:devnet", "aptos:testnet", "aptos:localnet", "aptos:mainnet"].
   *
   * It is recommended to support at least ["aptos:devnet", "aptos:testnet", and "aptos:mainnet"].
   */
  chains: IdentifierArray = APTOS_CHAINS

  /**
   * Function names of features that are supported for this Wallet's account object.
   */
  features: IdentifierArray

  /** The signing scheme used for the private key of the address. Ex. SigningScheme.Ed25519 */
  signingScheme: SigningScheme

  /** A required boolean flag indicating this is a multisig account */
  isMultiSigAccount: true = true

  /** Optional user-friendly descriptive label or name for the account. This may be displayed by the app. */
  label?: string

  /**
   * Optional user-friendly icon for the account. This may be displayed by the app.
   */
  icon?:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`
    | undefined

  // REVISION - Update this constructor to use values your wallet supports.
  constructor(account: Account) {
    this.address = account.accountAddress.toString()
    // REVISION - Choose which chains your wallet supports. This may only be subset of all Aptos networks.
    this.chains = APTOS_CHAINS // ["aptos:devnet", "aptos:testnet", "aptos:localnet", "aptos:mainnet"]
    /**
     * REVISION - Ensure this signing scheme matches the encoding used to generate your private key.
     */
    this.signingScheme = account.signingScheme
  }
}

/**
 * REVISION - This class needs to be extensively customized to match the details of your wallet.
 *
 * 1. MyWallet should be renamed to be the name of your wallet. Ex. For Petra, MyWallet should be named "PetraWallet". (Be sure to also update references to "MyWallet" in this file.)
 * 2. Update the values of this class to match your Wallet's deatils.
 * 3. Implement each of the features below. (Including adding implementations for any additional required features that you can find here in the "AptosFeatures" type: https://github.com/aptos-labs/wallet-standard/blob/main/src/features/index.ts)
 */
export class MyWallet implements AptosWallet {
  // REVISION - Include the link to create an account using your wallet or your primary website. (Ex. https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci?hl=en)
  readonly url: string = 'https://aptos.dev'
  // This should be updated whenever you release a new implementation of "MyWallet"
  readonly version = '1.0.0'
  // REVISION - Change the name to the name of your Wallet. (Ex. "Petra")
  readonly name: string = 'Aptos Burner'
  /**
   * REVISION - Set the icon to be a base64 encoding of your Wallet's logo.
   *
   * The icon data must be of the format:
   * 1. "data:image/"
   * 2. The icon's file extension, which must be one of:
   *    - "svg+xml"
   *    - "webp"
   *    - "png"
   *    - "gif"
   * 3. ";base64,"
   * 4. The base64 encoding of the image file.
   *
   * See the current value of icon for an example of this format.
   */
  readonly icon =
    'data:image/png;base64,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'
  /**
   * REVISION - Set the subset of Aptos chains your wallet supports.
   * APTOS_CHAINS = ["aptos:devnet", "aptos:testnet", "aptos:localnet", "aptos:mainnet"]
   * It is recommended to support at least "aptos:mainnet", "aptos:testnet", and "aptos:devnet".
   */
  chains = APTOS_CHAINS
  /**
   * The set of accounts that your Wallet has shared information for. These do NOT include private keys.
   * This list is normally expanded during `aptos:connect` and reduced during `aptos:disconnect`.
   * NOTE: For demonstration purposes, the template initializes a default account in the constructor,
   * but that should NOT be carried into your final implementation of this template.
   */
  accounts: MyWalletAccount[] = []

  // Local MyWallet class variables,
  /**
   * REVISION - These two variables likely should NOT be in your finalized plugin template.
   * They are used throughout this example's feature implementations in order to show how you could
   * implement each function.
   *
   * signer - This stores the private keys for an account on-chain. (Example purposes only)
   * aptos - This handles the network connection. (Your wallet may have a different way of handling the on-chain connection than this Aptos instance)
   *
   * Remember: These two variables SHOULD LIKELY BE DELETED after you replace your implementations of each feature with ones that use your Wallet.
   */
  signer: Account
  aptos: Aptos

  /**
   * REVISION - List all features your wallet supports below.
   * You will need to implement how your wallet supports each.
   *
   * In order to be compatible with the AIP-62 Wallet standard, ensure you are at least supporting all
   * currently required features by checking the list of features in the `AptosFeatures` type here:
   * https://github.com/aptos-labs/wallet-standard/blob/main/src/features/index.ts
   *
   * To find the names of features to pass into `this.features` below you can either go into the feature implementations
   * and look at the <AptosFeature>NameSpace variable, or you can import the `AptosFeatures` type and see the names there.
   * Ex. See `AptosSignTransactionNamespace` in https://github.com/aptos-labs/wallet-standard/blob/main/src/features/aptosSignTransaction.ts
   *
   * For additional customization, you may implement optional features.
   * For the most support though, you should extend the wallet-standard to support additional features as part of the standard.
   */
  get features(): AptosFeatures {
    return {
      'aptos:connect': {
        version: '1.0.0',
        connect: this.connect
      },
      'aptos:network': {
        version: '1.0.0',
        network: this.network
      },
      'aptos:disconnect': {
        version: '1.0.0',
        disconnect: this.disconnect
      },
      'aptos:signTransaction': {
        version: '1.0.0',
        signTransaction: this.signTransaction
      },
      'aptos:signMessage': {
        version: '1.0.0',
        signMessage: this.signMessage
      },
      'aptos:onAccountChange': {
        version: '1.0.0',
        onAccountChange: this.onAccountChange
      },
      'aptos:onNetworkChange': {
        version: '1.0.0',
        onNetworkChange: this.onNetworkChange
      },
      'aptos:account': {
        version: '1.0.0',
        account: this.account
      }
    }
  }

  /**
   * REVISION - This constructor should be updated to support your Wallet's implementation of the supported features.
   *
   * The template code's constructor currently initializes `signer` to act as the private key for an account on-chain, and uses
   * `aptos` to handle the on-chain connection.
   *
   */
  constructor() {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    // Create a random signer for our stub implementations.
    this.signer = Account.generate()
    // We will use DEVNET since we can fund our test account via a faucet there.
    const aptosConfig = new AptosConfig({
      network: Network.DEVNET
    })
    // Use the instance Aptos connection to process requests.
    this.aptos = new Aptos(aptosConfig)

    // Update our Wallet object to know that we are connected to this new signer.
    this.accounts = [new MyWalletAccount(this.signer)]
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * Look up the account info for the currently connected wallet address on the chosen network.
   *
   * @returns Return account info.
   */
  account: AptosGetAccountMethod = async (): Promise<AccountInfo> => {
    const account = new AccountInfo({
      address: this.signer.accountAddress,
      publicKey: this.signer.publicKey
    })
    return Promise.resolve(account)
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * Connect an account using this Wallet.
   * This must wait for the user to sign in to the Wallet provider and confirm they are ok sharing
   * details with the dapp.
   *
   * For demonstration purposes, this template example assumes the user is using the account generated in `signer`
   * and assumes the user approved letting the dapp use the account information.
   *
   * Your implmentation should include a way to track which account was just connected. This likely will involve
   * setting the `this.accounts` variable.
   *
   * @returns Whether the user approved connecting their account, and account info.
   * @throws Error when unable to connect to the Wallet provider.
   */
  connect: AptosConnectMethod = async (): Promise<UserResponse<AccountInfo>> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    try {
      await this.aptos.fundAccount({
        accountAddress: this.signer.accountAddress,
        amount: 1_000_000
      })
      const account = new AccountInfo({
        address: this.signer.accountAddress,
        publicKey: this.signer.publicKey
      })
      return {
        status: UserResponseStatus.APPROVED,
        args: account
      }
    } catch (e) {
      return {
        status: UserResponseStatus.REJECTED
      }
    }
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * Return the name, chainId, and url of the network connection your wallet is using to connect to the Aptos chain.
   *
   * @returns Which network the connected Wallet is pointing to.
   */
  network: AptosGetNetworkMethod = async (): Promise<NetworkInfo> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    // You may use getLedgerInfo() to determine which ledger your Wallet is connected to.
    const network = await this.aptos.getLedgerInfo()
    return {
      // REVISION - Ensure the name and url match the chain_id your wallet responds with.
      name: Network.DEVNET,
      // REVISION - For mainnet and testnet is not recommended to make the getLedgerInfo() network call as the chain_id is fixed for those networks.
      chainId: network.chain_id,
      url: 'https://fullnode.devnet.aptoslabs.com/v1'
    }
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * Remove the permission of the Wallet class to access the account that was connected.
   *
   * @returns Resolves when done cleaning up.
   */
  disconnect: AptosDisconnectMethod = async (): Promise<void> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    return Promise.resolve()
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * @param transaction - A transaction that the user should have the ability to sign if they choose to.
   * @param asFeePayer - Optionally, another this signature is acting as a fee-payer for the transaction being signed.
   * @returns The result of whether the user chose to sign the transaction or not.
   */
  signTransaction: AptosSignTransactionMethod = async (
    transaction: AnyRawTransaction,
    asFeePayer?: boolean
  ): Promise<UserResponse<AccountAuthenticator>> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    if (asFeePayer) {
      const senderAuthenticator = this.aptos.transaction.signAsFeePayer({
        signer: this.signer,
        transaction
      })

      return Promise.resolve({
        status: UserResponseStatus.APPROVED,
        args: senderAuthenticator
      })
    }
    const senderAuthenticator = this.aptos.transaction.sign({
      signer: this.signer,
      transaction
    })

    return Promise.resolve({
      status: UserResponseStatus.APPROVED,
      args: senderAuthenticator
    })
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * @param input - A message to sign with the private key of the connected account.
   * @returns A user response either with a signed message, or the user rejecting to sign.
   */
  signMessage: AptosSignMessageMethod = async (
    input: AptosSignMessageInput
  ): Promise<UserResponse<AptosSignMessageOutput>> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    // 'Aptos' + application + address + nonce + chainId + message
    const messageToSign = `Aptos
    demoAdapter
    ${this.signer.accountAddress.toString()}
    ${input.nonce}
    ${input.chainId ?? (await this.network()).chainId}
    ${input.message}`

    const encodedMessageToSign = new TextEncoder().encode(messageToSign)

    const signature = this.signer.sign(encodedMessageToSign)

    return Promise.resolve({
      status: UserResponseStatus.APPROVED,
      args: {
        address: this.signer.accountAddress.toString(),
        fullMessage: messageToSign,
        message: input.message,
        nonce: input.nonce,
        prefix: 'APTOS',
        signature: signature
      }
    })
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * An event which will be triggered anytime an Account changes.
   *
   * @returns when the logic is resolved.
   */
  onAccountChange: AptosOnAccountChangeMethod = async (): Promise<void> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    return Promise.resolve()
  }

  /**
   * REVISION - Implement this function using your Wallet.
   *
   * When users indicate a Network change should occur, update your Wallet accordingly.
   *
   * @returns when the logic is resolved.
   */
  onNetworkChange: AptosOnNetworkChangeMethod = async (): Promise<void> => {
    // THIS LOGIC SHOULD BE REPLACED. IT IS FOR EXAMPLE PURPOSES ONLY.
    return Promise.resolve()
  }
}
