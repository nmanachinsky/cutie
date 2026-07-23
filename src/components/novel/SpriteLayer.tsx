import { AnimatePresence, motion } from 'framer-motion'
import type { SpriteInstance, SpritePosition } from '../../engine/types'
import { PlaceholderImage } from './PlaceholderImage'
import styles from './SpriteLayer.module.css'

const POSITION_ORDER: SpritePosition[] = ['left', 'center', 'right']

interface CellPlacement {
  gridRow: string
  gridColumn: string
}

// The art is landscape-shaped (roughly 3:2), so on a narrow phone screen it's
// width that runs out first, not height — a lone sprite squeezed into a third
// of the width (old 3-across layout) rendered far smaller than the tall
// region around it actually allowed. Packing into rows instead of one wide
// row gives every sprite more width per item, which is what actually grows
// them here.
function placeSprites(sprites: SpriteInstance[]): Map<SpriteInstance, CellPlacement> {
  const byPosition = new Map(sprites.map((sprite) => [sprite.position, sprite] as const))
  const placements = new Map<SpriteInstance, CellPlacement>()

  const center = byPosition.get('center')
  const left = byPosition.get('left')
  const right = byPosition.get('right')

  if (sprites.length === 3 && center && left && right) {
    // Triangle: the odd one out spans the full-width apex row, the pair
    // shares the base — both are bigger than an even three-across split.
    placements.set(center, { gridRow: '1', gridColumn: '1 / span 2' })
    placements.set(left, { gridRow: '2', gridColumn: '1' })
    placements.set(right, { gridRow: '2', gridColumn: '2' })
    return placements
  }

  // One or two sprites: a single row, ordered left-to-right by position.
  POSITION_ORDER.filter((pos) => byPosition.has(pos)).forEach((pos, index) => {
    placements.set(byPosition.get(pos)!, { gridRow: '1', gridColumn: String(index + 1) })
  })
  return placements
}

interface SpriteLayerProps {
  sprites: SpriteInstance[]
}

export function SpriteLayer({ sprites }: SpriteLayerProps) {
  const isTriangle = sprites.length === 3
  const placements = placeSprites(sprites)
  const columnCount = isTriangle ? 2 : Math.max(sprites.length, 1)

  return (
    <div
      className={[styles.layer, sprites.length <= 1 ? styles.fullBleed : ''].join(' ')}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: isTriangle ? '1fr 1fr' : '1fr',
      }}
    >
      <AnimatePresence>
        {sprites.map((sprite) => (
          <motion.div
            key={sprite.key + sprite.position}
            className={styles.slot}
            style={placements.get(sprite)}
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
