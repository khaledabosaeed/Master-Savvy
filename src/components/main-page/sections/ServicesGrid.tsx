"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import {
  sectionSlideUp,

  fadeInLeft,
  fadeInRight,
} from "@/lib/animations"
import FormattedText from "@/components/shared/FormattedText"

export default function ServicesGrid() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  const services = [
    {
      title: t("servicesGrid.innovationTitle"),
      description: t("servicesGrid.innovationDescription"),
      button: t("servicesGrid.innovationButton"),
      image: "/home-page/services/1.jpg",
      align: "right" as const,
    },
    {
      title: t("servicesGrid.expoTitle"),
      description: t("servicesGrid.expoDescription"),
      button: t("servicesGrid.expoButton"),
      image: "/home-page/services/2.png",
      align: "left" as const,
    },
    {
      title: t("servicesGrid.mediaTitle"),
      description: t("servicesGrid.mediaDescription"),
      button: t("servicesGrid.mediaButton"),
      image: "/home-page/services/3.jpg",
      align: "right" as const,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionSlideUp}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            <FormattedText text={t("servicesGrid.title")} />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <FormattedText text={t("servicesGrid.subtitle")} />
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${service.align === "left" && "md:grid-flow-dense"
                } ${isRTL ? 'rtl' : 'ltr'}`}
            >
              {/* Image */}
              <motion.div
                variants={service.align === "right" ? fadeInRight : fadeInLeft}
                className={`relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group ${service.align === "left" && "md:col-start-2"
                  }`}
              >
                <motion.div
                  whileHover="hover"
                  className="relative w-full h-full"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={service.align === "right" ? fadeInLeft : fadeInRight}
                className={`${isRTL ? 'text-right' : 'text-left'} space-y-6`}
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <FormattedText text={service.title} />
                </motion.h3>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <FormattedText text={service.description} />
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    className="px-8 py-4 bg-primary text-white rounded-full font-semibold transition-all relative overflow-hidden group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FormattedText text={service.button} className="relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
