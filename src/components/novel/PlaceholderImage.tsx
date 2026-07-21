import manifestData from '../../content/manifest.json'
import type { Manifest } from '../../content/manifestTypes'
import { resolveAsset } from '../../content/manifestTypes'
import styles from './PlaceholderImage.module.css'

const manifest = manifestData as Manifest

interface PlaceholderImageProps {
  category: 'backgrounds' | 'sprites'
  assetKey: string | undefined
  className?: string
}

export function PlaceholderImage({ category, assetKey, className }: PlaceholderImageProps) {
  const entry = resolveAsset(manifest, category, assetKey)
  if (!entry) return null

  if (entry.path) {
    return <img src={entry.path} alt={assetKey} className={className} />
  }

  return (
    <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>
      <span className={styles.key}>{assetKey}</span>
      <span className={styles.description}>{entry.description}</span>
    </div>
  )
}
