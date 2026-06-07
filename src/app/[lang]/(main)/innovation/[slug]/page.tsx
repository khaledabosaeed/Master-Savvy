import PageTransition from "@/components/shared/PageTransition/PageTransition"
import IndustryDetailPage from "@/components/innovation-page/IndustryDetailPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import {
  getIndustryBySlug,
  INDUSTRY_SLUGS,
  isIndustrySlug,
} from "@/components/innovation-page/data/industries"
import { getDictionary } from "@/i18n/getDictionary"
import { innovationIndustryPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface IndustryPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export function generateStaticParams() {
  return INDUSTRY_SLUGS.flatMap((slug) =>
    ["en", "ar"].map((lang) => ({ lang, slug }))
  )
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { lang, slug } = await params

  if (!isAppLanguage(lang) || !isIndustrySlug(slug)) {
    notFound()
  }

  const industry = getIndustryBySlug(slug)
  if (!industry) {
    notFound()
  }

  const texts = innovationIndustryPageHeaderTexts(await getDictionary(lang))

  return (
    <>
      <UnifiedHeader
        texts={texts}
        hasBanner={false}
        logoSrc="/innovation/invo.svg"
        logoHref={`/${lang}/innovation`}
        transparentHeader
      />

      <main id="industry-detail">
        <PageTransition>
          <IndustryDetailPage industry={industry} />
        </PageTransition>
      </main>
    </>
  )
}
