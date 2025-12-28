// Copyright {{YEAR}} {{AUTHOR}}
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'

import * as bip39 from 'bip39'

import WalletAccountReadOnly{{CLASS_NAME}} from './wallet-account-read-only-{{CLASS_NAME_LOWER}}.js'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').KeyPair} KeyPair */
/** @typedef {import('@tetherto/wdk-wallet').TransactionResult} TransactionResult */
/** @typedef {import('@tetherto/wdk-wallet').TransferOptions} TransferOptions */
/** @typedef {import('@tetherto/wdk-wallet').TransferResult} TransferResult */

/** @typedef {import('./wallet-manager-{{CLASS_NAME_LOWER}}.js').{{CLASS_NAME}}WalletConfig} {{CLASS_NAME}}WalletConfig */

/**
 * @typedef {Object} {{CLASS_NAME}}Transaction
 * @property {string} to - The transaction's recipient.
 * @property {number | bigint} value - The amount of native tokens to send (in base unit).
 */

// TODO: Update BIP-44 coin type for {{BLOCKCHAIN}}
// See: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
const BIP_44_DERIVATION_PATH_PREFIX = "m/44'/0'"

/**
 * Full-featured {{CLASS_NAME}} wallet account implementation with signing capabilities.
 * @extends WalletAccountReadOnly{{CLASS_NAME}}
 * @implements {IWalletAccount}
 */
export default class WalletAccount{{CLASS_NAME}} extends WalletAccountReadOnly{{CLASS_NAME}} {
  /**
   * @private
   * Use {@link WalletAccount{{CLASS_NAME}}.at} instead.
   */
  constructor (seed, path, config = {}) {
    if (typeof seed === 'string') {
      if (!bip39.validateMnemonic(seed)) {
        throw new Error('The seed phrase is invalid.')
      }
      seed = bip39.mnemonicToSeedSync(seed)
    }

    super(undefined, config)

    /**
     * The wallet account configuration.
     *
     * @protected
     * @type {{{CLASS_NAME}}WalletConfig}
     */
    this._config = config

    /** @private */
    this._seed = seed

    /** @private */
    this._path = `${BIP_44_DERIVATION_PATH_PREFIX}/${path}`

    /**
     * Raw public key bytes.
     *
     * @private
     * @type {Uint8Array | undefined}
     */
    this._rawPublicKey = undefined

    /**
     * Raw private key bytes.
     *
     * @private
     * @type {Uint8Array | undefined}
     */
    this._rawPrivateKey = undefined
  }

  /**
   * Creates a new {{BLOCKCHAIN}} wallet account.
   *
   * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
   * @param {string} path - The BIP-44 derivation path (e.g. "0'/0/0").
   * @param {{{CLASS_NAME}}WalletConfig} [config] - The configuration object.
   * @returns {Promise<WalletAccount{{CLASS_NAME}}>} The wallet account.
   */
  static async at (seed, path, config = {}) {
    const account = new WalletAccount{{CLASS_NAME}}(seed, path, config)

    // TODO: Implement key derivation for {{BLOCKCHAIN}}
    // Example using micro-key-producer for Ed25519:
    // import HDKey from 'micro-key-producer/slip10.js'
    // const hdKey = HDKey.fromMasterSeed(account._seed)
    // const { privateKey } = hdKey.derive(account._path, true)
    // account._rawPrivateKey = new Uint8Array(privateKey)
    // account._rawPublicKey = derivePublicKey(privateKey)

    return account
  }

  /**
   * The derivation path's index of this account.
   *
   * @type {number}
   */
  get index () {
    const segments = this.path.split('/')
    return +segments[3].replace("'", '')
  }

  /**
   * The derivation path of this account.
   *
   * @type {string}
   */
  get path () {
    return this._path
  }

  /**
   * The account's key pair.
   *
   * @type {KeyPair}
   */
  get keyPair () {
    return {
      privateKey: this._rawPrivateKey,
      publicKey: this._rawPublicKey
    }
  }

  /**
   * The address of this account.
   *
   * @returns {Promise<string>} The address.
   */
  async getAddress () {
    // TODO: Implement address derivation for {{BLOCKCHAIN}}
    throw new Error('getAddress() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Signs a message.
   *
   * @param {string} message - The message to sign.
   * @returns {Promise<string>} The message's signature.
   */
  async sign (message) {
    if (!this._rawPrivateKey) {
      throw new Error('The wallet account has been disposed.')
    }

    // TODO: Implement {{BLOCKCHAIN}}-specific message signing
    throw new Error('sign() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Verifies a message's signature.
   *
   * @param {string} message - The original message.
   * @param {string} signature - The signature to verify.
   * @returns {Promise<boolean>} True if the signature is valid.
   */
  async verify (message, signature) {
    // TODO: Implement {{BLOCKCHAIN}}-specific signature verification
    throw new Error('verify() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Sends a transaction.
   *
   * @param {{{CLASS_NAME}}Transaction} tx - The transaction.
   * @returns {Promise<TransactionResult>} The transaction's result.
   */
  async sendTransaction (tx) {
    if (!this._rawPrivateKey) {
      throw new Error('The wallet account has been disposed.')
    }

    // TODO: Implement {{BLOCKCHAIN}}-specific transaction sending
    throw new Error('sendTransaction() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Transfers a token to another address.
   *
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<TransferResult>} The transfer's result.
   */
  async transfer (options) {
    if (!this._rawPrivateKey) {
      throw new Error('The wallet account has been disposed.')
    }

    // TODO: Implement {{BLOCKCHAIN}}-specific token transfer
    throw new Error('transfer() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Returns a read-only copy of the account.
   *
   * @returns {Promise<WalletAccountReadOnly{{CLASS_NAME}}>} The read-only account.
   */
  async toReadOnlyAccount () {
    const address = await this.getAddress()
    return new WalletAccountReadOnly{{CLASS_NAME}}(address, this._config)
  }

  /**
   * Disposes the wallet account, erasing the private key from the memory.
   */
  dispose () {
    if (this._rawPrivateKey) {
      // Zero out the private key memory
      this._rawPrivateKey.fill(0)
    }
    this._rawPrivateKey = undefined
    this._seed = undefined
  }
}
