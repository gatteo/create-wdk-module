#!/usr/bin/env node

import { Command } from 'commander'
import pc from 'picocolors'
import { createModule } from './create-module.js'
import { runPrompts } from './prompts.js'
import { validateModuleType, validateModuleName } from './helpers/validate.js'
import { MODULE_CONFIGS } from './types.js'

const program = new Command()

program
  .name('create-wdk-module')
  .description('Create WDK modules with a single command')
  .version('1.0.0-beta.1')
  .argument('[type]', 'Module type (wallet/swap/bridge/lending/fiat)')
  .argument('[name]', 'Module or protocol name')
  .argument('[blockchain]', 'Target blockchain (for protocol modules)')
  .option('-s, --scope <scope>', 'npm scope (e.g., @myorg)')
  .option('--git', 'Initialize git repository', true)
  .option('--no-git', 'Skip git initialization')
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .action(async (typeArg, nameArg, blockchainArg, options) => {
    console.log()
    console.log(pc.bold('  Create WDK Module'))
    console.log()

    try {
      let moduleOptions

      if (typeArg != null && nameArg != null && options.yes) {
        if (!validateModuleType(typeArg)) {
          console.error(pc.red(`Invalid module type: ${typeArg}`))
          console.error(pc.dim('Valid types: wallet, swap, bridge, lending, fiat'))
          process.exit(1)
        }

        const nameValidation = validateModuleName(nameArg)
        if (!nameValidation.valid) {
          console.error(pc.red('Invalid module name:'))
          nameValidation.errors.forEach(e => console.error(pc.red(`  - ${e}`)))
          process.exit(1)
        }

        const config = MODULE_CONFIGS[typeArg]
        if (config.requiresBlockchain && (blockchainArg == null || blockchainArg === '')) {
          console.error(pc.red(`Blockchain argument is required for ${typeArg} modules`))
          console.error(pc.dim(`Usage: create-wdk-module ${typeArg} <name> <blockchain>`))
          process.exit(1)
        }

        moduleOptions = {
          type: typeArg,
          name: nameArg,
          blockchain: blockchainArg,
          scope: options.scope,
          git: options.git
        }
      } else if (typeArg != null && nameArg != null) {
        if (!validateModuleType(typeArg)) {
          console.error(pc.red(`Invalid module type: ${typeArg}`))
          console.error(pc.dim('Valid types: wallet, swap, bridge, lending, fiat'))
          process.exit(1)
        }

        const nameValidation = validateModuleName(nameArg)
        if (!nameValidation.valid) {
          console.error(pc.red('Invalid module name:'))
          nameValidation.errors.forEach(e => console.error(pc.red(`  - ${e}`)))
          process.exit(1)
        }

        moduleOptions = await runPrompts({
          type: typeArg,
          name: nameArg,
          blockchain: blockchainArg,
          scope: options.scope,
          git: options.git
        })
      } else {
        moduleOptions = await runPrompts({
          type: typeArg,
          name: nameArg,
          blockchain: blockchainArg,
          scope: options.scope,
          git: options.git
        })
      }

      await createModule(moduleOptions)
    } catch (error) {
      if (error instanceof Error && error.message === 'cancelled') {
        console.log(pc.dim('\nOperation cancelled'))
        process.exit(0)
      }
      throw error
    }
  })

program.parse()
