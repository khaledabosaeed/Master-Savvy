import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import MadiaProjects from "@/components/shared/mdia-projects/LatestProjects"
import NewHero from "@/components/main-page/sections/NewHero"
import { getDictionary } from "@/i18n/getDictionary"
import { mediaPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"
import LatestProjects from "@/components/shared/LatestProjects/LatestProjects"
import Hero from "@/components/media-page/Hero/Hero"
import AbsenInnovationSection from "@/components/media-page/sections/AbsenInnovationSection"
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


        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#FBFCFD_0%,#F5F7FA_50%,#EEF2F6_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(57,96,249,0.1),transparent_30%),radial-gradient(circle_at_18%_52%,rgba(96,165,250,0.12),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(57,96,249,0.08),transparent_36%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(57,96,249,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(57,96,249,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />

          <div className="relative z-10">
            <Hero />

            <section id="projects">
              <LatestProjects blendWithParent />
            </section>
          </div>
        </div>

        <div className="relative overflow-hidden border-y border-[oklch(0.88_0.035_245/0.11)] bg-[oklch(0.105_0.018_250)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.501_0.253_264.6/0.45),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,oklch(0.501_0.253_264.6/0.16),transparent_30%),radial-gradient(circle_at_88%_18%,oklch(0.501_0.253_264.6/0.14),transparent_28%)]" />

          <div className="relative z-10">
            <AbsenInnovationSection />

            <section id="content">
              <MadiaProjects />
            </section>
          </div>
        </div>

        <MediaContent />




      </PageTransition>
    </>
  )
}
