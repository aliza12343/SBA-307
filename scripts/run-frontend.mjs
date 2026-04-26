import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const npmCliPath = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')

const task = process.argv[2]

if (!task) {
  console.error('Missing frontend task. Use dev or build.')
  process.exit(1)
}

const child = spawn(
  process.execPath,
  [npmCliPath, 'run', task],
  {
    cwd: path.join(projectRoot, 'frontend'),
    stdio: 'inherit',
    env: {
      ...process.env,
      ComSpec: 'C:\\Windows\\System32\\cmd.exe',
    },
  },
)

child.on('exit', (code) => {
  process.exit(code ?? 1)
})
