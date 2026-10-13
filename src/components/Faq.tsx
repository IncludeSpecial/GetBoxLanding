import { GITHUB_URL } from '../config'
import { CONTENT } from '../content'
import { useT } from '../I18nContext'

export function Faq() {
  const { lang, t } = useT()

  return (
    <section className="section faq" id="faq">
      <div className="section__inner section__inner--narrow">
        <header className="section__head">
          <h2 className="section__title">{t('faqTitle')}</h2>
          <p className="section__lead">
            <a href={`${GITHUB_URL}/issues/new`} target="_blank" rel="noreferrer">
              {t('faqLead')}
            </a>
          </p>
        </header>

        <div className="faq-list">
          {CONTENT[lang].faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
              {item.code ? (
                <pre className="mono">
                  <code>{item.code}</code>
                </pre>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
