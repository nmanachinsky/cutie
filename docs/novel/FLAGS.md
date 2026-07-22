# Реестр флагов: Морошковый свет

setFlags — АБСОЛЮТНОЕ присваивание. Шкалы наращиваются через дублированные варианты
выбора со взаимоисключающими условиями (`voice == 0` → ставим 1; `voice == 1` → ставим 2 …) —
виден всегда ровно один вариант. condition: только сравнения и `&&`.

## Флаги
| Флаг | Тип | Назначение | Где выставляется | Где читается |
|------|-----|-----------|------------------|--------------|
| voice | number 0–3 | шкала «голос» (отстаивать себя) | CP1 kuromi_meet: choice «спокойно и твёрдо» → 1; CP2 miya_meet: «потребовать обещанное» (==0→1, ==1→2); CP3 name_moment: «сказать вслух» (==0→1, ==1→2, ==2→3) | gate: развод 4 основных концовок; hub_clearing: секрет ending_true |
| warmth | number 0–3 | шкала «тепло» (забота о себе) | CP1 hut_rest: «остаться на чай» → 1; CP2 pollen_field: «принять платок» (==0→1, ==1→2); CP3 moon_night: «остаться у костра» (==0→1, ==1→2, ==2→3) | gate; hub_clearing: секрет ending_true |
| cupFound | boolean | звёздный стаканчик найден | cup_scene / cup_scene_late (лавка Чары) | hub_clearing: секрет ending_true; shop_cup_offer: скрыть повторное предложение (cupFound != true) |
| echoHeard | boolean | выслушала историю Тихони | kikimora_story_offer: choice «выслушать» | hub_clearing: секрет ending_lantern |
| shroomA | boolean | гриб-громуар (лесная тропа) | hut_road: choice «свернуть к грибу» | hub_clearing: секрет ending_shroom (в связке &&) |
| shroomB | boolean | гриб-ворчун (болото) | swamp_gift: choice «свериться с книжечкой» | hub_clearing: секрет ending_shroom |
| shroomC | boolean | гриб-солнышко (лавка) | shop_enter или shop_shroom_offer: choice «гриб на полке» | hub_clearing: секрет ending_shroom |

## Пороги концовок
Сцена `gate` — 4 выбора с одинаковым лейблом «Встретить утро», условия взаимоисключающие
и покрывают все комбинации (voice 0–3, warmth 0–3):
- ending_dawn:   voice >= 2 && warmth >= 2
- ending_voice:  voice >= 2 && warmth <= 1
- ending_warmth: voice <= 1 && warmth >= 2
- ending_mist:   voice <= 1 && warmth <= 1

Сцена `hub_clearing` — скрытые выборы (секретки) + безусловный «Шагнуть в рассвет» → gate:
- ending_true:    voice >= 3 && warmth >= 3 && cupFound
- ending_lantern: echoHeard
- ending_shroom:  shroomA && shroomB && shroomC

## Максимумы (проверка достижимости истинной концовки)
voice 3 = kuromi_meet(«спокойно») + miya_meet(«потребовать») + name_moment(«вслух»).
warmth 3 = hut_rest(«чай») + pollen_field(«платок») + moon_night(«костёр»).
cupFound совместим с обоими: лавка на обязательном пути (shop_road), выбор «заглянуть».
Один прогон может собрать voice 3 + warmth 3 + cup + все 3 гриба + echoHeard — конфликтов нет.

## Отложенные последствия
- shroomA (акт 1) читается только в hub_clearing (финал) — ранний крюк вознаграждается в конце.
- echoHeard (акт 2) открывает секретку в финале.
- cupFound (акт 3) — ключ истинной концовки.

## Инвариант
Каждый флаг выставляется до точки чтения хотя бы на одном пути; каждый читается хотя бы
одним condition. Лишних флагов нет.
