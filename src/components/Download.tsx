import { GITHUB_URL, LATEST, PLATFORM } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { Logo } from './Logo'

export function Download() {
  const { t, lang } = useT()
  const { selected, setVersion, releases } = useRelease()

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
              <dd>v{LATEST.version}</dd>
            </div>
          </dl>
        </aside>

        <div className="download__main">
          <div className="versions" role="listbox" aria-label={t('selectVersion')}>
            {releases.map((rel) => {
              const active = rel.version === selected.version
              const isLatest = rel.version === LATEST.version
              return (
                <button
                  key={rel.version}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`versions__row${active ? ' is-active' : ''}`}
                  onClick={() => setVersion(rel.version)}
                >
                  <span className="versions__radio" aria-hidden="true" />
                  <span className="versions__body">
                    <span className="versions__top">
                      <strong className="mono">v{rel.version}</strong>
                      {isLatest ? (
                        <span className="versions__latest">{t('versionLatest')}</span>
                      ) : null}
                    </span>
                    <span className="versions__specs mono">
                      {rel.date}
                      <span aria-hidden="true"> · </span>
                      {rel.sizeLabel}
                    </span>
                    {rel.notes ? (
                      <span className="versions__notes">{rel.notes[lang]}</span>
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="versions__action">
            <a
              className="btn btn--cta btn--lg"
              href={selected.url}
              download={selected.filename}
            >
              {t('ctaDownload')} v{selected.version}
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('ctaGithub')}
            </a>
            <p className="versions__file mono">{selected.filename}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
