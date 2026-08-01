import { createContext, useContext } from 'react'
import type { DictKey, Lang } from './i18n'

export type I18nCtx = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: DictKey) => string
}

export const I18nContext = createContext<I18nCtx | null>(null)

export function useT() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT outside I18nProvider')
  return ctx
}
