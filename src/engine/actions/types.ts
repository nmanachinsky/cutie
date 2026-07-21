import type { FlagValue, Scene, SpriteInstance } from '../types'

/** Context handlers mutate through — implemented by the game store. New action handlers only need these setters. */
export interface ActionContext {
  setSprites: (sprites: SpriteInstance[]) => void
  playMusic: (key: string | undefined) => void
  playSfx: (key: string | undefined) => void
  setFlags: (flags: Record<string, FlagValue>) => void
}

export type ActionHandler = (scene: Scene, ctx: ActionContext) => void
