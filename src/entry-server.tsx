import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Release } from './config'

export { pageMeta, OG_LOCALE } from './i18n-meta'
export { allRoutes, buildPath } from './routes'
export { fetchGithubReleases } from './releases'

export function render(path: string, releases: Release[]) {
  return renderToString(
    <StrictMode>
      <App path={path} releases={releases} />
    </StrictMode>,
  )
}
