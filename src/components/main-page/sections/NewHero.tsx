/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa6"
import { Leaf, Wind, Brain, Bot } from "lucide-react"
import FormattedText from "@/components/shared/FormattedText"

export default function NewHero() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const goalTexts = [0, 1, 2, 3].map((i) => t(`hero.goals.${i}`))
  const getGoalHref = (i: number): string | null => {
    const path = String(t(`hero.goalLinks.${i}`)).trim()
    if (!path) return null
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`
  }

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Enhanced animation variants with beautiful entrance effect
  // Simplified animations on mobile for better performance
  const imageVariants = {
    hidden: {
  // Enhanced animation variants with beautiful entrance effect
  // Simplified animations on mobile for better performance      opacity: 0,
      scale: isMobile ? 0.95 : 0.85,
      y: isMobile ? 30 : 60,
      rotateX: isMobile ? 0 : 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.6 : 1.2,
        delay: isMobile ? 0.1 : 0.3,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }


  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        delay: 0,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.7,
        delay: isMobile ? 0.1 : 0.15,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const socialContainerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1] as any,
        delay: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.08
      }
    }
  }

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      } as any
    }
  }

  const goalsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isMobile ? 0.2 : 0.4,
        staggerChildren: isMobile ? 0.06 : 0.1,
      },
    },
  }

  const goalItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  return (
    <section className="relative  flex flex-col pt-[100px] md:pt-[120px] overflow-visible md:overflow-hidden">

      {/* Enhanced gradient background */}
      <div className="absolute inset-0  bg-white" />

      {/* Large radial glow behind image area - Hidden on mobile for performance */}
      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[60px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      )}

      {/* Content */}
      <div className="container relative z-10 py-8 md:py-16 lg:py-24 flex-1 flex flex-col justify-center" suppressHydrationWarning>
        <div
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Main Heading - Responsive sizing */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2"
          >
            <FormattedText text={t("hero.welcomeText")} />{" "}
            <span className="text-primary">
              <FormattedText text={t("hero.savvyWorld")} />
            </span>
          </motion.h1>

          {/* Description - Responsive typography for longer text */}
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-3 md:mb-4 max-w-4xl mx-auto px-4 leading-relaxed"
          >
            <FormattedText text={t("hero.description")} />
          </motion.p>

   

          {/* Robot Image with enhanced blending - Optimized for mobile */}
          <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          whileHover={!isMobile ? {
            scale: 1.03,
              transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as any }
            } : undefined}
            className="relative w-full max-w-5xl mx-auto mb-2 md:mb-4 flex items-center justify-center"
            style={{ perspective: isMobile ? 'none' : '1000px' }}
          >
  <div className="relative w-full flex items-center justify-center min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
    <div className="relative z-10 w-full flex items-center justify-center">
      <Image
        src="/home-page/hero/new.png"
        alt="Robot hand with coffee"
        width={isMobile ? 800 : 1200}
        height={isMobile ? 800 : 1200}
        className="object-contain h-auto max-w-full"
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        quality={isMobile ? 85 : 90}
        style={{
          filter: isMobile ? "brightness(1.02) contrast(1.01)" : "brightness(1.05) contrast(1.02) saturate(0.95)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.7) 95%, rgba(0,0,0,0) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <Image
          src="/home-page/hero/ghyom.png"
          alt="Cloud effect"
          width={isMobile ? 800 : 1200}
          height={isMobile ? 800 : 1200}
          className="object-contain w-full h-auto"
        />
      </motion.div>
    </div>
  </div>
</motion.div>

                 {/* Social Media Icons - Separate links for each platform */}
                 <div className="relative z-20  pb-4 md:pb-6 flex justify-center">
            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              className="flex items-center gap-3  md:gap-4"
            >
     {[
  { 
    Icon: FaTiktok, 
    color: "text-black",
    url: "https://www.tiktok.com/@mr.savvy_saudi",
    ariaLabel: t("hero.socialTiktok")
  },
  { 
    Icon: FaLinkedinIn, 
    color: "text-[#0077B5]",
    url: "https://www.linkedin.com/company/savvy-world/",
    ariaLabel: t("hero.socialLinkedin")
  },
  { 
    Icon: FaInstagram, 
    color: "text-[#E1306C]",
    url: "https://www.instagram.com/mr.savvy_saudi",
    ariaLabel: t("hero.socialInstagram")
  },
  { 
    Icon: FaSnapchatGhost, 
    color: "text-[#FFFC00] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]",
    url: "https://www.snapchat.com/@mr.savvysaudi",
    ariaLabel: t("hero.socialSnapchat")
  }
].map(({ Icon, color, url, ariaLabel }, index) => (
  <motion.a
    key={index}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    variants={socialIconVariants}
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} text-4xl md:text-3xl lg:text-4xl xl:text-5xl transform transition-transform duration-300 hover:scale-110 rounded-full p-2 hover:bg-gray-100 transition-colors`}
    aria-label={ariaLabel}
  >
    <Icon />
  </motion.a>
))}
            </motion.div>
          </div>


        </div>
      </div>
    </section>
  )
}
