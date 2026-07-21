import type { ActionHandler } from './types'

export const applySprites: ActionHandler = (scene, ctx) => {
  ctx.setSprites(scene.sprites ?? [])
}
