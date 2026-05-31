"use client"

import { useTranslation } from "react-i18next"
import ImageHeaderFeature from "@/components/shared/ImageHeaderFeature"
import type { IndustryConfig } from "@/components/innovation-page/data/industries"

interface IndustryScenarioCoverageProps {
  industry: IndustryConfig
}

interface ScenarioContent {
  title: string
  subtitle?: string
  imageAlt: string
}

export default function IndustryScenarioCoverage({ industry }: IndustryScenarioCoverageProps) {
  const { t } = useTranslation()
  const baseKey = `innovation.industries.${industry.slug}`
  const scenarios = industry.scenarios ?? []

  if (scenarios.length === 0) {
    return null
  }

  const scenarioContent = t(`${baseKey}.scenarios`, { returnObjects: true }) as ScenarioContent[]

  if (!Array.isArray(scenarioContent) || scenarioContent.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-[clamp(4rem,8vw,6.5rem)]" id="scenarios">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-[clamp(4rem,8vw,6.5rem)] px-[clamp(1rem,3vw,2.5rem)]">
        {scenarios.map((scenario, index) => {
          const content = scenarioContent[index]

          if (!content) {
            return null
          }

          return (
            <ImageHeaderFeature
              key={`${industry.slug}-scenario-${index}`}
              header={content.title}
              subtitle={content.subtitle}
              imageUrl={scenario.image}
              imageAlt={content.imageAlt}
            />
          )
        })}
      </div>
    </section>
  )
}
