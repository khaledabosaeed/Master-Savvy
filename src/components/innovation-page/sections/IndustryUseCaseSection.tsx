"use client"

import { useCallback, useEffect, useId, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import {
  type IndustrySlug,
  type PuduRobotKey,
} from "@/components/innovation-page/data/industries"
import {
  isPuduRobotKey,
  resolveRobotKeys,
  resolveUseCaseSlideCount,
} from "@/lib/innovation-use-cases"
import {
  resolveUseCaseSlideMediaUrl,
  resolveUseCaseSolutionMediaUrl,
} from "@/lib/innovation-media"
import {
  carouselSlide,
  fadeInUp,
  scaleStaggerItem,
  sectionSlideUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations"

interface IndustryUseCaseSectionProps {
  industrySlug: IndustrySlug
  useCaseIndex: number
  slideKeys: PuduRobotKey[]
  solutionKeys: PuduRobotKey[]
  variant?: "light" | "tinted"
}

interface UseCaseSlide {
  robotName: string
  imageAlt: string
  imageUrl?: string
}

interface UseCasePanel {
  heading: string
  items: string[]
}

interface UseCaseSolution {
  name: string
  imageAlt: string
  imageUrl?: string
  features: string[]
  learnMoreLabel: string
  href: string
}

interface UseCaseContent {
  slideKeys?: PuduRobotKey[]
  solutionKeys?: PuduRobotKey[]
  aboutTitle: string
  slides: UseCaseSlide[]
  challenges: UseCasePanel
  whyChoose: UseCasePanel
  solutionsTitle: string
  solutions: UseCaseSolution[]
}

function UseCaseInfoPanel({
  panel,
  accent,
  isRTL,
}: {
  panel: UseCasePanel
  accent: "challenge" | "solution"
  isRTL: boolean
}) {
  if (!panel.items?.length) {
    return null
  }

  const accentClass =
    accent === "challenge"
      ? "border-t-[3px] border-t-[oklch(0.68_0.17_55)]"
      : "border-t-[3px] border-t-[oklch(0.52_0.12_264)]"

  return (
    <article
      className={`flex flex-1 flex-col rounded-[0.875rem] bg-[oklch(0.995_0.004_260)] p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_1px_3px_oklch(0.18_0.01_260/0.06)] ${accentClass} ${isRTL ? "text-right" : "text-left"}`}
    >
      <h3 className="text-[clamp(1rem,1.8vw,1.125rem)] font-bold leading-[1.25] text-[oklch(0.18_0.01_260)]">
        <FormattedText text={panel.heading} />
      </h3>
      <ul
        className={`mt-[clamp(0.75rem,1.5vw,1rem)] space-y-[0.625rem] text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-[1.6] text-[oklch(0.42_0.02_260)] ${isRTL ? "pr-4" : "pl-4"}`}
      >
        {panel.items.map((item, index) => (
          <li key={index} className="list-disc">
            <FormattedText text={item} />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function IndustryUseCaseSection({
  industrySlug,
  useCaseIndex,
  slideKeys: slideKeysProp,
  solutionKeys: solutionKeysProp,
  variant = "light",
}: IndustryUseCaseSectionProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const prefersReduced = useReducedMotion()
  const carouselId = useId()
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const baseKey = `innovation.industries.${industrySlug}.useCases.${useCaseIndex}`
  const content = t(baseKey, { returnObjects: true }) as UseCaseContent

  const slideKeys = resolveRobotKeys(
    content.slideKeys?.filter(isPuduRobotKey),
    slideKeysProp
  )
  const resolvedSolutionKeys = resolveRobotKeys(
    content.solutionKeys?.filter(isPuduRobotKey),
    solutionKeysProp
  )

  const slideContent = Array.isArray(content.slides) ? content.slides : []
  const slideCount = resolveUseCaseSlideCount(slideKeys, slideContent)
  const hasMultipleSlides = slideCount > 1

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeSlide || index < 0 || index >= slideCount) {
        return
      }

      setDirection(index > activeSlide ? 1 : -1)
      setActiveSlide(index)
    },
    [activeSlide, slideCount]
  )

  const goPrev = useCallback(() => {
    const next = activeSlide === 0 ? slideCount - 1 : activeSlide - 1
    setDirection(-1)
    setActiveSlide(next)
  }, [activeSlide, slideCount])

  const goNext = useCallback(() => {
    const next = activeSlide === slideCount - 1 ? 0 : activeSlide + 1
    setDirection(1)
    setActiveSlide(next)
  }, [activeSlide, slideCount])

  useEffect(() => {
    setActiveSlide(0)
    setDirection(0)
  }, [industrySlug, useCaseIndex, slideCount])

  if (!content?.aboutTitle || slideCount === 0) {
    return null
  }

  const solutions = Array.isArray(content.solutions) ? content.solutions : []
  const hasSolutions =
    solutions.length > 0 && resolvedSolutionKeys.length > 0

  const sectionBg =
    variant === "tinted"
      ? "bg-[oklch(0.975_0.004_260)]"
      : "bg-[oklch(0.995_0.003_260)]"

  const handleCarouselKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides) {
      return
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      isRTL ? goNext() : goPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      isRTL ? goPrev() : goNext()
    }
  }

  const activeSlideImage = resolveUseCaseSlideMediaUrl(
    t,
    slideContent[activeSlide] ?? {},
    activeSlide,
    slideKeys
  )

  return (
    <section
      className={`${sectionBg} py-[clamp(4rem,8vw,6.5rem)]`}
      id={`use-case-${useCaseIndex}`}
      aria-labelledby={`${carouselId}-heading`}
    >
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionSlideUp}
          className={`mb-[clamp(2rem,4vw,3rem)] ${isRTL ? "text-right" : "text-left"}`}
        >
          <h2
            id={`${carouselId}-heading`}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]"
          >
            <FormattedText text={content.aboutTitle} />
          </h2>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="grid grid-cols-1 items-stretch gap-[clamp(1.25rem,2.5vw,1.75rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <div
            className="relative min-h-[clamp(16rem,40vw,22rem)] overflow-hidden rounded-[0.875rem] bg-[oklch(0.94_0.005_260)]"
            role={hasMultipleSlides ? "group" : undefined}
            aria-roledescription={hasMultipleSlides ? "carousel" : undefined}
            aria-label={content.aboutTitle}
            tabIndex={hasMultipleSlides ? 0 : undefined}
            onKeyDown={handleCarouselKeyDown}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide}
                custom={direction}
                variants={prefersReduced ? undefined : carouselSlide(direction, isRTL)}
                initial={prefersReduced ? false : "enter"}
                animate="center"
                exit={prefersReduced ? undefined : "exit"}
                className="absolute inset-0"
              >
                {activeSlideImage ? (
                  <RemoteMediaImage
                    src={activeSlideImage}
                    alt={
                      slideContent[activeSlide]?.imageAlt ??
                      slideContent[activeSlide]?.robotName ??
                      content.aboutTitle
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={useCaseIndex === 0 && activeSlide === 0}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center bg-[oklch(0.94_0.005_260)]"
                    aria-hidden
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.01_260/0.75)] via-[oklch(0.15_0.01_260/0.15)] to-transparent" />
                {slideContent[activeSlide]?.robotName && (
                  <p
                    className={`absolute bottom-[clamp(1rem,2vw,1.5rem)] text-[clamp(1.125rem,2vw,1.5rem)] font-bold text-[oklch(0.97_0.005_260)] ${isRTL ? "right-[clamp(1rem,2vw,1.5rem)]" : "left-[clamp(1rem,2vw,1.5rem)]"}`}
                  >
                    <FormattedText text={slideContent[activeSlide].robotName} />
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {hasMultipleSlides && (
              <>
                <button
                  type="button"
                  onClick={isRTL ? goNext : goPrev}
                  className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.97_0.005_260/0.92)] text-[oklch(0.28_0.02_260)] shadow-md transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] ${isRTL ? "right-4" : "left-4"}`}
                  aria-label={t("common.previousImage")}
                >
                  <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={isRTL ? goPrev : goNext}
                  className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.97_0.005_260/0.92)] text-[oklch(0.28_0.02_260)] shadow-md transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-[oklch(0.99_0.003_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] ${isRTL ? "left-4" : "right-4"}`}
                  aria-label={t("common.nextImage")}
                >
                  <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`absolute bottom-4 z-10 flex gap-2 ${isRTL ? "right-4" : "left-4"}`}
                  role="tablist"
                  aria-label={content.aboutTitle}
                >
                  {Array.from({ length: slideCount }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={index === activeSlide}
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => goToSlide(index)}
                      className={`h-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        index === activeSlide
                          ? "w-8 bg-[oklch(0.97_0.005_260)]"
                          : "w-4 bg-[oklch(0.97_0.005_260/0.45)] hover:bg-[oklch(0.97_0.005_260/0.7)]"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex min-h-0 flex-col gap-[clamp(1rem,2vw,1.25rem)]">
            <UseCaseInfoPanel
              panel={content.challenges}
              accent="challenge"
              isRTL={isRTL}
            />
            <UseCaseInfoPanel
              panel={content.whyChoose}
              accent="solution"
              isRTL={isRTL}
            />
          </div>
        </motion.div>

        {hasSolutions && (
          <div className="mt-[clamp(3rem,6vw,4.5rem)]">
            <motion.header
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionSlideUp}
              className={`mb-[clamp(1.5rem,3vw,2.25rem)] ${isRTL ? "text-right" : "text-left"}`}
            >
              <h3 className="text-[clamp(1.375rem,2.5vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-[oklch(0.18_0.01_260)]">
                <FormattedText text={content.solutionsTitle} />
              </h3>
            </motion.header>

            <motion.div
              className="grid grid-cols-1 gap-[clamp(1.25rem,2.5vw,1.75rem)] md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
            >
              {solutions.map((solution, index) => {
                const robotKey = resolvedSolutionKeys[index]
                const solutionImage = resolveUseCaseSolutionMediaUrl(
                  t,
                  solution,
                  index,
                  resolvedSolutionKeys
                )
                if (!robotKey) {
                  return null
                }

                const href =
                  solution.href?.replace("{lang}", lang) ?? `/${lang}/contact`

                return (
                  <motion.article
                    key={`${robotKey}-${index}`}
                    variants={scaleStaggerItem}
                    className="group flex overflow-hidden rounded-[0.875rem] bg-[oklch(0.995_0.004_260)] shadow-[0_1px_3px_oklch(0.18_0.01_260/0.06)] transition-[transform,box-shadow] duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:shadow-[0_16px_32px_oklch(0.18_0.01_260/0.08)]"
                  >
                    <div className="relative aspect-square w-[clamp(7rem,28%,10rem)] shrink-0 bg-[oklch(0.94_0.005_260)]">
                      {solutionImage ? (
                        <RemoteMediaImage
                          src={solutionImage}
                          alt={solution.imageAlt || solution.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          sizes="160px"
                        />
                      ) : (
                        <div
                          className="h-full w-full bg-[oklch(0.94_0.005_260)]"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div
                      className={`flex min-w-0 flex-1 flex-col p-[clamp(1rem,2vw,1.375rem)] ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <h4 className="text-[clamp(1rem,1.8vw,1.125rem)] font-bold leading-[1.25] text-[oklch(0.18_0.01_260)]">
                        <FormattedText text={solution.name} />
                      </h4>
                      {Array.isArray(solution.features) && solution.features.length > 0 && (
                        <ul
                          className={`mt-2 flex-1 space-y-1 text-[clamp(0.8125rem,1.4vw,0.875rem)] leading-[1.55] text-[oklch(0.45_0.02_260)] ${isRTL ? "pr-4" : "pl-4"}`}
                        >
                          {solution.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="list-disc">
                              <FormattedText text={feature} />
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={href}
                        className={`mt-3 inline-flex items-center gap-1 text-[0.875rem] font-semibold text-[oklch(0.48_0.12_264)] transition-[gap,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-2 hover:text-[oklch(0.38_0.14_264)] ${isRTL ? "flex-row-reverse self-end" : "self-start"}`}
                      >
                        <FormattedText text={solution.learnMoreLabel || t("common.learnMore")} />
                        <span aria-hidden="true">{isRTL ? "‹" : "›"}</span>
                      </Link>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
