import { useT } from '../I18nContext'

export function LangToggle() {
  const { lang, setLang } = useT()

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'ru' ? 'is-active' : ''}
        onClick={() => setLang('ru')}
        aria-pressed={lang === 'ru'}
      >
        RU
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
