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
      className="overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-0"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className="flex w-max min-w-full flex-nowrap gap-2 py-0.5 md:w-full md:flex-wrap md:justify-center"
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
              className={`relative min-h-11 shrink-0 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] ${
                compact ? "px-3.5 py-2 text-[0.8125rem]" : "px-4 py-2 text-[0.875rem]"
              } ${
                isActive
                  ? "bg-[oklch(0.38_0.16_264)] text-[oklch(0.99_0.003_260)] shadow-[0_8px_24px_-14px_oklch(0.38_0.16_264/0.72)]"
                  : "text-[oklch(0.46_0.016_260)] hover:-translate-y-px hover:bg-[oklch(0.955_0.008_260)] hover:text-[oklch(0.22_0.014_260)]"
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
              ? "bg-[oklch(0.99_0.002_260/0.96)] shadow-[0_1px_0_oklch(0.9_0.006_260)]"
              : "bg-[oklch(0.985_0.003_260)]"
          }`}
        >
          <div className="px-[clamp(1.25rem,4vw,3rem)]">
            <div className="mx-auto max-w-[82rem]">
              <div
                className="py-3 md:py-3.5"
              >
                <div
                  className={`rounded-lg border border-[oklch(0.91_0.006_260)] bg-[oklch(0.998_0.003_260)] transition-[padding,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    tabsCompact
                      ? "p-1.5 shadow-[0_10px_30px_-26px_oklch(0.2_0.02_260/0.3)]"
                      : "p-[clamp(0.625rem,1.5vw,0.875rem)] shadow-[0_18px_48px_-36px_oklch(0.2_0.02_260/0.28)]"
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

        <div className="flex flex-col gap-[clamp(4rem,9vw,7rem)] px-[clamp(0.25rem,1.5vw,1rem)] pt-[clamp(0.75rem,2vw,1.25rem)] pb-[clamp(5rem,10vw,8rem)]">
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
