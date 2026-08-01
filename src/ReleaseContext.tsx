import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { LATEST, RELEASES_DESC, type Release } from './config'

type ReleaseCtx = {
  selected: Release
  setVersion: (version: string) => void
  releases: Release[]
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
