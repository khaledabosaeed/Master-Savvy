"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function InnovationHero() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const [key, setKey] = useState(0)

  // Re-trigger animations on language change
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [lang])

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>

          {/* Text Content - Left Side (Right in RTL) */}
          <motion.div
            key={key}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto"
            >
              {t("innovation.hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg lg:text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              {t("innovation.hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end md:justify-start' : 'justify-start'}`}
            >
              {/* <motion.a
              href={`https://mr.savvy.savvyworld.ai/`}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              >
                {isRTL ? "احجز مستر ساڤي الآن " : "Learn More"}
              </motion.a> */}

              <motion.a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("common.contactUs")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Video/Image - Right Side (Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              {/* Video Thumbnail/Poster */}
              <div className="relative aspect-video bg-gray-100">
          <video 
          src="/innovation/Savvy Innovation Site web_LQ_2.mp4"
  autoPlay
  loop
  muted
            ></video>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-blue-600 transition-colors"
                  >
                    <Play className="w-8 h-8 text-gray-900 group-hover:text-white ml-1" fill="currentColor" />
                  </motion.button> */}
                </div>

                {/* Video Duration Badge */}
                {/* <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-2">
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>Watch Video • 3:21</span>
                </div> */}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
