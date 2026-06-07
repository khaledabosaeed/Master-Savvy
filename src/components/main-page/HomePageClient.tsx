"use client"

import { useState, useEffect } from "react"
import NewHero from "@/components/main-page/sections/NewHero"
import SavvySections from "@/components/main-page/sections/SavvySections"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import TopBanner from "@/components/shared/TopBanner"
import PartnersSlider from "@/components/shared/PartnersSlider/PartnersSlider"
// import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
// import ImageSlider, { ImageItem } from "@/components/media-page/sections/PartnersSlider"
import type { HomePageHeaderTexts } from "@/i18n/home-page-texts"

type HomePageClientProps = {
  texts: HomePageHeaderTexts
  // galleryHeading: string
}

// const images: ImageItem[] = [
//   { name: "Image 1", logo: "/home-page/gallery/image-1.jpg" },
//   { name: "Image 2", logo: "/home-page/gallery/image-2.jpg" },
//   { name: "Image 3", logo: "/home-page/gallery/image-3.jpg" },
//   { name: "Image 4", logo: "/home-page/gallery/image-4.jpg" },
//   { name: "Image 5", logo: "/home-page/gallery/image-5.jpg" },
//   { name: "Image 6", logo: "/home-page/gallery/image-6.jpg" },
//   { name: "Image 7", logo: "/home-page/gallery/image-7.jpg" },
//   { name: "Image 7", logo: "/home-page/gallery/image-8.jpg" },
//   { name: "Image 7", logo: "/home-page/gallery/image-9.jpg" },
//   { name: "Image 7", logo: "/home-page/gallery/image-10.jpg" },
//   { name: "Image 7", logo: "/home-page/gallery/image-11.png" },
//   { name: "Image 7", logo: "/home-page/gallery/image-12.png" },
// ]

export default function HomePageClient({ texts }: HomePageClientProps) {
  const [showBadge, setShowBadge] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
      }
      window.scrollTo({ top: 0, behavior: "instant" })
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
      }, 0)
    }

    const handleScroll = () => {
      setShowBadge(window.scrollY < 600)
    }

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

      <section id="whoWeAre">
        <NewHero />
      </section>


      <section id="about">
        <SavvySections />
      </section>
      <PartnersSlider />

      {/* <section id="services">
        <ImageSlider images={images} heading={galleryHeading} />
      </section> */}

    </>
  )
}
