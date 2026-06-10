import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import MadiaProjects from "@/components/shared/mdia-projects/LatestProjects"
import NewHero from "@/components/main-page/sections/NewHero"
import { getDictionary } from "@/i18n/getDictionary"
import { mediaPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import Hero from "@/components/media-page/Hero/Hero"
interface MediaPageProps {
  params: Promise<{ lang: string }>
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)
  const texts = mediaPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader 
      transparentHeader={true}
      texts={texts} hasBanner={false} logoSrc="/media/media.svg" logoHref="#hero" />
      <PageTransition>

        <NewHero
          sectionId="hero"
          imageSrc="/media/hero/hero.png"
          imageAlt={dict.media.hero.imageAlt}
          eyebrowKey="media.hero.badge"
          titleKey="media.hero.title"
          titleAccentKey=""
          descriptionKey="media.hero.description"
          showImpactStats={false}
          actions={[
            { href: "#projects", labelKey: "media.hero.primaryButton" },
            { href: `/${lang}/contact`, labelKey: "media.hero.secondaryButton", variant: "secondary" },
          ]}
        />


        <Hero />

        <section id="projects">
          <LatestProjects />
        </section>

        <div className="relative overflow-hidden bg-[oklch(0.112_0.028_248)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.126_0.036_251)_0%,oklch(0.105_0.025_244)_48%,oklch(0.18_0.035_214)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(oklch(0.92_0.04_205/0.045)_1px,transparent_1px),linear-gradient(90deg,oklch(0.92_0.04_205/0.045)_1px,transparent_1px)] [background-size:48px_48px]" />


          <section id="content" className="relative">
            <MediaContent />
          </section>
          <MadiaProjects />
        </div>
{/* 
        <section id="why-savvy">
          <WhySavvy />
        </section> */}



      </PageTransition>
    </>
  )
}
