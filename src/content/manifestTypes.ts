export interface ManifestEntry {
  path: string
  description: string
}

export interface Manifest {
  sprites: Record<string, ManifestEntry>
  audio: Record<string, ManifestEntry>
}

export function resolveAsset(
  manifest: Manifest,
  category: keyof Manifest,
  key: string | undefined,
): ManifestEntry | undefined {
  if (!key) return undefined
  return manifest[category][key]
}
