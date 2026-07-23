import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DialogueLine } from '../../engine/types'
import { useTypewriter } from '../../hooks/useTypewriter'
import styles from './TextBox.module.css'

interface TextBoxProps {
  line: DialogueLine
  onAdvance: () => void
  canAdvance: boolean
  onDone?: () => void
}

export function TextBox({ line, onAdvance, canAdvance, onDone }: TextBoxProps) {
  const { displayed, isDone, finish } = useTypewriter(line.body)

  useEffect(() => {
    if (isDone) onDone?.()
  }, [isDone, onDone])

  function handleClick() {
    if (!isDone) {
      finish()
      return
    }
    if (canAdvance) onAdvance()
  }

  return (
    <motion.div
      className={styles.box}
      onClick={handleClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {line.speaker && <span className={styles.speaker}>{line.speaker}</span>}
      <div className={styles.bodyWrap}>
        {/* Sized to the final line text so the box's height (and thus the sprite
            region above it) is stable from the first frame, instead of growing
            line-by-line as the typewriter reveals characters. */}
        <p className={styles.bodyGhost} aria-hidden="true">
          {line.body}
        </p>
        <p className={styles.body}>{displayed}</p>
      </div>
      {isDone && canAdvance && <span className={styles.hint}>▾ нажми, чтобы продолжить</span>}
    </motion.div>
  )
}
