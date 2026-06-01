"use client"

import { useTranslation } from "react-i18next"
import ImageHeaderFeature from "@/components/shared/ImageHeaderFeature"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import { parseTranslationMediaUrl } from "@/lib/innovation-media"

interface IndustryScenarioCoverageProps {
  slug: IndustrySlug
}

interface ScenarioContent {
  title: string
  subtitle?: string
  imageAlt: string
  imageUrl?: string
}

export default function IndustryScenarioCoverage({ slug }: IndustryScenarioCoverageProps) {
  const { t } = useTranslation()
  const baseKey = `innovation.industries.${slug}`
  const scenarioContent = t(`${baseKey}.scenarios`, { returnObjects: true }) as ScenarioContent[]

  if (!Array.isArray(scenarioContent) || scenarioContent.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-[clamp(4rem,8vw,6.5rem)]" id="scenarios">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-[clamp(4rem,8vw,6.5rem)] px-[clamp(1rem,3vw,2.5rem)]">
        {scenarioContent.map((content, index) => {
          if (!content?.title) {
            return null
          }

          const imageUrl = parseTranslationMediaUrl(
            content.imageUrl ?? "",
            `${baseKey}.scenarios[${index}].imageUrl`
          )

          if (!imageUrl) {
            return null
          }

          return (
            <ImageHeaderFeature
              key={`${slug}-scenario-${index}`}
              header={content.title}
              subtitle={content.subtitle}
              imageUrl={imageUrl}
              imageAlt={content.imageAlt}
            />
          )
        })}
      </div>
    </section>
  )
}
