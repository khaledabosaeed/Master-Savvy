import PageTransition from "@/components/shared/PageTransition/PageTransition"
import ContactPage from "@/components/contact-page/ContactPage"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import { getDictionary } from "@/i18n/getDictionary"
import { contactPageHeaderTexts } from "@/i18n/page-header-texts"
import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export default async function Contact({ params }: ContactPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)
  const texts = contactPageHeaderTexts(dict)

  return (
    <>
      <UnifiedHeader texts={texts} hasBanner={false} />
      <PageTransition>
        <section id="contact" className="pt-20">
          <ContactPage />
        </section>
      </PageTransition>
    </>
  )
}
