import type { ActionHandler } from './types'

export const applyBackground: ActionHandler = (scene, ctx) => {
  ctx.setBackground(scene.background)
}
