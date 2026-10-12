import { GITHUB_URL } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { Logo } from './Logo'
import { HeroMockup } from './HeroMockup'

export function Hero() {
  const { t } = useT()
  const { latest, releasesPage } = useRelease()
  const href = latest?.url ?? releasesPage

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <div className="hero__copy-inner">
          <h1 className="hero__title">
            <span className="hero__brand">
              <Logo className="logo--hero" decorative />
              <span className="hero__name">{t('brandName')}</span>
            </span>{' '}
            <span className="hero__sub">{t('brandSub')}</span>
          </h1>

          <p className="hero__headline">{t('heroHeadline')}</p>
          <p className="hero__support">{t('heroSupport')}</p>

          <div className="hero__cta">
            <a className="btn btn--cta btn--lg" href={href} rel="noopener noreferrer">
              <DownloadIcon />
              {t('ctaDownload')}
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('ctaGithub')}
            </a>
          </div>

          <ul className="hero__chips mono" aria-label={t('specVersion')}>
            <li>{latest ? `v${latest.version}` : '—'}</li>
            <li>Win 10/11 x64</li>
            {latest ? <li>{latest.sizeLabel}</li> : null}
            <li>Portable</li>
          </ul>

          <p className="hero__kicker mono">{t('heroKicker')}</p>
        </div>
      </div>

      <div className="hero__shot">
        <HeroMockup />
      </div>
    </section>
  )
}

export function DownloadIcon() {
  return (
    <svg className="btn__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
