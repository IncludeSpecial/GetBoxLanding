import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App, { type SiteData } from './App'

export { pageMeta, OG_LOCALE } from './i18n-meta'
export { allRoutes, buildPath } from './routes'
export { fetchGithubReleases } from './releases'
export { fetchCatalogStats } from './SiteData'

export function render(path: string, data: SiteData) {
  return renderToString(
    <StrictMode>
      <App path={path} data={data} />
    </StrictMode>,
  )
}
