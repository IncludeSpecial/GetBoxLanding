// Renders every route to static HTML after `vite build`, so crawlers and link
// previews see real content and per-page meta. Also writes sitemap.xml.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')

const {
  render,
  pageMeta,
  OG_LOCALE,
  allRoutes,
  buildPath,
  fetchGithubReleases,
  fetchCatalogStats,
} = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let releases = []
try {
  releases = await fetchGithubReleases(process.env.GITHUB_TOKEN, { checksum: true })
  console.log(`prerender: ${releases.length} releases from GitHub`)
} catch (err) {
  console.warn(
    `prerender: releases unavailable (${err.message}), the page will load them at runtime`,
  )
}

let stats = null
try {
  stats = await fetchCatalogStats()
  console.log(`prerender: catalog ${stats.apps} apps, ${stats.profiles} profiles`)
} catch (err) {
  console.warn(`prerender: catalog stats unavailable (${err.message}), numbers are hidden`)
}
const data = { releases, stats }

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`index.html: missing <meta ${attr}="${key}">`)
  return html.replace(re, `$1${escape(value)}$2`)
}

function page(route) {
  const meta = pageMeta(route)
  const otherLang = route.lang === 'ru' ? 'en' : 'ru'
  let html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.canonical}$2`)
  html = setMeta(html, 'name', 'description', meta.description)
  html = setMeta(html, 'property', 'og:url', meta.canonical)
  html = setMeta(html, 'property', 'og:title', meta.title)
  html = setMeta(html, 'property', 'og:description', meta.description)
  html = setMeta(html, 'property', 'og:locale', OG_LOCALE[route.lang])
  html = setMeta(html, 'property', 'og:locale:alternate', OG_LOCALE[otherLang])
  html = setMeta(html, 'name', 'twitter:title', meta.title)
  html = setMeta(html, 'name', 'twitter:description', meta.description)

  const alternates = [
    ...meta.alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`),
    `<link rel="alternate" hreflang="x-default" href="${meta.alternates.find((a) => a.lang === 'ru').href}" />`,
  ]
  const script = `<script>window.__GETBOX_DATA__=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
  html = html.replace('  </head>', `    ${alternates.join('\n    ')}\n  </head>`)
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${render(buildPath(route.lang, route.legalId), data)}</div>\n    ${script}`,
  )
  return html
}

const routes = allRoutes()
for (const route of routes) {
  const urlPath = buildPath(route.lang, route.legalId)
  // "/" → index.html, "/en" → en.html, "/en/privacy" → en/privacy.html (served via cleanUrls).
  const file = urlPath === '/' ? 'index.html' : `${urlPath.slice(1)}.html`
  const out = path.join(dist, file)
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, page(route))
  console.log(`prerender: ${urlPath} → ${file}`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = routes.map((route) => {
  const meta = pageMeta(route)
  const links = meta.alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join('\n')
  return [
    '  <url>',
    `    <loc>${meta.canonical}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${route.legalId ? 'monthly' : 'weekly'}</changefreq>`,
    `    <priority>${route.legalId ? '0.3' : '1.0'}</priority>`,
    links,
    '  </url>',
  ].join('\n')
})
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
)
console.log(`prerender: sitemap.xml (${routes.length} urls)`)

await rm(ssrDir, { recursive: true, force: true })
