"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import { fastStagger, sectionSlideUp, staggerItem, viewportConfig } from "@/lib/animations"

interface IndustryUseCasesProps {
  slug: IndustrySlug
}

export default function IndustryUseCases({ slug }: IndustryUseCasesProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"
  const baseKey = `innovation.industries.${slug}`
  const useCases = t(`${baseKey}.useCases`, { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <section className="bg-white py-[clamp(4rem,8vw,6.5rem)]" id="use-cases">
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-[clamp(2rem,4vw,3.25rem)] max-w-[38rem] ${isRTL ? "mr-0 ml-auto text-right" : "text-left"}`}
        >
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]">
            <FormattedText text={t("innovation.useCasesTitle")} />
          </h2>
          <p className="mt-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.65] text-[oklch(0.48_0.02_260)]">
            <FormattedText text={t(`${baseKey}.useCasesIntro`)} />
          </p>
        </motion.header>

        <motion.div
          className="flex flex-col"
          dir={isRTL ? "rtl" : "ltr"}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fastStagger}
        >
          {useCases.map((useCase, index) => (
            <motion.article
              key={index}
              variants={staggerItem}
              className={`grid grid-cols-[3.5rem_1fr] gap-x-[clamp(1.5rem,3vw,2.5rem)] border-t border-[oklch(0.88_0.007_260)] py-[clamp(1.5rem,3vw,2.25rem)] last:border-b ${isRTL ? "text-right" : "text-left"}`}
            >
              <span
                className="pt-[0.1em] text-[clamp(1.625rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-[oklch(0.88_0.007_260)]"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col justify-center">
                <h3 className="text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-[1.3] tracking-[-0.01em] text-[oklch(0.18_0.01_260)]">
                  <FormattedText text={useCase.title} />
                </h3>
                <p className="mt-2 text-[clamp(0.875rem,1.4vw,0.9375rem)] leading-[1.65] text-[oklch(0.5_0.015_260)]">
                  <FormattedText text={useCase.description} />
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
