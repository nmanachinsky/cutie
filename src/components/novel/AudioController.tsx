import { useEffect, useRef } from 'react'
import manifestData from '../../content/manifest.json'
import type { Manifest } from '../../content/manifestTypes'
import { resolveAsset } from '../../content/manifestTypes'
import { assetUrl } from '../../lib/assetUrl'
import { useGameStore } from '../../store/gameStore'

const manifest = manifestData as Manifest

/** Plays the store's currentMusic (looped) and pendingSfx (one-shot). Renders nothing. */
export function AudioController() {
  const currentMusic = useGameStore((state) => state.currentMusic)
  const pendingSfx = useGameStore((state) => state.pendingSfx)
  const clearSfx = useGameStore((state) => state.clearSfx)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const lastMusicKeyRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (currentMusic === lastMusicKeyRef.current) return
    lastMusicKeyRef.current = currentMusic

    if (!musicRef.current) {
      musicRef.current = new Audio()
      musicRef.current.loop = true
    }
    const audio = musicRef.current
    const entry = resolveAsset(manifest, 'audio', currentMusic)
    if (!entry?.path) {
      audio.pause()
      return
    }
    audio.src = assetUrl(entry.path)
    audio.play().catch(() => {})
  }, [currentMusic])

  useEffect(() => {
    if (!pendingSfx) return
    const entry = resolveAsset(manifest, 'audio', pendingSfx)
    if (entry?.path) {
      new Audio(assetUrl(entry.path)).play().catch(() => {})
    }
    clearSfx()
  }, [pendingSfx, clearSfx])

  return null
}
