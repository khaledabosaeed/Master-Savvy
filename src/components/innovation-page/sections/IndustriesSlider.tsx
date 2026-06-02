"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import { INDUSTRIES, type IndustrySlug } from "@/components/innovation-page/data/industries"
import { getIndustryImageUrl } from "@/lib/innovation-media"
import { sectionSlideUp, viewportConfig } from "@/lib/animations"

const CARD_WIDTH = 288 // w-72
const CARD_GAP = 20 // gap-5
const CARD_STEP = CARD_WIDTH + CARD_GAP

interface IndustriesSliderProps {
  currentSlug?: IndustrySlug
}

export default function IndustriesSlider({ currentSlug }: IndustriesSliderProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const prefersReduced = useReducedMotion()

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)

  const items = INDUSTRIES.filter((item) => item.slug !== currentSlug)

  const updateScrollBounds = useCallback(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const max = Math.max(0, track.scrollWidth - container.clientWidth)
    setMaxOffset(max)
    setOffset((prev) => Math.min(prev, max))
  }, [])

  useEffect(() => {
    updateScrollBounds()
    window.addEventListener("resize", updateScrollBounds)
    return () => window.removeEventListener("resize", updateScrollBounds)
  }, [updateScrollBounds, items, currentSlug])

  const canScroll = maxOffset > 0
  const canGoPrev = offset > 0
  const canGoNext = offset < maxOffset - 1

  const goPrev = useCallback(() => {
    setOffset((prev) => Math.max(0, prev - CARD_STEP))
  }, [])

  const goNext = useCallback(() => {
    setOffset((prev) => Math.min(maxOffset, prev + CARD_STEP))
  }, [maxOffset])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canScroll) return

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      if (isRTL) {
        goNext()
      } else {
        goPrev()
      }
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      if (isRTL) {
        goPrev()
      } else {
        goNext()
      }
    }
  }

  return (
    <section
      className="overflow-hidden bg-gray-50 py-[clamp(4rem,8vw,6.5rem)]"
      id="other-industries"
    >
      <div className="mx-auto w-full max-w-[100rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-[clamp(2rem,4vw,3.25rem)] max-w-[38rem] ${isRTL ? "mr-0 ml-auto text-right" : "text-left"}`}
        >
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]">
            <FormattedText text={t("innovation.otherIndustriesTitle")} />
          </h2>
        </motion.header>

        <div className="relative" dir="ltr">
          {canScroll && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={!canGoPrev}
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.97_0.005_260/0.92)] text-[oklch(0.28_0.02_260)] shadow-md transition-[transform,background-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] disabled:pointer-events-none disabled:opacity-40 md:left-4"
                aria-label={t("common.previousImage")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.97_0.005_260/0.92)] text-[oklch(0.28_0.02_260)] shadow-md transition-[transform,background-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] disabled:pointer-events-none disabled:opacity-40 md:right-4"
                aria-label={t("common.nextImage")}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            ref={containerRef}
            className="overflow-hidden"
            role={canScroll ? "group" : undefined}
            aria-roledescription={canScroll ? "carousel" : undefined}
            aria-label={t("innovation.otherIndustriesTitle")}
            tabIndex={canScroll ? 0 : undefined}
            onKeyDown={handleKeyDown}
          >
            <motion.div
              ref={trackRef}
              className="flex w-max gap-5"
              animate={{ x: -offset }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 30, mass: 0.5 }
              }
            >
              {items.map((industry) => {
                const baseKey = `innovation.industries.${industry.slug}`
                const imageUrl = getIndustryImageUrl(t, industry.slug)
                if (!imageUrl) return null

                return (
                  <Link
                    key={industry.slug}
                    href={`/${lang}/innovation/${industry.slug}`}
                    className="group relative h-52 w-72 shrink-0 overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
                  >
                    <RemoteMediaImage
                      src={imageUrl}
                      alt={t(`${baseKey}.imageAlt`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                        <FormattedText text={t(`${baseKey}.shortTitle`)} />
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-50">
                        <FormattedText text={t(`${baseKey}.title`)} />
                      </p>
                    </div>
                  </Link>
                )
              })}
            </motion.div>
          </div>

          {canGoPrev && (
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent md:w-24" />
          )}
          {canGoNext && (
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent md:w-24" />
          )}
        </div>
      </div>
    </section>
  )
}
