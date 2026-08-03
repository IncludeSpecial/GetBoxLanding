import { GITHUB_URL, PLATFORM } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { Logo } from './Logo'

export function Download() {
  const { t } = useT()
  const { latest, older, loading, error, releasesPage } = useRelease()
  const href = latest?.url ?? releasesPage

  return (
    <section className="section download" id="download">
      <div className="section__inner download__grid">
        <aside className="download__side">
          <Logo className="logo--hero" />
          <h2 className="section__title">{t('downloadTitle')}</h2>
          <p className="section__lead">{t('downloadLead')}</p>
          <dl className="download__meta mono">
            <div>
              <dt>{t('specPlatform')}</dt>
              <dd>{PLATFORM}</dd>
            </div>
            <div>
              <dt>{t('specType')}</dt>
              <dd>Portable EXE</dd>
            </div>
            <div>
              <dt>{t('specVersion')}</dt>
              <dd>{latest ? `v${latest.version}` : '—'}</dd>
            </div>
          </dl>
        </aside>

        <div className="download__main">
          {loading ? (
            <p className="versions__status mono">{t('releasesLoading')}</p>
          ) : null}

          {error ? (
            <p className="versions__status">
              {error === 'no-releases' ? t('releasesEmpty') : t('releasesError')}{' '}
              <a href={releasesPage} target="_blank" rel="noreferrer">
                GitHub Releases
              </a>
            </p>
          ) : null}

          <div className="download__primary">
            <a className="btn btn--cta btn--lg" href={href} rel="noopener noreferrer">
              {latest ? `${t('ctaDownload')} v${latest.version}` : t('ctaDownload')}
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('ctaGithub')}
            </a>
            {latest ? (
              <p className="download__file mono">
                {latest.filename}
                <span aria-hidden="true"> · </span>
                {latest.sizeLabel}
                {latest.notes ? (
                  <>
                    <br />
                    <span className="download__note">{latest.notes}</span>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>

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
