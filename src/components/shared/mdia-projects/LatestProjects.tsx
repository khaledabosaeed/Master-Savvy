"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/contexts/LanguageContext"
import FormattedText from "@/components/shared/FormattedText"
import { fadeInUp, sectionSlideUp, viewportConfig } from "@/lib/animations"
import type { Language } from "./content"
import { getProjects } from "./content"

const screenEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

function MadiaProjects() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as Language
  const isRTL = lang === "ar"

  const [activeProject, setActiveProject] = useState(0)
  const [showArrows, setShowArrows] = useState({ left: false, right: false })
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const projects = getProjects(lang)
  const title = t("media.content.topTitle")
  const subtitle = t("media.content.topDescription")
  const currentProject = projects[activeProject]

  const scrollTabs = useCallback(
    (direction: "left" | "right") => {
      const container = tabsContainerRef.current
      if (!container) return

      const scrollAmount = 260
      const scrollDirection = direction === "left" ? -scrollAmount : scrollAmount
      container.scrollBy({
        left: isRTL ? -scrollDirection : scrollDirection,
        behavior: "smooth",
      })
    },
    [isRTL],
  )

  useEffect(() => {
    const checkOverflow = () => {
      const container = tabsContainerRef.current
      if (!container) return

      const hasOverflow = container.scrollWidth > container.clientWidth
      const scrollLeft = Math.abs(container.scrollLeft)
      const maxScroll = container.scrollWidth - container.clientWidth

      setShowArrows({
        left: hasOverflow && scrollLeft > 1,
        right: hasOverflow && scrollLeft < maxScroll - 1,
      })
    }

    const timeoutId = window.setTimeout(checkOverflow, 100)
    window.addEventListener("resize", checkOverflow)
    const container = tabsContainerRef.current
    container?.addEventListener("scroll", checkOverflow)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("resize", checkOverflow)
      container?.removeEventListener("scroll", checkOverflow)
    }
  }, [projects])

  useEffect(() => {
    const container = tabsContainerRef.current
    if (!container) return

    const activeButton = container.querySelector(`[data-tab-index="${activeProject}"]`) as HTMLElement
    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeProject])

  if (!currentProject) {
    return null
  }

  return (
    <section className="relative overflow-hidden border-y border-[oklch(0.88_0.035_245/0.11)] bg-[oklch(0.105_0.018_250)] py-16 text-[oklch(0.965_0.008_245)] md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.501_0.253_264.6/0.45),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,oklch(0.501_0.253_264.6/0.16),transparent_30%),radial-gradient(circle_at_88%_18%,oklch(0.501_0.253_264.6/0.14),transparent_28%)]" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-8 grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[oklch(0.501_0.253_264.6/0.36)] px-4 py-2 text-xs font-black uppercase tracking-normal text-[oklch(0.501_0.253_264.6)]">
              {t("media.content.button")}
            </p>
            <h2 className="max-w-[13ch] text-3xl font-black leading-[1.05] tracking-normal sm:text-4xl lg:text-6xl">
              <FormattedText text={title} />
            </h2>
          </div>
          <p className="max-w-[66ch] text-sm leading-7 text-[oklch(0.76_0.025_250)] sm:text-base md:text-[17px] md:leading-8">
            <FormattedText text={subtitle} />
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="relative mb-8"
        >
          {showArrows.left && (
            <button
              onClick={() => scrollTabs("left")}
              className={`absolute ${isRTL ? "right-0" : "left-0"} top-0 z-20 flex h-full w-12 items-center justify-center bg-[oklch(0.105_0.018_250/0.88)] text-[oklch(0.501_0.253_264.6)] transition hover:text-[oklch(0.62_0.2_264.6)]`}
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className={`size-5 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}

          <div
            ref={tabsContainerRef}
            className={`scrollbar-hide overflow-x-auto border-y border-[oklch(0.88_0.035_245/0.12)] py-3 ${
              showArrows.left ? (isRTL ? "pr-12" : "pl-12") : ""
            } ${showArrows.right ? (isRTL ? "pl-12" : "pr-12") : ""}`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex min-w-max gap-2">
              {projects.map((project, index) => (
                <motion.button
                  key={project.title}
                  data-tab-index={index}
                  onClick={() => setActiveProject(index)}
                  className={`relative min-h-11 rounded-md px-4 text-xs font-black transition md:text-sm ${
                    activeProject === index
                      ? "bg-[oklch(0.501_0.253_264.6)] text-[oklch(0.965_0.008_245)]"
                      : "border border-[oklch(0.88_0.035_245/0.12)] text-[oklch(0.76_0.025_250)] hover:border-[oklch(0.501_0.253_264.6/0.36)] hover:text-[oklch(0.95_0.01_245)]"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FormattedText text={project.title} />
                </motion.button>
              ))}
            </div>
          </div>

          {showArrows.right && (
            <button
              onClick={() => scrollTabs("right")}
              className={`absolute ${isRTL ? "left-0" : "right-0"} top-0 z-20 flex h-full w-12 items-center justify-center bg-[oklch(0.105_0.018_250/0.88)] text-[oklch(0.501_0.253_264.6)] transition hover:text-[oklch(0.62_0.2_264.6)]`}
              aria-label="Scroll tabs right"
            >
              <ChevronRight className={`size-5 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: screenEase }}
            className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(320px,0.34fr)] lg:items-stretch"
          >
            <div className={`relative min-h-[320px] overflow-hidden rounded-2xl border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.14_0.02_250)] shadow-[0_30px_100px_oklch(0.03_0.02_250/0.52)] md:min-h-[520px] ${isRTL ? "lg:order-2" : ""}`}>
              {currentProject.video ? (
                <video
                  src={currentProject.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : currentProject.images?.[0] ? (
                <Image
                  src={currentProject.images[0]}
                  alt={currentProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.105_0.018_250/0.82)_100%)]" />
            </div>

            <div className={`flex flex-col justify-between rounded-2xl border border-[oklch(0.88_0.035_245/0.14)] bg-[oklch(0.13_0.02_250)] p-6 md:p-8 ${isRTL ? "text-right lg:order-1" : "text-left"}`}>
              <div>
                <div className="mb-6 flex items-center gap-3 text-[oklch(0.501_0.253_264.6)]">
                  <MonitorPlay className="size-6" strokeWidth={1.6} aria-hidden="true" />

                </div>
                <h3 className="text-3xl font-black leading-[1.05] tracking-normal md:text-5xl">
                  <FormattedText text={currentProject.title} />
                </h3>
                <p className="mt-5 text-sm leading-7 text-[oklch(0.76_0.025_250)] md:text-base md:leading-8">
                  <FormattedText text={currentProject.description} />
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default memo(MadiaProjects)
