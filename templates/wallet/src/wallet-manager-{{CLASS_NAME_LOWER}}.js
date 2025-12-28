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

import WalletManager from '@tetherto/wdk-wallet'

import WalletAccount{{CLASS_NAME}} from './wallet-account-{{CLASS_NAME_LOWER}}.js'

/** @typedef {import('@tetherto/wdk-wallet').FeeRates} FeeRates */

/**
 * @typedef {Object} {{CLASS_NAME}}WalletConfig
 * @property {string} [rpcUrl] - The RPC URL for the {{BLOCKCHAIN}} network.
 * @property {number | bigint} [transferMaxFee] - The maximum fee amount for transfer operations.
 */

/**
 * {{CLASS_NAME}} wallet manager implementation.
 * @extends WalletManager
 */
export default class WalletManager{{CLASS_NAME}} extends WalletManager {
  /**
   * Creates a new wallet manager for the {{BLOCKCHAIN}} blockchain.
   *
   * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
   * @param {{{CLASS_NAME}}WalletConfig} [config] - The configuration object.
   */
  constructor (seed, config = {}) {
    super(seed, config)

    /**
     * The {{BLOCKCHAIN}} wallet configuration.
     *
     * @protected
     * @type {{{CLASS_NAME}}WalletConfig}
     */
    this._config = config

    // TODO: Initialize {{BLOCKCHAIN}}-specific RPC client if rpcUrl provided
  }

  /**
   * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
   *
   * @param {number} [index] - The index of the account to get (default: 0).
   * @returns {Promise<WalletAccount{{CLASS_NAME}}>} The account.
   */
  async getAccount (index = 0) {
    // TODO: Update derivation path for {{BLOCKCHAIN}}
    return await this.getAccountByPath(`${index}'/0'`)
  }

  /**
   * Returns the wallet account at a specific BIP-44 derivation path.
   *
   * @param {string} path - The derivation path (e.g. "0'/0/0").
   * @returns {Promise<WalletAccount{{CLASS_NAME}}>} The account.
   */
  async getAccountByPath (path) {
    if (!this._accounts[path]) {
      const account = await WalletAccount{{CLASS_NAME}}.at(this.seed, path, this._config)
      this._accounts[path] = account
    }

    return this._accounts[path]
  }

  /**
   * Returns the current fee rates.
   *
   * @returns {Promise<FeeRates>} The fee rates (in base units).
   */
  async getFeeRates () {
    // TODO: Implement {{BLOCKCHAIN}}-specific fee rate fetching
    throw new Error('getFeeRates() is not yet implemented for {{BLOCKCHAIN}}')
  }
}
