"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Building2, Eye, MapPinned, Users } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const impactStats = [
    {
      value: t("hero.impactStats.views.value"),
      label: t("hero.impactStats.views.label"),
      Icon: Eye,
    },
    {
      value: t("hero.impactStats.reach.value"),
      label: t("hero.impactStats.reach.label"),
      Icon: Users,
    },
    {
      value: t("hero.impactStats.experience.value"),
      label: t("hero.impactStats.experience.label"),
      Icon: MapPinned,
    },
    {
      value: t("hero.impactStats.enterprise.value"),
      label: t("hero.impactStats.enterprise.label"),
      Icon: Building2,
    },
  ]


  useEffect(() => {
    setAnimate(true)
  }, [])

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.95 : 0.85,
      y: isMobile ? 30 : 60,
      rotateX: isMobile ? 0 : 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.6 : 1.2,
        delay: isMobile ? 0.1 : 0.3,
        ease: heroEase,
      },
    },
  }


  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        delay: 0,
        ease: heroEase,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.7,
        delay: isMobile ? 0.1 : 0.15,
        ease: heroEase,
      },
    },
  }

  return (
    <section id="whoWeAre" className="relative flex min-h-screen flex-col overflow-hidden pt-[96px] md:pt-[120px]">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover object-center"
        quality={90}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,24,0.88)_0%,rgba(4,13,24,0.66)_46%,rgba(4,13,24,0.3)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(57,96,249,0.22),transparent_34%),linear-gradient(180deg,rgba(4,13,24,0.12)_0%,rgba(4,13,24,0.78)_100%)]" />

      <div className="container relative z-10 flex flex-1 flex-col justify-center py-10 md:py-16 lg:py-20" suppressHydrationWarning>
        <div
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-7 text-center md:gap-9"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              className="mb-4 max-w-[14ch] text-balance px-2 text-3xl font-extrabold leading-[1.08] tracking-normal text-[#f4f8fc] drop-shadow-[0_3px_16px_rgba(0,0,0,0.36)] sm:max-w-3xl md:mb-6 md:text-5xl lg:text-6xl"
            >
              <FormattedText text={t("hero.welcomeText")} />{" "}
              <span className="text-[#8bc4ff]">
                <FormattedText text={t("hero.savvyWorld")} />
              </span>
            </motion.h1>

            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              className="mb-4 max-w-3xl text-pretty px-2 text-sm leading-7 text-[#dce8f5] sm:text-base md:mb-5 md:text-lg md:leading-8"
            >
              <FormattedText text={t("hero.description")} />
            </motion.p>
          </div>

          <motion.aside
            variants={imageVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="w-full rounded-2xl border border-[rgba(139,196,255,0.34)] bg-[rgba(6,17,29,0.82)] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.34)] md:p-5"
            aria-label={t("hero.impactStats.ariaLabel")}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map(({ value, label, Icon }) => (
                <div
                  key={value}
                  className="flex min-h-[104px] items-center gap-4 rounded-xl border border-[rgba(139,196,255,0.14)] bg-[rgba(9,39,72,0.24)] px-4 py-4 text-start"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#529fff] bg-[rgba(9,39,72,0.54)] text-[#d6ecff] shadow-[0_0_24px_rgba(57,96,249,0.22)]">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 text-start">
                    <span className="block text-2xl font-extrabold leading-none tracking-normal text-[#eef7ff] md:text-3xl">
                      {value}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-snug text-[#d6deea]">
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs font-extrabold uppercase leading-relaxed tracking-[0.22em] text-[#399cff]">
              <FormattedText text={t("hero.impactStats.footer")} />
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
