import {
  validateModuleType,
  validateModuleName,
  validateScope,
  generatePackageName,
  toPascalCase
} from '../src/helpers/validate.js'

describe('validateModuleType', () => {
  it('should accept valid types', () => {
    expect(validateModuleType('wallet')).toBe(true)
    expect(validateModuleType('swap')).toBe(true)
    expect(validateModuleType('bridge')).toBe(true)
    expect(validateModuleType('lending')).toBe(true)
    expect(validateModuleType('fiat')).toBe(true)
  })

  it('should reject invalid types', () => {
    expect(validateModuleType('invalid')).toBe(false)
    expect(validateModuleType('')).toBe(false)
    expect(validateModuleType('WALLET')).toBe(false)
  })
})

describe('validateModuleName', () => {
  it('should accept valid names', () => {
    expect(validateModuleName('stellar').valid).toBe(true)
    expect(validateModuleName('jupiter').valid).toBe(true)
    expect(validateModuleName('my-protocol').valid).toBe(true)
    expect(validateModuleName('protocol123').valid).toBe(true)
  })

  it('should reject invalid names', () => {
    expect(validateModuleName('').valid).toBe(false)
    expect(validateModuleName('Invalid').valid).toBe(false)
    expect(validateModuleName('123start').valid).toBe(false)
    expect(validateModuleName('has space').valid).toBe(false)
  })

  it('should reject names over 50 characters', () => {
    const longName = 'a'.repeat(51)
    expect(validateModuleName(longName).valid).toBe(false)
  })
})

describe('validateScope', () => {
  it('should accept valid scopes', () => {
    expect(validateScope('@myorg').valid).toBe(true)
    expect(validateScope('@tetherto').valid).toBe(true)
    expect(validateScope('').valid).toBe(true) // Empty is valid
  })

  it('should reject invalid scopes', () => {
    expect(validateScope('myorg').valid).toBe(false) // Missing @
  })
})

describe('generatePackageName', () => {
  it('should generate correct wallet package name', () => {
    expect(generatePackageName('wallet', 'stellar')).toBe('wdk-wallet-stellar')
    expect(generatePackageName('wallet', 'stellar', undefined, '@myorg'))
      .toBe('@myorg/wdk-wallet-stellar')
  })

  it('should generate correct swap package name', () => {
    expect(generatePackageName('swap', 'jupiter', 'solana'))
      .toBe('wdk-protocol-swap-jupiter-solana')
  })

  it('should generate correct bridge package name', () => {
    expect(generatePackageName('bridge', 'wormhole', 'evm'))
      .toBe('wdk-protocol-bridge-wormhole-evm')
  })

  it('should generate correct fiat package name', () => {
    expect(generatePackageName('fiat', 'moonpay')).toBe('wdk-protocol-fiat-moonpay')
  })

  it('should throw when blockchain missing for protocol modules', () => {
    expect(() => generatePackageName('swap', 'jupiter')).toThrow('Blockchain is required')
  })
})

describe('toPascalCase', () => {
  it('should convert to PascalCase', () => {
    expect(toPascalCase('stellar')).toBe('Stellar')
    expect(toPascalCase('my-protocol')).toBe('MyProtocol')
    expect(toPascalCase('jupiter-swap')).toBe('JupiterSwap')
  })
})
