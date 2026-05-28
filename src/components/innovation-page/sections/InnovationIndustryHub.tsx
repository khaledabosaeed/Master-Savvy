"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import {
  INDUSTRIES,
  isIndustrySlug,
  type IndustrySlug,
} from "@/components/innovation-page/data/industries"
import InnovationVideoHero from "./InnovationVideoHero"
import IndustryPageSection from "./IndustryPageSection"
import { fadeInUp, transitions } from "@/lib/animations"

const DEFAULT_NAV_HEIGHT = 96

interface InnovationIndustryHubProps {
  onScrollPastHero?: (past: boolean) => void
}

function IndustryPillNav({
  activeSlug,
  isRTL,
  onSelect,
  tabRefs,
  scrollRef,
  compact,
}: {
  activeSlug: IndustrySlug
  isRTL: boolean
  onSelect: (slug: IndustrySlug) => void
  tabRefs: { current: Partial<Record<IndustrySlug, HTMLButtonElement | null>> }
  scrollRef: { current: HTMLDivElement | null }
  compact?: boolean
}) {
  const { t } = useTranslation()

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`flex w-max min-w-full flex-nowrap gap-2 md:w-full md:flex-wrap md:justify-center ${
          compact ? "py-0.5" : "py-1"
        }`}
        role="tablist"
        aria-label={t("innovation.industriesNavLabel")}
      >
        {INDUSTRIES.map((industry) => {
          const isActive = activeSlug === industry.slug
          return (
            <button
              key={industry.slug}
              ref={(node) => {
                tabRefs.current[industry.slug] = node
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(industry.slug)}
              className={`relative shrink-0 rounded-full font-medium whitespace-nowrap transition-colors duration-200 ${
                compact ? "px-4 py-2 text-[0.8125rem]" : "px-5 py-2.5 text-sm"
              } ${
                isActive
                  ? "text-[oklch(0.99_0.003_260)]"
                  : "text-[oklch(0.48_0.014_260)] hover:bg-[oklch(0.94_0.006_260)] hover:text-[oklch(0.28_0.012_260)]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="industryPill"
                  className="absolute inset-0 rounded-full bg-[oklch(0.38_0.16_264)] shadow-[0_2px_12px_oklch(0.38_0.16_264/0.28)]"
                  transition={transitions.spring}
                />
              )}
              <span className="relative z-10">
                <FormattedText text={t(`innovation.industries.${industry.slug}.shortTitle`)} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function InnovationIndustryHub({ onScrollPastHero }: InnovationIndustryHubProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const [activeSlug, setActiveSlug] = useState<IndustrySlug>("food-beverage")
  const [tabsCompact, setTabsCompact] = useState(false)
  const [navHeight, setNavHeight] = useState(DEFAULT_NAV_HEIGHT)
  const tabRefs = useRef<Partial<Record<IndustrySlug, HTMLButtonElement | null>>>({})
  const pillScrollRef = useRef<HTMLDivElement>(null)
  const heroSentinelRef = useRef<HTMLDivElement>(null)
  const navCompactSentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const isScrollingToSection = useRef(false)

  const scrollActiveTabIntoView = useCallback(() => {
    const btn = tabRefs.current[activeSlug]
    if (!btn) return

    if (window.matchMedia("(min-width: 768px)").matches) return

    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [activeSlug])

  const scrollToIndustry = useCallback(
    (slug: IndustrySlug, smooth = true) => {
      const el = document.getElementById(slug)
      if (!el) return

      isScrollingToSection.current = true
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight

      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })

      window.setTimeout(
        () => {
          isScrollingToSection.current = false
        },
        smooth ? 700 : 50
      )
    },
    [navHeight]
  )

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const syncHeight = () => {
      const height = nav.offsetHeight
      // #region agent log
      fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:syncHeight',message:'nav ResizeObserver fired',data:{height,prevNavHeight:navHeight,tabsCompact},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      setNavHeight(height)
      document.documentElement.style.setProperty("--innovation-nav-height", `${height}px`)
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(nav)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty("--innovation-nav-height")
    }
  }, [tabsCompact])

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(scrollActiveTabIntoView)
    return () => cancelAnimationFrame(frame)
  }, [scrollActiveTabIntoView, tabsCompact, language])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!isIndustrySlug(hash)) return

    setActiveSlug(hash)
    requestAnimationFrame(() => scrollToIndustry(hash, false))
  }, [scrollToIndustry])

  useEffect(() => {
    const sentinel = heroSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
        // #region agent log
        fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:heroSentinel',message:'hero sentinel IO',data:{pastHero,isIntersecting:entry.isIntersecting,top:entry.boundingClientRect.top,scrollY:window.scrollY},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        onScrollPastHero?.(pastHero)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onScrollPastHero])

  useEffect(() => {
    const sentinel = navCompactSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const compact = !entry.isIntersecting && entry.boundingClientRect.top < 0
        // #region agent log
        fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:navCompactSentinel',message:'compact sentinel IO',data:{compact,isIntersecting:entry.isIntersecting,top:entry.boundingClientRect.top,scrollY:window.scrollY},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        setTabsCompact(compact)
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    INDUSTRIES.forEach((industry) => {
      const el = document.getElementById(industry.slug)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (isScrollingToSection.current) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            // #region agent log
            fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:industryIO',message:'industry section active',data:{slug:industry.slug,ratio:entry.intersectionRatio,scrollY:window.scrollY,navHeight},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            setActiveSlug(industry.slug)
            window.history.replaceState(null, "", `#${industry.slug}`)
          }
        },
        {
          threshold: [0.35, 0.5, 0.65],
          rootMargin: `-${navHeight}px 0px -40% 0px`,
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [navHeight])

  useEffect(() => {
    let rafId = 0
    let lastLog = 0
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const now = Date.now()
        if (now - lastLog < 200) return
        lastLog = now
        const industriesEl = document.getElementById("industries")
        const rect = industriesEl?.getBoundingClientRect()
        // #region agent log
        fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:scroll',message:'scroll sample',data:{scrollY:window.scrollY,industriesTop:rect?.top,tabsCompact,navHeight},timestamp:now,hypothesisId:'E'})}).catch(()=>{});
        // #endregion
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [tabsCompact, navHeight])

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7875/ingest/52d72fea-007b-40ff-8c4a-89fd4e6c5937',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cb7e6c'},body:JSON.stringify({sessionId:'cb7e6c',location:'InnovationIndustryHub.tsx:industryObservers',message:'industry observers recreated',data:{navHeight,observerCount:INDUSTRIES.length},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  }, [navHeight])

  const selectIndustry = useCallback(
    (slug: IndustrySlug) => {
      setActiveSlug(slug)
      window.history.replaceState(null, "", `#${slug}`)
      scrollToIndustry(slug)
    },
    [scrollToIndustry]
  )

  return (
    <>
      <InnovationVideoHero />

      <div id="industries" className="bg-[oklch(0.985_0.003_260)]">
        <div ref={heroSentinelRef} className="h-0" aria-hidden />

        <div
          ref={navRef}
          className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
            tabsCompact
              ? "bg-[oklch(0.99_0.002_260)]/95 shadow-[0_1px_0_oklch(0.9_0.006_260),0_8px_24px_-12px_oklch(0.2_0.02_260/0.12)] backdrop-blur-md"
              : "bg-[oklch(0.985_0.003_260)]"
          }`}
        >
          <div className="px-[clamp(1.25rem,4vw,3rem)]">
            <div className="mx-auto max-w-[82rem]">
              <div
                className={`transition-[padding] duration-300 ${
                  tabsCompact
                    ? "py-3 md:py-3.5"
                    : "pt-[clamp(2.5rem,6vw,4rem)] pb-[clamp(1.5rem,3vw,2rem)]"
                }`}
              >
                {/* <AnimatePresence initial={false}>
                  {!tabsCompact && (
                    <motion.header
                      key="industries-intro"
                      initial={{ opacity: 0, y: 16 }} 
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={transitions.medium}
                      className={`mb-[clamp(1.5rem,4vw,2.25rem)] max-w-2xl ${isRTL ? "mr-auto text-right" : "text-left"}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[oklch(0.48_0.14_264)]">
                        <FormattedText text={t("innovation.industriesNavLabel")} />
                      </p>
                      <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[oklch(0.16_0.012_260)]">
                        <FormattedText text={t("innovation.industriesSectionTitle")} />
                      </h2>
                      <p className="mt-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.7] text-[oklch(0.48_0.014_260)]">
                        <FormattedText text={t("innovation.industriesSectionSubtitle")} />
                      </p>
                    </motion.header>
                  )}
                </AnimatePresence> */}

                <div
                  className={`rounded-2xl border transition-[padding,background-color,border-color,box-shadow] duration-300 ${
                    tabsCompact
                      ? "border-[oklch(0.92_0.005_260)] bg-white/90 p-1.5 shadow-[0_2px_12px_-4px_oklch(0.2_0.02_260/0.08)]"
                      : "border-[oklch(0.92_0.005_260)] bg-white p-[clamp(0.75rem,2vw,1rem)] shadow-[0_4px_24px_-8px_oklch(0.2_0.02_260/0.08)]"
                  }`}
                >
                  <IndustryPillNav
                    activeSlug={activeSlug}
                    isRTL={isRTL}
                    onSelect={selectIndustry}
                    tabRefs={tabRefs}
                    scrollRef={pillScrollRef}
                    compact={tabsCompact}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={navCompactSentinelRef} className="h-0" aria-hidden />

        <div className="flex flex-col gap-[clamp(5rem,10vw,7.5rem)] px-[clamp(0.5rem,2vw,1rem)] pt-[clamp(0.75rem,2vw,1.25rem)] pb-[clamp(5rem,10vw,8rem)]">
          {INDUSTRIES.map((industry, index) => (
            <motion.div
              key={industry.slug}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              <IndustryPageSection industry={industry} isFirst={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
