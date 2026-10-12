import { useT } from '../I18nContext'

export function Providers() {
  const { t } = useT()

  const items = [
    { name: t('providerCatalog'), desc: t('providerCatalogDesc'), tag: 'catalog' },
    { name: t('providerScoop'), desc: t('providerScoopDesc'), tag: 'scoop' },
    { name: t('providerWinget'), desc: t('providerWingetDesc'), tag: 'winget' },
    { name: t('providerChoco'), desc: t('providerChocoDesc'), tag: 'choco' },
  ]

  return (
    <section className="section providers" id="providers">
      <div className="section__inner">
        <header className="section__head">
          <h2 className="section__title">{t('providersTitle')}</h2>
          <p className="section__lead">{t('providersLead')}</p>
        </header>

        <ul className="provider-grid">
          {items.map((item) => (
            <li key={item.tag} className="provider-card" data-provider={item.tag}>
              <div className="provider-card__top">
                <span className="provider-item__dot" aria-hidden="true" />
                <span className="provider-item__tag mono">{item.tag}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
