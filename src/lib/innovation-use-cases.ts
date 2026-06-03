import type { PuduRobotKey } from "@/components/innovation-page/data/industries"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import {
  INDUSTRY_USE_CASE_CONFIG,
  ROBOT_PRODUCT_HREFS,
} from "@/lib/industry-use-case-config"

export const PUDU_ROBOT_KEYS: PuduRobotKey[] = [
  "bellabot",
  "kettybot",
  "holabot",
  "flashbot",
  "cc1",
  "t300",
  "pudubot2",
]

export const ROBOT_DISPLAY_NAMES: Record<PuduRobotKey, string> = {
  bellabot: "BellaBot",
  kettybot: "KettyBot",
  holabot: "HolaBot",
  flashbot: "FlashBot",
  cc1: "CC1",
  t300: "T300",
  pudubot2: "PUDUbot2",
}

export type UseCaseChallengeItem = {
  icon: string
  label: string
}

export type UseCaseChallengeEntry = string | UseCaseChallengeItem

export type InnovationUseCaseData = {
  slideKeys?: PuduRobotKey[]
  solutionKeys?: PuduRobotKey[]
  aboutTitle: string
  slides: { robotName: string; imageAlt: string; imageUrl?: string }[]
  challenges: { heading: string; items: UseCaseChallengeEntry[] }
  whyChoose: { heading: string; items: string[] }
  solutionsTitle: string
  solutions: {
    name: string
    imageAlt: string
    imageUrl?: string
    features: string[]
    learnMoreLabel: string
    href: string
  }[]
}

export function createDefaultUseCase(): InnovationUseCaseData {
  return {
    slideKeys: ["holabot"],
    solutionKeys: ["holabot"],
    aboutTitle: "New use case",
    slides: [{ robotName: "HolaBot", imageAlt: "", imageUrl: "" }],
    challenges: {
      heading: "Challenges",
      items: [""],
    },
    whyChoose: {
      heading: "Why choose Pudu Robotics?",
      items: [""],
    },
    solutionsTitle: "Robotic Solutions",
    solutions: [
      {
        name: "HolaBot",
        imageAlt: "",
        imageUrl: "",
        features: [""],
        learnMoreLabel: "Learn More",
        href: "/{lang}/contact",
      },
    ],
  }
}

export function isPuduRobotKey(value: string): value is PuduRobotKey {
  return (PUDU_ROBOT_KEYS as readonly string[]).includes(value)
}

export function resolveRobotKeys(
  fromData: PuduRobotKey[] | undefined,
  defaultKeys: PuduRobotKey[] = []
): PuduRobotKey[] {
  if (fromData?.length) return fromData
  if (defaultKeys.length) return defaultKeys
  return []
}

export type UseCaseSlideData = {
  robotName: string
  imageAlt: string
  imageUrl?: string
}

export function resolveUseCaseSlideCount(
  slideKeys: PuduRobotKey[],
  slideContent: { imageUrl?: string }[]
): number {
  return Math.max(slideKeys.length, slideContent.length)
}

/** Merge locale slide entries with slideKeys so each carousel index has display metadata. */
export function resolveUseCaseSlides(
  slideKeys: PuduRobotKey[],
  slideContent: UseCaseSlideData[]
): UseCaseSlideData[] {
  const count = resolveUseCaseSlideCount(slideKeys, slideContent)
  if (count === 0) return []

  return Array.from({ length: count }, (_, index) => {
    const fromContent = slideContent[index]
    const robotKey = slideKeys[index]
    const fallbackName = robotKey ? ROBOT_DISPLAY_NAMES[robotKey] : ""

    return {
      robotName: fromContent?.robotName?.trim() || fallbackName,
      imageAlt:
        fromContent?.imageAlt?.trim() ||
        fromContent?.robotName?.trim() ||
        fallbackName,
      imageUrl: fromContent?.imageUrl,
    }
  })
}

export function normalizeUseCaseChallengeItems(
  items: unknown
): UseCaseChallengeItem[] {
  const list = Array.isArray(items)
    ? items
    : items && typeof items === "object"
      ? Object.values(items as Record<string, unknown>)
      : []

  return list
    .map((item) => {
      if (typeof item === "string") {
        const label = item.trim()
        return label ? { icon: "experience", label } : null
      }
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const record = item as { icon?: string; label?: string }
        const label = record.label?.trim() ?? ""
        if (!label) return null
        return {
          icon: record.icon?.trim() || "experience",
          label,
        }
      }
      return null
    })
    .filter((item): item is UseCaseChallengeItem => item !== null)
}

function isUseCaseContent(value: unknown): value is InnovationUseCaseData {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as InnovationUseCaseData).aboutTitle === "string"
  )
}

/** Read one use case from the industries useCases array (i18next-safe). */
export function resolveUseCaseContent(
  rawUseCases: unknown,
  index: number
): InnovationUseCaseData | null {
  const list = Array.isArray(rawUseCases)
    ? rawUseCases
    : rawUseCases && typeof rawUseCases === "object"
      ? Object.values(rawUseCases as Record<string, unknown>)
      : []

  const entry = list[index]
  return isUseCaseContent(entry) ? entry : null
}

type ImpactPanelItem = { icon?: string; label?: string } | string

function extractPanelStrings(panel: unknown): string[] {
  if (!panel || typeof panel !== "object") return []
  const items = (panel as { items?: ImpactPanelItem[] }).items
  if (!Array.isArray(items)) return []
  return items
    .map((item) => (typeof item === "string" ? item : item?.label ?? ""))
    .map((s) => s.trim())
    .filter(Boolean)
}

function extractChallengeItems(panel: unknown): UseCaseChallengeItem[] {
  if (!panel || typeof panel !== "object") return []
  const items = (panel as { items?: ImpactPanelItem[] }).items
  if (!Array.isArray(items)) return []
  return normalizeUseCaseChallengeItems(items)
}

function industryChallengesHeading(
  industryRecord: Record<string, unknown>,
  locale: "en" | "ar",
  fallback: string
): string {
  const title =
    typeof industryRecord.title === "string" ? industryRecord.title.trim() : ""
  if (!title) return fallback
  return locale === "ar" ? `تحديات ${title}` : `${title} Industry Challenges`
}

function extractPanelHeading(panel: unknown, fallback: string): string {
  if (!panel || typeof panel !== "object") return fallback
  const heading = (panel as { heading?: string }).heading
  return typeof heading === "string" && heading.trim() ? heading.trim() : fallback
}

function buildSolutionFromKey(
  key: PuduRobotKey,
  learnMoreLabel: string
): InnovationUseCaseData["solutions"][number] {
  const name = ROBOT_DISPLAY_NAMES[key]
  return {
    name,
    imageAlt: name,
    imageUrl: "",
    features: [
      "Autonomous navigation and reliable operation",
      "Designed for high-traffic commercial environments",
      "Integrates with existing service workflows",
    ],
    learnMoreLabel,
    href: ROBOT_PRODUCT_HREFS[key],
  }
}

const USE_CASE_COPY = {
  en: {
    challengesHeading: "Challenges",
    whyChooseHeading: "Why choose Pudu Robotics?",
    solutionsTitle: "Robotic Solutions",
    learnMore: "Learn More",
  },
  ar: {
    challengesHeading: "التحديات",
    whyChooseHeading: "لماذا تختار Pudu Robotics؟",
    solutionsTitle: "الحلول الروبوتية",
    learnMore: "اعرف المزيد",
  },
} as const

/** Build default use case sections from industry impact panels and per-slug config. */
export function buildUseCasesFromIndustry(
  slug: IndustrySlug,
  industryRecord: Record<string, unknown>,
  locale: "en" | "ar"
): InnovationUseCaseData[] {
  const config = INDUSTRY_USE_CASE_CONFIG[slug]
  const copy = USE_CASE_COPY[locale]
  const impactPanels = industryRecord.impactPanels as
    | Record<string, unknown>
    | undefined

  const challengeItems = extractChallengeItems(impactPanels?.challenges)
  const whyItems = extractPanelStrings(impactPanels?.puduHelp)
  const challengesHeading = industryChallengesHeading(
    industryRecord,
    locale,
    extractPanelHeading(impactPanels?.challenges, copy.challengesHeading)
  )

  return config.keys.map((keyCfg, index) => {
    const aboutTitle = config.titles[locale][index] ?? `Section ${index + 1}`
    const primarySlideKey = keyCfg.slideKeys[0] ?? "holabot"

    return {
      aboutTitle,
      slideKeys: keyCfg.slideKeys,
      solutionKeys: keyCfg.solutionKeys,
      slides: [
        {
          robotName: ROBOT_DISPLAY_NAMES[primarySlideKey],
          imageAlt: `${ROBOT_DISPLAY_NAMES[primarySlideKey]} in ${aboutTitle}`,
          imageUrl: "",
        },
      ],
      challenges: {
        heading: challengesHeading,
        items: challengeItems.length > 0 ? [...challengeItems] : [""],
      },
      whyChoose: {
        heading: copy.whyChooseHeading,
        items: whyItems.length > 0 ? [...whyItems] : [""],
      },
      solutionsTitle: copy.solutionsTitle,
      solutions: keyCfg.solutionKeys.map((key) =>
        buildSolutionFromKey(key, copy.learnMore)
      ),
    }
  })
}

/** Keep slides array aligned with slideKeys length. */
export function syncUseCaseSlides(
  useCase: InnovationUseCaseData
): InnovationUseCaseData {
  const keys = useCase.slideKeys ?? []
  const slides = [...(useCase.slides ?? [])]

  while (slides.length < keys.length) {
    const key = keys[slides.length]
    const name = key ? ROBOT_DISPLAY_NAMES[key] : "Robot"
    slides.push({ robotName: name, imageAlt: name, imageUrl: "" })
  }

  return {
    ...useCase,
    slides: slides.slice(0, keys.length).map((slide, index) => {
      const key = keys[index]
      const fallbackName = key ? ROBOT_DISPLAY_NAMES[key] : slide.robotName
      return {
        robotName: slide.robotName?.trim() || fallbackName,
        imageAlt: slide.imageAlt?.trim() || fallbackName,
        imageUrl: slide.imageUrl ?? "",
      }
    }),
  }
}
