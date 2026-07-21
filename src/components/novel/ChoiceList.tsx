import { motion } from 'framer-motion'
import type { Choice } from '../../engine/types'
import styles from './ChoiceList.module.css'

interface ChoiceListProps {
  choices: Choice[]
  onSelect: (choice: Choice) => void
}

export function ChoiceList({ choices, onSelect }: ChoiceListProps) {
  return (
    <div className={styles.list}>
      {choices.map((choice, index) => (
        <motion.button
          key={choice.label}
          type="button"
          className={styles.choice}
          onClick={() => onSelect(choice)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {choice.label}
        </motion.button>
      ))}
    </div>
  )
}
