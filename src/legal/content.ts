export type LegalDocId = 'privacy' | 'cookies' | 'terms'

export type LegalBlock = {
  heading: string
  paragraphs: string[]
}

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  blocks: LegalBlock[]
}

const privacyRu: LegalDoc = {
  title: 'Политика конфиденциальности',
  updated: '12 октября 2026',
  intro:
    'Эта политика описывает, какие данные обрабатываются при посещении сайта GetBox и при использовании приложения GetBox. Мы стараемся собирать минимум и не продаём персональные данные.',
  blocks: [
    {
      heading: 'Кто мы',
      paragraphs: [
        'GetBox — локальный магазин программ для Windows. Сайт getbox.ne-nas.ru сообщает о продукте и ссылается на загрузки с GitHub Releases. Контакт по вопросам конфиденциальности: issues в репозитории IncludeSpecial/GetBox на GitHub.',
      ],
    },
    {
      heading: 'Сайт (лендинг)',
      paragraphs: [
        'На сайте мы не просим регистрацию, email или платёжные данные.',
        'В браузере может сохраняться выбранный язык интерфейса (localStorage). Это нужно только для удобства и не передаётся на наши серверы как учётная запись.',
        'Чтобы показать актуальные релизы, страница запрашивает список у нашего сервера (Vercel), который берёт его из публичного API GitHub. Если сервер недоступен, браузер обращается к api.github.com напрямую. Полученный список кэшируется в localStorage на несколько минут.',
        'Сайт размещён у хостинг-провайдера (Vercel). Провайдер может автоматически обрабатывать технические логи (IP, User-Agent, время запроса) в объёме, необходимом для работы и защиты сервиса — по своим правилам.',
        'Шрифты загружаются с того же домена, что и сайт; сторонние сервисы шрифтов не используются.',
      ],
    },
    {
      heading: 'Приложение GetBox',
      paragraphs: [
        'Приложение работает на вашем компьютере. Установка программ выполняется локально через каталог GetBox и менеджеры пакетов Scoop, winget и Chocolatey.',
        'GetBox не требует аккаунта GetBox. Мы не получаем содержимое вашей установки как облачный сервис учёта.',
        'При загрузке установщиков и пакетов ваш компьютер обращается к официальным источникам и репозиториям выбранных провайдеров. На эти сервисы распространяются их собственные политики.',
        'Технические данные (пути, очередь установок, кэш каталога) хранятся локально на устройстве в рамках обычной работы приложения.',
      ],
    },
    {
      heading: 'Cookies и аналоги',
      paragraphs: [
        'Подробнее — в документе «Политика Cookie». Кратко: обязательных трекинг-cookie для маркетинга мы не используем; язык интерфейса хранится в localStorage.',
      ],
    },
    {
      heading: 'Передача и хранение',
      paragraphs: [
        'Мы не продаём персональные данные и не передаём их третьим лицам для рекламного таргетинга.',
        'Данные, которые обрабатывают GitHub, Vercel или менеджеры пакетов, регулируются политиками этих сервисов.',
      ],
    },
    {
      heading: 'Ваши права',
      paragraphs: [
        'Вы можете очистить localStorage сайта в настройках браузера и удалить приложение GetBox вместе с локальными данными на устройстве.',
        'Если считаете, что мы обрабатываем ваши данные иным образом, напишите через GitHub Issues — разберём запрос.',
      ],
    },
    {
      heading: 'Изменения',
      paragraphs: [
        'Мы можем обновить эту политику при изменении продукта или инфраструктуры. Актуальная версия всегда на этой странице; дата обновления указана выше.',
      ],
    },
  ],
}

const privacyEn: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'October 12, 2026',
  intro:
    'This policy explains what data is processed when you visit the GetBox website and use the GetBox app. We aim to collect as little as possible and do not sell personal data.',
  blocks: [
    {
      heading: 'Who we are',
      paragraphs: [
        'GetBox is a local software store for Windows. The site getbox.ne-nas.ru describes the product and links to downloads on GitHub Releases. For privacy questions, open an issue in the IncludeSpecial/GetBox repository on GitHub.',
      ],
    },
    {
      heading: 'Website (landing)',
      paragraphs: [
        'We do not ask for registration, email, or payment details on the site.',
        'Your browser may store the selected UI language in localStorage. This is only for convenience and is not used as an account on our servers.',
        'To show current releases, the page requests the list from our server (Vercel), which takes it from the public GitHub API. If the server is unavailable, your browser calls api.github.com directly. The list is cached in localStorage for a few minutes.',
        'The site is hosted by a hosting provider (Vercel). The provider may process technical logs (IP, User-Agent, request time) as needed to operate and protect the service, under its own terms.',
        'Fonts are served from the same domain as the site; no third-party font services are used.',
      ],
    },
    {
      heading: 'GetBox application',
      paragraphs: [
        'The app runs on your computer. Software installs happen locally via the GetBox catalog and package managers Scoop, winget, and Chocolatey.',
        'GetBox does not require a GetBox account. We do not receive your install activity as a cloud analytics account.',
        'When downloading installers and packages, your computer contacts official sources and repositories of the chosen providers. Those services have their own policies.',
        'Technical data (paths, install queue, catalog cache) stays on the device as part of normal app operation.',
      ],
    },
    {
      heading: 'Cookies and similar',
      paragraphs: [
        'See the Cookie Policy for details. In short: we do not use mandatory marketing tracking cookies; UI language is stored in localStorage.',
      ],
    },
    {
      heading: 'Sharing and retention',
      paragraphs: [
        'We do not sell personal data or share it with third parties for ad targeting.',
        'Data processed by GitHub, Vercel, or package managers is governed by those services’ policies.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        'You can clear the site’s localStorage in browser settings and uninstall GetBox along with local data on the device.',
        'If you believe we process your data differently, open a GitHub Issue and we will look into it.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update this policy when the product or infrastructure changes. The current version is always on this page; the update date is shown above.',
      ],
    },
  ],
}

const cookiesRu: LegalDoc = {
  title: 'Политика Cookie',
  updated: '12 октября 2026',
  intro: 'Этот документ объясняет, какие cookie и похожие технологии используются на сайте GetBox.',
  blocks: [
    {
      heading: 'Что мы используем',
      paragraphs: [
        'Мы не размещаем рекламные или аналитические cookie-трекеры (Google Analytics, Meta Pixel и т.п.).',
        'Выбранный язык интерфейса сохраняется в localStorage браузера (ключ getbox-lang). Это не cookie в классическом смысле, но похожая технология хранения на устройстве.',
      ],
    },
    {
      heading: 'Технические и сторонние запросы',
      paragraphs: [
        'Хостинг (Vercel) и сеть доставки могут выставлять собственные технические cookie или логировать запросы для безопасности и работоспособности.',
        'Список релизов кэшируется в localStorage (ключ getbox-releases). Если наш сервер недоступен, браузер запрашивает api.github.com напрямую; cookie GitHub зависят от того, залогинены ли вы на github.com в этом браузере.',
      ],
    },
    {
      heading: 'Управление',
      paragraphs: [
        'Вы можете очистить данные сайта (включая localStorage) в настройках браузера или использовать режим инкогнито.',
        'Блокировка сторонних запросов (расширениями или настройками) может повлиять на отображение релизов — основной контент страницы останется доступен.',
      ],
    },
    {
      heading: 'Связь с конфиденциальностью',
      paragraphs: ['Общая информация об обработке данных — в Политике конфиденциальности.'],
    },
  ],
}

const cookiesEn: LegalDoc = {
  title: 'Cookie Policy',
  updated: 'October 12, 2026',
  intro: 'This document explains cookies and similar technologies used on the GetBox website.',
  blocks: [
    {
      heading: 'What we use',
      paragraphs: [
        'We do not place advertising or analytics cookie trackers (Google Analytics, Meta Pixel, etc.).',
        'The selected UI language is stored in browser localStorage (key getbox-lang). That is not a classic cookie, but a similar on-device storage technology.',
      ],
    },
    {
      heading: 'Technical and third-party requests',
      paragraphs: [
        'Hosting (Vercel) and the delivery network may set their own technical cookies or log requests for security and reliability.',
        'The release list is cached in localStorage (key getbox-releases). If our server is unavailable, your browser requests api.github.com directly; GitHub cookies depend on whether you are signed in to github.com in that browser.',
      ],
    },
    {
      heading: 'Your controls',
      paragraphs: [
        'You can clear site data (including localStorage) in browser settings or use a private window.',
        'Blocking third-party requests (via extensions or settings) may affect the release list — the main page content remains available.',
      ],
    },
    {
      heading: 'Related privacy info',
      paragraphs: ['General information about data processing is in the Privacy Policy.'],
    },
  ],
}

const termsRu: LegalDoc = {
  title: 'Пользовательское соглашение',
  updated: '3 августа 2026',
  intro:
    'Используя сайт GetBox и приложение GetBox, вы соглашаетесь с условиями ниже. Если не согласны — не используйте продукт.',
  blocks: [
    {
      heading: 'Продукт',
      paragraphs: [
        'GetBox — программное обеспечение для Windows, помогающее устанавливать приложения из каталога и через Scoop, winget и Chocolatey. Сайт предоставляет информацию и ссылки на загрузку.',
        'Дистрибутивы публикуются через GitHub Releases проекта IncludeSpecial/GetBox. Исходный код и лицензия репозитория (если указана) имеют приоритет в отношении прав на ПО.',
      ],
    },
    {
      heading: 'Приемлемое использование',
      paragraphs: [
        'Вы обязуетесь использовать GetBox законно и только на устройствах, которыми имеете право управлять.',
        'Запрещается использовать сайт или приложение для распространения вредоносного ПО, обхода лицензий третьих сторон или иных незаконных действий.',
      ],
    },
    {
      heading: 'Стороннее ПО',
      paragraphs: [
        'GetBox может загружать и запускать установщики и пакеты из внешних источников. Условия лицензий и политики этих приложений и репозиториев остаются на стороне их правообладателей.',
        'Мы не гарантируем доступность, безопасность или соответствие конкретному назначению каждого стороннего пакета.',
      ],
    },
    {
      heading: 'Отказ от гарантий',
      paragraphs: [
        'Сайт и приложение предоставляются «как есть», без явных или подразумеваемых гарантий работоспособности, бесперебойности или пригодности для ваших целей.',
        'Вы устанавливаете ПО на свой риск. Рекомендуем проверять источники и делать резервные копии важных данных.',
      ],
    },
    {
      heading: 'Ограничение ответственности',
      paragraphs: [
        'В максимальной степени, допускаемой применимым правом, авторы и правообладатели GetBox не несут ответственности за косвенный, случайный или последующий ущерб, потерю данных или упущенную выгоду, возникшие из использования или невозможности использования продукта.',
      ],
    },
    {
      heading: 'Изменения и контакт',
      paragraphs: [
        'Условия могут обновляться. Продолжая пользоваться сайтом или приложением после публикации новой версии, вы принимаете обновлённые условия.',
        'Вопросы: GitHub Issues репозитория IncludeSpecial/GetBox.',
      ],
    },
  ],
}

const termsEn: LegalDoc = {
  title: 'Terms of Use',
  updated: 'August 3, 2026',
  intro:
    'By using the GetBox website and the GetBox application, you agree to the terms below. If you do not agree, do not use the product.',
  blocks: [
    {
      heading: 'The product',
      paragraphs: [
        'GetBox is Windows software that helps install apps from a catalog and via Scoop, winget, and Chocolatey. The website provides information and download links.',
        'Binaries are published via GitHub Releases for IncludeSpecial/GetBox. The repository’s source and license (if stated) take precedence regarding software rights.',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'You agree to use GetBox lawfully and only on devices you are allowed to manage.',
        'You must not use the site or app to distribute malware, circumvent third-party licenses, or engage in other unlawful activity.',
      ],
    },
    {
      heading: 'Third-party software',
      paragraphs: [
        'GetBox may download and run installers and packages from external sources. Licenses and policies of those apps and repositories remain with their owners.',
        'We do not warrant availability, security, or fitness for a particular purpose of every third-party package.',
      ],
    },
    {
      heading: 'Disclaimer of warranties',
      paragraphs: [
        'The site and app are provided “as is,” without express or implied warranties of merchantability, uninterrupted operation, or fitness for your purposes.',
        'You install software at your own risk. We recommend verifying sources and backing up important data.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by applicable law, GetBox authors and rights holders are not liable for indirect, incidental, or consequential damages, data loss, or lost profits arising from use of or inability to use the product.',
      ],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        'These terms may be updated. Continued use of the site or app after a new version is published means you accept the updated terms.',
        'Questions: GitHub Issues in the IncludeSpecial/GetBox repository.',
      ],
    },
  ],
}

const docs = {
  ru: {
    privacy: privacyRu,
    cookies: cookiesRu,
    terms: termsRu,
  },
  en: {
    privacy: privacyEn,
    cookies: cookiesEn,
    terms: termsEn,
  },
} as const

export function getLegalDoc(lang: 'ru' | 'en', id: LegalDocId): LegalDoc {
  return docs[lang][id]
}
