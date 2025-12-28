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

import { SwapProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/**
 * @typedef {import('@tetherto/wdk-wallet/protocols').SwapOptions} SwapOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').SwapResult} SwapResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').SwapProtocolConfig} SwapProtocolConfig
 */

/**
 * @typedef {Object} {{CLASS_NAME}}ProviderConfig
 * @property {number | bigint} [swapMaxFee] - The maximum fee amount for swap operations.
 * @property {string} [apiKey] - API key for {{CLASS_NAME}} service.
 * @property {string} [apiUrl] - Custom API URL for {{CLASS_NAME}}.
 */

/**
 * {{CLASS_NAME}} swap protocol provider for {{BLOCKCHAIN}}.
 * @extends SwapProtocol
 */
export default class {{CLASS_NAME}}Provider extends SwapProtocol {
  /**
   * Creates a new {{CLASS_NAME}} swap provider.
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
   * Swaps a pair of tokens.
   *
   * @param {SwapOptions} options - The swap options.
   * @returns {Promise<SwapResult>} The swap result.
   */
  async swap (options) {
    // TODO: Implement {{CLASS_NAME}} swap on {{BLOCKCHAIN}}
    // 1. Get quote from {{CLASS_NAME}} API
    // 2. Build swap transaction
    // 3. Sign and send transaction
    // 4. Return result with hash and amounts

    throw new Error('swap() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a swap operation.
   *
   * @param {SwapOptions} options - The swap options.
   * @returns {Promise<Omit<SwapResult, 'hash'>>} The swap quote.
   */
  async quoteSwap (options) {
    // TODO: Implement {{CLASS_NAME}} swap quote on {{BLOCKCHAIN}}
    // 1. Call {{CLASS_NAME}} API for quote
    // 2. Calculate fees
    // 3. Return quote with amounts and fees

    throw new Error('quoteSwap() is not yet implemented for {{CLASS_NAME}}')
  }
}
