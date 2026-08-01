import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { LangToggle } from './LangToggle'
import { Logo } from './Logo'

export function Nav() {
  const { t } = useT()
  const { selected } = useRelease()

  return (
    <header className="nav">
      <a className="nav__brand" href="#top">
        <Logo className="logo--nav" />
        <strong>{t('brandName')}</strong>
        <span className="nav__ver mono">v{selected.version}</span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        <a href="#features">{t('navFeatures')}</a>
        <a href="#showcase">{t('navShowcase')}</a>
        <a href="#providers">{t('navProviders')}</a>
        <a href="#download">{t('navDownload')}</a>
      </nav>

      <div className="nav__actions">
        <LangToggle />
        <a className="btn btn--ghost btn--sm" href={GITHUB_URL} target="_blank" rel="noreferrer">
          {t('navGithub')}
        </a>
        <a className="btn btn--cta btn--sm" href={selected.url} download={selected.filename}>
          {t('navDownload')}
        </a>
      </div>
    </header>
  )
}
