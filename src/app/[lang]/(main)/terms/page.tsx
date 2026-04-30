import PageTransition from "@/components/shared/PageTransition/PageTransition"
import TermsPage from "@/components/terms-page/TermsPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { termsPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface TermsPageProps {
  params: Promise<{ lang: string }>
}

export default async function Terms({ params }: TermsPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)
  const texts = termsPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <TermsPage />
      </PageTransition>
    </>
  )
}
