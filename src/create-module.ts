import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import pc from 'picocolors'
import ora from 'ora'
import { CreateModuleOptions, TemplateContext } from './types.js'
import { copyTemplate, copyCommonFiles } from './helpers/copy.js'
import { initGit, getGitAuthor, isGitAvailable } from './helpers/git.js'
import { generatePackageName, toPascalCase } from './helpers/validate.js'
import { detectPackageManager, getInstallCommand } from './helpers/install.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(currentDir, '../templates')

export async function createModule (options: CreateModuleOptions): Promise<void> {
  const { type, name, blockchain, scope, git } = options

  // Generate names
  const packageName = generatePackageName(type, name, blockchain, scope)
  const dirName = scope != null && scope !== ''
    ? packageName.replace(`${scope}/`, '')
    : packageName
  const className = toPascalCase(name)
  const classNameLower = name.toLowerCase()
  const blockchainName = blockchain ?? name

  // Create context for template processing
  const context: TemplateContext = {
    MODULE_NAME: packageName,
    CLASS_NAME: className,
    CLASS_NAME_LOWER: classNameLower,
    PACKAGE_NAME: dirName,
    BLOCKCHAIN: blockchainName,
    DESCRIPTION: generateDescription(type, className, blockchainName),
    YEAR: new Date().getFullYear().toString(),
    AUTHOR: getGitAuthor()
  }

  const targetDir = path.resolve(process.cwd(), dirName)

  // Check if directory exists
  if (await fs.pathExists(targetDir)) {
    console.error(pc.red(`\nDirectory ${dirName} already exists`))
    process.exit(1)
  }

  console.log(pc.dim(`Creating ${pc.bold(packageName)}...\n`))

  // Copy common template files
  const commonSpinner = ora('Copying common files').start()
  try {
    const commonDir = path.join(TEMPLATES_DIR, 'common')
    if (await fs.pathExists(commonDir)) {
      await copyCommonFiles(commonDir, targetDir, context)
      commonSpinner.succeed('Copied common files')
    } else {
      commonSpinner.warn('Common template not found, skipping')
    }
  } catch (error) {
    commonSpinner.fail('Failed to copy common files')
    throw error
  }

  // Copy module-specific template files
  const templateSpinner = ora('Copying template files').start()
  try {
    const templateDir = path.join(TEMPLATES_DIR, type)

    if (!await fs.pathExists(templateDir)) {
      templateSpinner.fail()
      console.error(pc.red(`Template for "${type}" not found at ${templateDir}`))
      process.exit(1)
    }

    await copyTemplate(templateDir, targetDir, context)
    templateSpinner.succeed('Copied template files')
  } catch (error) {
    templateSpinner.fail('Failed to copy template files')
    throw error
  }

  // Initialize git
  if (git && isGitAvailable()) {
    const gitSpinner = ora('Initializing git repository').start()
    try {
      initGit(targetDir)
      gitSpinner.succeed('Initialized git repository')
    } catch {
      gitSpinner.warn('Failed to initialize git repository')
    }
  }

  // Success message
  console.log()
  console.log(pc.green(pc.bold('Success!')), `Created ${pc.bold(packageName)} at ${pc.dim(`./${dirName}`)}`)
  console.log()
  console.log('Next steps:')
  console.log(pc.dim(`  cd ${dirName}`))
  console.log(pc.dim(`  ${getInstallCommand(detectPackageManager())}`))
  console.log(pc.dim('  npm test'))
  console.log()
  console.log(pc.dim('Documentation: https://docs.wallet.tether.io/sdk/wallet-modules'))
  console.log(pc.dim('Base interfaces: https://github.com/tetherto/wdk-wallet'))
  console.log()
}

function generateDescription (type: string, className: string, blockchain: string): string {
  switch (type) {
    case 'wallet':
      return `${className} wallet module for WDK`
    case 'swap':
      return `${className} swap protocol integration for WDK on ${blockchain}`
    case 'bridge':
      return `${className} bridge protocol integration for WDK on ${blockchain}`
    case 'lending':
      return `${className} lending protocol integration for WDK on ${blockchain}`
    case 'fiat':
      return `${className} fiat on/off-ramp integration for WDK`
    default:
      return `${className} module for WDK`
  }
}
