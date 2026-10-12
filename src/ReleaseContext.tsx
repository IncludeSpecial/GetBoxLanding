import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { GITHUB_RELEASES_PAGE } from './config'
import type { Release } from './config'
import { fetchReleases, isFresh, readCachedReleases } from './releases'

type ReleaseCtx = {
  latest: Release | null
  older: Release[]
  releases: Release[]
  loading: boolean
  error: string | null
  releasesPage: string
}

const Ctx = createContext<ReleaseCtx | null>(null)

type Props = {
  children: ReactNode
  /** Releases fetched at build time and embedded into the prerendered HTML. */
  initial?: Release[]
}

export function ReleaseProvider({ children, initial = [] }: Props) {
  const [releases, setReleases] = useState<Release[]>(initial)
  const [loading, setLoading] = useState(initial.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const cached = readCachedReleases()
    const hasData = initial.length > 0 || (cached?.releases.length ?? 0) > 0
    if (cached && cached.releases.length > 0) {
      // localStorage is only readable after hydration, so this can't be initial state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReleases(cached.releases)
      setLoading(false)
      if (isFresh(cached)) return
    }

    ;(async () => {
      try {
        const list = await fetchReleases()
        if (cancelled) return
        setReleases(list)
        setError(list.length === 0 ? 'no-releases' : null)
      } catch {
        // Keep build-time or cached data if we have it; only report when empty.
        if (!cancelled && !hasData) setError('fetch-failed')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
    // Runs once on mount; `initial` only seeds the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => {
    const latest = releases[0] ?? null
    const older = releases.slice(1)
    return {
      latest,
      older,
      releases,
      loading,
      error,
      releasesPage: GITHUB_RELEASES_PAGE,
    }
  }, [releases, loading, error])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useRelease() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useRelease outside ReleaseProvider')
  return ctx
}
