"use client"

import { useTranslation } from "react-i18next"
import type { IndustrySlug, PuduRobotKey } from "@/components/innovation-page/data/industries"
import { type InnovationUseCaseData, resolveRobotKeys } from "@/lib/innovation-use-cases"

export type IndustryUseCaseEntry = {
  index: number
  slideKeys: PuduRobotKey[]
  solutionKeys: PuduRobotKey[]
}

export function useIndustryUseCases(slug: IndustrySlug): IndustryUseCaseEntry[] {
  const { t } = useTranslation()
  const key = `innovation.industries.${slug}.useCases`
  const raw = t(key, { returnObjects: true })
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object"
      ? Object.values(raw as Record<string, unknown>)
      : []

  if (list.length === 0) {
    return []
  }

  return list.map((entry, index) => {
    const useCase = entry as InnovationUseCaseData
    return {
      index,
      slideKeys: resolveRobotKeys(useCase.slideKeys),
      solutionKeys: resolveRobotKeys(useCase.solutionKeys),
    }
  })
}
