import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useT } from '../I18nContext'
import { shot } from '../screenshots'

const SHOTS = [
  { name: 'home', key: 'shotHome' as const },
  { name: 'catalog', key: 'shotCatalog' as const },
  { name: 'modal', key: 'shotModal' as const },
  { name: 'packages', key: 'shotPackages' as const },
]

export function Showcase() {
  const { t } = useT()
  const [active, setActive] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    el.classList.remove('is-on')
    const id = requestAnimationFrame(() => el.classList.add('is-on'))
    return () => cancelAnimationFrame(id)
  }, [active])

  const select = (i: number) => {
    const next = (i + SHOTS.length) % SHOTS.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: SHOTS.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    select(keys[e.key])
  }

  const current = SHOTS[active]
  const img = shot(current.name)

  return (
    <section className="section showcase" id="showcase">
      <div className="section__inner section__inner--wide">
        <header className="section__head">
          <h2 className="section__title">{t('showcaseTitle')}</h2>
          <p className="section__lead">{t('showcaseLead')}</p>
        </header>

        <div className="showcase__layout">
          <div
            className="showcase__thumbs"
            role="tablist"
            aria-label={t('showcaseTitle')}
            onKeyDown={onKeyDown}
          >
            {SHOTS.map((s, i) => (
              <button
                key={s.name}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`showcase-tab-${s.name}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="showcase-panel"
                tabIndex={i === active ? 0 : -1}
                className={`showcase__thumb${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img
                  src={shot(s.name).thumb}
                  alt=""
                  width={64}
                  height={40}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t(s.key)}</span>
              </button>
            ))}
          </div>

          <div
            className="showcase__stage"
            ref={stageRef}
            id="showcase-panel"
            role="tabpanel"
            aria-labelledby={`showcase-tab-${current.name}`}
          >
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
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(max-width: 900px) 100vw, 1100px"
                  alt={t(current.key)}
                  width={1920}
                  height={950}
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
