"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import { getInnovationHeroVideoUrl } from "@/lib/innovation-media"
import { cascadeStagger, fadeIn, fadeInUp, heroTitleReveal } from "@/lib/animations"

export default function InnovationVideoHero() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const heroVideo = getInnovationHeroVideoUrl(t)

  return (
    <section id="hero" className="relative h-[100svh] min-h-[38rem] w-full overflow-hidden bg-[oklch(0.14_0.012_260)]">
      {heroVideo ? (
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[oklch(0.15_0.01_260)]" aria-hidden />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.11_0.014_260/0.46)_0%,oklch(0.11_0.014_260/0.22)_34%,oklch(0.11_0.014_260/0.72)_100%)]" />
      <div
        className="absolute inset-x-0 bottom-0 h-[38vh] bg-[radial-gradient(ellipse_at_20%_100%,oklch(0.38_0.16_264/0.34),transparent_62%)]"
        aria-hidden
      />

      <motion.div
        className={`relative z-10 flex h-full flex-col justify-end px-[clamp(1.25rem,4vw,3.5rem)] pb-[clamp(5.5rem,13vh,8rem)] pt-32 ${
          isRTL ? "items-end text-right" : "items-start text-left"
        }`}
        variants={cascadeStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={heroTitleReveal}
          className="max-w-[14ch] text-[clamp(2.25rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-normal text-[oklch(0.98_0.004_260)] max-md:!text-[clamp(2.25rem,11vw,3.5rem)] md:max-w-[11ch]"
        >
          <FormattedText text={t("innovation.hero.title")} />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-[clamp(1rem,2.5vw,1.5rem)] max-w-[62ch] text-[0.9375rem] leading-[1.75] text-[oklch(0.88_0.01_260)] md:text-lg"
        >
          <FormattedText text={t("innovation.hero.subtitle")} />
        </motion.p>

        <motion.a
          href="#industries"
          variants={fadeIn}
          className="absolute bottom-7 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[oklch(0.98_0.004_260/0.24)] bg-[oklch(0.12_0.012_260/0.38)] text-[oklch(0.9_0.01_260)] transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.98_0.004_260/0.42)] hover:bg-[oklch(0.12_0.012_260/0.54)] hover:text-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.72_0.14_264)]"
          aria-label={t("innovation.hero.scrollHint")}
        >
          <ChevronDown
            className={`h-6 w-6 ${prefersReducedMotion ? "" : "motion-safe:animate-pulse"}`}
            aria-hidden
          />
        </motion.a>
      </motion.div>
    </section>
  )
}
