import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import App from './App'
import type { SiteData } from './App'
import './styles.css'

declare global {
  interface Window {
    __GETBOX_DATA__?: SiteData
  }
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App data={window.__GETBOX_DATA__} />
  </StrictMode>
)

// Cookie-free page view stats; needs Web Analytics enabled in the Vercel project.
inject()

// Production pages are prerendered (scripts/prerender.mjs); dev serves an empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
