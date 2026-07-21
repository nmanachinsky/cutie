import type { ActionHandler } from './types'

export const applySfx: ActionHandler = (scene, ctx) => {
  if (scene.sfx) ctx.playSfx(scene.sfx)
}
