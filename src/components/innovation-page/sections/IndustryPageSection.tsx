"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import type { IndustryRef } from "@/components/innovation-page/data/industries"
import { getIndustryImageUrl } from "@/lib/innovation-media"
import {
  cascadeStagger,
  fadeInUp,
  heroImageReveal,
  staggerItem,
} from "@/lib/animations"

interface IndustryPageSectionProps {
  industry: IndustryRef
  isFirst?: boolean
}

export default function IndustryPageSection({ industry, isFirst }: IndustryPageSectionProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const baseKey = `innovation.industries.${industry.slug}`
  const cardImage = getIndustryImageUrl(t, industry.slug)

  return (
    <section
      id={industry.slug}
      className="scroll-mt-[var(--innovation-nav-height,96px)]"
    >
      <div className="mx-auto w-full max-w-[82rem] px-[clamp(1rem,3vw,2rem)]">
        <div
          className={`relative overflow-hidden rounded-lg shadow-[0_28px_90px_-58px_oklch(0.16_0.02_260/0.56)] ${
            isFirst
              ? "min-h-[clamp(40rem,78vh,60rem)] max-md:min-h-[clamp(34rem,86svh,44rem)]"
              : "min-h-[clamp(38rem,74vh,58rem)] max-md:min-h-[clamp(32rem,82svh,42rem)]"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            variants={heroImageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {cardImage ? (
              <RemoteMediaImage
                src={cardImage}
                alt={t(`${baseKey}.imageAlt`)}
                fill
                className="object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            ) : (
              <div className="h-full w-full bg-[oklch(0.2_0.01_260)]" aria-hidden />
            )}
          </motion.div>

          <motion.div
            className={`absolute inset-0 z-[2] flex items-end bg-[linear-gradient(180deg,oklch(0.11_0.018_52/0.24)_0%,oklch(0.11_0.018_52/0.62)_54%,oklch(0.11_0.018_52/0.86)_100%)] p-[clamp(1.5rem,5vw,4.5rem)] md:items-center ${
              isRTL
                ? "justify-end md:bg-[linear-gradient(270deg,oklch(0.11_0.018_52/0.84)_0%,oklch(0.11_0.018_52/0.58)_46%,oklch(0.11_0.018_52/0.24)_100%)]"
                : "justify-start md:bg-[linear-gradient(90deg,oklch(0.11_0.018_52/0.84)_0%,oklch(0.11_0.018_52/0.58)_46%,oklch(0.11_0.018_52/0.24)_100%)]"
            }`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className={`flex max-w-[min(42rem,100%)] flex-col ${isRTL ? "items-start text-right md:ml-auto" : "items-start text-left md:mr-auto"}`}
              variants={cascadeStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.p
                className=" mb-[clamp(0.625rem,1.5vw,0.875rem)] text-xs font-semibold uppercase tracking-[0.12em] text-[oklch(0.72_0.14_264)]  "
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.shortTitle`)} />
              </motion.p>

              <motion.h2
                className="max-w-[13ch] text-[clamp(2.125rem,5vw,4rem)] font-bold leading-[1.02] tracking-normal text-[oklch(0.98_0.005_60)] max-md:!text-[clamp(2rem,9vw,3rem)]"
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.title`)} />
              </motion.h2>

              <motion.p
                className="mt-[clamp(1rem,2vw,1.375rem)] max-w-[58ch] text-[clamp(0.9375rem,1.6vw,1.0625rem)] leading-[1.75] text-[oklch(0.86_0.018_60)] max-md:max-w-none"
                variants={staggerItem}
              >
                <FormattedText text={t(`${baseKey}.summary`)} />
              </motion.p>

              <motion.div variants={staggerItem}>
                <Link
                  href={`/${lang}/innovation/${industry.slug}`}
                  className="group/cta mt-[clamp(1.375rem,2.5vw,1.875rem)] inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[oklch(0.92_0.01_60/0.28)] bg-[oklch(0.98_0.005_60/0.1)] px-4 py-2 text-sm font-semibold text-[oklch(0.98_0.005_60)] no-underline transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.75_0.15_264/0.72)] hover:bg-[oklch(0.75_0.15_264/0.16)] hover:text-[oklch(0.9_0.08_264)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.75_0.15_264)]"
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
