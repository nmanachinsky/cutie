import { useEffect, useState } from 'react'
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
  const [lineIndex, setLineIndex] = useState(0)
  const [lineRevealed, setLineRevealed] = useState(false)

  useEffect(() => {
    setLineIndex(0)
    setLineRevealed(false)
  }, [currentSceneId])

  const isLastLine = lineIndex >= scene.text.length - 1
  const availableChoices = getAvailableChoices(scene, flags)
  const showChoices = isLastLine && lineRevealed && availableChoices.length > 0
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
      <SpriteLayer sprites={sprites} />

      <GameMenu onOpenMenu={onOpenMenu} onOpenHistory={onOpenHistory} onOpenSaves={onOpenSaves} />

      <div className={styles.foreground}>
        <TextBox
          key={`${currentSceneId}-${lineIndex}`}
          line={scene.text[lineIndex]}
          onAdvance={handleAdvanceLine}
          canAdvance={canAdvance}
          onDone={() => setLineRevealed(true)}
        />

        {showChoices && <ChoiceList choices={availableChoices} onSelect={handleChoice} />}
        {scene.isEnding && isLastLine && lineRevealed && (
          <Button variant="primary" onClick={onOpenMenu} className={styles.endingButton}>
            Вернуться в меню
          </Button>
        )}
      </div>
    </div>
  )
}
