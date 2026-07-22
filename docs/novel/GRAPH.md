# Граф сцен: Морошковый свет

Источник правды по структуре. Обновлять при КАЖДОЙ правке связей.

## Стартовая сцена
`start` (START_SCENE_ID в src/content/scenes/index.ts)

## Таблица сцен
Тип: линейная (next) / развилка (choices) / концовка (isEnding).

| id | Кратко | Тип | Выходы | setFlags (сцена/выбор) | condition на выборах | Статус |
|----|--------|-----|--------|------------------------|----------------------|--------|
| start | вечер дома, усталость, сон | линейная | awake | — | — | готово |
| awake | пробуждение на мху, серое небо | линейная | nicole_meet | — | — | готово |
| nicole_meet | голос в сознании, Николь | линейная | nicole_explain | — | — | готово |
| nicole_explain | Тихолесье, Хмарь, книжечка-грим-определитель | развилка | nicole_reassure, nicole_glad | — | — | готово |
| nicole_reassure | «я же обычная» → ответ Николь | линейная | hut_road | — | — | готово |
| nicole_glad | «веди» → Николь улыбается | линейная | hut_road | — | — | готово |
| hut_road | тропа, запах корицы; крюк к грибу | развилка | shroom_a, hut_arrive | choice: shroomA=true | — | готово |
| shroom_a | гриб-громуар по книжечке | линейная | hut_arrive | — | — | готово |
| hut_arrive | избушка-пекарня Синнаморолла | линейная | hut_rest | — | — | готово |
| hut_rest | WARMTH CP1: чай или спешка | развилка | hut_tea, hut_hurry | choice: warmth=1 | — | готово |
| hut_tea | тёплый чай, корица-оберег | линейная | swamp_road | — | — | готово |
| hut_hurry | ушла без отдыха, Николь замечает | линейная | swamp_road | — | — | готово |
| swamp_road | тропа вниз, туман | линейная | swamp_scream | — | — | готово |
| swamp_scream | крик кикиморы | линейная | kuromi_meet | — | — | готово |
| kuromi_meet | Куроми; VOICE CP1: как ответить | развилка | kikimora_calm, kikimora_retreat, kikimora_shoutback | choice: voice=1 | — | готово |
| kikimora_calm | Тихоня осеклась | линейная | kikimora_story_offer | — | — | готово |
| kikimora_retreat | обход; Тихоня догоняет тише | линейная | kikimora_story_offer | — | — | готово |
| kikimora_shoutback | эхо втройне, все в тине (комично) | линейная | kikimora_story_offer | — | — | готово |
| kikimora_story_offer | выслушать её? | развилка | kikimora_story, swamp_gift | choice: echoHeard=true | — | готово |
| kikimora_story | история Тихони: Хмарь съела голоса лягушек | линейная | swamp_gift | — | — | готово |
| swamp_gift | болотный огонёк; гриб рядом | развилка | swamp_shroom, fog_road | choice: shroomB=true | — | готово |
| swamp_shroom | гриб-ворчун по книжечке | линейная | fog_road | — | — | готово |
| fog_road | туман плотнеет, здание из тумана | линейная | office_enter | — | — | готово |
| office_enter | Контора Тумана, свитки переписывают себя | линейная | miya_meet | — | — | готово |
| miya_meet | Мия; VOICE CP2: потребовать обещанное | развилка | boss_scene ×2, office_leave | choice: voice=1 / voice=2 | voice == 0 / voice >= 1 | готово |
| boss_scene | требование у Начальника Тумана, светлячки выданы | линейная | office_leave | — | — | готово |
| office_leave | выход, светлячок-проводник от Мии | линейная | pollen_field | — | — | готово |
| pollen_field | серое поле пыльцы, дар чувствовать; WARMTH CP2 | развилка | mymelody_help ×2, pollen_pushthrough | choice: warmth=1 / warmth=2 | warmth == 0 / warmth >= 1 | готово |
| mymelody_help | Май Мелоди, платок, тропа морошки | линейная | shop_road | — | — | готово |
| pollen_pushthrough | напролом, чихание до звёзд, Куроми вытаскивает | линейная | shop_road | — | — | готово |
| shop_road | лавка сороки на опушке | развилка | shop_enter, lake_road | — | — | готово |
| shop_enter | Чара, сокровища из-за грани | развилка | cup_scene, shop_shroom, lake_road | choice: shroomC=true | — | готово |
| cup_scene | стаканчик «ждал тебя», обмен на историю | линейная | shop_shroom_offer | сцена: cupFound=true | — | готово |
| shop_shroom_offer | гриб на полке? | развилка | shop_shroom, lake_road | choice: shroomC=true | — | готово |
| shop_shroom | гриб-солнышко по книжечке | линейная | shop_cup_offer | — | — | готово |
| shop_cup_offer | спросить про стаканчик? | развилка | cup_scene_late, lake_road | — | cupFound != true (на выборе про стаканчик) | готово |
| cup_scene_late | стаканчик (поздний вариант сцены) | линейная | lake_road | сцена: cupFound=true | — | готово |
| lake_road | вечерний берег, луна поднимается | линейная | lake_spirit | — | — | готово |
| lake_spirit | дух Онего и Марфа у костра | линейная | moon_night | — | — | готово |
| moon_night | луна тяжёлая; WARMTH CP3 | развилка | fire_rest ×3, night_march | choice: warmth=1/2/3 | warmth == 0 / == 1 / == 2 | готово |
| fire_rest | костёр, отвар, тёплый камень, слова Марфы | линейная | dawn_approach | — | — | готово |
| night_march | пошла сквозь ночь, Николь останавливает | линейная | dawn_approach | — | — | готово |
| dawn_approach | предрассветный берег, стена Хмари, все спутники | линейная | name_moment | — | — | готово |
| name_moment | VOICE CP3: сказать желание вслух | развилка | hub_clearing ×4 | choice: voice=1/2/3 | voice == 0 / == 1 / == 2 (+ безусловный «прошептать») | готово |
| hub_clearing | Поляна Рассвета: секретки + рассвет | развилка | ending_true, ending_lantern, ending_shroom, gate | — | v>=3&&w>=3&&cupFound / echoHeard / shroomA&&shroomB&&shroomC | готово |
| gate | «Встретить утро» ×4 | развилка | ending_dawn, ending_voice, ending_warmth, ending_mist | — | v>=2&&w>=2 / v>=2&&w<=1 / v<=1&&w>=2 / v<=1&&w<=1 | готово |
| ending_dawn | Рассвет над Онего | концовка | — | — | — | готово |
| ending_voice | Громкая тишина | концовка | — | — | — | готово |
| ending_warmth | Тёплый плед | концовка | — | — | — | готово |
| ending_mist | Утро ещё будет | концовка | — | — | — | готово |
| ending_true | Ты уже достаточная (секрет) | концовка | — | — | — | готово |
| ending_lantern | Фонарик на болоте (секрет) | концовка | — | — | — | готово |
| ending_shroom | Морошковая королева (секрет) | концовка | — | — | — | готово |

Итого: 53 сцены, из них 7 концовок.

## Ветки (репрезентативные пути)
1. Истинная: start → awake → nicole_meet → nicole_explain → nicole_glad → hut_road(гриб) →
   shroom_a → hut_arrive → hut_rest(чай, w1) → hut_tea → swamp_road → swamp_scream →
   kuromi_meet(спокойно, v1) → kikimora_calm → kikimora_story_offer(слушать, echo) →
   kikimora_story → swamp_gift(гриб B) → swamp_shroom → fog_road → office_enter →
   miya_meet(требовать, v2) → boss_scene → office_leave → pollen_field(платок, w2) →
   mymelody_help → shop_road(зайти) → shop_enter(стаканчик) → cup_scene →
   shop_shroom_offer(гриб C) → shop_shroom → shop_cup_offer(к озеру) → lake_road →
   lake_spirit → moon_night(костёр, w3) → fire_rest → dawn_approach → name_moment(вслух, v3) →
   hub_clearing(стаканчик) → ending_true
2. Худший-мягкий: … все «отказные» выборы … → gate → ending_mist (voice 0, warmth 0)
3. Голос без тепла: v-выборы да, w-выборы нет → gate → ending_voice
4. Тепло без голоса: w-да, v-нет → gate → ending_warmth
5. Фонарик: любой путь с echoHeard → hub_clearing → ending_lantern
6. Королева: shroomA+B+C → hub_clearing → ending_shroom
7. Рассвет: v>=2 && w>=2 (например v2+w2 без третьих чекпоинтов… третьи чекпоинты
   обязательные сцены, но выбор отказной) → gate → ending_dawn

## Проверка достижимости
- [x] Каждая сцена достижима из `start` (нет сирот).
- [x] У каждой не-концовки есть next или choices.
- [x] Каждая концовка лежит хотя бы на одном пути.
- [x] Ни одна концовка не заблокирована навсегда.
- [x] Каждый flag из condition выставлен раньше по пути.
- [x] Условия в gate взаимоисключающие и покрывают все комбинации.
