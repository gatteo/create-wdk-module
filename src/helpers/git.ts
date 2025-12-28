import { execSync } from 'child_process'

export function initGit (targetDir: string): void {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' })
    execSync('git add -A', { cwd: targetDir, stdio: 'ignore' })
    execSync('git commit -m "Initial commit from create-wdk-module"', {
      cwd: targetDir,
      stdio: 'ignore'
    })
  } catch {
    // Git init failed, but we can continue without it
  }
}

export function getGitAuthor (): string {
  try {
    const name = execSync('git config user.name', { encoding: 'utf-8' }).trim()
    const email = execSync('git config user.email', { encoding: 'utf-8' }).trim()
    return email !== '' ? `${name} <${email}>` : name
  } catch {
    return 'Your Name'
  }
}

export function isGitAvailable (): boolean {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}
