"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import { INDUSTRIES, type IndustrySlug } from "@/components/innovation-page/data/industries"
import { getIndustryImageUrl } from "@/lib/innovation-media"
import {
  infiniteMarqueeKeyframes,
  infiniteMarqueeTransition,
  sectionSlideUp,
  viewportConfig,
} from "@/lib/animations"

interface IndustriesSliderProps {
  currentSlug?: IndustrySlug
}

export default function IndustriesSlider({ currentSlug }: IndustriesSliderProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const prefersReduced = useReducedMotion()
  const controls = useAnimationControls()

  const items = INDUSTRIES.filter((item) => item.slug !== currentSlug)
  const loopItems = [...items, ...items]

  useEffect(() => {
    if (prefersReduced) return

    controls.start({
      x: [...infiniteMarqueeKeyframes],
      transition: infiniteMarqueeTransition,
    })
  }, [controls, prefersReduced])

  const pauseMarquee = () => controls.stop()

  const resumeMarquee = () => {
    if (prefersReduced) return

    controls.start({
      x: [...infiniteMarqueeKeyframes],
      transition: infiniteMarqueeTransition,
    })
  }

  return (
    <section
      className="overflow-hidden bg-gray-50 py-[clamp(4rem,8vw,6.5rem)]"
      id="other-industries"
    >
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
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
          <div className="overflow-hidden">
            <motion.div
              className="flex w-max gap-5"
              animate={controls}
              onMouseEnter={pauseMarquee}
              onMouseLeave={resumeMarquee}
            >
              {loopItems.map((industry, index) => {
                const baseKey = `innovation.industries.${industry.slug}`
                const imageUrl = getIndustryImageUrl(t, industry.slug)
                if (!imageUrl) return null

                return (
                  <Link
                    key={`${industry.slug}-${index}`}
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

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent md:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent md:w-24" />
        </div>
      </div>
    </section>
  )
}
