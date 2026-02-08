import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { copyTemplate, copyCommonFiles } from '../src/helpers/copy.js'

describe('copyTemplate', () => {
  let tmpDir
  let sourceDir

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'copy-test-'))
    sourceDir = path.join(tmpDir, 'source')
    await fs.ensureDir(sourceDir)
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should copy files from source to target', async () => {
    await fs.writeFile(path.join(sourceDir, 'hello.txt'), 'world')

    const targetDir = path.join(tmpDir, 'target')
    await copyTemplate(sourceDir, targetDir, {
      MODULE_NAME: 'test',
      CLASS_NAME: 'Test',
      CLASS_NAME_LOWER: 'test',
      PACKAGE_NAME: 'test',
      BLOCKCHAIN: 'test',
      DESCRIPTION: 'test',
      YEAR: '2025',
      AUTHOR: 'Test'
    })

    expect(await fs.pathExists(path.join(targetDir, 'hello.txt'))).toBe(true)
    expect(await fs.readFile(path.join(targetDir, 'hello.txt'), 'utf-8')).toBe('world')
  })

  it('should replace placeholders in file content', async () => {
    await fs.writeFile(path.join(sourceDir, 'file.txt'), 'Hello {{CLASS_NAME}}')

    const targetDir = path.join(tmpDir, 'target')
    await copyTemplate(sourceDir, targetDir, {
      MODULE_NAME: 'test',
      CLASS_NAME: 'Stellar',
      CLASS_NAME_LOWER: 'stellar',
      PACKAGE_NAME: 'test',
      BLOCKCHAIN: 'stellar',
      DESCRIPTION: 'test',
      YEAR: '2025',
      AUTHOR: 'Test'
    })

    const content = await fs.readFile(path.join(targetDir, 'file.txt'), 'utf-8')
    expect(content).toBe('Hello Stellar')
  })

  it('should replace placeholders in file paths', async () => {
    await fs.writeFile(path.join(sourceDir, '{{CLASS_NAME_LOWER}}.js'), 'content')

    const targetDir = path.join(tmpDir, 'target')
    await copyTemplate(sourceDir, targetDir, {
      MODULE_NAME: 'test',
      CLASS_NAME: 'Stellar',
      CLASS_NAME_LOWER: 'stellar',
      PACKAGE_NAME: 'test',
      BLOCKCHAIN: 'stellar',
      DESCRIPTION: 'test',
      YEAR: '2025',
      AUTHOR: 'Test'
    })

    expect(await fs.pathExists(path.join(targetDir, 'stellar.js'))).toBe(true)
  })

  it('should handle nested directories', async () => {
    await fs.ensureDir(path.join(sourceDir, 'src'))
    await fs.writeFile(path.join(sourceDir, 'src', 'index.js'), 'export default {}')

    const targetDir = path.join(tmpDir, 'target')
    await copyTemplate(sourceDir, targetDir, {
      MODULE_NAME: 'test',
      CLASS_NAME: 'Test',
      CLASS_NAME_LOWER: 'test',
      PACKAGE_NAME: 'test',
      BLOCKCHAIN: 'test',
      DESCRIPTION: 'test',
      YEAR: '2025',
      AUTHOR: 'Test'
    })

    expect(await fs.pathExists(path.join(targetDir, 'src', 'index.js'))).toBe(true)
  })
})

describe('copyCommonFiles', () => {
  let tmpDir

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'common-test-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should skip if common directory does not exist', async () => {
    const targetDir = path.join(tmpDir, 'target')
    await copyCommonFiles(path.join(tmpDir, 'nonexistent'), targetDir, {
      MODULE_NAME: 'test',
      CLASS_NAME: 'Test',
      CLASS_NAME_LOWER: 'test',
      PACKAGE_NAME: 'test',
      BLOCKCHAIN: 'test',
      DESCRIPTION: 'test',
      YEAR: '2025',
      AUTHOR: 'Test'
    })

    expect(await fs.pathExists(targetDir)).toBe(false)
  })
})
