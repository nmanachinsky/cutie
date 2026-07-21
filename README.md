# Облачное утро

Интерактивная новелла (SPA + PWA) с ветвящимся сюжетом, несколькими концовками и плагин-системой для контента.

## Запуск

```bash
pnpm install
pnpm dev      # разработка
pnpm build    # прод-сборка + PWA (manifest, service worker)
```

## Как добавить свою сцену

1. Создай JSON-файл в `src/content/scenes/`, например `src/content/scenes/my_scene.json`:

```json
{
  "id": "my_scene",
  "background": "some_background_key",
  "sprites": [{ "key": "cinnamoroll_happy", "position": "center" }],
  "music": "bgm_theme",
  "text": [
    { "speaker": "Cinnamoroll", "body": "Привет!" }
  ],
  "choices": [
    { "label": "Ответить", "setFlags": { "affection": 3 }, "next": "another_scene" }
  ]
}
```

2. Зарегистрируй её в `src/content/scenes/index.ts` — импортируй файл и добавь одну строку в объект `scenes`.

### Поля сцены

| Поле | Тип | Действие |
|---|---|---|
| `background` | ключ из `manifest.json.backgrounds` | смена фона с кроссфейдом |
| `sprites` | `{ key, position: left/center/right }[]` | какие спрайты показаны |
| `music` | ключ из `manifest.json.audio` | фоновая музыка |
| `sfx` | ключ из `manifest.json.audio` | разовый звук при входе в сцену |
| `setFlags` | `{ имя: число/строка/bool }` | установка переменных сюжета |
| `text` | `{ speaker?, body }[]` | реплики, показываются по одной (клик = дальше) |
| `choices` | `{ label, condition?, setFlags?, next }[]` | варианты выбора после последней реплики |
| `next` | id сцены | автопереход, если выборов нет |
| `isEnding` | bool | помечает сцену как концовку |

`condition` — простая строка вида `"affection >= 3"` или `"affection >= 2 && metCat == true"`, без `eval`, безопасный парсер в `src/engine/condition.ts`.

## Как добавить своё действие (plugin)

Каждый тип действия — файл в `src/engine/actions/`. Чтобы добавить новый:

1. Создай `src/engine/actions/myAction.ts` с функцией `(scene, ctx) => void`.
2. Добавь новый метод в `ActionContext` (`src/engine/actions/types.ts`), если нужен новый эффект.
3. Зарегистрируй хендлер в массиве `sceneActionHandlers` (`src/engine/actions/index.ts`).

## Ассеты

Единственное место с картинками/звуками — `src/content/manifest.json`. Пока `path` пустой, движок рисует цветной placeholder с описанием — разработка не блокируется отсутствием файлов.

```json
"backgrounds": {
  "ключ": { "path": "/assets/backgrounds/файл.jpg", "description": "..." }
}
```

Требования: только один файл-изображение на ключ в `backgrounds`/`sprites` (никаких видео/анимированных форматов), аудиофайл на ключ в `audio`. Положи файлы в `public/assets/...` и пропиши путь вида `/assets/...` в `path`.

Список нужных ассетов для демо-главы — уже в `manifest.json`, все `path` пустые, `description` подсказывает что нарисовать/подобрать.

## Сохранения

Несколько именованных слотов + журнал истории реплик — модалка «Сохранить» в игре. Хранится в `localStorage` под ключом `novel-saves`, переживает перезагрузку страницы.

## PWA

`pnpm build` генерирует `manifest.webmanifest` и service worker — сайт можно установить на телефон как приложение («Добавить на главный экран»). Иконка — `public/icon.svg`, тема — `#a9d0f0`.
