import { execSync } from 'child_process'

/**
 * @param {string} targetDir
 */
export function initGit (targetDir) {
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

/**
 * @returns {string}
 */
export function getGitAuthor () {
  try {
    const name = execSync('git config user.name', { encoding: 'utf-8' }).trim()
    const email = execSync('git config user.email', { encoding: 'utf-8' }).trim()
    return email !== '' ? `${name} <${email}>` : name
  } catch {
    return 'Your Name'
  }
}

/**
 * @returns {boolean}
 */
export function isGitAvailable () {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}
