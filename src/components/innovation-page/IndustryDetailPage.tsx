"use client"

import IndustryHero from "@/components/innovation-page/sections/IndustryHero"
import IndustryImpactStats from "@/components/innovation-page/sections/IndustryImpactStats"
import IndustryScenarioCoverage from "@/components/innovation-page/sections/IndustryScenarioCoverage"
import IndustryUseCaseSection from "@/components/innovation-page/sections/IndustryUseCaseSection"
import IndustriesSlider from "@/components/innovation-page/sections/IndustriesSlider"
import type { IndustryRef } from "@/components/innovation-page/data/industries"
import { useIndustryUseCases } from "@/hooks/useIndustryUseCases"

interface IndustryDetailPageProps {
  industry: IndustryRef
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const useCaseEntries = useIndustryUseCases(industry.slug)
  const hasUseCases = useCaseEntries.length > 0

  return (
    <>
      <section id="hero">
        <IndustryHero slug={industry.slug} />
      </section>
      <IndustryImpactStats slug={industry.slug} />
      <IndustryScenarioCoverage slug={industry.slug} />
      {hasUseCases ? (
        useCaseEntries.map(({ index, slideKeys, solutionKeys }) => (
          <IndustryUseCaseSection
            key={`${industry.slug}-use-case-${index}`}
            industrySlug={industry.slug}
            useCaseIndex={index}
            slideKeys={slideKeys}
            solutionKeys={solutionKeys}
            variant={index % 2 === 0 ? "light" : "tinted"}
          />
        ))
      ) : (
        <>
        </>
      )}

      <IndustriesSlider currentSlug={industry.slug} />
    </>
  )
}
