import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useT()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo className="logo--footer" />
          <div>
            <strong>{t('brandName')}</strong>
            <p>{t('footerCopy')}</p>
          </div>
        </div>
        <div className="footer__meta">
          <nav className="footer__legal" aria-label={t('footerLegal')}>
            <a href="/privacy">{t('footerPrivacy')}</a>
            <a href="/cookies">{t('footerCookies')}</a>
            <a href="/terms">{t('footerTerms')}</a>
          </nav>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>{t('footerRights')}</span>
        </div>
      </div>
    </footer>
  )
}
