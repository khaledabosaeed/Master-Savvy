import type { TFunction } from "i18next"
import type { IndustrySlug, PuduRobotKey } from "@/components/innovation-page/data/industries"
import { isHttpUrl } from "@/lib/media-url"

/** Parse a translation value as a media URL; returns null when missing or invalid. */
export function parseTranslationMediaUrl(
  translated: string,
  keyPath: string
): string | null {
  if (!translated || translated === keyPath) return null
  const trimmed = translated.trim()
  return isHttpUrl(trimmed) ? trimmed : null
}

export function getInnovationHeroVideoUrl(t: TFunction): string | null {
  return parseTranslationMediaUrl(
    t("innovation.hero.videoUrl"),
    "innovation.hero.videoUrl"
  )
}

export function getIndustryImageUrl(
  t: TFunction,
  slug: IndustrySlug
): string | null {
  const key = `innovation.industries.${slug}.imageUrl`
  return parseTranslationMediaUrl(t(key), key)
}

export function getInnovationRobotImageUrl(
  t: TFunction,
  robotKey: PuduRobotKey
): string | null {
  const key = `innovation.robots.${robotKey}.imageUrl`
  return parseTranslationMediaUrl(t(key), key)
}

export function getIndustryRecommendedRobots(
  t: TFunction,
  slug: IndustrySlug
): PuduRobotKey[] {
  const key = `innovation.industries.${slug}.recommendedRobots`
  const raw = t(key, { returnObjects: true })
  if (!Array.isArray(raw)) return []
  return raw.filter((item): item is PuduRobotKey => typeof item === "string")
}

export function resolveUseCaseSlideMediaUrl(
  t: TFunction,
  slide: { imageUrl?: string; robotName?: string },
  slideIndex: number,
  slideKeys: PuduRobotKey[]
): string | null {
  const trimmed = slide.imageUrl?.trim()
  if (trimmed && isHttpUrl(trimmed)) return trimmed

  const robotKey = slideKeys[slideIndex]
  if (robotKey) {
    return getInnovationRobotImageUrl(t, robotKey)
  }

  return null
}

export function resolveUseCaseSolutionMediaUrl(
  t: TFunction,
  solution: { imageUrl?: string; name?: string },
  solutionIndex: number,
  solutionKeys: PuduRobotKey[]
): string | null {
  const trimmed = solution.imageUrl?.trim()
  if (trimmed && isHttpUrl(trimmed)) return trimmed

  const robotKey = solutionKeys[solutionIndex]
  if (robotKey) {
    return getInnovationRobotImageUrl(t, robotKey)
  }

  return null
}
