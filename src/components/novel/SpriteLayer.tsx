import { AnimatePresence, motion } from 'framer-motion'
import type { SpriteInstance } from '../../engine/types'
import { PlaceholderImage } from './PlaceholderImage'
import styles from './SpriteLayer.module.css'

interface SpriteLayerProps {
  sprites: SpriteInstance[]
}

export function SpriteLayer({ sprites }: SpriteLayerProps) {
  return (
    <div className={styles.layer}>
      <AnimatePresence>
        {sprites.map((sprite) => (
          <motion.div
            key={sprite.key + sprite.position}
            className={[styles.slot, styles[sprite.position]].join(' ')}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <PlaceholderImage category="sprites" assetKey={sprite.key} className={styles.image} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
