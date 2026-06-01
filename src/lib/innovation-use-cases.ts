import type { PuduRobotKey } from "@/components/innovation-page/data/industries"

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

export type InnovationUseCaseData = {
  slideKeys?: PuduRobotKey[]
  solutionKeys?: PuduRobotKey[]
  aboutTitle: string
  slides: { robotName: string; imageAlt: string; imageUrl?: string }[]
  challenges: { heading: string; items: string[] }
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

export function resolveUseCaseSlideCount(
  slideKeys: PuduRobotKey[],
  slideContent: { imageUrl?: string }[]
): number {
  return Math.max(slideKeys.length, slideContent.length)
}
