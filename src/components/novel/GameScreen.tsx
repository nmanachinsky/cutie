import { useState } from 'react'
import { scenes } from '../../content/scenes'
import { getAvailableChoices } from '../../engine/engine'
import type { Choice } from '../../engine/types'
import { useGameStore } from '../../store/gameStore'
import { SpriteLayer } from './SpriteLayer'
import { TextBox } from './TextBox'
import { ChoiceList } from './ChoiceList'
import { GameMenu } from './GameMenu'
import { Button } from '../ui/Button'
import styles from './GameScreen.module.css'

interface GameScreenProps {
  onOpenMenu: () => void
  onOpenHistory: () => void
  onOpenSaves: () => void
}

export function GameScreen({ onOpenMenu, onOpenHistory, onOpenSaves }: GameScreenProps) {
  const currentSceneId = useGameStore((state) => state.currentSceneId)
  const flags = useGameStore((state) => state.flags)
  const sprites = useGameStore((state) => state.sprites)
  const choose = useGameStore((state) => state.choose)
  const goToScene = useGameStore((state) => state.goToScene)

  const scene = scenes[currentSceneId]
  const [renderedSceneId, setRenderedSceneId] = useState(currentSceneId)
  const [lineIndex, setLineIndex] = useState(0)
  const [lineRevealed, setLineRevealed] = useState(false)

  // Reset line state during render on scene change: an effect would run only after
  // this render, and scene.text[lineIndex] can be out of range for the new scene.
  let currentLineIndex = lineIndex
  let currentLineRevealed = lineRevealed
  if (renderedSceneId !== currentSceneId) {
    setRenderedSceneId(currentSceneId)
    setLineIndex(0)
    setLineRevealed(false)
    currentLineIndex = 0
    currentLineRevealed = false
  }

  const isLastLine = currentLineIndex >= scene.text.length - 1
  const availableChoices = getAvailableChoices(scene, flags)
  const showChoices = isLastLine && currentLineRevealed && availableChoices.length > 0
  const canAdvance = !isLastLine || (availableChoices.length === 0 && Boolean(scene.next))

  function handleAdvanceLine() {
    if (!isLastLine) {
      setLineIndex((index) => index + 1)
      setLineRevealed(false)
      return
    }
    if (scene.next && availableChoices.length === 0) {
      goToScene(scene.next)
    }
  }

  function handleChoice(choice: Choice) {
    choose(choice.setFlags, choice.next)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.spriteRegion}>
        <SpriteLayer sprites={sprites} />
      </div>

      <GameMenu onOpenMenu={onOpenMenu} onOpenHistory={onOpenHistory} onOpenSaves={onOpenSaves} />

      <div className={styles.foreground}>
        <TextBox
          key={`${currentSceneId}-${currentLineIndex}`}
          line={scene.text[currentLineIndex]}
          onAdvance={handleAdvanceLine}
          canAdvance={canAdvance}
          onDone={() => setLineRevealed(true)}
        />

        {showChoices && <ChoiceList choices={availableChoices} onSelect={handleChoice} />}
        {scene.isEnding && isLastLine && currentLineRevealed && (
          <Button variant="primary" onClick={onOpenMenu} className={styles.endingButton}>
            Вернуться в меню
          </Button>
        )}
      </div>
    </div>
  )
}
