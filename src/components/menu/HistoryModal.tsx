import { Modal } from '../ui/Modal'
import { useGameStore } from '../../store/gameStore'
import styles from './HistoryModal.module.css'

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const history = useGameStore((state) => state.history)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="История">
      <div className={styles.list}>
        {history.map((entry, index) => (
          <p key={index} className={styles.entry}>
            {entry.speaker && <span className={styles.speaker}>{entry.speaker}: </span>}
            {entry.body}
          </p>
        ))}
      </div>
    </Modal>
  )
}
