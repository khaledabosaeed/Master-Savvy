"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"

type Section = {
  title: string
  content: string
  list?: string[]
  footer?: string
}

export default function PrivacyPage() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"

  const sections: Section[] = useMemo(() => {
    const arr = (key: string): string[] => {
      const v = t(key, { returnObjects: true })
      return Array.isArray(v) ? (v as string[]) : []
    }
    return [
      {
        title: t("privacy.introTitle"),
        content: t("privacy.introContent"),
        list: arr("privacy.introList"),
        footer: t("privacy.introFooter"),
      },
      {
        title: t("privacy.dataCollectionTitle"),
        content: t("privacy.dataCollectionContent"),
        list: arr("privacy.dataCollectionList"),
      },
      {
        title: t("privacy.dataSharingTitle"),
        content: t("privacy.dataSharingContent"),
      },
      {
        title: t("privacy.noSellingTitle"),
        content: t("privacy.noSellingContent"),
      },
      {
        title: t("privacy.dataRetentionTitle"),
        content: t("privacy.dataRetentionContent"),
      },
      {
        title: t("privacy.policyChangesTitle"),
        content: t("privacy.policyChangesContent"),
      },
      {
        title: t("privacy.yourRightsTitle"),
        content: t("privacy.yourRightsContent"),
        list: arr("privacy.yourRightsList"),
      },
    ].filter((section) => section.title && section.content)
  }, [t])

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 mt-20 md:mt-10 h-20 bg-[#3960F9]/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-[#3960F9]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <FormattedText text={t("privacy.title")} />
            </h1>
            <p className="text-gray-600 text-lg">
              <FormattedText text={t("privacy.lastUpdated")} />
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div className={`max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                  <FormattedText text={section.title} />
                </h2>

                <p className={`text-gray-700 leading-relaxed text-lg mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                  <FormattedText text={section.content} />
                </p>

                {section.list && section.list.length > 0 && (
                  <ul className={`space-y-3 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                    {section.list.map((item, i) => (
                      <li key={i} className={`text-gray-700 text-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <FormattedText text={item} />
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer ? (
                  <p className={`text-gray-700 leading-relaxed text-lg ${isRTL ? "text-right" : "text-left"}`}>
                    <FormattedText text={section.footer} />
                  </p>
                ) : null}

                {index < sections.length - 1 && <div className="mt-12 border-b border-gray-200" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
