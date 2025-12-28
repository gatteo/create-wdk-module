import fs from 'fs-extra'
import path from 'path'
import { TemplateContext } from '../types.js'

const PLACEHOLDER_REGEX = /\{\{([A-Z_]+)\}\}/g

export async function copyTemplate (
  templateDir: string,
  targetDir: string,
  context: TemplateContext
): Promise<void> {
  await fs.ensureDir(targetDir)

  const files = await getAllFiles(templateDir)

  for (const file of files) {
    const relativePath = path.relative(templateDir, file)
    const processedPath = processPath(relativePath, context)
    const targetPath = path.join(targetDir, processedPath)

    await fs.ensureDir(path.dirname(targetPath))

    if (isBinaryFile(file)) {
      await fs.copy(file, targetPath)
    } else {
      const content = await fs.readFile(file, 'utf-8')
      const processedContent = processContent(content, context)
      await fs.writeFile(targetPath, processedContent)
    }
  }
}

async function getAllFiles (dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // Skip .git directories
      if (entry.name !== '.git') {
        files.push(...await getAllFiles(fullPath))
      }
    } else {
      files.push(fullPath)
    }
  }

  return files
}

function processPath (filePath: string, context: TemplateContext): string {
  return filePath.replace(PLACEHOLDER_REGEX, (_, key: string) => {
    const value = context[key as keyof TemplateContext]
    return value !== '' && value != null ? value : key
  })
}

function processContent (content: string, context: TemplateContext): string {
  return content.replace(PLACEHOLDER_REGEX, (_, key: string) => {
    const value = context[key as keyof TemplateContext]
    return value !== '' && value != null ? value : `{{${key}}}`
  })
}

function isBinaryFile (filePath: string): boolean {
  const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot']
  return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext))
}

export async function copyCommonFiles (
  commonDir: string,
  targetDir: string,
  context: TemplateContext
): Promise<void> {
  if (await fs.pathExists(commonDir)) {
    await copyTemplate(commonDir, targetDir, context)
  }
}
