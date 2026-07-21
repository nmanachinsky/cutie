import manifestData from '../../content/manifest.json'
import type { Manifest } from '../../content/manifestTypes'
import { resolveAsset } from '../../content/manifestTypes'
import { assetUrl } from '../../lib/assetUrl'

const manifest = manifestData as Manifest

interface PlaceholderImageProps {
  assetKey: string | undefined
  className?: string
}

export function PlaceholderImage({ assetKey, className }: PlaceholderImageProps) {
  const entry = resolveAsset(manifest, 'sprites', assetKey)
  if (!entry?.path) return null

  return <img src={assetUrl(entry.path)} alt={assetKey} className={className} />
}
