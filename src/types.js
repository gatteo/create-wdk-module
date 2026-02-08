/**
 * @typedef {'wallet' | 'swap' | 'bridge' | 'lending' | 'fiat'} ModuleType
 */

/**
 * @typedef {Object} CreateModuleOptions
 * @property {ModuleType} type
 * @property {string} name
 * @property {string} [blockchain]
 * @property {string} [scope]
 * @property {boolean} git
 * @property {boolean} [skipInstall]
 */

/**
 * @typedef {Object} TemplateContext
 * @property {string} MODULE_NAME - @myorg/wdk-wallet-stellar
 * @property {string} CLASS_NAME - Stellar
 * @property {string} CLASS_NAME_LOWER - stellar (for filenames)
 * @property {string} PACKAGE_NAME - wdk-wallet-stellar
 * @property {string} BLOCKCHAIN - stellar
 * @property {string} DESCRIPTION - Stellar wallet module for WDK
 * @property {string} YEAR - 2025
 * @property {string} AUTHOR - From git config or prompt
 */

/**
 * @typedef {Object} ModuleConfig
 * @property {ModuleType} type
 * @property {string} prefix
 * @property {string} namingPattern
 * @property {boolean} requiresBlockchain
 * @property {string} basePackage
 * @property {string[]} keywords
 */

/** @type {Record<ModuleType, ModuleConfig>} */
export const MODULE_CONFIGS = {
  wallet: {
    type: 'wallet',
    prefix: 'wdk-wallet-',
    namingPattern: 'wdk-wallet-{chain}',
    requiresBlockchain: false,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'wallet', 'bip-32']
  },
  swap: {
    type: 'swap',
    prefix: 'wdk-protocol-swap-',
    namingPattern: 'wdk-protocol-swap-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'swap', 'dex', 'defi']
  },
  bridge: {
    type: 'bridge',
    prefix: 'wdk-protocol-bridge-',
    namingPattern: 'wdk-protocol-bridge-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'bridge', 'cross-chain']
  },
  lending: {
    type: 'lending',
    prefix: 'wdk-protocol-lending-',
    namingPattern: 'wdk-protocol-lending-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'lending', 'defi']
  },
  fiat: {
    type: 'fiat',
    prefix: 'wdk-protocol-fiat-',
    namingPattern: 'wdk-protocol-fiat-{provider}',
    requiresBlockchain: false,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'fiat', 'on-ramp', 'off-ramp']
  }
}
