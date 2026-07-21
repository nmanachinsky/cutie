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
| `sprites` | `{ key, position: left/center/right }[]` | какие спрайты показаны |
| `music` | ключ из `manifest.json.audio` | фоновая музыка, зациклена, продолжает играть между сценами, если ключ не меняется |
| `sfx` | ключ из `manifest.json.audio` | разовый звук при входе в сцену |
| `setFlags` | `{ имя: число/строка/bool }` | установка переменных сюжета |
| `text` | `{ speaker?, body }[]` | реплики, показываются по одной (клик = дальше) |
| `choices` | `{ label, condition?, setFlags?, next }[]` | варианты выбора после последней реплики |
| `next` | id сцены | автопереход, если выборов нет |
| `isEnding` | bool | помечает сцену как концовку |

Фон на весь сайт один и задаётся глобально (не по сценам) — см. раздел «Фон» ниже.

`condition` — простая строка вида `"affection >= 3"` или `"affection >= 2 && metCat == true"`, без `eval`, безопасный парсер в `src/engine/condition.ts`.

## Как добавить своё действие (plugin)

Каждый тип действия — файл в `src/engine/actions/`. Чтобы добавить новый:

1. Создай `src/engine/actions/myAction.ts` с функцией `(scene, ctx) => void`.
2. Добавь новый метод в `ActionContext` (`src/engine/actions/types.ts`), если нужен новый эффект.
3. Зарегистрируй хендлер в массиве `sceneActionHandlers` (`src/engine/actions/index.ts`).

## Фон

Фон на весь сайт один — `public/assets/backgrounds/sky_daytime.png`, задаётся глобально в `src/main.tsx` (CSS-переменная `--bg-image`, используется в `src/theme/tokens.css`). Чтобы сменить фон — замени файл или поменяй путь в `main.tsx`. Per-scene фонов больше нет.

## Ассеты

Спрайты и звуки описаны в `src/content/manifest.json` (категории `sprites`, `audio`). Пока `path` у ключа пустой — спрайт просто не рисуется (без заглушки), звук не проигрывается — разработка не блокируется отсутствием файлов.

```json
"sprites": {
  "ключ": { "path": "/assets/sprites/файл.png", "description": "..." }
},
"audio": {
  "ключ": { "path": "/assets/audio/файл.mp3", "description": "..." }
}
```

Требования: только один файл-изображение на ключ в `sprites` (никаких видео/анимированных форматов), один аудиофайл на ключ в `audio`. Положи файлы в `public/assets/...` и пропиши путь вида `/assets/...` в `path`.

Список нужных ассетов для демо-главы — уже в `manifest.json`, все `path` пустые, `description` подсказывает что нарисовать/подобрать.

## Звук

`music` (сцена) — зацикленная фоновая мелодия, играет пока не сменится ключ (продолжает звучать через несколько сцен подряд с одним и тем же `music`). `sfx` — разовый звук при входе в сцену. Проигрывание реализовано в `src/components/novel/AudioController.tsx` (монтируется один раз в `App.tsx`, читает `currentMusic`/`pendingSfx` из store). Автовоспроизведение музыки начинается по клику «Новая игра»/«Загрузить» — это пользовательский жест, браузеры не блокируют.

## Сохранения

Несколько именованных слотов + журнал истории реплик — модалка «Сохранить» в игре. Хранится в `localStorage` под ключом `novel-saves`, переживает перезагрузку страницы.

## PWA

`pnpm build` генерирует `manifest.webmanifest` и service worker — сайт можно установить на телефон как приложение («Добавить на главный экран» / «Установить»). Иконки — `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png` (для iOS), тема — `#6a9bea`.
