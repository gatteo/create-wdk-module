import prompts from 'prompts'
import { ModuleType, CreateModuleOptions, MODULE_CONFIGS } from './types.js'
import { validateModuleName, validateScope } from './helpers/validate.js'

interface PartialOptions {
  type?: ModuleType
  name?: string
  blockchain?: string
  scope?: string
  git?: boolean
}

export async function runPrompts (partial: PartialOptions): Promise<CreateModuleOptions> {
  const onCancel = (): never => {
    throw new Error('cancelled')
  }

  const questions: prompts.PromptObject[] = []

  // Module type
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

  // Module name
  if (partial.name == null || partial.name === '') {
    questions.push({
      type: 'text',
      name: 'name',
      message: (_prev: unknown, values: Record<string, unknown>) => {
        const type = (values.type as ModuleType | undefined) ?? partial.type
        if (type === 'wallet') return 'What is the blockchain name? (e.g., "stellar", "solana")'
        if (type === 'fiat') return 'What is the provider name? (e.g., "moonpay", "ramp")'
        return 'What is the protocol name? (e.g., "jupiter", "wormhole")'
      },
      validate: (value: string) => {
        const result = validateModuleName(value)
        return result.valid || result.errors[0]
      }
    })
  }

  // Blockchain (for protocol modules)
  questions.push({
    type: (_prev: unknown, values: Record<string, unknown>) => {
      const type = (values.type as ModuleType | undefined) ?? partial.type
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

  // Custom blockchain input
  questions.push({
    type: (prev: unknown) => prev === '_custom' ? 'text' : null,
    name: 'blockchainCustom',
    message: 'Enter the blockchain/network name:',
    validate: (value: string) => {
      const result = validateModuleName(value)
      return result.valid || result.errors[0]
    }
  })

  // npm scope
  if (partial.scope === undefined) {
    questions.push({
      type: 'text',
      name: 'scope',
      message: 'npm scope (leave empty for none, e.g., @myorg):',
      validate: (value: string) => {
        if (value === '') return true
        const result = validateScope(value)
        return result.valid || result.errors[0]
      }
    })
  }

  // Git initialization
  if (partial.git === undefined) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      initial: true
    })
  }

  const answers = await prompts(questions, { onCancel })

  const blockchainAnswer = (answers.blockchainCustom as string | undefined) ?? (answers.blockchain as string | undefined)

  return {
    type: partial.type ?? (answers.type as ModuleType),
    name: partial.name ?? (answers.name as string),
    blockchain: partial.blockchain ?? (blockchainAnswer === '_custom' ? undefined : blockchainAnswer),
    scope: partial.scope ?? (answers.scope as string | undefined) ?? undefined,
    git: partial.git ?? (answers.git as boolean | undefined) ?? true
  }
}
