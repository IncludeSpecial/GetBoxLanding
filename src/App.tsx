import { useCallback, useEffect, useMemo } from 'react'
import type { Release } from './config'
import { I18nContext } from './I18nContext'
import { browserLang, saveLang, savedLang, translate, type DictKey, type Lang } from './i18n'
import { pageMeta } from './i18n-meta'
import { ReleaseProvider } from './ReleaseContext'
import { buildPath, parsePath } from './routes'
import { navigate, usePathname } from './usePathname'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Providers } from './components/Providers'
import { Download } from './components/Download'
import { Footer } from './components/Footer'
import { LegalPage } from './components/LegalPage'

const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|lighthouse/i

type Props = {
  /** Current URL path; required for server rendering. */
  path?: string
  releases?: Release[]
}

export default function App({ path, releases }: Props) {
  const pathname = usePathname(path)
  const route = parsePath(pathname)
  const { lang, legalId } = route

  // First visit to a Russian page from a non-Russian browser → English version.
  // Explicit /en links are left alone, and crawlers always get the URL they asked for.
  useEffect(() => {
    if (lang !== 'ru' || BOT_UA.test(navigator.userAgent)) return
    const preferred = savedLang() ?? browserLang()
    if (preferred !== lang) {
      navigate(buildPath(preferred, legalId) + window.location.hash, { replace: true })
    }
    // Only on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = pageMeta(route).title
  }, [lang, legalId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || legalId) return
    const t = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView()
    }, 0)
    return () => window.clearTimeout(t)
  }, [pathname, legalId])

  const setLang = useCallback(
    (next: Lang) => {
      saveLang(next)
      if (next !== lang)
        navigate(buildPath(next, legalId) + window.location.hash, { replace: true })
    },
    [lang, legalId],
  )

  const i18n = useMemo(
    () => ({ lang, setLang, t: (key: DictKey) => translate(lang, key) }),
    [lang, setLang],
  )

  return (
    <I18nContext.Provider value={i18n}>
      <ReleaseProvider initial={releases}>
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
