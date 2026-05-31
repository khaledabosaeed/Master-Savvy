"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import { getImpactStatIcon } from "@/components/innovation-page/data/impact-stat-icons"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import { fastStagger, sectionSlideUp, staggerItem, viewportConfig } from "@/lib/animations"

interface IndustryImpactStatsProps {
  slug: IndustrySlug
}

interface ImpactStat {
  icon: string
  label: string
  value: string
}

export default function IndustryImpactStats({ slug }: IndustryImpactStatsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"
  const baseKey = `innovation.industries.${slug}`
  const impactStats = t(`${baseKey}.impactStats`, { returnObjects: true }) as ImpactStat[]

  if (!Array.isArray(impactStats) || impactStats.length === 0) {
    return null
  }

  return (
    <section
      className="bg-[oklch(0.985_0.003_260)] py-[clamp(4rem,8vw,6.5rem)]"
      id="impact"
    >
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className="mb-[clamp(2rem,4vw,3.25rem)] text-center"
        >
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]">
            <FormattedText text={t(`${baseKey}.impactTitle`)} />
          </h2>
        </motion.header>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-[clamp(0.75rem,1.5vw,1rem)]"
          dir={isRTL ? "rtl" : "ltr"}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fastStagger}
        >
          {impactStats.map((stat, index) => {
            const Icon = getImpactStatIcon(stat.icon)

            return (
              <motion.article
                key={index}
                variants={staggerItem}
                className="flex min-h-[clamp(10rem,22vw,13rem)] flex-col items-center justify-center gap-[clamp(0.75rem,1.5vw,1rem)] rounded-[0.875rem] border border-[oklch(0.92_0.005_260)] bg-white px-[clamp(1rem,2vw,1.5rem)] py-[clamp(1.25rem,2.5vw,1.75rem)] text-center shadow-[0_4px_24px_-8px_oklch(0.2_0.02_260/0.08)]"
              >
                <Icon
                  className="h-[clamp(2rem,4vw,2.5rem)] w-[clamp(2rem,4vw,2.5rem)] shrink-0 text-[oklch(0.18_0.01_260)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-[1.5] text-[oklch(0.5_0.015_260)]">
                  <FormattedText text={stat.label} />
                </p>
                <p className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none tracking-[-0.02em] text-[oklch(0.52_0.12_264)]">
                  <FormattedText text={stat.value} />
                </p>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mt-[clamp(1.5rem,3vw,2rem)] text-[0.75rem] leading-[1.5] text-[oklch(0.48_0.02_260)] ${isRTL ? "text-left" : "text-right"}`}
        >
          <FormattedText text={t("innovation.impactFootnote")} />
        </motion.p>
      </div>
    </section>
  )
}
