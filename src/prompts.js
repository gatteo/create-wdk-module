import prompts from 'prompts'
import { MODULE_CONFIGS } from './types.js'
import { validateModuleName, validateScope } from './helpers/validate.js'

/**
 * @param {Object} partial
 * @param {string} [partial.type]
 * @param {string} [partial.name]
 * @param {string} [partial.blockchain]
 * @param {string} [partial.scope]
 * @param {boolean} [partial.git]
 * @returns {Promise<import('./types.js').CreateModuleOptions>}
 */
export async function runPrompts (partial) {
  const onCancel = () => {
    throw new Error('cancelled')
  }

  const questions = []

  if (partial.type == null) {
    questions.push({
      type: 'select',
      name: 'type',
      message: 'What type of module do you want to create?',
      choices: [
        { title: 'Wallet Module', description: 'Blockchain wallet integration', value: 'wallet' },
        { title: 'Swap Module', description: 'DEX/token swap integration', value: 'swap' },
        { title: 'Bridge Module', description: 'Cross-chain bridging', value: 'bridge' },
        { title: 'Lending Module', description: 'DeFi lending protocol', value: 'lending' },
        { title: 'Fiat Module', description: 'Fiat on/off-ramp', value: 'fiat' }
      ]
    })
  }

  if (partial.name == null || partial.name === '') {
    questions.push({
      type: 'text',
      name: 'name',
      message: (_prev, values) => {
        const type = values.type ?? partial.type
        if (type === 'wallet') return 'What is the blockchain name? (e.g., "stellar", "solana")'
        if (type === 'fiat') return 'What is the provider name? (e.g., "moonpay", "ramp")'
        return 'What is the protocol name? (e.g., "jupiter", "wormhole")'
      },
      validate: (value) => {
        const result = validateModuleName(value)
        return result.valid || result.errors[0]
      }
    })
  }

  questions.push({
    type: (_prev, values) => {
      const type = values.type ?? partial.type
      if (type == null) return null
      const config = MODULE_CONFIGS[type]
      return config.requiresBlockchain && (partial.blockchain == null || partial.blockchain === '') ? 'select' : null
    },
    name: 'blockchain',
    message: 'What blockchain does this target?',
    choices: [
      { title: 'Custom (I\'ll specify)', value: '_custom' },
      { title: 'EVM (Ethereum, Polygon, etc.)', value: 'evm' },
      { title: 'Solana', value: 'solana' },
      { title: 'Bitcoin', value: 'bitcoin' },
      { title: 'TON', value: 'ton' },
      { title: 'TRON', value: 'tron' }
    ]
  })

  questions.push({
    type: (prev) => prev === '_custom' ? 'text' : null,
    name: 'blockchainCustom',
    message: 'Enter the blockchain/network name:',
    validate: (value) => {
      const result = validateModuleName(value)
      return result.valid || result.errors[0]
    }
  })

  if (partial.scope === undefined) {
    questions.push({
      type: 'text',
      name: 'scope',
      message: 'npm scope (leave empty for none, e.g., @myorg):',
      validate: (value) => {
        if (value === '') return true
        const result = validateScope(value)
        return result.valid || result.errors[0]
      }
    })
  }

  if (partial.git === undefined) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      initial: true
    })
  }

  const answers = await prompts(questions, { onCancel })

  const blockchainAnswer = answers.blockchainCustom ?? answers.blockchain

  return {
    type: partial.type ?? answers.type,
    name: partial.name ?? answers.name,
    blockchain: partial.blockchain ?? (blockchainAnswer === '_custom' ? undefined : blockchainAnswer),
    scope: partial.scope ?? answers.scope ?? undefined,
    git: partial.git ?? answers.git ?? true
  }
}
