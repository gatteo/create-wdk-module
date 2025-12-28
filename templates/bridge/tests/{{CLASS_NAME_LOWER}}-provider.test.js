import { jest } from '@jest/globals'
import {{CLASS_NAME}}Provider from '../src/{{CLASS_NAME_LOWER}}-provider.js'

describe('{{CLASS_NAME}}Provider', () => {
  const mockAccount = {
    getAddress: jest.fn().mockResolvedValue('mock-address'),
    sendTransaction: jest.fn()
  }

  let provider

  beforeEach(() => {
    provider = new {{CLASS_NAME}}Provider(mockAccount)
  })

  describe('constructor', () => {
    it('should create provider instance', () => {
      expect(provider).toBeInstanceOf({{CLASS_NAME}}Provider)
    })

    it('should accept configuration', () => {
      const config = { apiKey: 'test-key' }
      const configuredProvider = new {{CLASS_NAME}}Provider(mockAccount, config)
      expect(configuredProvider).toBeInstanceOf({{CLASS_NAME}}Provider)
    })
  })

  describe('bridge', () => {
    // TODO: Implement bridge functionality
    it.todo('should bridge tokens to target chain')
    it.todo('should return transaction hash')
    it.todo('should track bridging status')
  })

  describe('quoteBridge', () => {
    // TODO: Implement quote functionality
    it.todo('should return expected output amount')
    it.todo('should return bridge fee')
    it.todo('should return estimated time')
  })

  describe('getSupportedChains', () => {
    // TODO: Implement if needed
    it.todo('should return list of supported target chains')
  })

  describe('getSupportedTokens', () => {
    // TODO: Implement if needed
    it.todo('should return list of bridgeable tokens')
  })
})
