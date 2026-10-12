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

## Релизы

Список берётся из GitHub Releases. Создал Release с `*-portable.exe` → на сайте сам появится.

- `api/releases.ts` — функция Vercel: запрашивает GitHub API и кэширует ответ на CDN (10 минут), чтобы посетители не упирались в лимит GitHub 60 запросов/час на IP. Можно задать `GITHUB_TOKEN` в переменных окружения Vercel.
- Браузер сначала идёт в `/api/releases`, при ошибке — напрямую в GitHub; ответ кэшируется в localStorage.
- Актуальный релиз встраивается в HTML при сборке, поэтому кнопка «Скачать» работает сразу, без ожидания API. Новый релиз подхватится на клиенте и без пересборки.

CTA качает актуальную версию напрямую с GitHub. Старые версии — в свёрнутом блоке «Предыдущие версии».  
Бинарники в репозиторий не кладём — `/download/*` перенаправляется на GitHub Releases.

## Скриншоты

Исходники в PNG лежат в `assets-src/screenshots/`. После замены запустить:

```bash
npm run images
```

Скрипт создаёт в `public/screenshots/` WebP: полный размер, `-960` и `-thumb` (превью для блока «Интерфейс»).  
`assets-src/og.png` — исходник OG-картинки, на сайте используется `public/og.jpg` (1200×630).

## Vercel

Import GetBoxLanding → Framework: Vite → `npm run build` → `dist` → getbox.ne-nas.ru.  
`vercel.json`: `cleanUrls` (отдаёт `privacy.html` по `/privacy`), редирект `/download/*` и кэш-заголовки для ассетов. Неизвестные пути отдают 404.

## Аналитика

Vercel Web Analytics (без cookie) подключён в `src/main.tsx`. Чтобы данные пошли, включите Analytics в настройках проекта на Vercel.
