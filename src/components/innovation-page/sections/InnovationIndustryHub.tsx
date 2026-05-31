"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
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
import { fadeInUp } from "@/lib/animations"

const DEFAULT_NAV_HEIGHT = 96
const NAV_ROOT_MARGIN = `-${DEFAULT_NAV_HEIGHT}px 0px -40% 0px`

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
          "py-0.5"
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
                "px-4 py-2 text-[0.8125rem]"
              } ${
                isActive
                  ? "bg-[oklch(0.38_0.16_264)] text-[oklch(0.99_0.003_260)] shadow-[0_2px_12px_oklch(0.38_0.16_264/0.28)]"
                  : "text-[oklch(0.48_0.014_260)] hover:bg-[oklch(0.94_0.006_260)] hover:text-[oklch(0.28_0.012_260)]"
              }`}
            >
              <FormattedText text={t(`innovation.industries.${industry.slug}.shortTitle`)} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function InnovationIndustryHub({ onScrollPastHero }: InnovationIndustryHubProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const [activeSlug, setActiveSlug] = useState<IndustrySlug>("food-beverage")
  const [tabsCompact, setTabsCompact] = useState(false)
  const tabRefs = useRef<Partial<Record<IndustrySlug, HTMLButtonElement | null>>>({})
  const pillScrollRef = useRef<HTMLDivElement>(null)
  const heroSentinelRef = useRef<HTMLDivElement>(null)
  const navCompactSentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navHeightRef = useRef(DEFAULT_NAV_HEIGHT)
  const activeSlugRef = useRef<IndustrySlug>("food-beverage")
  const isScrollingToSection = useRef(false)

  const scrollActiveTabIntoView = useCallback((slug: IndustrySlug) => {
    const btn = tabRefs.current[slug]
    if (!btn) return
    if (window.matchMedia("(min-width: 768px)").matches) return
    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [])

  const scrollToIndustry = useCallback((slug: IndustrySlug, smooth = true) => {
    const el = document.getElementById(slug)
    if (!el) return

    isScrollingToSection.current = true
    const top = el.getBoundingClientRect().top + window.scrollY - navHeightRef.current

    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })

    window.setTimeout(
      () => {
        isScrollingToSection.current = false
      },
      smooth ? 700 : 50
    )
  }, [])

  const setActiveIndustry = useCallback((slug: IndustrySlug, updateHash: boolean) => {
    if (activeSlugRef.current === slug) return

    activeSlugRef.current = slug
    setActiveSlug(slug)

    if (updateHash) {
      window.history.replaceState(null, "", `#${slug}`)
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const syncHeight = () => {
      const height = nav.offsetHeight
      navHeightRef.current = height
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

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!isIndustrySlug(hash)) return

    setActiveIndustry(hash, false)
    requestAnimationFrame(() => scrollToIndustry(hash, false))
  }, [scrollToIndustry, setActiveIndustry])

  useEffect(() => {
    const sentinel = heroSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
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
        setTabsCompact((prev) => (prev === compact ? prev : compact))
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
            setActiveIndustry(industry.slug, true)
          }
        },
        {
          threshold: 0.35,
          rootMargin: NAV_ROOT_MARGIN,
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [setActiveIndustry])

  const selectIndustry = useCallback(
    (slug: IndustrySlug) => {
      setActiveIndustry(slug, true)
      scrollActiveTabIntoView(slug)
      scrollToIndustry(slug)
    },
    [scrollActiveTabIntoView, scrollToIndustry, setActiveIndustry]
  )

  return (
    <>
      <InnovationVideoHero />

      <div id="industries" className="bg-[oklch(0.985_0.003_260)]">
        <div ref={heroSentinelRef} className="h-0" aria-hidden />

        <div
          ref={navRef}
          className={`sticky top-0 z-50 ${
            tabsCompact
              ? "bg-[oklch(0.99_0.002_260)] shadow-[0_1px_0_oklch(0.9_0.006_260)]"
              : "bg-[oklch(0.985_0.003_260)]"
          }`}
        >
          <div className="px-[clamp(1.25rem,4vw,3rem)]">
            <div className="mx-auto max-w-[82rem]">
              <div
                className={
         "py-3 md:py-3.5"
                }
              >
                <div
                  className={`rounded-2xl border border-[oklch(0.92_0.005_260)] bg-white ${
                    tabsCompact
                      ? "p-1.5 shadow-[0_1px_6px_-2px_oklch(0.2_0.02_260/0.08)]"
                      : "p-[clamp(0.75rem,2vw,1rem)] shadow-[0_4px_24px_-8px_oklch(0.2_0.02_260/0.08)]"
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
