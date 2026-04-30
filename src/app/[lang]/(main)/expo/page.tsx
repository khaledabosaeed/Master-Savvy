import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ExpoHero from "@/components/expo-page/sections/ExpoHero"
import ExpoServices from "@/components/expo-page/sections/ExpoServices"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners"
import ImageSlider, { ImageItem } from "@/components/media-page/sections/PartnersSlider"
import { getDictionary } from "@/i18n/getDictionary"
import { expoPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ExpoPageProps {
  params: Promise<{ lang: string }>
}

export default async function ExpoPage({ params }: ExpoPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = getDictionary(lang)
  const { texts, imageSliderHeading } = expoPageHeaderTexts(dict)

  const sliderImages: ImageItem[] = Array.from({ length: 29 }, (_, i) => ({
    name: `Image ${i + 1}`,
    logo: `/media/slider/${i + 1}.png`,
  }))

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/expo/expo.svg" logoAlt="Savvy" logoHref="#hero" />
      <PageTransition>
        <section id="hero">
          <ExpoHero />
        </section>
        <section id="services">
          <ExpoServices />
        </section>
        <section id="projects">
          <LatestProjects />
        </section>
        <section id="news">
          <ImageSlider images={sliderImages} heading={imageSliderHeading} />
        </section>
        <section id="partners">
          <ExpoPartners />
        </section>
      </PageTransition>
    </>
  )
}
