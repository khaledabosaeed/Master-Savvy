"use client"

import { useState } from "react"
import PageTransition from "@/components/shared/PageTransition/PageTransition"
import InnovationIndustryHub from "@/components/innovation-page/sections/InnovationIndustryHub"
import UnifiedHeader from "@/components/shared/UnifiedHeader"
import type { PageHeaderTexts } from "@/i18n/page-header-texts"

interface InnovationPageClientProps {
  texts: PageHeaderTexts
  lang: string
}

export default function InnovationPageClient({ texts, lang }: InnovationPageClientProps) {
  const [hideNav, setHideNav] = useState(false)

  const handleScrollPastHero = (past: boolean) => {
    setHideNav((prev) => (prev === past ? prev : past))
  }

  return (  
    <>
      <UnifiedHeader
        texts={texts}
        hasBanner={false}
        logoSrc="/innovation/invo.svg"
        logoHref={`/${lang}/innovation`}
        transparentHeader
        hideOnScroll={hideNav}
      />

<div id="#industries">
      <PageTransition >
        <InnovationIndustryHub onScrollPastHero={handleScrollPastHero} />
      </PageTransition>
      </div>
    </>
  )
}
