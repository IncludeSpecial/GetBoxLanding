import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { buildPath } from '../routes'
import { Logo } from './Logo'

export function Footer() {
  const { lang, t } = useT()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo className="logo--footer" decorative />
          <div>
            <strong>{t('brandName')}</strong>
            <p>{t('footerCopy')}</p>
          </div>
        </div>
        <div className="footer__meta">
          <nav className="footer__legal" aria-label={t('footerLegal')}>
            <a href={buildPath(lang, 'privacy')}>{t('footerPrivacy')}</a>
            <a href={buildPath(lang, 'cookies')}>{t('footerCookies')}</a>
            <a href={buildPath(lang, 'terms')}>{t('footerTerms')}</a>
          </nav>
          <nav className="footer__links" aria-label="GitHub">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`${GITHUB_URL}/blob/main/CHANGELOG.md`} target="_blank" rel="noreferrer">
              {t('footerChangelog')}
            </a>
            <a href={`${GITHUB_URL}/issues/new`} target="_blank" rel="noreferrer">
              {t('footerIssues')}
            </a>
          </nav>
          <span>{t('footerRights')}</span>
        </div>
      </div>
    </footer>
  )
}
