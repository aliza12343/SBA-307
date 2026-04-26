import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const frontendRoot = path.resolve(__dirname, '..')
const projectRoot = path.resolve(frontendRoot, '..')
const legacyRoot = path.join(frontendRoot, 'public', 'legacy')

const filesToCopy = [
  'index.html',
  'shop.html',
  'lookbook.html',
  'contact.html',
  'lehenga.html',
  'jewelry.html',
  'saree.html',
  'checkout.html',
  'about.html',
  'style.css',
  'about.css',
  'contact.css',
]

const directoriesToCopy = [
  'images',
]

const ideaFilesToCopy = [
  'login.html',
  'register.html',
  'logout.html',
  'admin.html',
  'Saree.html',
]

rmSync(legacyRoot, { recursive: true, force: true })
mkdirSync(legacyRoot, { recursive: true })
mkdirSync(path.join(legacyRoot, '.idea'), { recursive: true })

for (const file of filesToCopy) {
  const source = path.join(projectRoot, file)
  if (existsSync(source)) {
    cpSync(source, path.join(legacyRoot, file), { force: true })
  }
}

for (const directory of directoriesToCopy) {
  const source = path.join(projectRoot, directory)
  if (existsSync(source)) {
    cpSync(source, path.join(legacyRoot, directory), { recursive: true, force: true })
  }
}

for (const file of ideaFilesToCopy) {
  const source = path.join(projectRoot, '.idea', file)
  if (existsSync(source)) {
    cpSync(source, path.join(legacyRoot, '.idea', file), { force: true })
  }
}

console.log('SBA-307 legacy files synced into frontend/public/legacy')
