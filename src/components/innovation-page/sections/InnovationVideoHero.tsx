"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import { cascadeStagger, fadeIn, fadeInUp, heroTitleReveal } from "@/lib/animations"

export default function InnovationVideoHero() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        src="/innovation/Savvy Innovation Site web_LQ_2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/35 to-gray-950/65" />

      <motion.div
        className={`relative z-10 flex h-full flex-col justify-end px-[clamp(1.5rem,4vw,3rem)] pb-[clamp(4rem,12vh,7rem)] pt-32 ${
          isRTL ? "items-end text-right" : "items-start text-left"
        }`}
        variants={cascadeStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={heroTitleReveal}
          className="max-w-3xl text-[clamp(1.875rem,5vw,3.75rem)] font-bold leading-[1.08] text-gray-50"
        >
          <FormattedText text={t("innovation.hero.title")} />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-[clamp(1rem,2.5vw,1.5rem)] max-w-xl text-base leading-relaxed text-gray-200 md:text-lg"
        >
          <FormattedText text={t("innovation.hero.subtitle")} />
        </motion.p>

        <motion.a
          href="#industries"
          variants={fadeIn}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gray-200 transition-colors hover:text-white"
          aria-label={t("innovation.hero.scrollHint")}
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  )
}
