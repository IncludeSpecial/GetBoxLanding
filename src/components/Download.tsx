import { GITHUB_URL, PLATFORM } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { DownloadIcon } from './Hero'
import { Logo } from './Logo'

export function Download() {
  const { t } = useT()
  const { latest, older, loading, error, releasesPage } = useRelease()
  const href = latest?.url ?? releasesPage

  return (
    <section className="section download" id="download">
      <div className="section__inner">
        <div className="download__panel">
          <Logo className="logo--download" decorative />
          <h2 className="section__title">{t('downloadTitle')}</h2>
          <p className="section__lead">{t('downloadLead')}</p>

          {loading ? <p className="versions__status mono">{t('releasesLoading')}</p> : null}

          {error ? (
            <p className="versions__status">
              {error === 'no-releases' ? t('releasesEmpty') : t('releasesError')}{' '}
              <a href={releasesPage} target="_blank" rel="noreferrer">
                GitHub Releases
              </a>
            </p>
          ) : null}

          <div className="download__primary">
            <a className="btn btn--cta btn--xl" href={href} rel="noopener noreferrer">
              <DownloadIcon />
              {latest ? `${t('ctaDownload')} v${latest.version}` : t('ctaDownload')}
            </a>
            <a
              className="btn btn--ghost btn--xl"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('ctaGithub')}
            </a>
          </div>

          <ul className="download__chips mono">
            {latest ? <li>{latest.filename}</li> : null}
            {latest ? <li>{latest.sizeLabel}</li> : null}
            <li>{PLATFORM}</li>
          </ul>

          {latest?.notes ? <p className="download__note">{latest.notes}</p> : null}

          <p className="download__hint">
            <span className="download__hint-icon" aria-hidden="true">
              i
            </span>
            {t('smartscreenNote')}
          </p>

          {older.length > 0 ? (
            <details className="archive">
              <summary>{t('previousVersions')}</summary>
              <ul className="archive__list">
                {older.map((rel) => (
                  <li key={rel.version}>
                    <a href={rel.url} rel="noopener noreferrer" className="mono">
                      v{rel.version}
                    </a>
                    <span className="mono">
                      {rel.date}
                      <span aria-hidden="true"> · </span>
                      {rel.sizeLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  )
}
