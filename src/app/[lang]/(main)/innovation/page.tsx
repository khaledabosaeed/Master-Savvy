import InnovationPageClient from "@/components/innovation-page/InnovationPageClient"
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

  return <InnovationPageClient texts={texts} lang={lang} />
}
