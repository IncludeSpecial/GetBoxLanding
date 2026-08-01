# GetBoxLanding

Лендинг для [GetBox](https://github.com/IncludeSpecial/GetBox) — локальный магазин программ для Windows.

Vite + React + TypeScript.  
Репозиторий: [IncludeSpecial/GetBoxLanding](https://github.com/IncludeSpecial/GetBoxLanding)

## Запуск

```bash
npm install
npm run dev
```

```bash
npm run build    # → dist/
npm run preview  # локальный просмотр сборки
```

## Настройка

[`src/config.ts`](src/config.ts) — релизы и ссылки:

- `GITHUB_URL` → `https://github.com/IncludeSpecial/GetBox`
- `RELEASES` — версии, URL скачивания, размер, дата, заметки RU/EN  
  Актуальная версия берётся по semver.

Тексты: [`src/i18n.ts`](src/i18n.ts) (RU/EN).

## Файлы

| Путь | Что лежит |
|------|-----------|
| `public/screenshots/` | скрины UI |
| `public/icons/` | SVG иконок |
| `public/download/` | portable `.exe` (в git не коммитятся) |

Новый релиз: файл в `public/download/` + запись в `RELEASES`.

## Деплой

Сборка — static `dist/`. Для GitHub Pages:

```ts
// vite.config.ts
base: '/GetBoxLanding/',
```

Сайт: `https://getbox.ne-nas-ru/`
