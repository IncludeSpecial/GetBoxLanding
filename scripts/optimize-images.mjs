// Converts assets-src/screenshots/*.png into WebP variants in public/screenshots:
//   <name>.webp       — full size (max 1920px wide)
//   <name>-960.webp   — half size for narrow screens
//   <name>-thumb.webp — 128×80 top-left crop for Showcase thumbnails
// Run after replacing screenshots: npm run images
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const srcDir = path.resolve('assets-src/screenshots')
const outDir = path.resolve('public/screenshots')
const files = (await readdir(srcDir)).filter((f) => f.endsWith('.png'))

for (const file of files) {
  const src = path.join(srcDir, file)
  const base = path.join(outDir, path.basename(file, '.png'))

  await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${base}.webp`)
  await sharp(src)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${base}-960.webp`)
  await sharp(src)
    .resize(128, 80, { fit: 'cover', position: 'left top' })
    .webp({ quality: 80 })
    .toFile(`${base}-thumb.webp`)

  console.log('✓', file)
}
