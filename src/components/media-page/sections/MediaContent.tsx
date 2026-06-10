"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, Users, Heart, UserCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

const mediaContentEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function MediaContent() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const features = [
    { icon: Clock, text: t("media.content.feature1") },
    { icon: Users, text: t("media.content.feature2") },
    { icon: Heart, text: t("media.content.feature3") },
    { icon: UserCheck, text: t("media.content.feature4") },
  ]

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-20 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(57,96,249,0.22),transparent)]" />
      <div className="container">
        <div
          className={`grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 ${
            isRTL ? "lg:[direction:rtl]" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.1, ease: mediaContentEase }}
            className="relative order-2 lg:order-none"
          >
            <div className="relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-[2rem] bg-[#111827] shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:min-h-[520px]">
              <Image
                src="/media/seconed/tow.jpeg"
                alt={t("media.content.bottomTitle")}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,19,0)_48%,rgba(6,11,19,0.62)_100%)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: mediaContentEase }}
            className={`order-1 flex flex-col justify-center lg:order-none ${
              isRTL ? "text-right lg:[direction:rtl]" : "text-left"
            }`}
          >
            <h2 className="mb-5 max-w-[14ch] text-3xl font-extrabold leading-[1.08] tracking-normal text-[#07111f] sm:text-4xl lg:text-5xl">
              <FormattedText text={t("media.content.bottomTitle")} />
            </h2>

            <p className="mb-9 max-w-[62ch] text-sm leading-7 text-[#506176] sm:text-base md:text-[17px] md:leading-8">
              <FormattedText text={t("media.content.bottomDescription")} />
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: mediaContentEase }}
                    className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-[#dfe7f1] bg-[#fbfcfd] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b8c7ff] hover:shadow-[0_24px_64px_rgba(57,96,249,0.12)]"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#3960f9] text-[#fbfcfd] shadow-[0_16px_36px_rgba(57,96,249,0.28)] transition duration-300 group-hover:bg-[#1f43d6]">
                      <IconComponent className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <p className={`text-sm font-bold leading-6 text-[#172033] md:text-base ${isRTL ? "text-right" : "text-left"}`}>
                      <FormattedText text={feature.text} />
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
