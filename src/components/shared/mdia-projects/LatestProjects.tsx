"use client"

import { useState, memo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Counter from "../Counter"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import type { Language } from "./content"
import { getProjects } from "./content"
import {
  fadeInUp,
  viewportConfig,
  // crossfade,
  sectionSlideUp,
} from "@/lib/animations"
import FormattedText from "@/components/shared/FormattedText"

function MadiaProjects() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as Language
  const isRTL = lang === "ar"

  const [activeProject, setActiveProject] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [showArrows, setShowArrows] = useState({ left: false, right: false })
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const projects = getProjects(lang)
  const title = t("media.content.topTitle")
  const subtitle = t("media.content.topDescription")

  const currentProject = projects[activeProject]

  const handleTabClick = useCallback((index: number) => {
    setActiveProject(index)
    setPhotoIndex(0) // Reset photo index when changing project
  }, [])

  const handlePreviousPhoto = useCallback(() => {
    if (currentProject?.images && currentProject.images.length > 0) {
      setPhotoIndex((prev) => {
        // Move back by 4, or to the last valid group if at the beginning
        if (prev <= 3) {
          // Find the last valid starting index for a group of 4
          const lastIndex = Math.max(0, currentProject.images.length - 4)
          return lastIndex
        }
        return prev - 4
      })
    }
  }, [currentProject?.images])

  const handleNextPhoto = useCallback(() => {
    if (currentProject?.images && currentProject.images.length > 0) {
      setPhotoIndex((prev) => {
        // Move forward by 4, or loop to start if at the end
        const maxIndex = Math.max(0, currentProject.images.length - 4)
        if (prev >= maxIndex) {
          return 0
        }
        return prev + 4
      })
    }
  }, [currentProject?.images])

  // Check if tabs overflow and show/hide arrows
  useEffect(() => {
    const checkOverflow = () => {
      const container = tabsContainerRef.current
      if (!container) return

      const hasOverflow = container.scrollWidth > container.clientWidth
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth

      setShowArrows({
        left: hasOverflow && scrollLeft > 0,
        right: hasOverflow && scrollLeft < maxScroll - 1, // -1 for floating point precision
      })
    }

    // Check overflow after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkOverflow, 100)
    window.addEventListener('resize', checkOverflow)
    const container = tabsContainerRef.current
    container?.addEventListener('scroll', checkOverflow)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkOverflow)
      container?.removeEventListener('scroll', checkOverflow)
    }
  }, [projects, activeProject])

  // Scroll active tab into view when it changes
  useEffect(() => {
    const container = tabsContainerRef.current
    if (!container) return

    const activeButton = container.querySelector(`[data-tab-index="${activeProject}"]`) as HTMLElement
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeProject])

  // Scroll tabs handlers
  const scrollTabs = useCallback((direction: 'left' | 'right') => {
    const container = tabsContainerRef.current
    if (!container) return

    const scrollAmount = 200 // pixels to scroll
    const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount
    const isRTLScroll = isRTL ? -scrollDirection : scrollDirection

    container.scrollBy({
      left: isRTLScroll,
      behavior: 'smooth',
    })
  }, [isRTL])  

  const getDriveEmbedUrl = (url: string): string => {
    if (!url) return ""
  
    // استخراج الـ fileId من روابط Google Drive
    const regExp =
      /(?:\/file\/d\/|id=)([a-zA-Z0-9_-]{10,})/
    const match = url.match(regExp)
    const fileId = match ? match[1] : null
  
    if (!fileId) return url
  
    // رابط embed
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  

  // Safety check after hooks
  if (!currentProject) {
    return null
  }

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        {/* Title and Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`text-center mb-6 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-3xl md:text-4xl  nolg:text-5xl font-bold text-gray-900 mb-3">
            <FormattedText text={title} />
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            <FormattedText text={subtitle} />
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="relative mb-12 border-b border-gray-200 pb-4"
        >
          {/* Left Arrow */}
          {showArrows.left && (
            <button
              onClick={() => scrollTabs('left')}
              className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 h-full px-2 md:px-4 flex items-center justify-center bg-white/80 hover:bg-white z-20 transition-colors border-r ${isRTL ? 'border-l border-r-0' : 'border-r'} border-gray-200`}
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Scrollable Tabs Container */}
          <div
            ref={tabsContainerRef}
            className={`flex gap-8 overflow-x-auto scrollbar-hide ${showArrows.left ? (isRTL ? 'pr-12' : 'pl-12') : ''} ${showArrows.right ? (isRTL ? 'pl-12' : 'pr-12') : ''}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-8 justify-center min-w-max">
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  data-tab-index={index}
                  onClick={() => handleTabClick(index)}
                  className={`relative px-5 py-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${activeProject === index
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FormattedText text={project.title} />
                  {activeProject === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-900"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {showArrows.right && (
            <button
              onClick={() => scrollTabs('right')}
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full px-2 md:px-4 flex items-center justify-center bg-white/80 hover:bg-white z-20 transition-colors border-l ${isRTL ? 'border-r border-l-0' : 'border-l'} border-gray-200`}
              aria-label="Scroll tabs right"
            >
              <ChevronRight className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          )}
        </motion.div>

        {/* Main Content - Image and Text Side by Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Media Section - 1 Video + Photo Gallery with Arrows */}
            <div className={`space-y-4 ${isRTL ? 'md:order-2 rtl' : 'md:order-1'}`}>
              {/* Video Row */}
              {currentProject.video ? (
                <div className="relative w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
    <video
      src={currentProject.video}
      className="w-full h-full object-cover"
      // controls
      autoPlay
      muted
      loop
      playsInline
    />
                </div>
              ) : (
                <div className="relative w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={currentProject.images[0]}
                    alt={`${currentProject.title} - Photo ${1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

         
            </div>

            {/* Content Section */}
            <div className={`${isRTL ? 'md:order-1 text-right' : 'md:order-2 text-left'} space-y-6`}>
              <motion.h3
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <FormattedText text={currentProject.title} />
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-gray-600 leading-relaxed"
              >
                <FormattedText text={currentProject.description} />
              </motion.p>

              {/* CTA Button */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#3960F9] text-white rounded-lg font-medium text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow"
                >
                  {currentProject.ctaButton}
                </motion.button>
              </motion.div> */}

              {/* Statistics - Horizontal Layout */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {currentProject.statistics.map((stat, index) => (
                  <div key={index} className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-baseline gap-1 mb-1">
                      {stat.value ? (
                        <Counter
                          to={stat.value}
                          className="text-3xl md:text-4xl font-bold text-gray-900"
                          formatter={(n) => `${Math.floor(n)}`}
                        />
                      ) : (
                        <span className="text-1xl md:text-4xl font-bold text-gray-900">
                          {stat.value}
                        </span>
                      )}
                      {stat.label && (
                        <span className="text-xs md:text-2xl font-bold text-gray-900">
                          {stat.label}
                        </span>
                      )}
                      {stat.formatter && (
                        <span className="text-xs md:text-2xl font-bold text-gray-900">
                          {stat.formatter}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </motion.div> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
// Memoize component to prevent unnecessary re-renders
export default memo(MadiaProjects)
