"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Award,
  BadgeCheck,
  Cpu,
  Factory,
  Globe2,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

const absenEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

type ScreenText = {
  eyebrow: string
  title: string
  description: string
  message: string
  centerLabel: string
  visualScenes: string[]
  leftCapabilities: string[]
  rightCapabilities: string[]
  highlights: string[]
  kpis: [string, string][]
}

const highlightIcons = [
  BadgeCheck,
  Sparkles,
  Globe2,
  RadioTower,
  Wrench,
  ShieldCheck,
  Cpu,
  Award,
  Factory,
]

export default function AbsenInnovationSection() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const text = t("media.screens", { returnObjects: true }) as ScreenText
  const isRTL = language === "ar"

  const capabilityColumns = isRTL
    ? [text.rightCapabilities, text.leftCapabilities]
    : [text.leftCapabilities, text.rightCapabilities]

  return (
    <section
      id="screens"
      className="relative isolate scroll-mt-24 overflow-hidden bg-transparent py-20 text-[oklch(0.965_0.008_245)] md:py-28"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: absenEase }}
          className={`mx-auto mb-12 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[oklch(0.501_0.253_264.6/0.36)] bg-[oklch(0.13_0.02_250/0.72)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[oklch(0.501_0.253_264.6)]">
              {text.eyebrow}
            </p>
            <h2 className="max-w-[13ch] text-3xl font-extrabold leading-[1.04] tracking-normal text-[oklch(0.985_0.01_230)] sm:text-4xl lg:text-6xl">
              {text.title}
            </h2>
          </div>
          <div className="max-w-[68ch] lg:justify-self-end">
            <p className="text-sm leading-7 text-[oklch(0.82_0.03_232)] sm:text-base md:text-[17px] md:leading-8">
              {text.description}
            </p>
            <p className="mt-5 text-sm font-bold leading-7 text-[oklch(0.501_0.253_264.6)] md:text-base">
              {text.message}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-[minmax(150px,0.28fr)_minmax(0,1fr)_minmax(150px,0.28fr)] xl:items-center">
          <CapabilityRail items={capabilityColumns[0]} align={isRTL ? "right" : "left"} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.08, ease: absenEase }}
            className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.13_0.02_250)] p-4 shadow-[0_30px_100px_oklch(0.03_0.02_250/0.52)] sm:p-6 lg:min-h-[610px]"
          >
            <div className="absolute inset-x-8 top-12 h-32 rounded-[100%] border-t border-[oklch(0.501_0.253_264.6/0.22)] opacity-80" />
            <div className="absolute inset-x-10 bottom-12 h-24 rounded-[100%] border-b border-[oklch(0.501_0.253_264.6/0.18)]" />

            <div className="relative mx-auto mt-8 max-w-4xl [perspective:1100px]">
              <div className="relative overflow-hidden rounded-[2rem] border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.14_0.02_250)] shadow-[0_0_70px_oklch(0.501_0.253_264.6/0.2)] [transform:rotateX(4deg)_rotateY(-7deg)]">
                <div className="relative aspect-[16/8.5]">
                  <Image
                    src="/media/hero/hero.png"
                    alt={text.centerLabel}
                    fill
                    sizes="(max-width: 1280px) 100vw, 760px"
                    className="object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,transparent_0%,oklch(0.09_0.035_248/0.12)_45%,oklch(0.04_0.018_250/0.86)_100%)]" />
                  <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,oklch(0.501_0.253_264.6/0.18)_1px,transparent_1px),linear-gradient(oklch(0.501_0.253_264.6/0.12)_1px,transparent_1px)] [background-size:10px_10px]" />
                </div>
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
                  {text.visualScenes.map((scene) => (
                    <span
                      key={scene}
                      className="rounded-full border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.105_0.018_250/0.72)] px-3 py-1.5 text-[11px] font-extrabold text-[oklch(0.965_0.008_245)]"
                    >
                      {scene}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {text.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index]
                const isWide = index === 0 || index === text.highlights.length - 1
                return (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.035, ease: absenEase }}
                    className={`group flex min-h-[86px] items-center gap-3 rounded-2xl border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.14_0.02_250)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[oklch(0.501_0.253_264.6/0.36)] hover:bg-[oklch(0.16_0.025_250)] ${
                      isWide ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[oklch(0.501_0.253_264.6/0.18)] text-[oklch(0.501_0.253_264.6)] ring-1 ring-[oklch(0.501_0.253_264.6/0.28)]">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-extrabold leading-6 text-[oklch(0.94_0.015_230)]">
                      {highlight}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <CapabilityRail items={capabilityColumns[1]} align={isRTL ? "left" : "right"} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: absenEase }}
          className="mt-7 grid overflow-hidden rounded-2xl border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.13_0.02_250)] sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
        >
          {text.kpis.map(([value, label]) => (
            <div
              key={`${value}-${label}`}
              className="min-h-[92px] border-b border-[oklch(0.88_0.035_245/0.12)] p-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b xl:border-b-0"
            >
              <p className="text-lg font-extrabold leading-tight text-[oklch(0.501_0.253_264.6)] md:text-xl">
                {value}
              </p>
              <p className="mt-2 text-xs font-bold leading-5 text-[oklch(0.74_0.035_232)]">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CapabilityRail({
  items,
  align,
}: {
  items: readonly string[]
  align: "left" | "right"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: absenEase }}
      className={`grid gap-3 sm:grid-cols-2 xl:grid-cols-1 ${align === "right" ? "xl:text-right" : "xl:text-left"}`}
    >
      {items.map((item, index) => (
        <div
          key={item}
          className="relative min-h-[72px] overflow-hidden rounded-2xl border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.13_0.02_250)] px-4 py-3"
        >
          <div className="absolute inset-y-3 end-3 w-10 rounded-full bg-[oklch(0.501_0.253_264.6/0.12)] blur-xl" />
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[oklch(0.501_0.253_264.6)]">
            0{index + 1}
          </p>
          <p className="mt-2 text-sm font-extrabold leading-5 text-[oklch(0.94_0.015_230)]">
            {item}
          </p>
        </div>
      ))}
    </motion.div>
  )
}
