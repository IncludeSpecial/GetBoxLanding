import { useEffect, useRef, useState } from 'react'
import { useT } from '../I18nContext'

const SHOTS = [
  { src: '/screenshots/home.png', key: 'shotHome' as const },
  { src: '/screenshots/catalog.png', key: 'shotCatalog' as const },
  { src: '/screenshots/modal.png', key: 'shotModal' as const },
  { src: '/screenshots/packages.png', key: 'shotPackages' as const },
]

export function Showcase() {
  const { t } = useT()
  const [active, setActive] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    el.classList.remove('is-on')
    const id = requestAnimationFrame(() => el.classList.add('is-on'))
    return () => cancelAnimationFrame(id)
  }, [active])

  const current = SHOTS[active]

  return (
    <section className="section showcase" id="showcase">
      <div className="section__inner section__inner--wide">
        <header className="section__head">
          <h2 className="section__title">{t('showcaseTitle')}</h2>
          <p className="section__lead">{t('showcaseLead')}</p>
        </header>

        <div className="showcase__layout">
          <div className="showcase__thumbs" role="tablist" aria-label={t('showcaseTitle')}>
            {SHOTS.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`showcase__thumb${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img src={shot.src} alt="" loading="lazy" decoding="async" />
                <span>{t(shot.key)}</span>
              </button>
            ))}
          </div>

          <div className="showcase__stage" ref={stageRef}>
            <div className="showcase__pad">
              <div className="showcase__bezel">
                <div className="showcase__titlebar" aria-hidden="true">
                  <span className="mono">GetBox — {t(current.key)}</span>
                  <span className="showcase__win">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <img
                  src={current.src}
                  alt={t(current.key)}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
