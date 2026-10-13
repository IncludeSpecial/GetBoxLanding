/** Binaries download from GitHub Releases. Site on Vercel. */

export const GITHUB_OWNER = 'IncludeSpecial'
export const GITHUB_REPO = 'GetBox'
export const GITHUB_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
export const GITHUB_RELEASES_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`
export const GITHUB_RELEASES_PAGE = `${GITHUB_URL}/releases`

export const SITE_URL = 'https://getbox.ne-nas.ru'

export type ReleaseChanges = {
  /** "### Heading" from the release notes; null for bullets before the first heading. */
  title: string | null
  items: string[]
}

export type Release = {
  version: string
  filename: string
  sizeLabel: string
  date: string
  /** Direct GitHub asset URL */
  url: string
  /** GitHub release page */
  pageUrl: string
  /** Release notes (a CHANGELOG.md section), split by "###" headings. */
  changes: ReleaseChanges[]
  /** `<exe>.sha256` asset published next to the exe (GetBox 1.3.0+). */
  sha256Url?: string
  /** Its contents; only filled server-side, the asset has no CORS headers. */
  sha256?: string
}

export const PLATFORM = 'Windows 10/11 · x64 · Portable'
export const ASSET_MATCH = /portable\.exe$/i
