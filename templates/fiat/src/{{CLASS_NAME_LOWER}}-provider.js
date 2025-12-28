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

import { FiatProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/**
 * @typedef {import('@tetherto/wdk-wallet/protocols').BuyOptions} BuyOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').BuyResult} BuyResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').SellOptions} SellOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').SellResult} SellResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').FiatQuote} FiatQuote
 * @typedef {import('@tetherto/wdk-wallet/protocols').FiatTransactionDetail} FiatTransactionDetail
 * @typedef {import('@tetherto/wdk-wallet/protocols').SupportedCryptoAsset} SupportedCryptoAsset
 * @typedef {import('@tetherto/wdk-wallet/protocols').SupportedFiatCurrency} SupportedFiatCurrency
 * @typedef {import('@tetherto/wdk-wallet/protocols').SupportedCountry} SupportedCountry
 */

/**
 * @typedef {Object} {{CLASS_NAME}}ProviderConfig
 * @property {string} apiKey - API key for {{CLASS_NAME}} service (required).
 * @property {string} [apiUrl] - Custom API URL for {{CLASS_NAME}}.
 * @property {boolean} [sandbox] - Whether to use sandbox/test mode.
 */

/**
 * {{CLASS_NAME}} fiat on/off-ramp provider.
 * @extends FiatProtocol
 */
export default class {{CLASS_NAME}}Provider extends FiatProtocol {
  /**
   * Creates a new {{CLASS_NAME}} fiat provider.
   *
   * @param {IWalletAccount | IWalletAccountReadOnly | undefined} [account] - The wallet account to use (optional).
   * @param {{{CLASS_NAME}}ProviderConfig} config - The provider configuration.
   */
  constructor (account, config) {
    super(account)

    if (!config?.apiKey) {
      throw new Error('{{CLASS_NAME}} API key is required')
    }

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
   * Gets a quote for a crypto asset purchase.
   *
   * @param {Omit<BuyOptions, 'recipient'>} options - The buy options.
   * @returns {Promise<FiatQuote>} The quote.
   */
  async quoteBuy (options) {
    throw new Error('quoteBuy() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Generates a URL for a user to purchase a crypto asset with fiat currency.
   *
   * @param {BuyOptions} options - The buy options.
   * @returns {Promise<BuyResult>} The buy URL.
   */
  async buy (options) {
    throw new Error('buy() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Gets a quote for a crypto asset sale.
   *
   * @param {Omit<SellOptions, 'refundAddress'>} options - The sell options.
   * @returns {Promise<FiatQuote>} The quote.
   */
  async quoteSell (options) {
    throw new Error('quoteSell() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Generates a URL for a user to sell a crypto asset for fiat currency.
   *
   * @param {SellOptions} options - The sell options.
   * @returns {Promise<SellResult>} The sell URL.
   */
  async sell (options) {
    throw new Error('sell() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Retrieves the details of a specific transaction from the provider.
   *
   * @param {string} txId - The unique identifier of the transaction.
   * @returns {Promise<FiatTransactionDetail>} The transaction details.
   */
  async getTransactionDetail (txId) {
    throw new Error('getTransactionDetail() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Retrieves a list of supported crypto assets from the provider.
   *
   * @returns {Promise<SupportedCryptoAsset[]>} The supported crypto assets.
   */
  async getSupportedCryptoAssets () {
    throw new Error('getSupportedCryptoAssets() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Retrieves a list of supported fiat currencies from the provider.
   *
   * @returns {Promise<SupportedFiatCurrency[]>} The supported fiat currencies.
   */
  async getSupportedFiatCurrencies () {
    throw new Error('getSupportedFiatCurrencies() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Retrieves a list of supported countries from the provider.
   *
   * @returns {Promise<SupportedCountry[]>} The supported countries.
   */
  async getSupportedCountries () {
    throw new Error('getSupportedCountries() is not yet implemented for {{CLASS_NAME}}')
  }
}
