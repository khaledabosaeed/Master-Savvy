"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import type { IndustryConfig } from "@/components/innovation-page/data/industries"
import {
  cascadeStagger,
  fadeInUp,
  heroImageReveal,
  staggerItem,
  viewportConfig,
} from "@/lib/animations"

interface IndustryPageSectionProps {
  industry: IndustryConfig
  isFirst?: boolean
}

export default function IndustryPageSection({ industry, isFirst }: IndustryPageSectionProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const baseKey = `innovation.industries.${industry.slug}`

  return (
    <section
      id={industry.slug}
      className="scroll-mt-[var(--innovation-nav-height,96px)]"
    >
      <div className="mx-auto w-full max-w-[82rem] px-[clamp(1rem,3vw,2rem)]">
        <div
          className={`relative overflow-hidden rounded-2xl ${
            isFirst
              ? "min-h-[clamp(40rem,78vh,60rem)] max-md:min-h-[clamp(36rem,88vh,46rem)]"
              : "min-h-[clamp(38rem,74vh,58rem)] max-md:min-h-[clamp(34rem,86vh,44rem)]"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            variants={heroImageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <Image
              src={industry.image}
              alt={t(`${baseKey}.imageAlt`)}
              fill
              className="object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[2] flex items-center justify-center bg-[linear-gradient(to_bottom,oklch(0.13_0.024_52/0.45)_0%,oklch(0.13_0.024_52/0.72)_35%,oklch(0.13_0.024_52/0.72)_65%,oklch(0.13_0.024_52/0.45)_100%)] p-[clamp(2.5rem,6vw,5rem)] max-md:bg-[linear-gradient(to_bottom,oklch(0.13_0.024_52/0.55)_0%,oklch(0.13_0.024_52/0.82)_50%,oklch(0.13_0.024_52/0.55)_100%)] max-md:p-[clamp(2rem,5vw,3rem)]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="flex max-w-[min(44rem,100%)] flex-col items-center text-center"
              variants={cascadeStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.p
                className="mb-[clamp(0.625rem,1.5vw,0.875rem)] text-xs font-semibold uppercase tracking-[0.14em] text-[oklch(0.65_0.12_264)]"
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.shortTitle`)} />
              </motion.p>

              <motion.h2
                className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[oklch(0.97_0.005_60)]"
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.title`)} />
              </motion.h2>

              <motion.p
                className="mt-[clamp(1rem,2vw,1.375rem)] max-w-[52ch] text-[clamp(0.9375rem,1.6vw,1.0625rem)] leading-[1.75] text-[oklch(0.72_0.018_60)] max-md:max-w-none"
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.summary`)} />
              </motion.p>

              <motion.div variants={staggerItem}>
                <Link
                  href={`/${lang}/innovation/${industry.slug}`}
                  className="group/cta mt-[clamp(1.375rem,2.5vw,1.875rem)] inline-flex w-fit items-center gap-2 border-b-[1.5px] border-[oklch(0.52_0.12_264)] pb-1 text-sm font-semibold text-[oklch(0.97_0.005_60)] no-underline transition-colors duration-200 hover:border-[oklch(0.75_0.15_264)] hover:text-[oklch(0.75_0.15_264)]"
                >
                  <FormattedText text={t("innovation.exploreIndustry")} />
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-[3px] ${isRTL ? "rotate-180 group-hover/cta:-translate-x-[3px]" : ""}`}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
