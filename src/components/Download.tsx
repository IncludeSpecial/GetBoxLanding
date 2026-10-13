import { useState } from 'react'
import { GITHUB_URL, PLATFORM, type Release } from '../config'
import { useT } from '../I18nContext'
import { useRelease } from '../ReleaseContext'
import { DownloadIcon } from './Hero'
import { Icon } from './Icon'
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
          <p className="download__req">{t('downloadRequirements')}</p>

          {latest ? <Checksum release={latest} /> : null}
          {latest && latest.changes.length > 0 ? <WhatsNew release={latest} /> : null}

          <p className="download__hint">
            <span className="download__hint-icon" aria-hidden="true">
              i
            </span>
            <span>
              {t('selfUpdateNote')} {t('smartscreenNote')}
            </span>
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
                    <a href={rel.pageUrl} target="_blank" rel="noreferrer">
                      {t('whatsNewAll')}
                    </a>
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

function Checksum({ release }: { release: Release }) {
  const { t } = useT()
  const [copied, setCopied] = useState(false)

  if (!release.sha256 && !release.sha256Url) return null

  const copy = async () => {
    if (!release.sha256) return
    try {
      await navigator.clipboard.writeText(release.sha256)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked; the hash is selectable */
    }
  }

  return (
    <div className="checksum">
      <span className="checksum__label mono">{t('checksum')}</span>
      {release.sha256 ? (
        <>
          <code className="checksum__value mono">{release.sha256}</code>
          <button type="button" className="checksum__copy" onClick={copy}>
            <Icon name={copied ? 'check' : 'copy'} />
            <span>{copied ? t('copied') : t('copy')}</span>
          </button>
        </>
      ) : (
        <a className="checksum__value mono" href={release.sha256Url} rel="noopener noreferrer">
          {t('checksumFile')}: {release.filename}.sha256
        </a>
      )}
    </div>
  )
}

/** Renders `code` spans from release notes; everything else stays plain text. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`)/)
        .map((part, i) =>
          part.startsWith('`') && part.endsWith('`') ? (
            <code key={i}>{part.slice(1, -1)}</code>
          ) : (
            part
          ),
        )}
    </>
  )
}

function WhatsNew({ release }: { release: Release }) {
  const { t } = useT()
  const titled = release.changes.filter((s) => s.title)

  return (
    <details className="whats-new">
      <summary>
        <span className="whats-new__head">
          {t('whatsNew')} v{release.version}
        </span>
        {titled.length > 0 ? (
          <span className="whats-new__topics">{titled.map((s) => s.title).join(' · ')}</span>
        ) : null}
      </summary>
      <div className="whats-new__body">
        {release.changes.map((section, i) => (
          <section key={section.title ?? i}>
            {section.title ? <h3>{section.title}</h3> : null}
            <ul>
              {section.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <a href={release.pageUrl} target="_blank" rel="noreferrer">
          {t('whatsNewAll')} →
        </a>
      </div>
    </details>
  )
}
