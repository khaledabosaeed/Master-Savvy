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

export interface IndustryScenario {
  image: string
}

export interface IndustryConfig {
  slug: IndustrySlug
  image: string
  robots: PuduRobotKey[]
  scenarios?: IndustryScenario[]
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

export const INNOVATION_HERO_VIDEO =
  "https://cdn.savvyworld.ai/master/PUDU_Industry_Solutions_29dd55ee9d.mp4"

const SCENARIO_IMAGE_BASE = "https://cdn.savvyworld.ai/master/Robtics-pages"

/** Isometric multi-scenario illustrations per industry */
export const INDUSTRY_SCENARIO_IMAGES: Record<IndustrySlug, string> = {
  "food-beverage": `${SCENARIO_IMAGE_BASE}/_68694792ca.webp`,
  retail: `${SCENARIO_IMAGE_BASE}/_80d200d980.webp`,
  hospitality: `${SCENARIO_IMAGE_BASE}/_aaa66f1fc9.webp`,
  "industrial-logistics": `${SCENARIO_IMAGE_BASE}/_c7680a5a1b.webp`,
  healthcare: `${SCENARIO_IMAGE_BASE}/_a81a02f812.webp`,
  transportation: `${SCENARIO_IMAGE_BASE}/_760afca0ea.webp`,
  "entertainment-sports": `${SCENARIO_IMAGE_BASE}/_c89f272bff.webp`,
  "real-estate": `${SCENARIO_IMAGE_BASE}/_494d2b48c7.webp`,
  education: `${SCENARIO_IMAGE_BASE}/_048eb90ab6.webp`,
  "public-service": `${SCENARIO_IMAGE_BASE}/_a81a02f812.webp`,
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    slug: "food-beverage",
    image: "https://cdn.savvyworld.ai/master/Food_and_Beverage_ecca2bbd37.webp",
    robots: ["holabot", "bellabot", "kettybot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES["food-beverage"] }],
  },
  {
    slug: "retail",
    image: "https://cdn.savvyworld.ai/master/_a9690a9d5d.webp",
    robots: ["bellabot", "kettybot", "flashbot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES.retail }],
  },
  {
    slug: "hospitality",
    image: "https://cdn.savvyworld.ai/master/Hospitality_e4c88c98ae.webp",
    robots: ["bellabot", "holabot", "kettybot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES.hospitality }],
  },
  {
    slug: "industrial-logistics",
    image: "https://cdn.savvyworld.ai/master/_373b0fa367.webp",
    robots: ["t300", "flashbot", "pudubot2"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES["industrial-logistics"] }],
  },
  {
    slug: "healthcare",
    image: "https://cdn.savvyworld.ai/master/_d8c688b5e6.webp",
    robots: ["cc1", "kettybot", "pudubot2"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES.healthcare }],
  },
  {
    slug: "transportation",
    image: "https://cdn.savvyworld.ai/master/Transportation_and_Related_Service_ab54fbe5b6.webp",
    robots: ["flashbot", "pudubot2", "t300"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES.transportation }],
  },
  {
    slug: "entertainment-sports",
    image: "https://cdn.savvyworld.ai/master/Entertainment_and_Sports_03db28cf1f.webp",
    robots: ["holabot", "bellabot", "kettybot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES["entertainment-sports"] }],
  },
  {
    slug: "real-estate",
    image: "https://cdn.savvyworld.ai/master/Residential_and_Office_Buildings_81b4141216.webp",
    robots: ["cc1", "kettybot", "bellabot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES["real-estate"] }],
  },
  {
    slug: "education",
    image: "https://cdn.savvyworld.ai/master/_50cce29ac7.webp",
    robots: ["pudubot2", "kettybot", "holabot"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES.education }],
  },
  {
    slug: "public-service",
    image: "https://cdn.savvyworld.ai/master/_fa2aeeca28.webp",
    robots: ["cc1", "pudubot2", "t300"],
    scenarios: [{ image: INDUSTRY_SCENARIO_IMAGES["public-service"] }],
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
