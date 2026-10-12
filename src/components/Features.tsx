import { useT } from '../I18nContext'

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
  const { t } = useT()

  const items = [
    { title: t('feature1Title'), text: t('feature1Text'), icon: 'vscode' },
    { title: t('feature2Title'), text: t('feature2Text'), icon: 'steam' },
    { title: t('feature3Title'), text: t('feature3Text'), icon: 'docker' },
  ]

  return (
    <section className="section features" id="features">
      <div className="section__inner">
        <header className="section__head">
          <h2 className="section__title">{t('featuresTitle')}</h2>
          <p className="section__lead">{t('featuresLead')}</p>
        </header>

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
                  <img
                    className="feature-item__icon"
                    src={`/icons/${item.icon}.svg`}
                    alt=""
                    width={28}
                    height={28}
                  />
                </span>
                <span className="feature-item__num mono" aria-hidden="true">
                  0{i + 1}
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
