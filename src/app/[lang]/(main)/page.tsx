import HomePageClient from "@/components/main-page/HomePageClient"
import { getHomePageTexts } from "@/i18n/getHomePageTexts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  const { texts, galleryHeading } = getHomePageTexts(lang)

  return <HomePageClient texts={texts} galleryHeading={galleryHeading} />
}
