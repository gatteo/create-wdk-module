import WalletManager{{CLASS_NAME}} from '../src/wallet-manager-{{CLASS_NAME_LOWER}}.js'

const TEST_MNEMONIC = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

describe('WalletManager{{CLASS_NAME}}', () => {
  let wallet

  beforeEach(() => {
    wallet = new WalletManager{{CLASS_NAME}}(TEST_MNEMONIC)
  })

  afterEach(() => {
    wallet.dispose()
  })

  describe('constructor', () => {
    it('should create wallet from mnemonic', () => {
      expect(wallet).toBeInstanceOf(WalletManager{{CLASS_NAME}})
    })

    it('should throw error for invalid mnemonic', () => {
      expect(() => new WalletManager{{CLASS_NAME}}('invalid mnemonic')).toThrow()
    })

    it('should accept configuration options', () => {
      const config = { rpcUrl: 'https://rpc.example.com' }
      const configuredWallet = new WalletManager{{CLASS_NAME}}(TEST_MNEMONIC, config)
      expect(configuredWallet).toBeInstanceOf(WalletManager{{CLASS_NAME}})
      configuredWallet.dispose()
    })
  })

  describe('getAccount', () => {
    // TODO: Implement key derivation in WalletAccount{{CLASS_NAME}}.at()
    it.todo('should return account at default index')
    it.todo('should return account at specified index')
    it.todo('should cache and return same account for same index')
  })

  describe('getAccountByPath', () => {
    // TODO: Implement key derivation in WalletAccount{{CLASS_NAME}}.at()
    it.todo('should return account at custom derivation path')
    it.todo('should cache and return same account for same path')
  })

  describe('getFeeRates', () => {
    it('should throw not implemented error', async () => {
      await expect(wallet.getFeeRates()).rejects.toThrow('not yet implemented')
    })
  })

  describe('dispose', () => {
    it.todo('should dispose all accounts and clear sensitive data')
  })
})
