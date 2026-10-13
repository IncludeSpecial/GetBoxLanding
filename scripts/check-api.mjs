// Vercel compiles each file under api/ to ESM on its own, without bundling, so
// every relative import in the chain needs an explicit `.js` extension — an
// extensionless one makes the function crash on load (HTTP 500). This compiles
// the functions the same way into a temp dir and imports them.
import { execFileSync } from 'node:child_process'
import { cpSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const out = mkdtempSync(path.join(tmpdir(), 'getbox-api-'))
try {
  const entries = readdirSync('api')
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `api/${f}`)
  execFileSync(
    process.execPath,
    [
      'node_modules/typescript/bin/tsc',
      ...entries,
      '--outDir',
      out,
      '--module',
      'esnext',
      '--target',
      'es2022',
      '--moduleResolution',
      'bundler',
      '--skipLibCheck',
      '--types',
      'node',
    ],
    { stdio: 'inherit' },
  )
  cpSync('package.json', path.join(out, 'package.json')) // "type": "module"
  for (const entry of entries) {
    const mod = await import(pathToFileURL(path.join(out, entry.replace(/\.ts$/, '.js'))).href)
    if (typeof mod.GET !== 'function') throw new Error(`${entry}: no GET export`)
    console.log('✓', entry)
  }
} finally {
  rmSync(out, { recursive: true, force: true })
}
