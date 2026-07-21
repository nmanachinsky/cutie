import type { ActionHandler } from './types'

export const applyMusic: ActionHandler = (scene, ctx) => {
  ctx.playMusic(scene.music)
}
