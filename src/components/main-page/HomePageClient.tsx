"use client"

import { useState, useEffect } from "react"
import NewHero from "@/components/main-page/sections/NewHero"
import SavvySections from "@/components/main-page/sections/SavvySections"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"
import type { HomePageHeaderTexts } from "@/i18n/home-page-texts"

type HomePageClientProps = {
  texts: HomePageHeaderTexts
}

export default function HomePageClient({ texts }: HomePageClientProps) {
  const [showBadge, setShowBadge] = useState(true)

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const handleScroll = () => {
      setShowBadge(window.scrollY < 600)
    }

    window.scrollTo({ top: 0, behavior: "instant" })
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
    })

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* <TopBanner /> */}

      <UnifiedHeader
        texts={texts}
        showBadge={showBadge}
        hasBanner={false}
        transparentHeader={true}
        logoSrc="/Savvy 2 1.svg"
        logoAlt="Savvy"
      />

      <main>
        <NewHero />

        <section id="about" aria-labelledby="savvy-sections-title">
          <SavvySections />
        </section>

        <PartnersSlider />
      </main>
    </>
  )
}
