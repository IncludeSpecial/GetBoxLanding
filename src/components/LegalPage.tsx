import { useEffect } from 'react'
import { useT } from '../I18nContext'
import { getLegalDoc, type LegalDocId } from '../legal/content'

type Props = {
  id: LegalDocId
}

export function LegalPage({ id }: Props) {
  const { lang, t } = useT()
  const doc = getLegalDoc(lang, id)

  useEffect(() => {
    document.title = `${doc.title} — GetBox`
    return () => {
      document.title =
        lang === 'ru'
          ? 'GetBox — магазин программ для Windows'
          : 'GetBox — Windows software store'
    }
  }, [doc.title, lang])

  return (
    <article className="legal">
      <div className="legal__inner">
        <p className="legal__back">
          <a href="/">{t('legalBack')}</a>
        </p>
        <h1>{doc.title}</h1>
        <p className="legal__meta">
          {t('legalUpdated')}: {doc.updated}
        </p>
        <p className="legal__intro">{doc.intro}</p>
        {doc.blocks.map((block) => (
          <section key={block.heading} className="legal__section">
            <h2>{block.heading}</h2>
            {block.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  )
}
