# Граф сцен: <НАЗВАНИЕ>

Источник правды по структуре. Обновляй при КАЖДОЙ правке связей до синхрона с JSON.

## Стартовая сцена
`start` (константа START_SCENE_ID в src/content/scenes/index.ts)

## Таблица сцен
Статус: план / написана / зарегистрирована в index.ts.

| id | Кратко | Тип | Выходы (next / choice.next) | setFlags | condition на выборах | Статус |
|----|--------|-----|-----------------------------|----------|----------------------|--------|
| start | <…> | линейная | meet | — | — | план |
| meet | развилка | choices | walk, quiet | — | — | план |
| walk | <…> | choices | hub | affection:2 | — | план |
| quiet | <…> | linear | hub | affection:0 | — | план |
| hub | схождение | choices | ending_best, ending_good, ending_calm | — | affection>=4 / affection>=2 | план |
| ending_best | концовка | ending | — | — | — | план |

## Ветки (пути от start до концовки)
1. start → meet → walk → hub → ending_best  (affection 2→…)
2. start → meet → quiet → hub → ending_calm
3. <…>

## Проверка достижимости
- [ ] Каждая сцена достижима из `start` (нет сирот).
- [ ] У каждой не-концовки есть next или choices.
- [ ] Каждая концовка лежит хотя бы на одном пути.
- [ ] Ни одна концовка не заблокирована навсегда.
- [ ] Каждый flag из condition выставлен раньше по пути.
