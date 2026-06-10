"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

const whySavvyEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function WhySavvy() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const features = [
    {
      number: "01",
      title: t("media.whySavvy.feature1Title"),
      description: t("media.whySavvy.feature1Description"),
    },
    {
      number: "02",
      title: t("media.whySavvy.feature2Title"),
      description: t("media.whySavvy.feature2Description"),
    },
    {
      number: "03",
      title: t("media.whySavvy.feature3Title"),
      description: t("media.whySavvy.feature3Description"),
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#07111f] py-20 text-[#eef5ff] md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,196,255,0.32),transparent)]" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: whySavvyEase }}
          className={`mb-14 grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end ${
            isRTL ? "rtl text-right" : "ltr text-left"
          }`}
        >
          <h2 className="max-w-[14ch] text-3xl font-extrabold leading-[1.08] tracking-normal sm:text-4xl lg:text-5xl">
            <FormattedText text={t("media.whySavvy.title")} />
          </h2>
          <p className="max-w-[64ch] text-sm leading-7 text-[#b9c8dc] sm:text-base md:text-[17px] md:leading-8">
            <FormattedText text={t("media.whySavvy.subtitle")} />
          </p>
        </motion.div>

        <div className={`grid gap-4 lg:grid-cols-3 ${isRTL ? "rtl" : "ltr"}`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: whySavvyEase }}
              className="group rounded-2xl border border-[rgba(139,196,255,0.18)] bg-[rgba(251,252,253,0.055)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(139,196,255,0.38)] hover:bg-[rgba(251,252,253,0.085)] md:p-8"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="text-5xl font-extrabold leading-none text-[#8bc4ff] opacity-80 transition duration-300 group-hover:opacity-100">
                  {feature.number}
                </span>
                <span className="h-px flex-1 bg-[rgba(139,196,255,0.24)]" aria-hidden="true" />
              </div>

              <h3 className="mb-3 text-lg font-extrabold leading-snug text-[#f5f9ff] md:text-xl">
                <FormattedText text={feature.title} />
              </h3>

              <p className="text-sm leading-7 text-[#b9c8dc] md:text-[15px]">
                <FormattedText text={feature.description} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
