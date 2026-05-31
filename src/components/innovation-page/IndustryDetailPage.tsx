"use client"

import IndustryHero from "@/components/innovation-page/sections/IndustryHero"
import IndustryRobots from "@/components/innovation-page/sections/IndustryRobots"
import IndustryImpactStats from "@/components/innovation-page/sections/IndustryImpactStats"
import IndustryScenarioCoverage from "@/components/innovation-page/sections/IndustryScenarioCoverage"
import IndustriesSlider from "@/components/innovation-page/sections/IndustriesSlider"
import type { IndustryConfig } from "@/components/innovation-page/data/industries"

interface IndustryDetailPageProps {
  industry: IndustryConfig
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  return (
    <>
      <section id="hero">
        <IndustryHero industry={industry} />
      </section>
      <IndustryImpactStats slug={industry.slug} />
      <IndustryScenarioCoverage industry={industry} />
      <IndustryRobots industry={industry} />
      <IndustriesSlider currentSlug={industry.slug} />
    </>
  )
}
