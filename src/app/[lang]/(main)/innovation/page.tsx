import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationHero from "@/components/innovation-page/sections/InnovationHero"
import InnovationSolutions from "@/components/innovation-page/sections/InnovationSolutions"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import ExpoPartners from "@/components/expo-page/sections/ExpoPartners"
import { getDictionary } from "@/i18n/getDictionary"
import { innovationPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface InnovationPageProps {
  params: Promise<{ lang: string }>
}

export default async function InnovationPage({ params }: InnovationPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)
  const texts = innovationPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} logoSrc="/innovation/invo.svg" logoHref="#hero" />

      <PageTransition>
        <section id="hero">
          <InnovationHero />
        </section>

        <section id="solutions">
          <InnovationSolutions />
        </section>

        <section id="partners">
          <ExpoPartners />
        </section>
      </PageTransition>
    </>
  )
}
