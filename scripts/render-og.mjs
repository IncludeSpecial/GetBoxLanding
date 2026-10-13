// Renders the Open Graph cards (public/og.jpg, public/og-en.jpg) from
// assets-src/brand/og.html. Run after changing the logo or the home screenshot:
//   npm run og            (uses Playwright's Chromium, or CHROME_PATH)
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const CARDS = [
  {
    out: 'public/og.jpg',
    title: 'Магазин программ для Windows',
    text: 'Официальные установщики, проверка SHA256, обновления и откат — в одном окне.',
  },
  {
    out: 'public/og-en.jpg',
    title: 'An app store for Windows',
    text: 'Official installers, SHA256 checks, updates and rollback — in one window.',
  },
]

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
)
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(pathToFileURL(path.resolve('assets-src/brand/og.html')).href)
for (const card of CARDS) {
  await page.evaluate(({ title, text }) => {
    document.getElementById('title').textContent = title
    document.getElementById('text').textContent = text
  }, card)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState('networkidle')
  const png = await page.screenshot({ type: 'png' })
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(card.out)
  console.log('✓', card.out)
}
await browser.close()
