import { createContext, useContext } from 'react'

/** Numbers taken from the GetBox repo at build time (scripts/prerender.mjs). */
export type CatalogStats = {
  apps: number
  profiles: number
  categories: number
}

export const CatalogStatsContext = createContext<CatalogStats | null>(null)

export function useCatalogStats() {
  return useContext(CatalogStatsContext)
}

const RAW = 'https://raw.githubusercontent.com/IncludeSpecial/GetBox/main/data'

async function getJson(file: string): Promise<unknown> {
  const res = await fetch(`${RAW}/${file}`)
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
  return res.json()
}

function size(data: unknown, file: string) {
  if (Array.isArray(data)) return data.length
  if (data && typeof data === 'object') return Object.keys(data).length
  throw new Error(`${file}: unexpected shape`)
}

export async function fetchCatalogStats(): Promise<CatalogStats> {
  const [catalog, profiles, categories] = await Promise.all(
    ['catalog.json', 'profiles.json', 'categories.json'].map(getJson),
  )
  return {
    apps: size(catalog, 'catalog.json'),
    profiles: size(profiles, 'profiles.json'),
    // "other" is a catch-all, not a shelf people browse.
    categories: Object.keys(categories as object).filter((k) => k !== 'other').length,
  }
}
