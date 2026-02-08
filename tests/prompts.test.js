import { jest } from '@jest/globals'

let mockPromptsReturn = {}

jest.unstable_mockModule('prompts', () => ({
  default: async () => mockPromptsReturn
}))

const { runPrompts } = await import('../src/prompts.js')

describe('runPrompts', () => {
  beforeEach(() => {
    mockPromptsReturn = {}
  })

  it('should use partial values when provided', async () => {
    mockPromptsReturn = { git: true }

    const result = await runPrompts({
      type: 'wallet',
      name: 'stellar',
      scope: '@test'
    })

    expect(result.type).toBe('wallet')
    expect(result.name).toBe('stellar')
    expect(result.scope).toBe('@test')
  })

  it('should use answers from prompts when no partials', async () => {
    mockPromptsReturn = {
      type: 'fiat',
      name: 'moonpay',
      scope: '',
      git: false
    }

    const result = await runPrompts({})

    expect(result.type).toBe('fiat')
    expect(result.name).toBe('moonpay')
    expect(result.git).toBe(false)
  })

  it('should default git to true when not answered', async () => {
    mockPromptsReturn = {
      type: 'wallet',
      name: 'stellar'
    }

    const result = await runPrompts({})

    expect(result.git).toBe(true)
  })

  it('should handle blockchain answer from prompt', async () => {
    mockPromptsReturn = {
      type: 'swap',
      name: 'jupiter',
      blockchain: 'solana',
      git: true
    }

    const result = await runPrompts({})

    expect(result.blockchain).toBe('solana')
  })

  it('should handle custom blockchain', async () => {
    mockPromptsReturn = {
      type: 'swap',
      name: 'jupiter',
      blockchain: '_custom',
      blockchainCustom: 'mychain',
      git: true
    }

    const result = await runPrompts({})

    expect(result.blockchain).toBe('mychain')
  })
})
