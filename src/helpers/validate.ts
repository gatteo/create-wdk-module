import validateNpmPackageName from 'validate-npm-package-name'
import { ModuleType, MODULE_CONFIGS } from '../types.js'

export function validateModuleType(type: string): type is ModuleType {
  return ['wallet', 'swap', 'bridge', 'lending', 'fiat'].includes(type)
}

export function validateModuleName(name: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!name || name.trim() === '') {
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

export function validateScope(scope: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (scope && !scope.startsWith('@')) {
    errors.push('Scope must start with @')
  }

  if (scope) {
    const result = validateNpmPackageName(`${scope}/test`)
    if (!result.validForNewPackages) {
      errors.push(...(result.errors || []))
    }
  }

  return { valid: errors.length === 0, errors }
}

export function generatePackageName(
  type: ModuleType,
  name: string,
  blockchain?: string,
  scope?: string
): string {
  const config = MODULE_CONFIGS[type]
  let packageName: string

  if (type === 'wallet') {
    packageName = `${config.prefix}${name}`
  } else if (type === 'fiat') {
    packageName = `${config.prefix}${name}`
  } else {
    if (!blockchain) {
      throw new Error(`Blockchain is required for ${type} modules`)
    }
    packageName = `${config.prefix}${name}-${blockchain}`
  }

  return scope ? `${scope}/${packageName}` : packageName
}

export function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}
