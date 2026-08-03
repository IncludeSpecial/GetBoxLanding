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
          <p className="hero__kicker mono">{t('heroKicker')}</p>

          <div className="hero__brand">
            <Logo className="logo--hero" />
            <h1 className="hero__name">{t('brandName')}</h1>
          </div>

          <p className="hero__sub">{t('brandSub')}</p>
          <p className="hero__headline">{t('heroHeadline')}</p>
          <p className="hero__support">{t('heroSupport')}</p>

          <div className="hero__cta">
            <a className="btn btn--cta btn--lg" href={href} rel="noopener noreferrer">
              {t('ctaDownload')}
            </a>
            <a className="btn btn--ghost btn--lg" href={GITHUB_URL} target="_blank" rel="noreferrer">
              {t('ctaGithub')}
            </a>
          </div>

          <dl className="hero__specs mono">
            <div>
              <dt>{t('specVersion')}</dt>
              <dd>{latest ? `v${latest.version}` : '—'}</dd>
            </div>
            <div>
              <dt>{t('specPlatform')}</dt>
              <dd>Win 10/11 x64</dd>
            </div>
            <div>
              <dt>{t('specSize')}</dt>
              <dd>{latest?.sizeLabel ?? '—'}</dd>
            </div>
            <div>
              <dt>{t('specType')}</dt>
              <dd>Portable</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="hero__shot">
        <HeroMockup />
      </div>
    </section>
  )
}
