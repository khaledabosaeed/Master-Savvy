"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import type { IndustrySlug, PuduRobotKey } from "@/components/innovation-page/data/industries"
import {
  getIndustryRecommendedRobots,
  getInnovationRobotImageUrl,
} from "@/lib/innovation-media"
import { fadeInUp, scaleStaggerItem, sectionSlideUp, staggerContainer, viewportConfig } from "@/lib/animations"

interface IndustryRobotsProps {
  slug: IndustrySlug
}

export default function IndustryRobots({ slug }: IndustryRobotsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const robots = getIndustryRecommendedRobots(t, slug)

  if (robots.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-[clamp(4rem,8vw,6.5rem)]" id="robots">
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-[clamp(2rem,4vw,3.25rem)] max-w-[38rem] ${isRTL ? "mr-0 ml-auto text-right" : "text-left"}`}
        >
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]">
            <FormattedText text={t("innovation.robotsTitle")} />
          </h2>
          <p className="mt-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.65] text-[oklch(0.48_0.02_260)]">
            <FormattedText text={t("innovation.robotsSubtitle")} />
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-[clamp(1.25rem,2.5vw,1.75rem)]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {robots.map((robotKey: PuduRobotKey) => {
            const imageUrl = getInnovationRobotImageUrl(t, robotKey)
            if (!imageUrl) return null

            return (
              <motion.article
                key={robotKey}
                variants={scaleStaggerItem}
                className="group overflow-hidden rounded-[0.875rem] bg-[oklch(0.985_0.004_260)] transition-[transform,box-shadow] duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[5px] hover:shadow-[0_24px_48px_oklch(0.18_0.01_260/0.1)]"
              >
                <div className="relative aspect-video overflow-hidden bg-[oklch(0.94_0.005_260)]">
                  <RemoteMediaImage
                    src={imageUrl}
                    alt={t(`innovation.robots.${robotKey}.name`)}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div
                  className={`border-t border-[oklch(0.91_0.006_260)] p-[clamp(1.125rem,2.5vw,1.625rem)] ${isRTL ? "text-right" : "text-left"}`}
                >
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[oklch(0.52_0.12_264)]">
                    Pudu Robotics
                  </p>
                  <h3 className="mt-[0.3rem] text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-[1.2] tracking-[-0.015em] text-[oklch(0.18_0.01_260)]">
                    <FormattedText text={t(`innovation.robots.${robotKey}.name`)} />
                  </h3>
                  <p className="mt-2 text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-[1.6] text-[oklch(0.52_0.015_260)]">
                    <FormattedText text={t(`innovation.robots.${robotKey}.description`)} />
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className={`mt-[clamp(2.5rem,5vw,3.5rem)] ${isRTL ? "text-right" : "text-left"}`}
        >
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-lg bg-[oklch(0.13_0.024_52)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[oklch(0.22_0.024_52)] hover:shadow-lg"
          >
            <FormattedText text={t("innovation.contactCta")} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
