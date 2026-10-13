import { useEffect, useState } from 'react'
import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { buildPath } from '../routes'
import { LangToggle } from './LangToggle'
import { Logo } from './Logo'

type Props = {
  /** On legal pages, section links go to home anchors. */
  home?: boolean
}

export function Nav({ home = false }: Props) {
  const { lang, t } = useT()
  const { latest, releasesPage } = useRelease()
  const [open, setOpen] = useState(false)
  const href = latest?.url ?? releasesPage
  const homePath = buildPath(lang)
  const prefix = home ? homePath : ''

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${open ? ' is-open' : ''}`}>
      <a className="nav__brand" href={home ? homePath : '#top'}>
        <Logo className="logo--nav" decorative />
        <strong>{t('brandName')}</strong>
        {latest ? <span className="nav__ver mono">v{latest.version}</span> : null}
      </a>

      <nav
        className="nav__links"
        id="nav-links"
        aria-label={t('navMenu')}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false)
        }}
      >
        <a href={`${prefix}#features`}>{t('navFeatures')}</a>
        <a href={`${prefix}#showcase`}>{t('navShowcase')}</a>
        <a href={`${prefix}#safety`}>{t('navSafety')}</a>
        <a href={`${prefix}#faq`}>{t('navFaq')}</a>
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
        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={t('navMenu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
