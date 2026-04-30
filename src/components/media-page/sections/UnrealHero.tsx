/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function UnrealHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  return (
    <section className={`relative w-full bg-white   flex items-center md:mb-0   ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="relative h-full  mb-20 z-10 container mx-auto px-4 md:px-6 w-full">
        <div className={`flex flex-col h-full ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 lg:gap-30 items-center`}>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="flex-1 h-full"
          >
            {/* Badge - Top Right */}
            <motion.div variants={itemVariants} className={`mb-6 ${isRTL ? '' : ''}`}>
              <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                {t("media.hero.badge")}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t("media.hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`text-sm md:text-base text-gray-600 mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t("media.hero.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <motion.a
                href="#content"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("media.hero.primaryButton")}
              </motion.a>

              <motion.a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("media.hero.secondaryButton")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Left Side - Image and Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="flex-1 flex flex-col items-center relative h-full"
          >
            {/* Main Image with overlap effect */}
            <motion.div
              variants={imageVariants}
              className="h-[440px] relative"
            >
              <div className="relative h-full inline-block  max-w-md">
                
                <Image
                  src="/media/hero/hero-image.png"
                  alt={t("media.hero.imageAlt")}
                  width={450}
                  height={624}  
                  className=" h-full  object-cover rounded-3xl shadow-2xl"
                  priority
                />
                {/* Overlay with inset shadow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 40px 5px rgba(0, 0, 0, 0.25)' }}
                />
              </div>

              {/* Stats Badge - Overlapping bottom left */}
              {/* <motion.div
                variants={badgeVariants}
                className={`absolute bottom-0 ${isRTL ? 'left-0' : 'left-0'} transform ${isRTL ? 'translate-x-6' : 'translate-x-6'} translate-y-12`}
              >
                <div className={`bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>


                  <div className={`flex gap-20 ${isRTL ? 'flex-row-reverse' : ''}`}>

                  <div className={`flex flex-col justify-between   ${isRTL ? '' : ''}`}>
                  <Link href={`/${lang}`}>
                  <Image
                    src="/Savvy 2 1.svg"
                    alt="Savvy"
                    width={100}
                    height={70}
                    className="h-10 mb-10 md:h-13 w-auto"
                  />
                </Link>
                   <div className={`flex flex-col`}>
                      <div className="text-xs text-gray-600 ">{content.statsLabel2}</div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600">99.4%</div>
                    </div>

                    <div className="w-px bg-gray-200" />

                  </div>
                    <div className={`flex flex-col justify-end ${isRTL ? 'items-end' : 'items-start'}`}>
                      <div className="text-xs text-gray-600 mt-1">{content.statsLabel1}</div>
                      <div className="text-end text-2xl md:text-3xl font-bold text-blue-600">89</div>
                    </div>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
