const NEXT_IMAGE_HOSTS = new Set(["images.unsplash.com", "cdn.savvyworld.ai"])

export function isHttpUrl(value: string | undefined): boolean {
  if (!value) return false
  return /^https?:\/\//i.test(value.trim())
}

/** Prefer admin-managed URL when it is a valid http(s) link. */
export function resolveMediaUrl(
  custom: string | undefined,
  fallback: string
): string {
  const trimmed = custom?.trim()
  if (trimmed && isHttpUrl(trimmed)) {
    return trimmed
  }
  return fallback
}

export function isNextOptimizedImageUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return NEXT_IMAGE_HOSTS.has(hostname)
  } catch {
    return false
  }
}

export function isMediaUrlFieldKey(key: string): boolean {
  return /(?:^|\.)(imageUrl|mediaUrl|videoUrl)$/.test(key)
}

export function isPlainUrlFieldKey(key: string): boolean {
  return /(?:^|\.)href$/.test(key)
}
