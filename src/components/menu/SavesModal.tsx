import { Modal } from '../ui/Modal'
import { Tabs } from '../ui/Tabs'
import { Button } from '../ui/Button'
import { useGameStore } from '../../store/gameStore'
import styles from './SavesModal.module.css'

interface SavesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SavesModal({ isOpen, onClose }: SavesModalProps) {
  const saves = useGameStore((state) => state.saves)
  const saveToSlot = useGameStore((state) => state.saveToSlot)
  const loadFromSlot = useGameStore((state) => state.loadFromSlot)
  const deleteSlot = useGameStore((state) => state.deleteSlot)
  const goToMenu = useGameStore((state) => state.goToMenu)

  function handleSaveNewSlot() {
    const slotId = crypto.randomUUID()
    const name = new Date().toLocaleString('ru-RU')
    saveToSlot(slotId, name)
    onClose()
    goToMenu()
  }

  function handleLoad(slotId: string) {
    loadFromSlot(slotId)
    onClose()
  }

  const slots = Object.entries(saves).sort(([, a], [, b]) => b.savedAt - a.savedAt)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Сохранения">
      <Tabs defaultValue="save">
        <Tabs.List>
          <Tabs.Trigger value="save">Сохранить</Tabs.Trigger>
          <Tabs.Trigger value="load">Загрузить</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Panel value="save">
          <Button variant="primary" onClick={handleSaveNewSlot}>
            Сохранить в новый слот
          </Button>
        </Tabs.Panel>

        <Tabs.Panel value="load">
          {slots.length === 0 && <p className={styles.empty}>Пока нет сохранений</p>}
          {slots.map(([slotId, slot]) => (
            <div key={slotId} className={styles.slot}>
              <span>{slot.name}</span>
              <div className={styles.slotActions}>
                <Button variant="outline" onClick={() => handleLoad(slotId)}>
                  Загрузить
                </Button>
                <Button variant="outline" onClick={() => deleteSlot(slotId)}>
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </Tabs.Panel>
      </Tabs>
    </Modal>
  )
}
