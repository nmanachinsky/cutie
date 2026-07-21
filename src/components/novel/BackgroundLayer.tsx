import { AnimatePresence, motion } from 'framer-motion'
import { PlaceholderImage } from './PlaceholderImage'
import styles from './BackgroundLayer.module.css'

interface BackgroundLayerProps {
  background: string | undefined
}

export function BackgroundLayer({ background }: BackgroundLayerProps) {
  return (
    <div className={styles.layer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={background}
          className={styles.frame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <PlaceholderImage category="backgrounds" assetKey={background} className={styles.image} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
