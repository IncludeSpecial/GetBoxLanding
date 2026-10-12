import type { Lang } from './i18n'
import { getLegalDoc } from './legal/content'
import { buildPath, LANGS, type Route } from './routes'
import { SITE_URL } from './config'

const HOME = {
  ru: {
    title: 'GetBox — магазин программ для Windows',
    description:
      'GetBox — локальный магазин программ для Windows. Каталог, профили установки, Scoop, winget и Chocolatey — без командной строки.',
  },
  en: {
    title: 'GetBox — Windows software store',
    description:
      'GetBox is a local software store for Windows. Curated catalog, install profiles, Scoop, winget, and Chocolatey — no command line.',
  },
} satisfies Record<Lang, { title: string; description: string }>

export const OG_LOCALE: Record<Lang, string> = { ru: 'ru_RU', en: 'en_US' }

export function pageMeta({ lang, legalId }: Route) {
  const doc = legalId ? getLegalDoc(lang, legalId) : null
  return {
    title: doc ? `${doc.title} — GetBox` : HOME[lang].title,
    description: doc ? doc.intro : HOME[lang].description,
    canonical: `${SITE_URL}${buildPath(lang, legalId)}`,
    alternates: LANGS.map((l) => ({
      lang: l,
      href: `${SITE_URL}${buildPath(l, legalId)}`,
    })),
  }
}
