import validateNpmPackageName from 'validate-npm-package-name'
import { MODULE_CONFIGS } from '../types.js'

/**
 * @param {string} type
 * @returns {boolean}
 */
export function validateModuleType (type) {
  return ['wallet', 'swap', 'bridge', 'lending', 'fiat'].includes(type)
}

/**
 * @param {string} name
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateModuleName (name) {
  const errors = []

  if (name === '' || name.trim() === '') {
    errors.push('Module name cannot be empty')
  }

  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    errors.push('Module name must start with a letter and contain only lowercase letters, numbers, and hyphens')
  }

  if (name.length > 50) {
    errors.push('Module name must be 50 characters or less')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * @param {string} scope
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateScope (scope) {
  const errors = []

  if (scope !== '' && !scope.startsWith('@')) {
    errors.push('Scope must start with @')
  }

  if (scope !== '') {
    const result = validateNpmPackageName(`${scope}/test`)
    if (!result.validForNewPackages) {
      errors.push(...(result.errors ?? []))
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * @param {string} type
 * @param {string} name
 * @param {string} [blockchain]
 * @param {string} [scope]
 * @returns {string}
 */
export function generatePackageName (type, name, blockchain, scope) {
  const config = MODULE_CONFIGS[type]
  let packageName

  if (type === 'wallet') {
    packageName = `${config.prefix}${name}`
  } else if (type === 'fiat') {
    packageName = `${config.prefix}${name}`
  } else {
    if (blockchain == null || blockchain === '') {
      throw new Error(`Blockchain is required for ${type} modules`)
    }
    packageName = `${config.prefix}${name}-${blockchain}`
  }

  return scope != null && scope !== '' ? `${scope}/${packageName}` : packageName
}

/**
 * @param {string} str
 * @returns {string}
 */
export function toPascalCase (str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}
