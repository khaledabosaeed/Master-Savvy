import PageTransition from "@/components/shared/PageTransition/PageTransition"
import MediaContent from "@/components/media-page/sections/MediaContent"
import WhySavvy from "@/components/media-page/sections/WhySavvy"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import MadiaProjects from "@/components/shared/mdia-projects/LatestProjects"
import UnrealHero from "@/components/media-page/sections/UnrealHero"
import { getDictionary } from "@/i18n/getDictionary"
import { mediaPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface MediaPageProps {
  params: Promise<{ lang: string }>
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = getDictionary(lang)
  const texts = mediaPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/media/media.svg" logoHref="#hero" />
      <PageTransition>
        <MadiaProjects />

        <section id="content" className="bg-white">
          <MediaContent />
        </section>
        <section id="hero">
          <UnrealHero />
        </section>

        <section id="why-savvy">
          <WhySavvy />
        </section>
      </PageTransition>
    </>
  )
}
