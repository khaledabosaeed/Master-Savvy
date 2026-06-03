"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
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
  normalizeUseCaseChallengeItems,
  resolveRobotKeys,
  resolveUseCaseContent,
  type UseCaseChallengeItem,
} from "@/lib/innovation-use-cases"
import { getImpactStatIcon } from "@/components/innovation-page/data/impact-stat-icons"
import {
  resolveUseCaseSolutionMediaUrl,
} from "@/lib/innovation-media"
import {
  carouselSlide,
  fadeInUp,
  sectionSlideUp,
  viewportConfig,
} from "@/lib/animations"

interface IndustryUseCaseSectionProps {
  industrySlug: IndustrySlug
  useCaseIndex: number
  slideKeys: PuduRobotKey[]
  solutionKeys: PuduRobotKey[]
  variant?: "light" | "tinted"
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

function UseCaseChallengesCarouselSlide({
  heading,
  items,
  isRTL,
}: {
  heading: string
  items: UseCaseChallengeItem[]
  isRTL: boolean
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-y-auto bg-[oklch(0.995_0.004_260)] p-[clamp(1.25rem,2.5vw,1.75rem)] ${isRTL ? "text-right" : "text-left"}`}
    >
      <h3 className="border-t-[3px] border-t-[oklch(0.68_0.17_55)] pt-3 text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-[1.25] text-[oklch(0.18_0.01_260)]">
        <FormattedText text={heading} />
      </h3>
      <ul
        className={`mt-[clamp(1rem,2vw,1.25rem)] grid flex-1 grid-cols-1 gap-[clamp(0.625rem,1.2vw,0.875rem)] sm:grid-cols-2 ${isRTL ? "text-right" : "text-left"}`}
      >
        {items.map((item, index) => {
          const Icon = getImpactStatIcon(item.icon)
          return (
            <li
              key={index}
              className={`flex items-start gap-3 rounded-[0.625rem] border border-[oklch(0.92_0.005_260)] bg-white p-[clamp(0.75rem,1.5vw,1rem)] shadow-[0_1px_3px_oklch(0.18_0.01_260/0.05)] ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.96_0.02_55)] text-[oklch(0.55_0.14_55)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="min-w-0 pt-1.5 text-[clamp(0.8125rem,1.35vw,0.9375rem)] leading-[1.55] text-[oklch(0.38_0.02_260)]">
                <FormattedText text={item.label} />
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
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

function SolutionCard({
  solution,
  imageUrl,
  href,
  isRTL,
  learnMoreFallback,
  imagePriority,
}: {
  solution: UseCaseSolution
  imageUrl: string | null
  href: string
  isRTL: boolean
  learnMoreFallback: string
  imagePriority?: boolean
}) {
  return (
    <article className="grid min-h-[clamp(18rem,36vw,26rem)] grid-cols-1 overflow-hidden rounded-[0.875rem] bg-[oklch(0.995_0.004_260)] shadow-[0_1px_3px_oklch(0.18_0.01_260/0.06)] sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="relative min-h-[clamp(15rem,42vw,26rem)] bg-[oklch(0.94_0.005_260)]">
        {imageUrl ? (
          <RemoteMediaImage
            src={imageUrl}
            alt={solution.imageAlt || solution.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority={imagePriority}
          />
        ) : (
          <div
            className="flex h-full min-h-[inherit] items-center justify-center bg-[oklch(0.94_0.005_260)]"
            aria-hidden
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.15_0.01_260/0.72)] to-transparent px-[clamp(1rem,2.5vw,1.75rem)] py-[clamp(1rem,2vw,1.5rem)]">
          <p
            className={`text-[clamp(1.25rem,2.5vw,2rem)] font-bold leading-[1.1] text-[oklch(0.97_0.005_260)] ${isRTL ? "text-right" : "text-left"}`}
          >
            <FormattedText text={solution.name} />
          </p>
        </div>
      </div>

      <div
        className={`flex min-w-0 flex-col justify-between gap-[clamp(1.25rem,2.5vw,1.75rem)] p-[clamp(1.25rem,3vw,2rem)] ${isRTL ? "text-right" : "text-left"}`}
      >
        <div>
          <div
            className={`flex flex-wrap items-start justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <h4 className="max-w-[20rem] text-[clamp(1.25rem,2.4vw,1.875rem)] font-bold leading-[1.15] text-[oklch(0.18_0.01_260)]">
              <FormattedText text={solution.name} />
            </h4>
            <Link
              href={href}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[oklch(0.18_0.01_260)] px-4 py-2 text-[0.875rem] font-semibold text-[oklch(0.97_0.005_260)] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[oklch(0.28_0.04_260)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)] ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <FormattedText
                text={solution.learnMoreLabel || learnMoreFallback}
              />
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {Array.isArray(solution.features) && solution.features.length > 0 && (
            <ul
              className={`mt-[clamp(1rem,2vw,1.5rem)] grid gap-3 text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.6] text-[oklch(0.42_0.02_260)] ${isRTL ? "pr-4" : "pl-4"}`}
            >
              {solution.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="list-disc">
                  <FormattedText text={feature} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}

export default function IndustryUseCaseSection({
  industrySlug,
  useCaseIndex,
  slideKeys: _slideKeysProp,
  solutionKeys: solutionKeysProp,
  variant = "light",
}: IndustryUseCaseSectionProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const prefersReduced = useReducedMotion()
  const carouselId = useId()
  const [activeSolution, setActiveSolution] = useState(0)
  const [solutionDirection, setSolutionDirection] = useState(0)

  const useCasesRaw = t(`innovation.industries.${industrySlug}.useCases`, {
    returnObjects: true,
  })
  const impactChallengesRaw = t(
    `innovation.industries.${industrySlug}.impactPanels.challenges`,
    { returnObjects: true }
  )
  const content = resolveUseCaseContent(useCasesRaw, useCaseIndex)

  const resolvedSolutionKeys = resolveRobotKeys(
    content?.solutionKeys?.filter(isPuduRobotKey),
    solutionKeysProp
  )

  const challengeItems = useMemo(() => {
    const fromUseCase = normalizeUseCaseChallengeItems(content?.challenges?.items)
    if (fromUseCase.length > 0) {
      return fromUseCase
    }

    const impactPanel =
      impactChallengesRaw && typeof impactChallengesRaw === "object"
        ? (impactChallengesRaw as { items?: unknown })
        : null
    return normalizeUseCaseChallengeItems(impactPanel?.items)
  }, [content?.challenges?.items, impactChallengesRaw])

  const challengesHeading = useMemo(() => {
    const fromUseCase = content?.challenges?.heading?.trim()
    if (fromUseCase) {
      return fromUseCase
    }

    const impactPanel =
      impactChallengesRaw && typeof impactChallengesRaw === "object"
        ? (impactChallengesRaw as { heading?: string })
        : null
    return impactPanel?.heading?.trim() ?? ""
  }, [content?.challenges?.heading, impactChallengesRaw])

  const hasChallengesPanel = challengeItems.length > 0 && Boolean(challengesHeading)

  const solutions = Array.isArray(content?.solutions) ? content.solutions : []
  const solutionCount =
    resolvedSolutionKeys.length > 0
      ? Math.min(solutions.length, resolvedSolutionKeys.length)
      : solutions.length
  const hasSolutions = solutionCount > 0
  const hasMultipleSolutions = solutionCount > 1

  const goToSolution = useCallback(
    (index: number) => {
      if (index === activeSolution || index < 0 || index >= solutionCount) {
        return
      }

      setSolutionDirection(index > activeSolution ? 1 : -1)
      setActiveSolution(index)
    },
    [activeSolution, solutionCount]
  )

  const goPrevSolution = useCallback(() => {
    const next = activeSolution === 0 ? solutionCount - 1 : activeSolution - 1
    setSolutionDirection(-1)
    setActiveSolution(next)
  }, [activeSolution, solutionCount])

  const goNextSolution = useCallback(() => {
    const next = activeSolution === solutionCount - 1 ? 0 : activeSolution + 1
    setSolutionDirection(1)
    setActiveSolution(next)
  }, [activeSolution, solutionCount])

  useEffect(() => {
    setActiveSolution(0)
    setSolutionDirection(0)
  }, [industrySlug, useCaseIndex, solutionCount])

  if (!content?.aboutTitle?.trim()) {
    return null
  }

  const hasWhyChoosePanel = (content.whyChoose?.items ?? []).some((item) =>
    typeof item === "string" ? item.trim() : false
  )

  if (!hasChallengesPanel && !hasSolutions && !hasWhyChoosePanel) {
    return null
  }

  const sectionBg =
    variant === "tinted"
      ? "bg-[oklch(0.975_0.004_260)]"
      : "bg-[oklch(0.995_0.003_260)]"

  const activeSolutionIndex = hasSolutions
    ? Math.min(activeSolution, solutionCount - 1)
    : 0
  const activeSolutionContent = hasSolutions
    ? solutions[activeSolutionIndex]
    : undefined
  const activeSolutionRobotKey = hasSolutions
    ? resolvedSolutionKeys[activeSolutionIndex]
    : undefined
  const activeSolutionImage = activeSolutionContent
    ? resolveUseCaseSolutionMediaUrl(
        t,
        activeSolutionContent,
        activeSolutionIndex,
        resolvedSolutionKeys
      )
    : null
  const activeSolutionHref =
    activeSolutionContent?.href?.replace("{lang}", lang) ?? `/${lang}/contact`

  const solutionEntries = Array.from({ length: solutionCount }, (_, index) => {
    const solution = solutions[index]
    const robotKey = resolvedSolutionKeys[index]
    return {
      solution,
      robotKey,
      imageUrl: resolveUseCaseSolutionMediaUrl(
        t,
        solution,
        index,
        resolvedSolutionKeys
      ),
      href: solution?.href?.replace("{lang}", lang) ?? `/${lang}/contact`,
    }
  }).filter((entry) => entry.solution)

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

        {(hasChallengesPanel || hasWhyChoosePanel) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className={`grid grid-cols-1 items-stretch gap-[clamp(1.25rem,2.5vw,1.75rem)] ${
            hasChallengesPanel && hasWhyChoosePanel
              ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              : ""
          }`}
        >
          {hasChallengesPanel && (
          <div className="min-h-[clamp(16rem,40vw,22rem)] overflow-hidden rounded-[0.875rem] bg-[oklch(0.94_0.005_260)]">
            <UseCaseChallengesCarouselSlide
              heading={challengesHeading}
              items={challengeItems}
              isRTL={isRTL}
            />
          </div>
          )}

          {hasWhyChoosePanel && (
          <div className="flex min-h-0 flex-col gap-[clamp(1rem,2vw,1.25rem)]">
            <UseCaseInfoPanel
              panel={content.whyChoose}
              accent="solution"
              isRTL={isRTL}
            />
          </div>
          )}
        </motion.div>
        )}

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

            {/* Desktop: all solutions in a 2-column grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="hidden gap-[clamp(1.25rem,2.5vw,1.75rem)] lg:grid lg:grid-cols-2"
            >
              {solutionEntries.map((entry, index) => (
                <SolutionCard
                  key={`${entry.robotKey}-${index}`}
                  solution={entry.solution}
                  imageUrl={entry.imageUrl}
                  href={entry.href}
                  isRTL={isRTL}
                  learnMoreFallback={t("common.learnMore")}
                  imagePriority={useCaseIndex === 0 && index === 0}
                />
              ))}
            </motion.div>

            {/* Mobile: carousel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="overflow-hidden rounded-[0.875rem] bg-[oklch(0.995_0.004_260)] shadow-[0_1px_3px_oklch(0.18_0.01_260/0.06)] lg:hidden"
              role={hasMultipleSolutions ? "group" : undefined}
              aria-roledescription={hasMultipleSolutions ? "carousel" : undefined}
              aria-label={content.solutionsTitle}
            >
              <AnimatePresence initial={false} custom={solutionDirection} mode="wait">
                {activeSolutionContent && activeSolutionRobotKey && (
                  <motion.div
                    key={`${activeSolutionRobotKey}-${activeSolutionIndex}`}
                    custom={solutionDirection}
                    variants={
                      prefersReduced
                        ? undefined
                        : carouselSlide(solutionDirection, isRTL)
                    }
                    initial={prefersReduced ? false : "enter"}
                    animate="center"
                    exit={prefersReduced ? undefined : "exit"}
                  >
                    <SolutionCard
                      solution={activeSolutionContent}
                      imageUrl={activeSolutionImage}
                      href={activeSolutionHref}
                      isRTL={isRTL}
                      learnMoreFallback={t("common.learnMore")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {hasMultipleSolutions && (
                <div
                  className={`flex flex-wrap items-center justify-between gap-4 border-t border-[oklch(0.9_0.01_260)] px-4 py-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    role="tablist"
                    aria-label={content.solutionsTitle}
                  >
                    {Array.from({ length: solutionCount }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={index === activeSolutionIndex}
                        aria-label={`Solution ${index + 1}`}
                        onClick={() => goToSolution(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          index === activeSolutionIndex
                            ? "w-8 bg-[oklch(0.52_0.12_264)]"
                            : "w-2.5 bg-[oklch(0.8_0.02_260)] hover:bg-[oklch(0.62_0.08_264)]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <button
                      type="button"
                      onClick={isRTL ? goNextSolution : goPrevSolution}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.86_0.01_260)] text-[oklch(0.28_0.02_260)] transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.52_0.12_264)] hover:bg-[oklch(0.96_0.01_264)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)]"
                      aria-label={t("common.previousImage")}
                    >
                      <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={isRTL ? goPrevSolution : goNextSolution}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.86_0.01_260)] text-[oklch(0.28_0.02_260)] transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.52_0.12_264)] hover:bg-[oklch(0.96_0.01_264)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)]"
                      aria-label={t("common.nextImage")}
                    >
                      <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
