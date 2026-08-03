import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { GITHUB_RELEASES_PAGE } from './config'
import type { Release } from './config'
import { fetchReleases } from './releases'

type ReleaseCtx = {
  latest: Release | null
  older: Release[]
  releases: Release[]
  loading: boolean
  error: string | null
  releasesPage: string
}

const Ctx = createContext<ReleaseCtx | null>(null)

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await fetchReleases()
        if (cancelled) return
        if (list.length === 0) {
          setError('no-releases')
          setReleases([])
          return
        }
        setReleases(list)
        setError(null)
      } catch {
        if (!cancelled) {
          setError('fetch-failed')
          setReleases([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
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
