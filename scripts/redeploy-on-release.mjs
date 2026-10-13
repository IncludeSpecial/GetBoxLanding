// Triggers a Vercel rebuild when the live site embeds an older GetBox release
// than the latest one on GitHub, so the prerendered HTML (download link,
// version, SHA256) catches up without waiting for the next commit.
// Run by .github/workflows/release-sync.yml; needs VERCEL_DEPLOY_HOOK_URL.
const SITE = process.env.SITE_URL ?? 'https://getbox.ne-nas.ru/'
const API = 'https://api.github.com/repos/IncludeSpecial/GetBox/releases/latest'
const hook = process.env.VERCEL_DEPLOY_HOOK_URL

const headers = { Accept: 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
const res = await fetch(API, { headers })
if (!res.ok) throw new Error(`GitHub: HTTP ${res.status}`)
const latest = (await res.json()).tag_name.replace(/^v/i, '')

const html = await (await fetch(SITE)).text()
const embedded = html.match(/window\.__GETBOX_DATA__=.*?"version":"([^"]+)"/)?.[1] ?? null

console.log(`latest release: ${latest}, live site: ${embedded ?? 'none'}`)
if (embedded === latest) process.exit(0)

if (!hook) {
  console.log('VERCEL_DEPLOY_HOOK_URL is not set; skipping redeploy')
  process.exit(0)
}
const deploy = await fetch(hook, { method: 'POST' })
if (!deploy.ok) throw new Error(`Deploy hook: HTTP ${deploy.status}`)
console.log('redeploy triggered')
