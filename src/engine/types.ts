export type FlagValue = number | boolean | string

export type SpritePosition = 'left' | 'center' | 'right'

export interface SpriteInstance {
  key: string
  position: SpritePosition
  expression?: string
}

export interface DialogueLine {
  speaker?: string
  body: string
}

export interface Choice {
  label: string
  condition?: string
  setFlags?: Record<string, FlagValue>
  next: string
}

export interface Scene {
  id: string
  music?: string
  sprites?: SpriteInstance[]
  text: DialogueLine[]
  sfx?: string
  setFlags?: Record<string, FlagValue>
  choices?: Choice[]
  next?: string
  isEnding?: boolean
}
