import { useT } from '../I18nContext'
import { shot } from '../screenshots'

const main = shot('queue')
const details = shot('details')

/**
 * Perspective UI mockup — modern desktop-download hero pattern:
 * tilted primary frame + floating secondary captures from real screenshots.
 */
export function HeroMockup() {
  const { t } = useT()

  return (
    <div className="hero-mock">
      <div className="hero-mock__glow" aria-hidden="true" />
      <div className="hero-mock__scene">
        <div className="hero-mock__main">
          <div className="hero-mock__pad">
            <div className="hero-mock__chrome">
              <div className="hero-mock__viewport">
                <img
                  src={main.src}
                  alt={t('heroShotAlt')}
                  width={1440}
                  height={900}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-mock__float" aria-hidden="true">
          <img src={details['960']} alt="" loading="lazy" decoding="async" />
        </aside>
      </div>
    </div>
  )
}
