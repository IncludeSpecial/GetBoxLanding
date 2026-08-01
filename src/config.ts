/** Add new builds here — order doesn't matter; latest is picked by semver. */

export type Release = {
  version: string
  /** Path or absolute URL to the portable .exe */
  url: string
  filename: string
  /** Shown as “~72 MB” */
  sizeLabel: string
  /** ISO date YYYY-MM-DD */
  date: string
  notes?: { ru: string; en: string }
}

export const RELEASES: Release[] = [
  {
    version: '1.1.0',
    url: '/download/GetBox-1.1.0-portable.exe',
    filename: 'GetBox-1.1.0-portable.exe',
    sizeLabel: '~74 MB',
    date: '2026-08-02',
    notes: {
      ru: 'Portable-релиз для Windows x64',
      en: 'Portable release for Windows x64',
    },
  },
  {
    version: '1.0.0',
    url: '/download/GetBox-1.0.0-portable.exe',
    filename: 'GetBox-1.0.0-portable.exe',
    sizeLabel: '~72 MB',
    date: '2026-08-01',
    notes: {
      ru: 'Первый portable-релиз для Windows x64',
      en: 'First portable release for Windows x64',
    },
  },
]

function cmpSemver(a: string, b: string) {
  const pa = a.split('.').map((n) => Number(n) || 0)
  const pb = b.split('.').map((n) => Number(n) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] ?? 0) - (pa[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

/** Newest first */
export const RELEASES_DESC = [...RELEASES].sort((a, b) => cmpSemver(a.version, b.version))

export const LATEST = RELEASES_DESC[0]

export const DOWNLOAD_URL = LATEST.url
export const DOWNLOAD_FILENAME = LATEST.filename
export const APP_VERSION = LATEST.version

export const GITHUB_URL = 'https://github.com/IncludeSpecial/GetBox'
export const PLATFORM = 'Windows 10/11 · x64 · Portable'
