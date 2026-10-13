// Converts assets-src/screenshots/*.{png,webp} into WebP variants in public/screenshots:
//   <name>.webp       — full size (max 1920px wide)
//   <name>-960.webp   — half size for narrow screens
// Run after replacing screenshots: npm run images
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const srcDir = path.resolve('assets-src/screenshots')
const outDir = path.resolve('public/screenshots')
await mkdir(outDir, { recursive: true })
const files = (await readdir(srcDir)).filter((f) => /\.(png|webp)$/.test(f))

for (const file of files) {
  const src = path.join(srcDir, file)
  const base = path.join(outDir, path.parse(file).name)

  await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${base}.webp`)
  await sharp(src)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${base}-960.webp`)

  console.log('✓', file)
}
