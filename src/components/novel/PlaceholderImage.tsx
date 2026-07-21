import manifestData from '../../content/manifest.json'
import type { Manifest } from '../../content/manifestTypes'
import { resolveAsset } from '../../content/manifestTypes'

const manifest = manifestData as Manifest

interface PlaceholderImageProps {
  category: 'backgrounds' | 'sprites'
  assetKey: string | undefined
  className?: string
}

export function PlaceholderImage({ category, assetKey, className }: PlaceholderImageProps) {
  const entry = resolveAsset(manifest, category, assetKey)
  if (!entry?.path) return null

  return <img src={entry.path} alt={assetKey} className={className} />
}
