import { useState } from 'react'
import { useGameStore } from './store/gameStore'
import { MainMenu } from './components/menu/MainMenu'
import { GameScreen } from './components/novel/GameScreen'
import { HistoryModal } from './components/menu/HistoryModal'
import { SavesModal } from './components/menu/SavesModal'
import { AmbientParticles } from './components/novel/AmbientParticles'
import styles from './App.module.css'

function App() {
  const screen = useGameStore((state) => state.screen)
  const goToMenu = useGameStore((state) => state.goToMenu)
  const [isHistoryOpen, setHistoryOpen] = useState(false)
  const [isSavesOpen, setSavesOpen] = useState(false)

  return (
    <div className={styles.app}>
      <AmbientParticles />
      {screen === 'menu' && <MainMenu onOpenSaves={() => setSavesOpen(true)} />}
      {screen === 'game' && (
        <GameScreen
          onOpenMenu={goToMenu}
          onOpenHistory={() => setHistoryOpen(true)}
          onOpenSaves={() => setSavesOpen(true)}
        />
      )}

      <HistoryModal isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} />
      <SavesModal isOpen={isSavesOpen} onClose={() => setSavesOpen(false)} />
    </div>
  )
}

export default App
