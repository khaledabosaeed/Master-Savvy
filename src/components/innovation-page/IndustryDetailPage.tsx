"use client"

import IndustryHero from "@/components/innovation-page/sections/IndustryHero"
import IndustryImpactStats from "@/components/innovation-page/sections/IndustryImpactStats"
import IndustryScenarioCoverage from "@/components/innovation-page/sections/IndustryScenarioCoverage"
import IndustryUseCaseSection from "@/components/innovation-page/sections/IndustryUseCaseSection"
import IndustriesSlider from "@/components/innovation-page/sections/IndustriesSlider"
import type { IndustryRef } from "@/components/innovation-page/data/industries"
import { resolveUseCaseList } from "@/lib/innovation-use-cases"
import { useTranslation } from "react-i18next"

interface IndustryDetailPageProps {
  industry: IndustryRef
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const { t } = useTranslation()
  const useCases = resolveUseCaseList(
    t(`innovation.industries.${industry.slug}.useCases`, { returnObjects: true })
  )
  const hasUseCases = useCases.length > 0

  return (
    <>
      <section id="hero">
        <IndustryHero slug={industry.slug} />
      </section>
      <IndustryImpactStats slug={industry.slug} />
      <IndustryScenarioCoverage slug={industry.slug} />
      {hasUseCases ? (
        <IndustryUseCaseSection industrySlug={industry.slug} />
      ) : null}

      <IndustriesSlider currentSlug={industry.slug} />
    </>
  )
}
