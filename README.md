# GetBoxLanding

Лендинг GetBox: [getbox.ne-nas.ru](https://getbox.ne-nas.ru/)  
Репо: [IncludeSpecial/GetBoxLanding](https://github.com/IncludeSpecial/GetBoxLanding)  
Приложение: [IncludeSpecial/GetBox](https://github.com/IncludeSpecial/GetBox)

## Запуск

```bash
npm install
npm run dev
```

```bash
npm run build     # typecheck → vite build → пререндер страниц
npm run preview
```

Проверки (их же запускает CI на каждый PR):

```bash
npm run lint
npm run format:check   # npm run format — исправить
npm run typecheck
```

## Страницы и языки

Русская версия — `/`, `/privacy`, `/cookies`, `/terms`; английская — те же пути с префиксом `/en`.  
При сборке `scripts/prerender.mjs` рендерит каждую страницу в статический HTML со своими title/description/OG и `hreflang`, и генерирует `sitemap.xml`. Новые страницы добавляются в `src/routes.ts`.

При первом заходе на русскую страницу из нерусскоязычного браузера сайт переключается на `/en` (кроме ботов). Выбор в переключателе RU/EN запоминается.

## Контент и связь с приложением

Тексты лендинга повторяют README приложения ([RU](https://github.com/IncludeSpecial/GetBox/blob/main/README.md) / [EN](https://github.com/IncludeSpecial/GetBox/blob/main/README.en.md)). Когда в GetBox появляются новые возможности, обновите:

| Что                                                   | Где                                          |
| ----------------------------------------------------- | -------------------------------------------- |
| Карточки «Возможности», «Безопасно по умолчанию», FAQ | `src/content.ts`                             |
| Короткие строки (hero, навигация, кнопки)             | `src/i18n.ts`                                |
| Политика конфиденциальности — что делает приложение   | `src/legal/content.ts`                       |
| Скриншоты                                             | `npm run sync:screenshots && npm run images` |

Числа в блоке статистики (программы в каталоге, профили, категории) подтягиваются при сборке из `data/*.json` репозитория GetBox; если он недоступен, блок просто скрывается.

## Релизы

Список берётся из GitHub Releases: релиз с `*-portable.exe` появляется на сайте сам, черновики и pre-release (канал «Бета») пропускаются.

- **Кнопка «Скачать»** ведёт прямо на exe последнего релиза; старые версии — в блоке «Предыдущие версии».
- **«Что нового в vX»** — описание релиза (секция `CHANGELOG.md` приложения), разбитое по заголовкам `###`.
- **SHA256** — содержимое `GetBox-<версия>-portable.exe.sha256` из релиза (с 1.3.0) с кнопкой «Скопировать». Файл читается на сервере (в `/api/releases` и при сборке): браузеру GitHub его не отдаёт из-за CORS, поэтому в запасном режиме показывается ссылка на файл.

Как данные попадают на страницу:

1. При сборке `scripts/prerender.mjs` встраивает релизы в HTML — кнопка работает сразу, без JavaScript.
2. В браузере страница обновляет список через `api/releases.ts` — функцию Vercel с кэшем на CDN 10 минут (не упираемся в лимит GitHub 60 запросов/час на IP; можно задать `GITHUB_TOKEN` в переменных Vercel). Если она недоступна — напрямую из GitHub. Ответ кэшируется в localStorage на 10 минут.
3. Workflow `release-sync` раз в час сравнивает версию в HTML живого сайта с последним релизом и, если они разошлись, вызывает Deploy Hook Vercel — сайт пересобирается со свежими данными.

**Настройка пересборки:** Vercel → Project → Settings → Git → Deploy Hooks → создать хук для `main` → добавить его в секреты этого репозитория как `VERCEL_DEPLOY_HOOK_URL`. Без секрета workflow только пишет в лог, что версия отстаёт.

Чтобы сайт обновлялся сразу после релиза, а не в течение часа, добавьте в конец `jobs.release.steps` файла `release.yml` приложения шаг (нужен токен с правом `repo` на GetBoxLanding в секрете `LANDING_DISPATCH_TOKEN`):

```yaml
- name: Update landing
  env:
    LANDING_TOKEN: ${{ secrets.LANDING_DISPATCH_TOKEN }}
  if: env.LANDING_TOKEN != ''
  shell: bash
  run: >
    curl -fsS -X POST
    -H "Authorization: Bearer $LANDING_TOKEN"
    -H "Accept: application/vnd.github+json"
    https://api.github.com/repos/IncludeSpecial/GetBoxLanding/dispatches
    -d '{"event_type":"getbox-release"}'
```

Бинарники в репозиторий не кладём — `/download/*` перенаправляется на GitHub Releases.

## Скриншоты

Скриншоты интерфейса берутся из `docs/screenshots/` репозитория GetBox:

```bash
npm run sync:screenshots          # скачать с GitHub (ветка main)
node scripts/sync-app-screenshots.mjs ../GetBox   # или из локального клона
npm run images                    # WebP: полный размер и -960 в public/screenshots/
```

Список кадров — `SCREENSHOTS` в `scripts/sync-app-screenshots.mjs`, вкладки блока «Интерфейс» — `src/components/Showcase.tsx`.

## Бренд

- `assets-src/brand/getbox-logo.svg` — логотип (Fluent-плитка с открытой коробкой и стрелкой), `getbox-logo-small.svg` — упрощённый вариант для 16–20 px (фавикон). В React он же — `src/components/Logo.tsx`; при правках меняйте оба.
- Тот же логотип стоит в приложении (`data/logo.svg` в репозитории GetBox, из него собирается иконка exe).
- Картинки для превью ссылок — `public/og.jpg` (RU) и `public/og-en.jpg` (EN), 1200×630. Шаблон — `assets-src/brand/og.html`, пересобрать: `npm run og` (нужен Chromium из Playwright или `CHROME_PATH`).

## Vercel

Import GetBoxLanding → Framework: Vite → `npm run build` → `dist` → getbox.ne-nas.ru.  
`vercel.json`: `cleanUrls` (отдаёт `privacy.html` по `/privacy`), редирект `/download/*` и кэш-заголовки для ассетов. Неизвестные пути отдают 404.

## Аналитика

Vercel Web Analytics (без cookie) подключён в `src/main.tsx`. Чтобы данные пошли, включите Analytics в настройках проекта на Vercel.
