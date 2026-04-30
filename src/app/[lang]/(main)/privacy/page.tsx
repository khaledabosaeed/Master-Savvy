import PageTransition from "@/components/shared/PageTransition/PageTransition"
import PrivacyPage from "@/components/privacy-page/PrivacyPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { privacyPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface PrivacyPageProps {
  params: Promise<{ lang: string }>
}

export default async function Privacy({ params }: PrivacyPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = getDictionary(lang)
  const texts = privacyPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <PrivacyPage />
      </PageTransition>
    </>
  )
}
