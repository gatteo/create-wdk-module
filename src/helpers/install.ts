import { spawn } from 'child_process'

type PackageManager = 'npm' | 'yarn' | 'pnpm'

export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || ''

  if (userAgent.startsWith('yarn')) return 'yarn'
  if (userAgent.startsWith('pnpm')) return 'pnpm'
  return 'npm'
}

export async function installDependencies(
  targetDir: string,
  packageManager: PackageManager = 'npm'
): Promise<void> {
  const command = packageManager === 'yarn' ? 'yarn' : packageManager
  const args = packageManager === 'yarn' ? [] : ['install']

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: targetDir,
      shell: true,
      stdio: 'inherit'
    })

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${packageManager} install failed with code ${code}`))
      }
    })
  })
}

export function getInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'yarn':
      return 'yarn'
    case 'pnpm':
      return 'pnpm install'
    default:
      return 'npm install'
  }
}
