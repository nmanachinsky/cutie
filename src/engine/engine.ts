import type { Choice, FlagValue, Scene } from './types'
import type { ActionContext } from './actions'
import { sceneActionHandlers } from './actions'
import { evaluateCondition } from './condition'

/** Runs every registered action handler for a scene's entry effects (background, sprites, music, sfx, flags). */
export function enterScene(scene: Scene, ctx: ActionContext): void {
  for (const handler of sceneActionHandlers) {
    handler(scene, ctx)
  }
}

export function getAvailableChoices(scene: Scene, flags: Record<string, FlagValue>): Choice[] {
  if (!scene.choices) return []
  return scene.choices.filter((choice) => evaluateCondition(choice.condition, flags))
}
