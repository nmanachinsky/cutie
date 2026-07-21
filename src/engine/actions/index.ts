import type { ActionHandler } from './types'
import { applyBackground } from './background'
import { applySprites } from './sprite'
import { applyMusic } from './bgm'
import { applySfx } from './sfx'
import { applySetFlags } from './flags'

export type { ActionContext, ActionHandler } from './types'

/** Registry of scene-enter handlers. Add a new action type: create a handler file, push it here. */
export const sceneActionHandlers: ActionHandler[] = [
  applyBackground,
  applySprites,
  applyMusic,
  applySfx,
  applySetFlags,
]
