import { ASSET_MATCH, GITHUB_RELEASES_API, type Release, type ReleaseChanges } from './config.js'

type GhAsset = {
  name: string
  size: number
  browser_download_url: string
}

type GhRelease = {
  tag_name: string
  html_url: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: GhAsset[]
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024)
  return `~${Math.round(mb)} MB`
}

function tagToVersion(tag: string) {
  return tag.replace(/^v/i, '')
}

/** Splits release notes into "### heading" sections with their bullet items. */
export function parseChanges(body: string | null): ReleaseChanges[] {
  if (!body?.trim()) return []
  const sections: ReleaseChanges[] = []
  let current: ReleaseChanges | null = null
  for (const raw of body.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim()
    const heading = line.match(/^#{1,6}\s+(.*)$/)
    if (heading) {
      current = { title: heading[1].replace(/\*\*/g, '').trim(), items: [] }
      sections.push(current)
      continue
    }
    const bullet = line.match(/^[-*]\s+(.*)$/)
    const text = (bullet ? bullet[1] : line).replace(/\*\*/g, '').trim()
    if (!text) continue
    if (!current) {
      current = { title: null, items: [] }
      sections.push(current)
    }
    if (bullet || current.items.length === 0) {
      current.items.push(text)
    } else {
      // Continuation of a wrapped bullet.
      current.items[current.items.length - 1] += ` ${text}`
    }
  }
  return sections.filter((s) => s.items.length > 0 || s.title)
}

/** First SHA-256 hex digest in a `sha256sum`-style file. */
export function parseSha256(text: string) {
  return text.match(/\b[a-f0-9]{64}\b/i)?.[0].toLowerCase()
}

export function mapGithubReleases(raw: GhRelease[]): Release[] {
  const out: Release[] = []

  for (const rel of raw) {
    if (rel.draft || rel.prerelease) continue
    const asset = rel.assets.find((a) => ASSET_MATCH.test(a.name))
    if (!asset) continue
    const checksum = rel.assets.find((a) => a.name === `${asset.name}.sha256`)

    const version = tagToVersion(rel.tag_name)
    const date = (rel.published_at ?? '').slice(0, 10)

    out.push({
      version,
      filename: asset.name,
      sizeLabel: formatSize(asset.size),
      date: date || '—',
      url: asset.browser_download_url,
      pageUrl: rel.html_url,
      changes: parseChanges(rel.body),
      ...(checksum ? { sha256Url: checksum.browser_download_url } : {}),
    })
  }

  return out
}

/** Direct GitHub API call. Used by /api/releases, the prerender step and as a client fallback. */
export async function fetchGithubReleases(
  token?: string,
  { checksum = false } = {},
): Promise<Release[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(GITHUB_RELEASES_API, { headers })
  if (!res.ok) throw new Error(`GitHub Releases: ${res.status}`)
  const releases = mapGithubReleases((await res.json()) as GhRelease[])

  // Server-side only: release assets are not served with CORS headers.
  const latest = releases[0]
  if (checksum && latest?.sha256Url) {
    try {
      const sum = await fetch(latest.sha256Url)
      if (sum.ok) latest.sha256 = parseSha256(await sum.text())
    } catch {
      /* the page links to the .sha256 file instead */
    }
  }
  return releases
}

const CACHE_KEY = 'getbox-releases'
const CACHE_TTL = 10 * 60 * 1000

type Cached = { at: number; releases: Release[] }

export function readCachedReleases(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cached
    // Entries written by older versions of the site lack `changes`; refetch those.
    const valid =
      Array.isArray(parsed.releases) && parsed.releases.every((r) => Array.isArray(r.changes))
    return valid ? parsed : null
  } catch {
    return null
  }
}

export function isFresh(cached: Cached) {
  return Date.now() - cached.at < CACHE_TTL
}

function writeCachedReleases(releases: Release[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), releases }))
  } catch {
    /* ignore */
  }
}

/**
 * Release list for the browser: our cached /api/releases endpoint first
 * (avoids GitHub's 60 req/hour per-IP limit), GitHub directly as a fallback.
 */
export async function fetchReleases(): Promise<Release[]> {
  let releases: Release[]
  try {
    const res = await fetch('/api/releases')
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`/api/releases: ${res.status}`)
    }
    releases = (await res.json()) as Release[]
  } catch {
    releases = await fetchGithubReleases()
  }
  writeCachedReleases(releases)
  return releases
}
