import type { Lang } from './i18n'
import type { IconName } from './components/Icon'

/**
 * Longer landing copy. Kept in sync with the app's README.md / README.en.md
 * (github.com/IncludeSpecial/GetBox) — update both when features change.
 */

type Card = { icon: IconName; title: string; text: string }
type Faq = { q: string; a: string; code?: string }

type Content = {
  features: Card[]
  safety: Card[]
  faq: Faq[]
}

const ru: Content = {
  features: [
    {
      icon: 'grid',
      title: 'Каталог с витриной',
      text: 'Курируемые программы с описаниями и иконками по категориям: браузеры, игры, разработка, медиа, безопасность и другие.',
    },
    {
      icon: 'boxes',
      title: 'Все пакеты winget, Scoop и Chocolatey',
      text: 'Тысячи пакетов из трёх менеджеров в одном поиске. Менеджеры GetBox ставит сам при первом запуске.',
    },
    {
      icon: 'refresh',
      title: 'Обновления и откат',
      text: 'Вкладка «Обновления» показывает, что устарело: по одной или «Обновить все». Неудачное обновление откатывается в один клик.',
    },
    {
      icon: 'layers',
      title: 'Профили и рекомендации',
      text: 'Наборы в один клик (Gaming Rig, Dev Starter, Essentials…), лента «Для вас», «Часто ставят вместе» и «Альтернативы».',
    },
    {
      icon: 'queue',
      title: 'Очередь установок',
      text: 'Ставьте сразу несколько программ: прогресс, отмена, повтор и понятные ошибки на русском.',
    },
    {
      icon: 'palette',
      title: 'Внешний вид под себя',
      text: 'Пять тем, включая Windows 11 с Mica, свой акцентный цвет, масштаб 90–125 % и четыре вида списков.',
    },
  ],
  safety: [
    {
      icon: 'source',
      title: 'Официальный источник',
      text: 'Ссылки на установщики и контрольные суммы берутся из манифестов winget, а не из случайных зеркал.',
    },
    {
      icon: 'shield',
      title: 'Проверка до запуска',
      text: 'Только HTTPS, SHA256 должен совпасть — иначе установка не начнётся и программа поставится через winget.',
    },
    {
      icon: 'silent',
      title: 'Тихая установка',
      text: 'Без мастеров «Далее → Далее» и навязанных «дополнительных предложений».',
    },
    {
      icon: 'update',
      title: 'Сам следит за версиями',
      text: 'Проверяет обновления программ и свои собственные: новая версия GetBox скачивается в фоне и сверяется по SHA256.',
    },
  ],
  faq: [
    {
      q: 'Это безопасно? Откуда берутся программы?',
      a: 'Программы каталога скачиваются по прямым ссылкам издателей из официального индекса winget — того же, что использует winget install. GetBox качает только по HTTPS, сверяет SHA256 из манифеста и лишь потом запускает установщик. Пакеты из «Всех пакетов» ставят сами winget, Scoop и Chocolatey со своими проверками.',
    },
    {
      q: 'Как проверить, что скачанный файл настоящий?',
      a: 'Рядом с exe в каждом релизе лежит файл .sha256, а хеш актуальной версии показан выше, в блоке «Скачать». Сравните его с выводом PowerShell — хеши должны совпасть до символа.',
      code: 'Get-FileHash .\\GetBox-<версия>-portable.exe -Algorithm SHA256',
    },
    {
      q: 'Windows пишет «Windows защитила ваш компьютер». Что делать?',
      a: 'Нажмите «Подробнее» → «Выполнить в любом случае». Предупреждение SmartScreen появляется у новых приложений без платной подписи кода; подлинность файла можно проверить по контрольной сумме.',
    },
    {
      q: 'Нужны ли права администратора?',
      a: 'Нет. Не запускайте GetBox «от имени администратора» постоянно: установщик Scoop отказывается работать в такой сессии. Отдельные программы сами попросят UAC при установке, а Chocolatey — один раз, при включении.',
    },
    {
      q: 'Как обновлять сам GetBox?',
      a: 'С версии 1.3.0 — автоматически: новая версия скачивается в фоне, а в заголовке окна появляется кнопка «Обновить до X». С 1.2.x на 1.3.0 нужно один раз перейти вручную: скачайте новый exe и замените им старый. Настройки и избранное сохранятся.',
    },
    {
      q: 'Что не так с winget на старой Windows 10?',
      a: 'winget входит в «Установщик приложений» (App Installer). На старых сборках Windows 10 его нужно обновить из Microsoft Store. Каталог и Scoop работают и без winget.',
    },
    {
      q: 'Где GetBox хранит данные и как его удалить?',
      a: 'Всё лежит в %LOCALAPPDATA%\\GetBox\\: изолированные Scoop и Chocolatey, кэш, настройки и история обновлений. Чтобы удалить GetBox, закройте его, удалите exe и эту папку. Установленные программы останутся — их можно удалить как обычно, через «Параметры → Приложения».',
    },
  ],
}

const en: Content = {
  features: [
    {
      icon: 'grid',
      title: 'Curated catalog',
      text: 'Hand-picked programs with descriptions and icons by category: browsers, games, development, media, security and more.',
    },
    {
      icon: 'boxes',
      title: 'Every winget, Scoop and Chocolatey package',
      text: 'Thousands of packages from three managers in one search. GetBox sets the managers up itself on first launch.',
    },
    {
      icon: 'refresh',
      title: 'Updates and rollback',
      text: 'The Updates tab lists what is outdated — update one or all, and roll a bad update back in one click.',
    },
    {
      icon: 'layers',
      title: 'Profiles and recommendations',
      text: 'One-click sets (Gaming Rig, Dev Starter, Essentials…), a “For you” feed, “Often installed together” and “Alternatives”.',
    },
    {
      icon: 'queue',
      title: 'Install queue',
      text: 'Install several programs at once with progress, cancel, retry and readable errors.',
    },
    {
      icon: 'palette',
      title: 'Make it yours',
      text: 'Five themes including Windows 11 with Mica, a custom accent color, 90–125 % scale and four list views.',
    },
  ],
  safety: [
    {
      icon: 'source',
      title: 'Official sources',
      text: 'Installer links and checksums come from winget manifests, not random mirrors.',
    },
    {
      icon: 'shield',
      title: 'Verified before it runs',
      text: 'HTTPS only, and the SHA256 must match — otherwise nothing runs and the program is installed through winget instead.',
    },
    {
      icon: 'silent',
      title: 'Silent installs',
      text: 'No “Next → Next” wizards and no bundled “offers”.',
    },
    {
      icon: 'update',
      title: 'Keeps things current',
      text: 'Checks for updates to your programs and to itself: new GetBox versions download in the background and are verified by SHA256.',
    },
  ],
  faq: [
    {
      q: 'Is it safe? Where do programs come from?',
      a: 'Catalog programs are downloaded from the publishers’ direct links listed in the official winget index — the same source winget install uses. GetBox downloads over HTTPS only and checks the SHA256 from the manifest before running the installer. Packages from “All packages” are installed by winget, Scoop and Chocolatey with their own checks.',
    },
    {
      q: 'How do I verify the download?',
      a: 'Each release ships a .sha256 file next to the exe, and the current version’s hash is shown in the Download section above. Compare it with the PowerShell output — they must match exactly.',
      code: 'Get-FileHash .\\GetBox-<version>-portable.exe -Algorithm SHA256',
    },
    {
      q: 'Windows says “Windows protected your PC”. What now?',
      a: 'Click “More info” → “Run anyway”. SmartScreen warns about new apps without a paid code-signing certificate; you can verify the file with its checksum.',
    },
    {
      q: 'Do I need administrator rights?',
      a: 'No. Don’t run GetBox elevated all the time — the Scoop installer refuses to work in an elevated session. Individual installers ask for UAC when they need it; Chocolatey asks once when you enable it.',
    },
    {
      q: 'How does GetBox update itself?',
      a: 'From 1.3.0 on, automatically: the new version downloads in the background and an “Update to X” button appears in the title bar. Moving from 1.2.x to 1.3.0 is a one-time manual step — replace the old exe with the new one; settings and favorites are kept.',
    },
    {
      q: 'What about winget on older Windows 10?',
      a: 'winget ships with App Installer. On older Windows 10 builds, update App Installer from the Microsoft Store. The catalog and Scoop work without winget.',
    },
    {
      q: 'Where is data stored and how do I uninstall?',
      a: 'Everything is in %LOCALAPPDATA%\\GetBox\\: isolated Scoop and Chocolatey, caches, settings and update history. To remove GetBox, close it and delete the exe and that folder. Programs you installed stay; remove them in Settings → Apps as usual.',
    },
  ],
}

export const CONTENT: Record<Lang, Content> = { ru, en }
