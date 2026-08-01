import { I18nContext } from './I18nContext'
import { useI18n } from './i18n'
import { ReleaseProvider } from './ReleaseContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Providers } from './components/Providers'
import { Download } from './components/Download'
import { Footer } from './components/Footer'

export default function App() {
  const i18n = useI18n()

  return (
    <I18nContext.Provider value={i18n}>
      <ReleaseProvider>
        <div className="page">
          <Nav />
          <main>
            <Hero />
            <Features />
            <Showcase />
            <Providers />
            <Download />
          </main>
          <Footer />
        </div>
      </ReleaseProvider>
    </I18nContext.Provider>
  )
}
