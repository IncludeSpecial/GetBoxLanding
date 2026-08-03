/** Binaries download from GitHub Releases. Site on Vercel. */

export const GITHUB_OWNER = 'IncludeSpecial'
export const GITHUB_REPO = 'GetBox'
export const GITHUB_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
export const GITHUB_RELEASES_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`
export const GITHUB_RELEASES_PAGE = `${GITHUB_URL}/releases`

export const SITE_URL = 'https://getbox.ne-nas.ru'

export type Release = {
  version: string
  filename: string
  sizeLabel: string
  date: string
  notes?: string
  /** Direct GitHub asset URL */
  url: string
}

export const PLATFORM = 'Windows 10/11 · x64 · Portable'
export const ASSET_MATCH = /portable\.exe$/i
