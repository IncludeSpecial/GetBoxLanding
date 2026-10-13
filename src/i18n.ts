export type Lang = 'ru' | 'en'

const STORAGE_KEY = 'getbox-lang'

const dict = {
  ru: {
    navFeatures: 'Возможности',
    navShowcase: 'Интерфейс',
    navSafety: 'Безопасность',
    navFaq: 'FAQ',
    navDownload: 'Скачать',
    navGithub: 'GitHub',
    navMenu: 'Меню',
    brandName: 'GetBox',
    brandSub: 'Магазин программ для Windows',
    heroKicker: 'portable · winget · scoop · chocolatey',
    heroHeadline: 'Нашли, нажали «Установить». Дальше GetBox сам.',
    heroSupport:
      'Официальные установщики, проверка SHA256, обновления и откат — в одном окне. Без командной строки.',
    heroShotAlt: 'GetBox: главная с лентой «Для вас», профилями установки и очередью',
    ctaDownload: 'Скачать для Windows',
    ctaGithub: 'GitHub',
    specVersion: 'Версия и платформа',
    previousVersions: 'Предыдущие версии',
    releasesLoading: 'Загрузка релизов…',
    releasesError: 'Не удалось загрузить релизы. Откройте GitHub.',
    releasesEmpty: 'Релизы не найдены.',
    featuresTitle: 'Один клик вместо терминала',
    featuresLead: 'Витрина как у Steam, установка как в магазине приложений — и всё под контролем.',
    statApps: 'программ в каталоге',
    statProfiles: 'профилей установки',
    statCategories: 'категорий',
    statPackages: 'пакетов winget, Scoop и Chocolatey',
    statPackagesValue: 'тысячи',
    safetyTitle: 'Безопасно по умолчанию',
    safetyLead:
      'Обычно новая программа — это поиск сайта, проверка, что это не подделка, и снятие галочек с лишнего. GetBox делает это за вас.',
    showcaseTitle: 'Интерфейс',
    showcaseLead: 'Главная, каталог, карточки, очередь, обновления и пять тем оформления.',
    shotHome: 'Главная',
    shotCatalog: 'Каталог',
    shotDetails: 'Карточка',
    shotQueue: 'Очередь',
    shotUpdates: 'Обновления',
    shotPackages: 'Все пакеты',
    shotThemes: 'Темы',
    providersTitle: 'Четыре источника',
    providersLead: 'Каталог GetBox плюс winget, Scoop и Chocolatey — в одном поиске.',
    providerCatalog: 'Каталог GetBox',
    providerCatalogDesc:
      'Курируемые программы: ссылки и SHA256 из официальных манифестов winget, тихие ключи установки.',
    providerScoop: 'Scoop',
    providerScoopDesc:
      'Изолированный Scoop в LocalAppData — GetBox ставит его сам при первом запуске.',
    providerWinget: 'winget',
    providerWingetDesc:
      'Системный Windows Package Manager. Он же — запасной путь, если проверка файла не прошла.',
    providerChoco: 'Chocolatey',
    providerChocoDesc: 'По желанию: один запрос UAC при включении, дальше — тихие установки.',
    faqTitle: 'Частые вопросы',
    faqLead: 'Не нашли ответ — создайте issue на GitHub.',
    downloadTitle: 'Скачать GetBox',
    downloadLead:
      'Portable-приложение: установка и права администратора не нужны. Держите exe где угодно — в «Документах» или на флешке.',
    downloadRequirements: 'Windows 10 или 11 (x64) и интернет для загрузки программ.',
    whatsNew: 'Что нового в',
    whatsNewAll: 'Все изменения',
    checksum: 'SHA256',
    checksumFile: 'Файл с контрольной суммой',
    copy: 'Скопировать',
    copied: 'Скопировано',
    selfUpdateNote:
      'С 1.3.0 GetBox обновляется сам. С версий 1.2.x перейдите один раз вручную — замените старый exe новым, настройки сохранятся.',
    smartscreenNote:
      'Если Windows SmartScreen покажет «Windows защитила ваш компьютер» — нажмите «Подробнее» → «Выполнить в любом случае».',
    footerCopy: 'GetBox — магазин программ для Windows.',
    footerRights: '© GetBox',
    footerLegal: 'Документы',
    footerPrivacy: 'Конфиденциальность',
    footerCookies: 'Cookie',
    footerTerms: 'Соглашение',
    footerIssues: 'Сообщить об ошибке',
    footerChangelog: 'История изменений',
    legalBack: '← На главную',
    legalUpdated: 'Обновлено',
  },
  en: {
    navFeatures: 'Features',
    navShowcase: 'Interface',
    navSafety: 'Safety',
    navFaq: 'FAQ',
    navDownload: 'Download',
    navGithub: 'GitHub',
    navMenu: 'Menu',
    brandName: 'GetBox',
    brandSub: 'An app store for Windows',
    heroKicker: 'portable · winget · scoop · chocolatey',
    heroHeadline: 'Find it, click Install. GetBox does the rest.',
    heroSupport:
      'Official installers, SHA256 checks, updates and rollback in one window. No command line.',
    heroShotAlt: 'GetBox home with the “For you” feed, install profiles and the queue',
    ctaDownload: 'Download for Windows',
    ctaGithub: 'GitHub',
    specVersion: 'Version and platform',
    previousVersions: 'Previous versions',
    releasesLoading: 'Loading releases…',
    releasesError: 'Could not load releases. Open GitHub.',
    releasesEmpty: 'No releases found.',
    featuresTitle: 'One click instead of a terminal',
    featuresLead: 'A Steam-like storefront, app-store installs — and you stay in control.',
    statApps: 'programs in the catalog',
    statProfiles: 'install profiles',
    statCategories: 'categories',
    statPackages: 'winget, Scoop and Chocolatey packages',
    statPackagesValue: 'thousands',
    safetyTitle: 'Safe by default',
    safetyLead:
      'A new program usually means hunting for the site, checking it isn’t a fake and unticking extras. GetBox does that for you.',
    showcaseTitle: 'Interface',
    showcaseLead: 'Home, catalog, details, queue, updates and five themes.',
    shotHome: 'Home',
    shotCatalog: 'Catalog',
    shotDetails: 'Details',
    shotQueue: 'Queue',
    shotUpdates: 'Updates',
    shotPackages: 'All packages',
    shotThemes: 'Themes',
    providersTitle: 'Four sources',
    providersLead: 'The GetBox catalog plus winget, Scoop and Chocolatey — in one search.',
    providerCatalog: 'GetBox Catalog',
    providerCatalogDesc:
      'Curated programs: links and SHA256 from official winget manifests, silent install switches.',
    providerScoop: 'Scoop',
    providerScoopDesc: 'Isolated Scoop under LocalAppData — GetBox installs it on first launch.',
    providerWinget: 'winget',
    providerWingetDesc:
      'The system Windows Package Manager. Also the fallback when a file check fails.',
    providerChoco: 'Chocolatey',
    providerChocoDesc: 'Optional: one UAC prompt when you enable it, silent installs after that.',
    faqTitle: 'FAQ',
    faqLead: 'Didn’t find an answer? Open an issue on GitHub.',
    downloadTitle: 'Download GetBox',
    downloadLead:
      'A portable app: no installation and no administrator rights. Keep the exe anywhere — in Documents or on a USB stick.',
    downloadRequirements: 'Windows 10 or 11 (x64) and an internet connection.',
    whatsNew: 'What’s new in',
    whatsNewAll: 'Full changelog',
    checksum: 'SHA256',
    checksumFile: 'Checksum file',
    copy: 'Copy',
    copied: 'Copied',
    selfUpdateNote:
      'From 1.3.0 on, GetBox updates itself. Coming from 1.2.x, switch once by hand — replace the old exe with the new one; settings are kept.',
    smartscreenNote:
      'If Windows SmartScreen says “Windows protected your PC”, click “More info” → “Run anyway”.',
    footerCopy: 'GetBox — an app store for Windows.',
    footerRights: '© GetBox',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy',
    footerCookies: 'Cookies',
    footerTerms: 'Terms',
    footerIssues: 'Report a bug',
    footerChangelog: 'Changelog',
    legalBack: '← Back to home',
    legalUpdated: 'Updated',
  },
} as const

export type DictKey = keyof typeof dict.ru

/** Language the visitor chose earlier with the toggle, if any. */
export function savedLang(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return null
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* ignore */
  }
}

export function browserLang(): Lang {
  const nav = navigator.language?.toLowerCase() ?? ''
  return nav.startsWith('ru') ? 'ru' : 'en'
}

export function translate(lang: Lang, key: DictKey) {
  return dict[lang][key]
}
