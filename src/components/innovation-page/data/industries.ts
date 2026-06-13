export type IndustrySlug =
  | "food-beverage"
  // | "retail"
  | "hospitality"
  | "industrial-logistics"
  | "healthcare"
  | "transportation"
  | "entertainment-sports"
  | "real-estate"
  | "education"
  | "public-service"

export type PuduRobotKey =
  | "bellabot"
  | "kettybot"
  | "holabot"
  | "flashbot"
  | "cc1"
  | "t300"
  | "pudubot2"

export interface IndustryRef {
  slug: IndustrySlug
}

export const INDUSTRY_SLUGS: IndustrySlug[] = [
  "food-beverage",
  // "retail",
  "hospitality",
  "industrial-logistics",
  "healthcare",
  "transportation",
  "entertainment-sports",
  "real-estate",
  "education",
  "public-service",
]

export const INDUSTRIES: IndustryRef[] = INDUSTRY_SLUGS.map((slug) => ({ slug }))

/** @deprecated Use IndustryRef — kept for gradual migration of imports */
export type IndustryConfig = IndustryRef

export function getIndustryBySlug(slug: string): IndustryRef | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug)
}

export function isIndustrySlug(slug: string): slug is IndustrySlug {
  return INDUSTRY_SLUGS.includes(slug as IndustrySlug)
}
