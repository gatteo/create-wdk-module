export { default } from '../src/wallet-manager-{{CLASS_NAME_LOWER}}.js'
export { default as WalletAccountReadOnly{{CLASS_NAME}} } from '../src/wallet-account-read-only-{{CLASS_NAME_LOWER}}.js'
export { default as WalletAccount{{CLASS_NAME}} } from '../src/wallet-account-{{CLASS_NAME_LOWER}}.js'

export type FeeRates = import('@tetherto/wdk-wallet').FeeRates
export type KeyPair = import('@tetherto/wdk-wallet').KeyPair
export type TransactionResult = import('@tetherto/wdk-wallet').TransactionResult
export type TransferOptions = import('@tetherto/wdk-wallet').TransferOptions
export type TransferResult = import('@tetherto/wdk-wallet').TransferResult

export type {{CLASS_NAME}}WalletConfig = import('../src/wallet-manager-{{CLASS_NAME_LOWER}}.js').{{CLASS_NAME}}WalletConfig
export type {{CLASS_NAME}}Transaction = import('../src/wallet-account-{{CLASS_NAME_LOWER}}.js').{{CLASS_NAME}}Transaction
