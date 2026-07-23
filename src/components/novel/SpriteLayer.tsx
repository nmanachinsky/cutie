import { AnimatePresence, motion } from 'framer-motion'
import type { SpriteInstance, SpritePosition } from '../../engine/types'
import { PlaceholderImage } from './PlaceholderImage'
import styles from './SpriteLayer.module.css'

const POSITION_ORDER: SpritePosition[] = ['left', 'center', 'right']

interface SpriteLayerProps {
  sprites: SpriteInstance[]
}

export function SpriteLayer({ sprites }: SpriteLayerProps) {
  // Columns = the distinct positions actually in play this scene, left-to-right,
  // not a fixed 3-way split. One sprite gets one full-width column; two share
  // a 50/50 grid; three get thirds — always in left/center/right order,
  // regardless of the order scenes list them in.
  const columns = POSITION_ORDER.filter((pos) => sprites.some((sprite) => sprite.position === pos))

  return (
    <div className={styles.layer} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
      <AnimatePresence>
        {sprites.map((sprite) => (
          <motion.div
            key={sprite.key + sprite.position}
            className={styles.slot}
            // gridRow pinned: an out-of-order sprite list would otherwise make CSS grid auto-placement drop a column into an implicit (short) second row.
            style={{ gridColumn: columns.indexOf(sprite.position) + 1, gridRow: 1 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <PlaceholderImage assetKey={sprite.key} className={styles.image} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
