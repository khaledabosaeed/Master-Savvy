"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import { useTranslation } from "react-i18next"
import FormattedText from "../FormattedText"

const partners = [
  { name: "Al Awaly", logo: "/home-page/partners/al-awaly.svg" },
  { name: "Sakani", logo: "/home-page/partners/sakani.svg" },
  { name: "NHC", logo: "/home-page/partners/nhc.svg" },
  { name: "Hisense", logo: "/home-page/partners/hisense.svg" },
  { name: "Mohammed Al Habib", logo: "/home-page/partners/mohammed-al-habib.svg" },
  { name: "Manzil Alarabia", logo: "/home-page/partners/manzil-alarabia.svg" },
  { name: "Samsung", logo: "/home-page/partners/samsung.svg" },
  { name: "UniTree", logo: "/home-page/partners/1.svg" },
  { name: "SGBF", logo: "/home-page/partners/2.svg" },
  { name: "SOTI One", logo: "/home-page/partners/3.svg" },
]

const duplicatedPartners = [...partners, ...partners]

function getImageSize(name: string) {
  if (name === "Hisense" || name === "Samsung") return "h-5 sm:h-6 md:h-7 lg:h-8"
  if (name === "UniTree") return "h-24 sm:h-28 md:h-32 lg:h-36"
  if (name === "SGBF" || name === "SOTI One") return "h-20 sm:h-24 md:h-28 lg:h-36"
  return "h-8 sm:h-10 md:h-12"
}

const PartnersSlider: React.FC = () => {
  const { t } = useTranslation()
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const baseX = useMotionValue(0)
  const scrollSpeed = -38
  const itemWidth = 200
  const totalWidth = partners.length * itemWidth

  useAnimationFrame((_t, delta) => {
    if (isPaused || shouldReduceMotion) return
    const moveBy = (scrollSpeed * delta) / 1000
    baseX.set(baseX.get() + moveBy)
  })

  useEffect(() => {
    const unsubscribe = baseX.on("change", (latest) => {
      if (latest <= -totalWidth) {
        baseX.set(0)
      }
    })
    return () => unsubscribe()
  }, [baseX, totalWidth])

  const x = useTransform(baseX, (v) => `${v}px`)

  return (
    <section className="overflow-hidden bg-[oklch(0.99_0.004_255)] py-12 md:py-16" aria-labelledby="partners-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <h2 id="partners-title" className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            <FormattedText text={t("partnersSlider.heading")} />
          </h2>
        </motion.div>

        <div
          className="relative"
          dir="ltr"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-8 will-change-transform sm:gap-12 md:gap-16 lg:gap-20"
              style={{ x, transform: "translateZ(0)" }}
            >
              {duplicatedPartners.map((partner, index) => {
                const isDuplicate = index >= partners.length

                return (
                  <div
                    key={`${partner.name}-${index}`}
                    aria-hidden={isDuplicate}
                    className="flex h-28 shrink-0 items-center justify-center opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-36"
                  >
                    <Image
                      src={partner.logo}
                      alt={isDuplicate ? "" : partner.name}
                      width={160}
                      height={96}
                      className={`${getImageSize(partner.name)} w-auto object-contain`}
                    />
                  </div>
                )
              })}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[oklch(0.99_0.004_255)] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[oklch(0.99_0.004_255)] to-transparent sm:w-28" />
        </div>
      </div>
    </section>
  )
}

export default PartnersSlider
