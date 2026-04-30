"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, Users, Heart, UserCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

export default function MediaContent() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const features = [
    { icon: Clock, text: t("media.content.feature1"), link: "https://example.com/duration-analysis" },
    { icon: Users, text: t("media.content.feature2"), link: "https://example.com/visitor-analytics" },
    { icon: Heart, text: t("media.content.feature3"), link: "https://example.com/sentiment-analysis" },
    { icon: UserCheck, text: t("media.content.feature4"), link: "https://example.com/demographic-analysis" },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-6">

        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch`}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 order-2 lg:order-1 relative"
          >
            <div className="relative w-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/media/seconed/tow.jpeg"
                alt="Digital Display"
                fill
                className="object-cover"
              />
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mb-6 px-6 py-3 bg-[#3960F9] text-white rounded-full font-bold text-sm hover:bg-[#2848C7] transition-all shadow-lg ${isRTL ? 'self-start' : 'self-start'} w-fit`}
            >
              {t("media.content.button")}
            </motion.button> */}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <FormattedText text={t("media.content.bottomTitle")} />
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              <FormattedText text={t("media.content.bottomDescription")} />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.a
                    key={index}
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(57, 96, 249, 0.15)" }}
                    className={`flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer transition-all ${isRTL ? '' : ''}`}
                  >
                    <div className="shrink-0 w-12 h-12 bg-[#3960F9] rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      <FormattedText text={feature.text} />
                    </p>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
