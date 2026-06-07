"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import { getIndustryImageUrl } from "@/lib/innovation-media"
import { cascadeStagger, fadeInUp, heroTitleReveal, staggerItem } from "@/lib/animations"

interface IndustryHeroProps {
  slug: IndustrySlug
}

export default function IndustryHero({ slug }: IndustryHeroProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const baseKey = `innovation.industries.${slug}`
  const heroImage = getIndustryImageUrl(t, slug)

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[oklch(0.16_0.012_260)]">
      {heroImage ? (
        <RemoteMediaImage
          src={heroImage}
          alt={t(`${baseKey}.imageAlt`)}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[oklch(0.2_0.01_260)]" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.012_260/0.88)] via-[oklch(0.13_0.012_260/0.62)] to-[oklch(0.13_0.012_260/0.24)]" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[oklch(0.16_0.012_260/0.65)] to-transparent"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(3rem,10vh,6.5rem)] pt-32"
        variants={cascadeStagger}
        initial="hidden"
        animate="visible"
      >
        <Link
          href={`/${lang}/innovation#industries`}
          className={`mb-[clamp(1.5rem,4vh,2.75rem)] inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[oklch(0.97_0.006_260/0.1)] px-4 py-2 text-sm font-medium text-[oklch(0.9_0.012_260)] ring-1 ring-[oklch(0.97_0.006_260/0.2)] transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[oklch(0.97_0.006_260/0.16)] hover:text-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.7_0.12_264)] ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          <FormattedText text={t("innovation.backToIndustries")} />
        </Link>

        <motion.p
          variants={staggerItem}
          className="mb-4 text-sm font-semibold text-[oklch(0.76_0.12_264)]"
        >
          <FormattedText text={t(`${baseKey}.shortTitle`)} />
        </motion.p>

        <motion.h1
          variants={heroTitleReveal}
          className={`max-w-4xl text-[clamp(2.25rem,6vw,5.25rem)] font-bold leading-[0.98] text-[oklch(0.98_0.004_260)] md:leading-[0.95] ${isRTL ? "text-right" : "text-left"}`}
        >
          <FormattedText text={t(`${baseKey}.headline`)} />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className={`mt-[clamp(1.25rem,3vh,1.75rem)] max-w-[42rem] text-base leading-[1.75] text-[oklch(0.88_0.01_260)] md:text-lg ${isRTL ? "text-right" : "text-left"}`}
        >
          <FormattedText text={t(`${baseKey}.summary`)} />
        </motion.p>
      </motion.div>
    </section>
  )
}
