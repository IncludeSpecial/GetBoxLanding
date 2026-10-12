import type { Lang } from './i18n'
import type { LegalDocId } from './legal/content'

export const LANGS: Lang[] = ['ru', 'en']
export const LEGAL_IDS: LegalDocId[] = ['privacy', 'cookies', 'terms']

export type Route = {
  lang: Lang
  legalId: LegalDocId | null
}

/** `/` and `/privacy` are Russian; `/en` and `/en/privacy` are English. */
export function parsePath(pathname: string): Route {
  const parts = pathname.split('/').filter(Boolean)
  const lang: Lang = parts[0] === 'en' ? 'en' : 'ru'
  if (lang === 'en') parts.shift()
  const id = parts[0] as LegalDocId | undefined
  const legalId = parts.length === 1 && id && LEGAL_IDS.includes(id) ? id : null
  return { lang, legalId }
}

export function buildPath(lang: Lang, legalId: LegalDocId | null = null) {
  const prefix = lang === 'en' ? '/en' : ''
  if (legalId) return `${prefix}/${legalId}`
  return prefix || '/'
}

/** Every page the site has; used for prerendering and the sitemap. */
export function allRoutes(): Route[] {
  return LANGS.flatMap((lang) => [
    { lang, legalId: null },
    ...LEGAL_IDS.map((legalId) => ({ lang, legalId })),
  ])
}
