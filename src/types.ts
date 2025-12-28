export type ModuleType = 'wallet' | 'swap' | 'bridge' | 'lending' | 'fiat'

export interface CreateModuleOptions {
  type: ModuleType
  name: string
  blockchain?: string
  scope?: string
  git: boolean
  skipInstall?: boolean
}

export interface TemplateContext {
  MODULE_NAME: string // @myorg/wdk-wallet-stellar
  CLASS_NAME: string // Stellar
  CLASS_NAME_LOWER: string // stellar (for filenames)
  PACKAGE_NAME: string // wdk-wallet-stellar
  BLOCKCHAIN: string // stellar
  DESCRIPTION: string // Stellar wallet module for WDK
  YEAR: string // 2025
  AUTHOR: string // From git config or prompt
}

export interface ModuleConfig {
  type: ModuleType
  prefix: string
  namingPattern: string
  requiresBlockchain: boolean
  basePackage: string
  keywords: string[]
}

export const MODULE_CONFIGS: Record<ModuleType, ModuleConfig> = {
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
