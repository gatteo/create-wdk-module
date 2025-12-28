import {{CLASS_NAME}}Provider from '../src/{{CLASS_NAME_LOWER}}-provider.js'

describe('{{CLASS_NAME}}Provider', () => {
  let provider

  beforeEach(() => {
    provider = new {{CLASS_NAME}}Provider(undefined, { apiKey: 'test-key' })
  })

  describe('constructor', () => {
    it('should create provider instance', () => {
      expect(provider).toBeInstanceOf({{CLASS_NAME}}Provider)
    })

    it('should require API key', () => {
      expect(() => new {{CLASS_NAME}}Provider(undefined, {})).toThrow('API key is required')
    })
  })

  describe('quoteBuy', () => {
    // TODO: Implement quote functionality
    it.todo('should return crypto amount for fiat')
    it.todo('should return exchange rate')
    it.todo('should return fee breakdown')
  })

  describe('buy', () => {
    // TODO: Implement buy functionality
    it.todo('should initiate fiat purchase')
    it.todo('should return transaction/order ID')
    it.todo('should handle payment flow')
  })

  describe('quoteSell', () => {
    // TODO: Implement if supporting sell
    it.todo('should return fiat amount for crypto')
  })

  describe('sell', () => {
    // TODO: Implement if supporting sell
    it.todo('should initiate crypto sale')
  })

  describe('getSupportedCryptoAssets', () => {
    // TODO: Implement supported assets query
    it.todo('should return list of supported crypto assets')
  })

  describe('getSupportedFiatCurrencies', () => {
    // TODO: Implement supported currencies query
    it.todo('should return list of supported fiat currencies')
  })

  describe('getSupportedCountries', () => {
    // TODO: Implement supported countries query
    it.todo('should return list of supported countries')
  })

  describe('getSupportedPaymentMethods', () => {
    // TODO: Implement if needed
    it.todo('should return available payment methods')
  })
})
