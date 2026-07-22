import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { useGameStore } from '../../store/gameStore'
import styles from './MainMenu.module.css'

interface MainMenuProps {
  onOpenSaves: () => void
}

export function MainMenu({ onOpenSaves }: MainMenuProps) {
  const startNewGame = useGameStore((state) => state.startNewGame)
  const hasSaves = useGameStore((state) => Object.keys(state.saves).length > 0)

  return (
    <div className={styles.menu}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        Морошковый свет
      </motion.h1>
      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Button variant="primary" onClick={startNewGame}>
          Новая игра
        </Button>
        <Button variant="secondary" onClick={onOpenSaves} disabled={!hasSaves}>
          Загрузить
        </Button>
      </motion.div>
    </div>
  )
}
