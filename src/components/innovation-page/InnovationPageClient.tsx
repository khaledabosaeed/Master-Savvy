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
    // #region agent log
    fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationPageClient.tsx:handleScrollPastHero',message:'hideNav state change',data:{past,prevHideNav:hideNav},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    setHideNav(past)
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

      <PageTransition>
        <InnovationIndustryHub onScrollPastHero={handleScrollPastHero} />
      </PageTransition>
    </>
  )
}
