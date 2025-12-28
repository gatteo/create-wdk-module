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
  })

  describe('supply', () => {
    // TODO: Implement supply functionality
    it.todo('should supply tokens to lending pool')
    it.todo('should return transaction hash')
    it.todo('should track supply position')
  })

  describe('withdraw', () => {
    // TODO: Implement withdraw functionality
    it.todo('should withdraw tokens from lending pool')
    it.todo('should return transaction hash')
    it.todo('should handle partial withdrawals')
  })

  describe('borrow', () => {
    // TODO: Implement borrow functionality
    it.todo('should borrow tokens against collateral')
    it.todo('should return transaction hash')
    it.todo('should track borrow position')
  })

  describe('repay', () => {
    // TODO: Implement repay functionality
    it.todo('should repay borrowed tokens')
    it.todo('should return transaction hash')
    it.todo('should handle partial repayments')
  })

  describe('getPositions', () => {
    // TODO: Implement if needed
    it.todo('should return user supply and borrow positions')
  })

  describe('getMarkets', () => {
    // TODO: Implement if needed
    it.todo('should return available lending markets')
    it.todo('should include APY rates')
  })
})
