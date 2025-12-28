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

import { WalletAccountReadOnly } from '@tetherto/wdk-wallet'

/** @typedef {import('@tetherto/wdk-wallet').Transaction} Transaction */
/** @typedef {import('@tetherto/wdk-wallet').TransactionResult} TransactionResult */
/** @typedef {import('@tetherto/wdk-wallet').TransferOptions} TransferOptions */
/** @typedef {import('@tetherto/wdk-wallet').TransferResult} TransferResult */

/** @typedef {import('./wallet-manager-{{CLASS_NAME_LOWER}}.js').{{CLASS_NAME}}WalletConfig} {{CLASS_NAME}}WalletConfig */

/**
 * Read-only {{CLASS_NAME}} wallet account implementation.
 * @extends WalletAccountReadOnly
 */
export default class WalletAccountReadOnly{{CLASS_NAME}} extends WalletAccountReadOnly {
  /**
   * Creates a new read-only {{BLOCKCHAIN}} wallet account.
   *
   * @param {string} [address] - The account's address.
   * @param {{{CLASS_NAME}}WalletConfig} [config] - The configuration object.
   */
  constructor (address, config = {}) {
    super(address)

    /**
     * The wallet account configuration.
     *
     * @protected
     * @type {{{CLASS_NAME}}WalletConfig}
     */
    this._config = config

    // TODO: Initialize {{BLOCKCHAIN}}-specific RPC client if config.rpcUrl provided
  }

  /**
   * Returns the account's native token balance.
   *
   * @returns {Promise<bigint>} The native token balance.
   */
  async getBalance () {
    // TODO: Implement {{BLOCKCHAIN}}-specific balance fetching
    throw new Error('getBalance() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Returns the account balance for a specific token.
   *
   * @param {string} tokenAddress - The smart contract address of the token.
   * @returns {Promise<bigint>} The token balance.
   */
  async getTokenBalance (tokenAddress) {
    // TODO: Implement {{BLOCKCHAIN}}-specific token balance fetching
    throw new Error('getTokenBalance() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Quotes the costs of a send transaction operation.
   *
   * @param {Transaction} tx - The transaction.
   * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
   */
  async quoteSendTransaction (tx) {
    // TODO: Implement {{BLOCKCHAIN}}-specific fee estimation
    throw new Error('quoteSendTransaction() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Quotes the costs of a transfer operation.
   *
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
   */
  async quoteTransfer (options) {
    // TODO: Implement {{BLOCKCHAIN}}-specific transfer fee estimation
    throw new Error('quoteTransfer() is not yet implemented for {{BLOCKCHAIN}}')
  }

  /**
   * Returns a transaction's receipt.
   *
   * @param {string} hash - The transaction's hash.
   * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
   */
  async getTransactionReceipt (hash) {
    // TODO: Implement {{BLOCKCHAIN}}-specific transaction receipt fetching
    throw new Error('getTransactionReceipt() is not yet implemented for {{BLOCKCHAIN}}')
  }
}
