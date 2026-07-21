import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlagValue, SpriteInstance } from '../engine/types'
import { scenes, START_SCENE_ID } from '../content/scenes'
import { enterScene } from '../engine/engine'

export interface HistoryEntry {
  sceneId: string
  speaker?: string
  body: string
}

export interface SaveSlot {
  name: string
  sceneId: string
  flags: Record<string, FlagValue>
  history: HistoryEntry[]
  savedAt: number
}

interface GameState {
  screen: 'menu' | 'game'
  currentSceneId: string
  flags: Record<string, FlagValue>
  history: HistoryEntry[]
  sprites: SpriteInstance[]
  currentMusic: string | undefined
  pendingSfx: string | undefined
  saves: Record<string, SaveSlot>

  startNewGame: () => void
  goToMenu: () => void
  goToScene: (sceneId: string) => void
  choose: (setFlags: Record<string, FlagValue> | undefined, next: string) => void
  clearSfx: () => void
  saveToSlot: (slotId: string, name: string) => void
  loadFromSlot: (slotId: string) => void
  deleteSlot: (slotId: string) => void
}

function loadScene(sceneId: string, flags: Record<string, FlagValue>) {
  const scene = scenes[sceneId]
  let nextSprites: SpriteInstance[] = []
  let nextMusic: string | undefined
  let nextSfx: string | undefined
  let mergedFlags = flags

  enterScene(scene, {
    setSprites: (sprites) => {
      nextSprites = sprites
    },
    playMusic: (key) => {
      nextMusic = key
    },
    playSfx: (key) => {
      nextSfx = key
    },
    setFlags: (newFlags) => {
      mergedFlags = { ...mergedFlags, ...newFlags }
    },
  })

  return { scene, nextSprites, nextMusic, nextSfx, mergedFlags }
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: 'menu',
      currentSceneId: START_SCENE_ID,
      flags: {},
      history: [],
      sprites: [],
      currentMusic: undefined,
      pendingSfx: undefined,
      saves: {},

      startNewGame: () => {
        const { scene, nextSprites, nextMusic, nextSfx, mergedFlags } = loadScene(START_SCENE_ID, {})
        set({
          screen: 'game',
          currentSceneId: START_SCENE_ID,
          flags: mergedFlags,
          history: scene.text.map((line) => ({ sceneId: scene.id, ...line })),
          sprites: nextSprites,
          currentMusic: nextMusic,
          pendingSfx: nextSfx,
        })
      },

      goToMenu: () => set({ screen: 'menu' }),

      goToScene: (sceneId) => {
        const { flags, history } = get()
        const { scene, nextSprites, nextMusic, nextSfx, mergedFlags } = loadScene(sceneId, flags)
        set({
          currentSceneId: sceneId,
          flags: mergedFlags,
          history: [...history, ...scene.text.map((line) => ({ sceneId: scene.id, ...line }))],
          sprites: nextSprites,
          currentMusic: nextMusic,
          pendingSfx: nextSfx,
        })
      },

      choose: (setFlags, next) => {
        if (setFlags) set((state) => ({ flags: { ...state.flags, ...setFlags } }))
        get().goToScene(next)
      },

      clearSfx: () => set({ pendingSfx: undefined }),

      saveToSlot: (slotId, name) => {
        const { currentSceneId, flags, history } = get()
        set((state) => ({
          saves: {
            ...state.saves,
            [slotId]: { name, sceneId: currentSceneId, flags, history, savedAt: Date.now() },
          },
        }))
      },

      loadFromSlot: (slotId) => {
        const slot = get().saves[slotId]
        if (!slot) return
        const { nextSprites, nextMusic } = loadScene(slot.sceneId, slot.flags)
        set({
          screen: 'game',
          currentSceneId: slot.sceneId,
          flags: slot.flags,
          history: slot.history,
          sprites: nextSprites,
          currentMusic: nextMusic,
          pendingSfx: undefined,
        })
      },

      deleteSlot: (slotId) => {
        set((state) => {
          const rest = { ...state.saves }
          delete rest[slotId]
          return { saves: rest }
        })
      },
    }),
    {
      name: 'novel-saves',
      partialize: (state) => ({ saves: state.saves }),
    },
  ),
)
