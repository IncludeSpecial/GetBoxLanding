import { CONTENT } from '../content'
import { useT } from '../I18nContext'
import { useCatalogStats } from '../SiteData'
import { Icon } from './Icon'

const ICONS = [
  'firefox',
  'vscode',
  'steam',
  'discord',
  'spotify',
  'docker',
  'git',
  'obs-studio',
  'blender',
  'telegram',
  'vlc',
  'nodejs',
] as const

export function Features() {
  const { lang, t } = useT()
  const stats = useCatalogStats()
  const items = CONTENT[lang].features

  return (
    <section className="section features" id="features">
      <div className="section__inner">
        <header className="section__head">
          <h2 className="section__title">{t('featuresTitle')}</h2>
          <p className="section__lead">{t('featuresLead')}</p>
        </header>

        {stats ? (
          <dl className="stats">
            <div>
              <dt>{t('statApps')}</dt>
              <dd>{stats.apps}</dd>
            </div>
            <div>
              <dt>{t('statPackages')}</dt>
              <dd>{t('statPackagesValue')}</dd>
            </div>
            <div>
              <dt>{t('statProfiles')}</dt>
              <dd>{stats.profiles}</dd>
            </div>
            <div>
              <dt>{t('statCategories')}</dt>
              <dd>{stats.categories}</dd>
            </div>
          </dl>
        ) : null}

        <div className="shelf" aria-hidden="true">
          <div className="shelf__track">
            {[...ICONS, ...ICONS].map((id, i) => (
              <span key={`${id}-${i}`} className="shelf__item">
                <img src={`/icons/${id}.svg`} alt="" width={26} height={26} />
              </span>
            ))}
          </div>
        </div>

        <div className="feature-list">
          {items.map((item, i) => (
            <article key={item.title} className="feature-item">
              <div className="feature-item__top">
                <span className="feature-item__tile">
                  <Icon name={item.icon} className="feature-item__icon" />
                </span>
                <span className="feature-item__num mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
