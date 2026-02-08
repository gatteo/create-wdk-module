import { jest } from '@jest/globals'
import fs from 'fs-extra'
import path from 'path'
import { createModule } from '../src/create-module.js'

const TEST_DIR = path.join(process.cwd(), 'wdk-wallet-testchain')

describe('createModule', () => {
  afterEach(async () => {
    await fs.remove(TEST_DIR)
  })

  it('should create a wallet module directory', async () => {
    await createModule({
      type: 'wallet',
      name: 'testchain',
      git: false
    })

    expect(await fs.pathExists(TEST_DIR)).toBe(true)
  })

  it('should copy common template files', async () => {
    await createModule({
      type: 'wallet',
      name: 'testchain',
      git: false
    })

    expect(await fs.pathExists(path.join(TEST_DIR, '.github'))).toBe(true)
    expect(await fs.pathExists(path.join(TEST_DIR, 'tsconfig.json'))).toBe(true)
  })

  it('should copy module-specific template files', async () => {
    await createModule({
      type: 'wallet',
      name: 'testchain',
      git: false
    })

    expect(await fs.pathExists(path.join(TEST_DIR, 'src'))).toBe(true)
    expect(await fs.pathExists(path.join(TEST_DIR, 'package.json'))).toBe(true)
  })

  it('should replace template placeholders', async () => {
    await createModule({
      type: 'wallet',
      name: 'testchain',
      git: false
    })

    const pkg = await fs.readJson(path.join(TEST_DIR, 'package.json'))
    expect(pkg.name).toBe('wdk-wallet-testchain')
    expect(pkg.description).toContain('Testchain')
  })

  it('should fail if directory already exists', async () => {
    await fs.ensureDir(TEST_DIR)

    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })

    await expect(createModule({
      type: 'wallet',
      name: 'testchain',
      git: false
    })).rejects.toThrow('process.exit called')

    mockExit.mockRestore()
  })
})
