"use client"

import { motion, useInView } from "framer-motion"
import { type LucideIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useRef } from "react"

export type Language = "en" | "ar"

export interface ServiceData {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

interface PageServicesProps {
  title: string
  subtitle?: string
  services: ServiceData[]
}

export default function PageServices({
  title,
  subtitle,
  services,
}: PageServicesProps) {
  const { language } = useLanguage()
  const isMobile = useIsMobile()
  const lang = language as Language
  const isRTL = lang === "ar"

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: isMobile ? 0.1 : 0.2 })

  return (
    <section ref={sectionRef} className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Services Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: index * (isMobile ? 0.05 : 0.1) }}
                className={`flex gap-4 md:gap-6 flex-col items-center justify-center ${isRTL ? ' text-right' : 'text-left'}`}
              >
                {/* Icon with Blue Background */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : undefined}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 pt-1 md:pt-2 text-center">
                  {/* Title */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
