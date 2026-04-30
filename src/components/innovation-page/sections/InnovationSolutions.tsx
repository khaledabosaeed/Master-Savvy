"use client"

import { motion } from "framer-motion"
import { Users, Leaf, Bot, Home } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"

export default function InnovationSolutions() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const solutions = [
    {
      icon: Users,
      title: t("innovation.solutions.solution1Title"),
      description: t("innovation.solutions.solution1Description"),
    },
    {
      icon: Leaf,
      title: t("innovation.solutions.solution2Title"),
      description: t("innovation.solutions.solution2Description"),
    },
    {
      icon: Bot,
      title: t("innovation.solutions.solution3Title"),
      description: t("innovation.solutions.solution3Description"),
    },
    {
      icon: Home,
      title: t("innovation.solutions.solution4Title"),
      description: t("innovation.solutions.solution4Description"),
    },
  ]

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
          transition={{ duration: isMobile ? 0.4 : 0.6 }}
          className={`mb-3 md:mb-4 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            {t("innovation.solutions.title")}
          </h2>
        </motion.div>

        {/* العنوان الفرعي */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.05 : 0.1 }}
          className={`mb-10 md:mb-16 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
        >
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            {t("innovation.solutions.subtitle")}
          </p>
        </motion.div>

        {/* الحلول */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: index * (isMobile ? 0.05 : 0.1) }}
                className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {/* الأيقونة */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : undefined}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6"
                >
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-gray-900" />
                </motion.div>

                {/* العنوان */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  {solution.title}
                </h3>

                {/* الوصف */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {solution.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



