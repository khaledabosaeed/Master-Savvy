"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

export default function ContactHero() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [language])

  const title = t("contact.heroTitle")
  const subtitle = t("contact.heroSubtitle")

  return (
    <section className="relative py-24 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          key={key}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#3960F9] rounded-full mb-6 cursor-default shadow-lg ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <FormattedText text={t("contact.heroBadge")} className="text-white text-sm font-semibold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <FormattedText text={title} />
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-linear-to-r from-transparent via-[#3960F9] to-transparent mx-auto mb-6 rounded-full"
            style={{ width: "120px" }}
          />

          <motion.p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            <FormattedText text={subtitle} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[#3960F9]/10 rounded-2xl"
            >
              <Mail className="w-8 h-8 text-[#3960F9]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
