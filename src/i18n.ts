import { useCallback, useEffect, useState } from 'react'

export type Lang = 'ru' | 'en'

const STORAGE_KEY = 'getbox-lang'

const dict = {
  ru: {
    navFeatures: 'Возможности',
    navShowcase: 'Интерфейс',
    navProviders: 'Провайдеры',
    navDownload: 'Скачать',
    navGithub: 'GitHub',
    brandName: 'GetBox',
    brandSub: 'Локальный магазин программ для Windows',
    heroKicker: 'portable · scoop · winget · chocolatey',
    heroHeadline: 'Скачал — установил. Без командной строки.',
    heroSupport:
      'Курируемый каталог, профили установки и пакеты из Scoop, winget и Chocolatey в одном окне.',
    heroShotAlt: 'Интерфейс GetBox с витриной и очередью установок',
    ctaDownload: 'Скачать для Windows',
    ctaGithub: 'GitHub',
    specVersion: 'версия',
    specPlatform: 'платформа',
    specSize: 'размер',
    specType: 'тип',
    versionLatest: 'актуальная',
    previousVersions: 'Предыдущие версии',
    selectVersion: 'Выбор версии',
    releasesLoading: 'Загрузка релизов…',
    releasesError: 'Не удалось загрузить релизы. Откройте GitHub.',
    releasesEmpty: 'Релизы не найдены.',
    featuresTitle: 'Один клик вместо терминала',
    featuresLead: 'Витрина как у Steam — установка как у магазина приложений.',
    feature1Title: 'Витрина и каталог',
    feature1Text:
      'Полки по категориям, иконки и описания из офлайн-каталога — без поиска по сайтам.',
    feature2Title: 'Профили установки',
    feature2Text:
      'Gaming Rig, Dev Starter, Essentials и другие наборы — один клик, готовый комплект.',
    feature3Title: 'Тихая установка',
    feature3Text:
      'Официальные installer’ы. Scoop, winget и Chocolatey поднимаются сами при первом запуске.',
    showcaseTitle: 'Интерфейс',
    showcaseLead: 'Главная, каталог, карточки приложений и индекс пакетов из провайдеров.',
    shotHome: 'Главная',
    shotCatalog: 'Каталог',
    shotModal: 'Карточка',
    shotPackages: 'Пакеты',
    providersTitle: 'Четыре источника',
    providersLead: 'Каталог GetBox плюс Scoop, winget и Chocolatey.',
    providerCatalog: 'Каталог GetBox',
    providerCatalogDesc: 'Курируемые приложения с прямыми ссылками на официальные установщики.',
    providerScoop: 'Scoop',
    providerScoopDesc: 'Изолированный Scoop в LocalAppData — без ручной настройки.',
    providerWinget: 'winget',
    providerWingetDesc: 'Системный Windows Package Manager или fallback App Installer.',
    providerChoco: 'Chocolatey',
    providerChocoDesc: 'Один UAC при первом запуске — дальше тихие установки.',
    downloadTitle: 'Скачать GetBox',
    downloadLead: 'Portable с GitHub Releases. Runtime ставится при первом запуске, не внутри exe.',
    footerCopy: 'GetBox — локальный магазин программ для Windows.',
    footerRights: '© GetBox',
    footerLegal: 'Документы',
    footerPrivacy: 'Конфиденциальность',
    footerCookies: 'Cookie',
    footerTerms: 'Соглашение',
    legalBack: '← На главную',
    legalUpdated: 'Обновлено',
  },
  en: {
    navFeatures: 'Features',
    navShowcase: 'Interface',
    navProviders: 'Providers',
    navDownload: 'Download',
    navGithub: 'GitHub',
    brandName: 'GetBox',
    brandSub: 'Local software store for Windows',
    heroKicker: 'portable · scoop · winget · chocolatey',
    heroHeadline: 'Download. Install. No command line.',
    heroSupport:
      'Curated catalog, install profiles, plus Scoop, winget, and Chocolatey — one window.',
    heroShotAlt: 'GetBox storefront with install queue',
    ctaDownload: 'Download for Windows',
    ctaGithub: 'GitHub',
    specVersion: 'version',
    specPlatform: 'platform',
    specSize: 'size',
    specType: 'type',
    versionLatest: 'latest',
    previousVersions: 'Previous versions',
    selectVersion: 'Select version',
    releasesLoading: 'Loading releases…',
    releasesError: 'Could not load releases. Open GitHub.',
    releasesEmpty: 'No releases found.',
    featuresTitle: 'One click instead of a terminal',
    featuresLead: 'A Steam-like storefront — installs that feel like an app store.',
    feature1Title: 'Storefront & catalog',
    feature1Text:
      'Category shelves, icons, and descriptions from an offline catalog — no site hopping.',
    feature2Title: 'Install profiles',
    feature2Text:
      'Gaming Rig, Dev Starter, Essentials, and more — one click, a ready toolkit.',
    feature3Title: 'Quiet installs',
    feature3Text:
      'Official installers. Scoop, winget, and Chocolatey bootstrap on first run.',
    showcaseTitle: 'Interface',
    showcaseLead: 'Home, catalog, app details, and the provider package index.',
    shotHome: 'Home',
    shotCatalog: 'Catalog',
    shotModal: 'Details',
    shotPackages: 'Packages',
    providersTitle: 'Four sources',
    providersLead: 'GetBox catalog plus Scoop, winget, and Chocolatey.',
    providerCatalog: 'GetBox Catalog',
    providerCatalogDesc: 'Curated apps with direct links to official installers.',
    providerScoop: 'Scoop',
    providerScoopDesc: 'Isolated Scoop under LocalAppData — no manual setup.',
    providerWinget: 'winget',
    providerWingetDesc: 'System Windows Package Manager or fallback App Installer.',
    providerChoco: 'Chocolatey',
    providerChocoDesc: 'One UAC prompt on first run — quiet installs after that.',
    downloadTitle: 'Download GetBox',
    downloadLead: 'Portable from GitHub Releases. Runtime installs on first launch, not inside the exe.',
    footerCopy: 'GetBox — a local software store for Windows.',
    footerRights: '© GetBox',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy',
    footerCookies: 'Cookies',
    footerTerms: 'Terms',
    legalBack: '← Back to home',
    legalUpdated: 'Updated',
  },
} as const

export type DictKey = keyof typeof dict.ru

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.toLowerCase() ?? ''
  return nav.startsWith('ru') ? 'ru' : 'en'
}

export function useI18n() {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === 'undefined' ? 'ru' : detectLang(),
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback((key: DictKey) => dict[lang][key], [lang])

  return { lang, setLang, t }
}
