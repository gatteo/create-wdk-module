import WalletAccount{{CLASS_NAME}} from '../src/wallet-account-{{CLASS_NAME_LOWER}}.js'

const TEST_MNEMONIC = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

describe('WalletAccount{{CLASS_NAME}}', () => {
  // NOTE: Most tests are marked as todo because they require
  // implementing key derivation in WalletAccount{{CLASS_NAME}}.at()

  describe('static at()', () => {
    // TODO: Implement key derivation for {{BLOCKCHAIN}}
    // See: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    it.todo('should create account from seed and path')
    it.todo('should derive correct keys for {{BLOCKCHAIN}}')
  })

  describe('properties', () => {
    it.todo('should have correct derivation path')
    it.todo('should have correct account index')
    it.todo('should have valid keyPair with public and private keys')
  })

  describe('getAddress', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific address derivation
    it.todo('should return valid {{BLOCKCHAIN}} address')
    it.todo('should return consistent address for same account')
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

  describe('sign', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific message signing
    it.todo('should sign a message and return signature')
    it.todo('should throw if account has been disposed')
  })

  describe('verify', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific signature verification
    it.todo('should verify a valid signature')
    it.todo('should reject an invalid signature')
  })

  describe('sendTransaction', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific transaction sending
    it.todo('should send native token transaction')
    it.todo('should return transaction hash and fee')
    it.todo('should throw if account has been disposed')
    it.todo('should require RPC connection')
  })

  describe('transfer', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific token transfer
    it.todo('should transfer tokens to recipient')
    it.todo('should return transaction hash and fee')
  })

  describe('quoteSendTransaction', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific fee estimation
    it.todo('should return estimated fee for transaction')
  })

  describe('quoteTransfer', () => {
    // TODO: Implement {{BLOCKCHAIN}}-specific transfer fee estimation
    it.todo('should return estimated fee for token transfer')
  })

  describe('toReadOnlyAccount', () => {
    it.todo('should return read-only copy of account')
  })

  describe('dispose', () => {
    it.todo('should clear private key from memory')
    it.todo('should prevent signing after disposal')
  })
})
