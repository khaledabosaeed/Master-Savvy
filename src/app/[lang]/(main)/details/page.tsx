import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ArticleDetailPage from "@/components/article-detail-page/ArticleDetailPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { articleDetailPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: Promise<{ lang: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const texts = articleDetailPageHeaderTexts(getDictionary(lang))

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <ArticleDetailPage lang={lang} />
      </PageTransition>
    </>
  )
}
