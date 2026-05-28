export type IndustrySlug =
  | "food-beverage"
  | "retail"
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

export interface IndustryConfig {
  slug: IndustrySlug
  image: string
  robots: PuduRobotKey[]
}

export const INDUSTRY_SLUGS: IndustrySlug[] = [
  "food-beverage",
  "retail",
  "hospitality",
  "industrial-logistics",
  "healthcare",
  "transportation",
  "entertainment-sports",
  "real-estate",
  "education",
  "public-service",
]

export const INDUSTRIES: IndustryConfig[] = [
  {
    slug: "food-beverage",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    robots: ["holabot", "bellabot", "kettybot"],
  },
  {
    slug: "retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    robots: ["bellabot", "kettybot", "flashbot"],
  },
  {
    slug: "hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    robots: ["bellabot", "holabot", "kettybot"],
  },
  {
    slug: "industrial-logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    robots: ["t300", "flashbot", "pudubot2"],
  },
  {
    slug: "healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd02d6b0a?auto=format&fit=crop&w=1600&q=80",
    robots: ["cc1", "kettybot", "pudubot2"],
  },
  {
    slug: "transportation",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80",
    robots: ["flashbot", "pudubot2", "t300"],
  },
  {
    slug: "entertainment-sports",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    robots: ["holabot", "bellabot", "kettybot"],
  },
  {
    slug: "real-estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    robots: ["cc1", "kettybot", "bellabot"],
  },
  {
    slug: "education",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    robots: ["pudubot2", "kettybot", "holabot"],
  },
  {
    slug: "public-service",
    image: "https://images.unsplash.com/photo-1577968657460-9c8965919027?auto=format&fit=crop&w=1600&q=80",
    robots: ["cc1", "pudubot2", "t300"],
  },
]

export const PUDU_ROBOT_IMAGES: Record<PuduRobotKey, string> = {
  bellabot: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  kettybot: "https://images.unsplash.com/photo-1535378648346-b14a50899904?auto=format&fit=crop&w=800&q=80",
  holabot: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  flashbot: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  cc1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  t300: "https://images.unsplash.com/photo-1565514020169-026cb4c4a2de?auto=format&fit=crop&w=800&q=80",
  pudubot2: "https://images.unsplash.com/photo-1526378722484-34553a2b2d7c?auto=format&fit=crop&w=800&q=80",
}

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug)
}

export function isIndustrySlug(slug: string): slug is IndustrySlug {
  return INDUSTRY_SLUGS.includes(slug as IndustrySlug)
}
