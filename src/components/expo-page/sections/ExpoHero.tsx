"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function ExpoHero() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setAnimKey((prev) => prev + 1)
  }, [lang])

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white pt-20 md:pt-5 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className={`flex flex-col ${isRTL ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-16`}>
          <motion.div
            key={animKey}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {t("expo.hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {t("expo.hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`flex flex-wrap gap-4 ${isRTL ? "justify-end md:justify-start" : "justify-start"}`}
            >
              <motion.a
                href={`/${lang}/contact`}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("expo.hero.contactUs")}
              </motion.a>

              <motion.a
                href="#services"
                className="inline-block px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("expo.hero.learnMore")}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="relative aspect-video bg-gray-100">
                <video
                  autoPlay
                  loop
                  muted
                  src="/expo/Savvy Expo_LQ_2.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
