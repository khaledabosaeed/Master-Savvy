"use client"

import IndustryHero from "@/components/innovation-page/sections/IndustryHero"
import IndustryRobots from "@/components/innovation-page/sections/IndustryRobots"
import IndustryUseCases from "@/components/innovation-page/sections/IndustryUseCases"
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
      <IndustryUseCases slug={industry.slug} />
      <IndustryRobots industry={industry} />
      <IndustriesSlider currentSlug={industry.slug} />
    </>
  )
}
