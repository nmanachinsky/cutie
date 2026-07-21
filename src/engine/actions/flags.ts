import type { ActionHandler } from './types'

export const applySetFlags: ActionHandler = (scene, ctx) => {
  if (scene.setFlags) ctx.setFlags(scene.setFlags)
}
