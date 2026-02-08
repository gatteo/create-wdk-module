import { spawn } from 'child_process'

/**
 * @returns {'npm' | 'yarn' | 'pnpm'}
 */
export function detectPackageManager () {
  const userAgent = process.env.npm_config_user_agent ?? ''

  if (userAgent.startsWith('yarn')) return 'yarn'
  if (userAgent.startsWith('pnpm')) return 'pnpm'
  return 'npm'
}

/**
 * @param {string} targetDir
 * @param {'npm' | 'yarn' | 'pnpm'} [packageManager='npm']
 * @returns {Promise<void>}
 */
export async function installDependencies (targetDir, packageManager = 'npm') {
  const command = packageManager === 'yarn' ? 'yarn' : packageManager
  const args = packageManager === 'yarn' ? [] : ['install']

  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: targetDir,
      shell: true,
      stdio: 'inherit'
    })

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${packageManager} install failed with code ${String(code)}`))
      }
    })
  })
}

/**
 * @param {'npm' | 'yarn' | 'pnpm'} packageManager
 * @returns {string}
 */
export function getInstallCommand (packageManager) {
  switch (packageManager) {
    case 'yarn':
      return 'yarn'
    case 'pnpm':
      return 'pnpm install'
    default:
      return 'npm install'
  }
}
