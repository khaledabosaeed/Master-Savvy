"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useSmoothScroll } from "@/contexts/SmoothScrollContext"
import LanguageSwitcher from "./LanguageSwitcher"
import Badge from "./Badge"
import { motion, AnimatePresence } from "framer-motion"

interface UnifiedHeaderProps {
  texts?: Record<string, string>
  showBadge?: boolean
  hasBanner?: boolean
  logoHref?: string
  logoAlt?: string
  logoSrc?: string
  transparentHeader?: boolean
}

export default function UnifiedHeader({ texts = {}, showBadge = true, hasBanner = true, logoHref, logoAlt = "Savvy", logoSrc = "/Savvy 2 1.svg", transparentHeader = false }: UnifiedHeaderProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const { scrollTo } = useSmoothScroll()
  const lang = language as "en" | "ar"
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isRobotsOpen, setIsRobotsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isRTL = lang === "ar"
  const dropdownRef = useRef<HTMLDivElement>(null)
  const robotsDropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const robotsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const serviceSections = t("serviceBrandNames", { returnObjects: true }) as string[]

  const aboutSectionLinks = [
    { href: `/${lang}/expo`, label: t("nav.expo") },
    { href: `/${lang}/innovation`, label: t("nav.innovation") },
    { href: `/${lang}/media`, label: t("nav.media") },
  ] as const

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsServicesOpen(false)
      }
      if (robotsDropdownRef.current && !robotsDropdownRef.current.contains(target)) {
        setIsRobotsOpen(false)
      }
    }

    if (isServicesOpen || isRobotsOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isServicesOpen, isRobotsOpen])

  // Scroll detection - set initial state and listen for scroll
  useEffect(() => {
    setIsScrolled(window.scrollY > 100)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (robotsTimeoutRef.current) {
        clearTimeout(robotsTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 200)
  }

  const handleRobotsMouseEnter = () => {
    if (robotsTimeoutRef.current) {
      clearTimeout(robotsTimeoutRef.current)
    }
    setIsRobotsOpen(true)
  }

  const handleRobotsMouseLeave = () => {
    robotsTimeoutRef.current = setTimeout(() => {
      setIsRobotsOpen(false)
    }, 200)
  }

  const isTransparent = transparentHeader && !isScrolled
  const navTextClass = isTransparent ? "text-white hover:text-white/90" : "text-gray-700 hover:text-gray-900"

  return (
    <>
      <motion.header
        animate={{
          top: isScrolled ? "0px" : (hasBanner ? (isMobile ? "35px" : "40px") : "0px")
        }}
        transition={{
          duration: isMobile ? 0.2 : 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`fixed left-0 right-0 ${isMobileMenuOpen ? "z-[1000]" : "z-40"} mb-10 md:mb-0 transition-colors duration-300 ${
          transparentHeader && !isScrolled
            ? "bg-transparent shadow-none"
            : "bg-white/95 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
            <div className={`flex items-center justify-between gap-3 md:gap-4 lg:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Logo - Smaller on mobile, white when transparent */}
              <div className="shrink-0">
                <Link href={logoHref || `/${lang}`}>
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={100}
                    height={70}
                    className={`h-10 md:h-13 w-auto transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`}
                  />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-gray-900"}`}
                aria-label={t("common.toggleMenu")}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Navigation */}
              <nav className={`hidden md:flex items-center gap-8 flex-1 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {Object.entries(texts)
                  .filter(([key]) => key !== "ourServices" && key !== "ourRobots" && key !== "contactUs")
                  .map(([key, value]) => {
                    // Handle "main" and "news" as page links, others as section links
                    const href = key === "main" ? `/${lang}` : key === "news" ? `/${lang}/news` : `#${key}`
                    
                    // Handle "main" link: if already on home page, scroll to top instead of navigating
                    const handleMainClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (key === "main") {
                        const homePath = `/${lang}`
                        const homePathWithSlash = `/${lang}/`
                        // If already on home page (with or without trailing slash), scroll to top
                        if (pathname === homePath || pathname === homePathWithSlash) {
                          e.preventDefault()
                          scrollTo(0, { duration: 1.5 })
                        }
                        // Otherwise, let the Link handle navigation normally
                        // PageTransition will scroll to top on navigation
                      }
                    }
                    
                    return (
                      <Link
                        key={key}
                        href={href}
                        onClick={handleMainClick}
                        className={`${navTextClass} transition-colors text-sm font-medium whitespace-nowrap flex items-center`}
                      >
                        {value}
                        {key === "whySavvy" && showBadge && <Badge text="1512 × 69" />}
                      </Link>
                    )
                  })}

                {/* Services Dropdown */}
                {texts["ourServices"] && (
                  <div
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`${navTextClass} transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap`}
                    >
                      {texts["ourServices"]}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}
                        >
                          <Link
                            href={`/${lang}`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[0]}
                          </Link>
                          <Link
                            href={`/${lang}/expo`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[1]}
                          </Link>
                          <Link
                            href={`/${lang}/media`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[2]}
                          </Link>
                          <Link
                            href={`/${lang}/innovation`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[3]}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Robots Dropdown */}
                {texts["ourRobots"] && (
                  <div
                    ref={robotsDropdownRef}
                    className="relative"
                    onMouseEnter={handleRobotsMouseEnter}
                    onMouseLeave={handleRobotsMouseLeave}
                  >
                    <button
                      onClick={() => setIsRobotsOpen(!isRobotsOpen)}
                      className={`${navTextClass} transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap`}
                    >
                      {texts["ourRobots"]}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRobotsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isRobotsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}
                        >
                          <Link
                            href={`/${lang}/robots`}
                            onClick={() => setIsRobotsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                          >
                            {t("common.robotsViewAll")}
                          </Link>
                          <Link
                            href={`/${lang}/robots/g1`}
                            onClick={() => setIsRobotsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
Unitree Humanoid G1
                          </Link>
                          <Link
                            href={`/${lang}/robots/h2`}
                            onClick={() => setIsRobotsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Unitree Humanoid H2
                          </Link>
                          <Link
                            href={`/${lang}/robots/go2`}
                            onClick={() => setIsRobotsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
Unitree Robo- Dog Go2
                          </Link>
                          <Link
                            href={`/${lang}/robots/r1`}
                            onClick={() => setIsRobotsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
Unitree Humanoid R1
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </nav>

              {/* Language Switcher & Contact Button */}
              <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LanguageSwitcher currentLang={lang} />
                <Link
                  href={`/${lang}/contact`}
                  className="px-5 py-2 bg-[#0066FF] text-white rounded-full hover:bg-[#0052CC] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {texts["contactUs"] || t("common.contactUs")}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-y-auto overflow-x-hidden overscroll-y-contain max-h-[calc(100dvh-120px)] absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-md rounded-2xl"
              >
                <nav className="py-4">
                  {/* Robots in mobile menu */}
                  {texts["ourRobots"] && (
                    <>
                      <div className="px-6 py-3 text-white/60 text-xs font-semibold uppercase">
                        {texts["ourRobots"]}
                      </div>
                      <Link
                        href={`/${lang}/robots`}                        

                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {lang === "ar" ? "عرض الكل" : "View all"}
                      </Link>
                      <Link
                        href={`/${lang}/robots/g1`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Unitree Humanoid G1
                      </Link>
                      <Link
                        href={`/${lang}/robots/h2`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Unitree Humanoid H2
                      </Link>
                      <Link
                        href={`/${lang}/robots/go2`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Unitree Robo-Dog Go2
                      </Link>
                      <Link
                        href={`/${lang}/robots/r1`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Unitree Humanoid R1
                      </Link>
                    </>
                  )}

                  {Object.entries(texts)  
                    .filter(([key]) => key !== "ourServices" && key !== "ourRobots" && key !== "contactUs")
                    .map(([key, value]) => {
                      // Handle "main" and "news" as page links, others as section links
                      const href = key === "main" ? `/${lang}` : key === "news" ? `/${lang}/news` : `#${key}`
                      
                      // Handle "main" link: if already on home page, scroll to top instead of navigating
                      const handleMainClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (key === "main") {
                          const homePath = `/${lang}`
                          const homePathWithSlash = `/${lang}/`
                          // If already on home page (with or without trailing slash), scroll to top
                          if (pathname === homePath || pathname === homePathWithSlash) {
                            e.preventDefault()
                            scrollTo(0, { duration: 1.5 })
                          }
                          // Otherwise, let the Link handle navigation normally
                          // PageTransition will scroll to top on navigation
                        }
                        setIsMobileMenuOpen(false)
                      }
                      
                      if (key === "about") {
                        return (
                          <Fragment key={key}>
                            <Link
                              href={href}
                              onClick={handleMainClick}
                              className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                            >
                              {value}
                            </Link>
                            {aboutSectionLinks.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-10 py-2 text-white/90 hover:bg-white/10 transition-colors text-sm"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </Fragment>
                        )
                      }

                      return (  
                        <Link
                          key={key}
                          href={href}
                          onClick={handleMainClick}
                          className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                        >
                          {value}
                        </Link>
                      )
                    })}

                  {/* Services في القائمة الموبايل */}
                  {texts["ourServices"] && (
                    <>
                      <div className="px-6 py-3 text-white/60 text-xs font-semibold uppercase">
                        {texts["ourServices"]}
                      </div>
                      <Link
                        href={`/${lang}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[0]}
                      </Link>
                      <Link
                        href={`/${lang}/expo`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[1]}
                      </Link>
                      <Link
                        href={`/${lang}/media`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[2]}
                      </Link>
                      <Link
                        href={`/${lang}/innovation`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[3]}
                      </Link>
                    </>
                  )}

                  {/* Language & Contact */}
                  <div className="px-6 py-4 mt-2 border-t border-white/10 space-y-2">
                    <LanguageSwitcher currentLang={lang} isMobile />
                    <Link
                      href={`/${lang}/contact`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-5 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                    >
                      {texts["contactUs"] || t("common.contactUs")}
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
