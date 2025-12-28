export { default } from '../src/{{CLASS_NAME_LOWER}}-provider.js'

export type BuyOptions = import('@tetherto/wdk-wallet/protocols').BuyOptions
export type BuyResult = import('@tetherto/wdk-wallet/protocols').BuyResult
export type SellOptions = import('@tetherto/wdk-wallet/protocols').SellOptions
export type SellResult = import('@tetherto/wdk-wallet/protocols').SellResult
export type FiatQuote = import('@tetherto/wdk-wallet/protocols').FiatQuote
export type FiatTransactionDetail = import('@tetherto/wdk-wallet/protocols').FiatTransactionDetail
export type SupportedCryptoAsset = import('@tetherto/wdk-wallet/protocols').SupportedCryptoAsset
export type SupportedFiatCurrency = import('@tetherto/wdk-wallet/protocols').SupportedFiatCurrency
export type SupportedCountry = import('@tetherto/wdk-wallet/protocols').SupportedCountry
export type {{CLASS_NAME}}ProviderConfig = import('../src/{{CLASS_NAME_LOWER}}-provider.js').{{CLASS_NAME}}ProviderConfig
