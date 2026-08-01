# GetBoxLanding

Лендинг для [GetBox](https://github.com/IncludeSpecial/GetBox).

Vite + React + TypeScript.  
Репо: [IncludeSpecial/GetBoxLanding](https://github.com/IncludeSpecial/GetBoxLanding)

## Запуск

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Релизы

Бинарники лежат в **GitHub Releases** репо GetBox.  
Лендинг на Vercel только ссылается на них.

Формат URL:

```
https://github.com/IncludeSpecial/GetBox/releases/download/v{VERSION}/{FILENAME}
```

Пример: тег `v1.1.0`, файл `GetBox-1.1.0-portable.exe`.

Новый релиз:

1. Собрать portable exe в GetBox
2. Создать Release в GetBox с тегом `vX.Y.Z` и прикрепить exe
3. Добавить запись в `RELEASES` в [`src/config.ts`](src/config.ts)
4. Запушить GetBoxLanding — Vercel подтянет сайт

Актуальная версия на сайте — по semver из `RELEASES`.

## Настройка

[`src/config.ts`](src/config.ts) — `GITHUB_*`, `RELEASES`.  
[`src/i18n.ts`](src/i18n.ts) — тексты RU/EN.

## Ассеты сайта

`public/screenshots/`, `public/icons/` — картинки лендинга.  
Exe в `public/download/` не нужны.

## Vercel

1. Import `IncludeSpecial/GetBoxLanding`
2. Framework: Vite (или Other), build `npm run build`, output `dist`
3. Домен — в настройках проекта

`base` в Vite не нужен (сайт в корне домена).
