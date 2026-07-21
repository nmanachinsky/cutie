import type { Scene } from '../../engine/types'
import start from './start.json'
import meet from './meet.json'
import walk from './walk.json'
import quiet from './quiet.json'
import endingBest from './ending_best.json'
import endingGood from './ending_good.json'
import endingCalm from './ending_calm.json'

/** Scene registry — add a new chapter by adding a JSON file and one line here. */
export const scenes: Record<string, Scene> = {
  start: start as Scene,
  meet: meet as Scene,
  walk: walk as Scene,
  quiet: quiet as Scene,
  ending_best: endingBest as Scene,
  ending_good: endingGood as Scene,
  ending_calm: endingCalm as Scene,
}

export const START_SCENE_ID = 'start'
