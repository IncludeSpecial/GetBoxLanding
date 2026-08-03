import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { LangToggle } from './LangToggle'
import { Logo } from './Logo'

type Props = {
  /** On legal pages, section links go to home anchors. */
  home?: boolean
}

export function Nav({ home = false }: Props) {
  const { t } = useT()
  const { latest, releasesPage } = useRelease()
  const href = latest?.url ?? releasesPage
  const prefix = home ? '/' : ''

  return (
    <header className="nav">
      <a className="nav__brand" href={home ? '/' : '#top'}>
        <Logo className="logo--nav" />
        <strong>{t('brandName')}</strong>
        {latest ? <span className="nav__ver mono">v{latest.version}</span> : null}
      </a>

      <nav className="nav__links" aria-label="Primary">
        <a href={`${prefix}#features`}>{t('navFeatures')}</a>
        <a href={`${prefix}#showcase`}>{t('navShowcase')}</a>
        <a href={`${prefix}#providers`}>{t('navProviders')}</a>
        <a href={`${prefix}#download`}>{t('navDownload')}</a>
      </nav>

      <div className="nav__actions">
        <LangToggle />
        <a className="btn btn--ghost btn--sm" href={GITHUB_URL} target="_blank" rel="noreferrer">
          {t('navGithub')}
        </a>
        <a className="btn btn--cta btn--sm" href={href} rel="noopener noreferrer">
          {t('navDownload')}
        </a>
      </div>
    </header>
  )
}
