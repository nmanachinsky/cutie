import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './GameMenu.module.css'

interface GameMenuProps {
  onOpenMenu: () => void
  onOpenHistory: () => void
  onOpenSaves: () => void
}

export function GameMenu({ onOpenMenu, onOpenHistory, onOpenSaves }: GameMenuProps) {
  const [isOpen, setOpen] = useState(false)

  function runAndClose(action: () => void) {
    setOpen(false)
    action()
  }

  return (
    <>
      <motion.button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span />
        <span />
        <span />
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className={styles.panel}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <img src="/assets/ui/menu-illustration.png" alt="" className={styles.illustration} />

                <div className={styles.items}>
                  <button type="button" className={styles.item} onClick={() => runAndClose(onOpenMenu)}>
                    <img src="/assets/ui/icon-menu.png" alt="" className={styles.icon} />
                    <span className={styles.label}>Меню</span>
                    <span className={styles.chevron}>›</span>
                  </button>
                  <button type="button" className={styles.item} onClick={() => runAndClose(onOpenHistory)}>
                    <img src="/assets/ui/icon-history.png" alt="" className={styles.icon} />
                    <span className={styles.label}>История</span>
                    <span className={styles.chevron}>›</span>
                  </button>
                  <button type="button" className={styles.item} onClick={() => runAndClose(onOpenSaves)}>
                    <img src="/assets/ui/icon-save.png" alt="" className={styles.icon} />
                    <span className={styles.label}>Сохранить</span>
                    <span className={styles.chevron}>›</span>
                  </button>
                </div>

                <img src="/assets/ui/menu-bottom.png" alt="" className={styles.bottomDecor} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
