import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { LATEST, RELEASES_DESC } from './config'

type ResolvedRelease = (typeof RELEASES_DESC)[number]

type ReleaseCtx = {
  selected: ResolvedRelease
  setVersion: (version: string) => void
  releases: ResolvedRelease[]
}

const Ctx = createContext<ReleaseCtx | null>(null)

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(LATEST.version)

  const value = useMemo(() => {
    const selected = RELEASES_DESC.find((r) => r.version === version) ?? LATEST
    return { selected, setVersion, releases: RELEASES_DESC }
  }, [version])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useRelease() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useRelease outside ReleaseProvider')
  return ctx
}
