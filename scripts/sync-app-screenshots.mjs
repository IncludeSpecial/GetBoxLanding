// Pulls the current app screenshots from the GetBox repo (docs/screenshots)
// into assets-src/screenshots. Then run `npm run images`.
//   node scripts/sync-app-screenshots.mjs                 — download from GitHub (main)
//   node scripts/sync-app-screenshots.mjs ../GetBox       — copy from a local clone
import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const SCREENSHOTS = ['home', 'catalog', 'details', 'queue', 'updates', 'packages', 'themes']

const RAW = 'https://raw.githubusercontent.com/IncludeSpecial/GetBox/main/docs/screenshots'
const outDir = path.resolve('assets-src/screenshots')
const localRepo = process.argv[2]

await mkdir(outDir, { recursive: true })
for (const name of SCREENSHOTS) {
  const file = `${name}.webp`
  const out = path.join(outDir, file)
  if (localRepo) {
    await copyFile(path.join(localRepo, 'docs/screenshots', file), out)
  } else {
    const res = await fetch(`${RAW}/${file}`)
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
    await writeFile(out, Buffer.from(await res.arrayBuffer()))
  }
  console.log('✓', file)
}
