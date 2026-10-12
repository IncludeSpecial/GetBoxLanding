import { ASSET_MATCH, GITHUB_RELEASES_API, type Release } from './config'

type GhAsset = {
  name: string
  size: number
  browser_download_url: string
}

type GhRelease = {
  tag_name: string
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

function noteFromBody(body: string | null, fallback: string) {
  if (!body?.trim()) return fallback
  const line = body
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) =>
      l
        .replace(/^#{1,6}\s*/, '')
        .replace(/\*\*/g, '')
        .replace(/^[-*]\s+/, '')
        .trim(),
    )
    .find((l) => l.length > 12)
  if (!line) return fallback
  return line.length > 140 ? `${line.slice(0, 137)}…` : line
}

export function mapGithubReleases(raw: GhRelease[]): Release[] {
  const out: Release[] = []

  for (const rel of raw) {
    if (rel.draft || rel.prerelease) continue
    const asset = rel.assets.find((a) => ASSET_MATCH.test(a.name))
    if (!asset) continue

    const version = tagToVersion(rel.tag_name)
    const date = (rel.published_at ?? '').slice(0, 10)
    const title = rel.name?.trim() || `GetBox ${version}`

    out.push({
      version,
      filename: asset.name,
      sizeLabel: formatSize(asset.size),
      date: date || '—',
      notes: noteFromBody(rel.body, title),
      url: asset.browser_download_url,
    })
  }

  return out
}

/** Direct GitHub API call. Used by /api/releases, the prerender step and as a client fallback. */
export async function fetchGithubReleases(token?: string): Promise<Release[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(GITHUB_RELEASES_API, { headers })
  if (!res.ok) throw new Error(`GitHub Releases: ${res.status}`)
  return mapGithubReleases((await res.json()) as GhRelease[])
}

const CACHE_KEY = 'getbox-releases'
const CACHE_TTL = 10 * 60 * 1000

type Cached = { at: number; releases: Release[] }

export function readCachedReleases(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cached
    return Array.isArray(parsed.releases) ? parsed : null
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
