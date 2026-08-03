import { useEffect } from 'react'
import { I18nContext } from './I18nContext'
import { useI18n } from './i18n'
import { pathToLegalId } from './legal/content'
import { ReleaseProvider } from './ReleaseContext'
import { usePathname } from './usePathname'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Providers } from './components/Providers'
import { Download } from './components/Download'
import { Footer } from './components/Footer'
import { LegalPage } from './components/LegalPage'

export default function App() {
  const i18n = useI18n()
  const pathname = usePathname()
  const legalId = pathToLegalId(pathname)

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || legalId) return
    const t = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView()
    }, 0)
    return () => window.clearTimeout(t)
  }, [pathname, legalId])

  return (
    <I18nContext.Provider value={i18n}>
      <ReleaseProvider>
        <div className="page">
          <Nav home={Boolean(legalId)} />
          <main>
            {legalId ? (
              <LegalPage id={legalId} />
            ) : (
              <>
                <Hero />
                <Features />
                <Showcase />
                <Providers />
                <Download />
              </>
            )}
          </main>
          <Footer />
        </div>
      </ReleaseProvider>
    </I18nContext.Provider>
  )
}
