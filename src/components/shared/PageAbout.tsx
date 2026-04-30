"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { staggerContainer } from "@/lib/animations"
import FormattedText from "./FormattedText"

export type Language = "en" | "ar"

interface ImageData {
  src: string
  alt: string
}

interface PageAboutProps {
  title: string
  description: string
  images: ImageData[]
}

export default function PageAbout({ title, description, images }: PageAboutProps) {
  const { language } = useLanguage()
  const isMobile = useIsMobile()
  const lang = language as Language
  const isRTL = lang === "ar"

  // base positions for each image
  const positions: Array<{ top: string; left?: string; right?: string }> = [
    { top: "18%", left: "12%" },   // image 0 - top left
    { top: "12%", right: "14%" },  // image 1 - top right
    { top: "52%", left: "22%" },   // image 2 - middle left
    { top: "70%", right: "18%" },  // image 3 - bottom right
  ]

  // انميشن ظهور مختلف لكل صورة - Optimized for mobile
  const getImageVariant = (index: number) => {
    const directions = [
      { x: isMobile ? -50 : -100, y: isMobile ? -30 : -50, rotate: isMobile ? 0 : -15 },
      { x: isMobile ? 50 : 100, y: isMobile ? -30 : -50, rotate: isMobile ? 0 : 15 },
      { x: isMobile ? -50 : -100, y: isMobile ? 30 : 50, rotate: isMobile ? 0 : -10 },
      { x: isMobile ? 50 : 100, y: isMobile ? 30 : 50, rotate: isMobile ? 0 : 10 },
    ]

    const dir = directions[index] || directions[0]

    return {
      hidden: {
        opacity: 0,
        x: dir.x,
        y: dir.y,
        rotate: dir.rotate,
        scale: isMobile ? 0.9 : 0.8,
        filter: isMobile ? "blur(5px)" : "blur(10px)"
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          stiffness: isMobile ? 100 : 80,
          damping: isMobile ? 25 : 20,
          delay: index * (isMobile ? 0.08 : 0.15),
        }
      }
    }
  }

  // انميشن الطفو المستمر - Disabled on mobile for performance
  const floatingAnimation = (index: number) => {
    if (isMobile) return {}
    
    const floatY = [0, -20, 0]
    const floatX = index % 2 === 0 ? [0, -10, 0] : [0, 10, 0]
    const duration = 4 + index * 0.5

    return {
      y: floatY,
      x: floatX,
      transition: {
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut" as const
        },
        x: {
          duration: duration * 0.8,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center py-10 md:py-12 lg:py-0 bg-white">
      {/* خلفية بسيطة مع اللون الأساسي */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3960F9] to-[#2848C7]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      {!isMobile && <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />}

      <div className="container h-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ============== TEXT COLUMN ============== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
            variants={staggerContainer}
            className={`z-30 ${isRTL ? "text-right md:text-right" : "text-left md:text-left"} relative px-3 md:px-0 order-2 md:order-1`}
          >
            {/* خلفية ديكورية للنص */}
            <motion.div
              initial={{ opacity: 0, scale: isMobile ? 0.9 : 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.4 : 0.6 }}
              className="absolute -inset-3 md:-inset-4 lg:-inset-8 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl"
            />

            {/* العنوان */}
            <motion.h2
              initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.1 : 0.2 }}
              className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-white"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
              }}
            >
              <FormattedText text={title} />
            </motion.h2>

            {/* خط ديكوري */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: isMobile ? "50px" : "60px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.2 : 0.4 }}
              className={`h-1 md:h-1.5 bg-white rounded-full mb-3 md:mb-4 lg:mb-6 shadow-lg ${isRTL ? "mr-auto md:mr-0" : "ml-0"}`}
              style={{ width: isMobile ? '50px' : '60px' }}
            />

            {/* الوصف */}
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.3 : 0.6 }}
              className="relative text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed max-w-full md:max-w-lg"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <FormattedText text={description} />
            </motion.p>

            {/* تأثير إضاءة خفيف - مخفي على الموبايل */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden md:block absolute -top-20 -left-20 w-40 h-40 bg-white rounded-full blur-3xl pointer-events-none"
              />
            )}
          </motion.div>

          {/* ============== IMAGES LAYER ============== */}
          {/* Desktop: Absolute positioned images */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="hidden md:block relative h-screen w-full order-1 md:order-2"
          >
            {images.slice(0, 4).map((img, i) => {
              const pos = positions[i] ?? { top: `${30 + i * 12}%`, left: "10%" }

              return (
                <motion.div
                  key={i}
                  variants={getImageVariant(i)}
                  animate={floatingAnimation(i)}
                  style={{
                    width: 271,
                    height: 267.75,
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    willChange: 'transform, opacity',
                  }}
                  whileHover={{
                    scale: 1.08,
                    zIndex: 10,
                    rotate: i % 2 === 0 ? 3 : -3,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  className="rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={271}
                      height={267.75}
                      className="object-cover w-full h-full"
                    />
                    {/* تأثير overlay مع اللون الأساسي */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                    {/* border لامع */}
                    <div className="absolute inset-0 border-2 border-white/30 rounded-xl" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Mobile: Grid layout - Optimized */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="md:hidden grid grid-cols-2 gap-2 sm:gap-3 order-1 md:order-2 mb-6"
          >
            {images.slice(0, 4).map((img, i) => (
              <motion.div
                key={i}
                variants={getImageVariant(i)}
                className="rounded-lg md:rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 271px"
                    quality={85}
                    loading="lazy"
                  />
                  {/* تأثير overlay مع اللون الأساسي */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/20 to-transparent" />
                  {/* border */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-lg md:rounded-xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
