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

import { BridgeProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/**
 * @typedef {import('@tetherto/wdk-wallet/protocols').BridgeOptions} BridgeOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').BridgeResult} BridgeResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').BridgeProtocolConfig} BridgeProtocolConfig
 */

/**
 * @typedef {Object} {{CLASS_NAME}}ProviderConfig
 * @property {number | bigint} [bridgeMaxFee] - The maximum fee amount for bridge operations.
 * @property {string} [apiKey] - API key for {{CLASS_NAME}} service.
 * @property {string} [apiUrl] - Custom API URL for {{CLASS_NAME}}.
 */

/**
 * {{CLASS_NAME}} bridge protocol provider for {{BLOCKCHAIN}}.
 * @extends BridgeProtocol
 */
export default class {{CLASS_NAME}}Provider extends BridgeProtocol {
  /**
   * Creates a new {{CLASS_NAME}} bridge provider.
   *
   * @param {IWalletAccount | IWalletAccountReadOnly} account - The wallet account to use.
   * @param {{{CLASS_NAME}}ProviderConfig} [config] - The provider configuration.
   */
  constructor (account, config = {}) {
    super(account, config)

    /**
     * The {{CLASS_NAME}} provider configuration.
     *
     * @protected
     * @type {{{CLASS_NAME}}ProviderConfig}
     */
    this._config = config

    // TODO: Initialize {{CLASS_NAME}} API client
  }

  /**
   * Bridges a token to a different blockchain.
   *
   * @param {BridgeOptions} options - The bridge options.
   * @returns {Promise<BridgeResult>} The bridge result.
   */
  async bridge (options) {
    // TODO: Implement {{CLASS_NAME}} bridge from {{BLOCKCHAIN}}
    // 1. Get quote from {{CLASS_NAME}} API
    // 2. Build bridge transaction
    // 3. Sign and send transaction
    // 4. Return result with hash and fees

    throw new Error('bridge() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a bridge operation.
   *
   * @param {BridgeOptions} options - The bridge options.
   * @returns {Promise<Omit<BridgeResult, 'hash'>>} The bridge quote.
   */
  async quoteBridge (options) {
    // TODO: Implement {{CLASS_NAME}} bridge quote from {{BLOCKCHAIN}}
    // 1. Call {{CLASS_NAME}} API for quote
    // 2. Calculate gas and bridge fees
    // 3. Return quote with fees

    throw new Error('quoteBridge() is not yet implemented for {{CLASS_NAME}}')
  }
}
