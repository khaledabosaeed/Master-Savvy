"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

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
    <section className="py-20 md:py-32 bg-[#F2F2F2]">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <FormattedText text={t("media.whySavvy.title")} />
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            <FormattedText text={t("media.whySavvy.subtitle")} />
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ${isRTL ? "rtl" : "ltr"}`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <span className="text-3xl font-bold text-[#3960F9]">{feature.number}</span>
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                <FormattedText text={feature.title} />
              </h3>

              <p className="text-gray-600 leading-relaxed text-center">
                <FormattedText text={feature.description} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
