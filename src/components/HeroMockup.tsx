import { useT } from '../I18nContext'
import { shot } from '../screenshots'

const main = shot('home-queue')
const modal = shot('modal')
const catalog = shot('catalog')

/**
 * Perspective UI mockup — modern desktop-download hero pattern:
 * tilted primary frame + floating secondary captures from real screenshots.
 */
export function HeroMockup() {
  const { t } = useT()

  return (
    <div className="hero-mock">
      <div className="hero-mock__scene">
        <div className="hero-mock__main">
          <div className="hero-mock__pad">
            <div className="hero-mock__chrome">
              <div className="hero-mock__titlebar">
                <span className="hero-mock__app mono">GetBox</span>
                <span className="hero-mock__winbtns" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="hero-mock__viewport">
                <img
                  src={main.src}
                  alt={t('heroShotAlt')}
                  width={1920}
                  height={963}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-mock__float" aria-hidden="true">
          <div className="hero-mock__float-chrome">
            <span className="mono">app · telegram</span>
          </div>
          <img src={modal['960']} alt="" loading="lazy" decoding="async" />
        </aside>

        <aside className="hero-mock__float hero-mock__float--shelf" aria-hidden="true">
          <img src={catalog['960']} alt="" loading="lazy" decoding="async" />
        </aside>
      </div>
    </div>
  )
}
