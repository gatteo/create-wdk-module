import WalletAccountReadOnly{{CLASS_NAME}} from '../src/wallet-account-read-only-{{CLASS_NAME_LOWER}}.js'

describe('WalletAccountReadOnly{{CLASS_NAME}}', () => {
  describe('constructor', () => {
    it('should create read-only account with address', () => {
      const account = new WalletAccountReadOnly{{CLASS_NAME}}('test-address')
      expect(account).toBeInstanceOf(WalletAccountReadOnly{{CLASS_NAME}})
    })

    it('should accept configuration options', () => {
      const config = { rpcUrl: 'https://rpc.example.com' }
      const account = new WalletAccountReadOnly{{CLASS_NAME}}('test-address', config)
      expect(account).toBeInstanceOf(WalletAccountReadOnly{{CLASS_NAME}})
    })
  })

  describe('getAddress', () => {
    it('should return the address', async () => {
      const account = new WalletAccountReadOnly{{CLASS_NAME}}('test-address')
      const address = await account.getAddress()
      expect(address).toBe('test-address')
    })
  })

  describe('getBalance', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific balance fetching via RPC
    it.todo('should return native token balance')
    it.todo('should require RPC connection')
  })

  describe('getTokenBalance', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific token balance fetching
    it.todo('should return token balance for given token address')
  })

  describe('quoteSendTransaction', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific fee estimation
    it.todo('should return estimated fee for transaction')
  })

  describe('quoteTransfer', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific transfer fee estimation
    it.todo('should return estimated fee for token transfer')
  })

  describe('getTransactionReceipt', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific transaction receipt fetching
    it.todo('should return transaction receipt for valid hash')
    it.todo('should return null for pending transaction')
  })
})
