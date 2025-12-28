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

import { LendingProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/**
 * @typedef {import('@tetherto/wdk-wallet/protocols').SupplyOptions} SupplyOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').SupplyResult} SupplyResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').WithdrawOptions} WithdrawOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').WithdrawResult} WithdrawResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').BorrowOptions} BorrowOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').BorrowResult} BorrowResult
 * @typedef {import('@tetherto/wdk-wallet/protocols').RepayOptions} RepayOptions
 * @typedef {import('@tetherto/wdk-wallet/protocols').RepayResult} RepayResult
 */

/**
 * @typedef {Object} {{CLASS_NAME}}ProviderConfig
 * @property {string} [poolAddress] - The lending pool contract address.
 */

/**
 * {{CLASS_NAME}} lending protocol provider for {{BLOCKCHAIN}}.
 * @extends LendingProtocol
 */
export default class {{CLASS_NAME}}Provider extends LendingProtocol {
  /**
   * Creates a new {{CLASS_NAME}} lending provider.
   *
   * @param {IWalletAccount | IWalletAccountReadOnly} account - The wallet account to use.
   * @param {{{CLASS_NAME}}ProviderConfig} [config] - The provider configuration.
   */
  constructor (account, config = {}) {
    super(account)

    /**
     * The {{CLASS_NAME}} provider configuration.
     *
     * @protected
     * @type {{{CLASS_NAME}}ProviderConfig}
     */
    this._config = config

    // TODO: Initialize {{CLASS_NAME}} contract client
  }

  /**
   * Supplies a specific token amount to the lending pool.
   *
   * @param {SupplyOptions} options - The supply options.
   * @returns {Promise<SupplyResult>} The supply result.
   */
  async supply (options) {
    throw new Error('supply() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a supply operation.
   *
   * @param {SupplyOptions} options - The supply options.
   * @returns {Promise<Omit<SupplyResult, 'hash'>>} The supply quote.
   */
  async quoteSupply (options) {
    throw new Error('quoteSupply() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Withdraws a specific token amount from the pool.
   *
   * @param {WithdrawOptions} options - The withdraw options.
   * @returns {Promise<WithdrawResult>} The withdraw result.
   */
  async withdraw (options) {
    throw new Error('withdraw() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a withdraw operation.
   *
   * @param {WithdrawOptions} options - The withdraw options.
   * @returns {Promise<Omit<WithdrawResult, 'hash'>>} The withdraw quote.
   */
  async quoteWithdraw (options) {
    throw new Error('quoteWithdraw() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Borrows a specific token amount.
   *
   * @param {BorrowOptions} options - The borrow options.
   * @returns {Promise<BorrowResult>} The borrow result.
   */
  async borrow (options) {
    throw new Error('borrow() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a borrow operation.
   *
   * @param {BorrowOptions} options - The borrow options.
   * @returns {Promise<Omit<BorrowResult, 'hash'>>} The borrow quote.
   */
  async quoteBorrow (options) {
    throw new Error('quoteBorrow() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Repays a specific token amount.
   *
   * @param {RepayOptions} options - The repay options.
   * @returns {Promise<RepayResult>} The repay result.
   */
  async repay (options) {
    throw new Error('repay() is not yet implemented for {{CLASS_NAME}}')
  }

  /**
   * Quotes the costs of a repay operation.
   *
   * @param {RepayOptions} options - The repay options.
   * @returns {Promise<Omit<RepayResult, 'hash'>>} The repay quote.
   */
  async quoteRepay (options) {
    throw new Error('quoteRepay() is not yet implemented for {{CLASS_NAME}}')
  }
}
