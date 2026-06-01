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
    <section className="relative min-h-[70vh] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-gray-950/30" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(3rem,8vh,5rem)] pt-32"
        variants={cascadeStagger}
        initial="hidden"
        animate="visible"
      >
        <Link
          href={`/${lang}/innovation#industries`}
          className={`mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-200 transition-colors hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          <FormattedText text={t("innovation.backToIndustries")} />
        </Link>

        <motion.p
          variants={staggerItem}
          className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300"
        >
          <FormattedText text={t(`${baseKey}.shortTitle`)} />
        </motion.p>

        <motion.h1
          variants={heroTitleReveal}
          className={`max-w-3xl text-3xl font-bold text-gray-50 md:text-5xl ${isRTL ? "text-right" : "text-left"}`}
        >
          <FormattedText text={t(`${baseKey}.headline`)} />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className={`mt-5 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg ${isRTL ? "text-right" : "text-left"}`}
        >
          <FormattedText text={t(`${baseKey}.summary`)} />
        </motion.p>
      </motion.div>
    </section>
  )
}
