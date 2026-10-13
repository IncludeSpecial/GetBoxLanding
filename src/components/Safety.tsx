import { CONTENT } from '../content'
import { useT } from '../I18nContext'
import { Icon } from './Icon'

export function Safety() {
  const { lang, t } = useT()

  return (
    <section className="section safety" id="safety">
      <div className="section__inner">
        <header className="section__head">
          <h2 className="section__title">{t('safetyTitle')}</h2>
          <p className="section__lead">{t('safetyLead')}</p>
        </header>

        <ol className="safety-list">
          {CONTENT[lang].safety.map((item) => (
            <li key={item.title} className="safety-item">
              <span className="safety-item__icon">
                <Icon name={item.icon} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
