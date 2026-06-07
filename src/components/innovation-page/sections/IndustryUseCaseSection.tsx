"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import type { TFunction } from "i18next"
import FormattedText from "@/components/shared/FormattedText"
import RemoteMediaImage from "@/components/shared/RemoteMediaImage"
import { type IndustrySlug } from "@/components/innovation-page/data/industries"
import {
  isPuduRobotKey,
  normalizeUseCaseChallengeItems,
  resolveRobotKeys,
  resolveUseCaseList,
  type InnovationUseCaseData,
  type UseCaseChallengeItem,
} from "@/lib/innovation-use-cases"
import { getImpactStatIcon } from "@/components/innovation-page/data/impact-stat-icons"
import { resolveUseCaseSolutionMediaUrl } from "@/lib/innovation-media"
import {
  carouselSlide,
  fadeInUp,
  sectionSlideUp,
  viewportConfig,
} from "@/lib/animations"

interface IndustryUseCaseSectionProps {
  industrySlug: IndustrySlug
  variant?: "light" | "tinted"
}

interface UseCaseSolution {
  name: string
  imageAlt: string
  imageUrl?: string
  features: string[]
  learnMoreLabel: string
  href: string
}

interface AggregatedSolutionEntry {
  solution: UseCaseSolution
  robotKey?: string
  imageUrl: string | null
  href: string
}

function UseCaseChallengesGrid({
  items,
  isRTL,
}: {
  items: UseCaseChallengeItem[]
  isRTL: boolean
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-y-auto bg-[oklch(0.985_0.006_260)] p-[clamp(1.25rem,2.5vw,1.75rem)] ${isRTL ? "text-right" : "text-left"}`}
    >
      <ul
        className={`grid flex-1 grid-cols-1 gap-[clamp(0.625rem,1.2vw,0.875rem)] sm:grid-cols-2 lg:grid-cols-3 ${isRTL ? "text-right" : "text-left"}`}
      >
        {items.map((item, index) => {
          const Icon = getImpactStatIcon(item.icon)
          return (
            <li
              key={index}
              className={`flex items-start gap-3 rounded-[0.625rem] border border-[oklch(0.91_0.007_260)] bg-[oklch(0.998_0.003_260)] p-[clamp(0.75rem,1.5vw,1rem)] shadow-[0_10px_30px_-26px_oklch(0.18_0.02_260/0.28)] ${isRTL ? "flex-row-reverse" : ""}`}
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
    <article className="grid min-h-[clamp(18rem,36vw,26rem)] grid-cols-1 overflow-hidden rounded-[0.75rem] border border-[oklch(0.91_0.007_260)] bg-[oklch(0.998_0.003_260)] shadow-[0_18px_48px_-34px_oklch(0.18_0.02_260/0.34)] sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
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

function aggregateSolutionEntries(
  useCases: InnovationUseCaseData[],
  t: TFunction,
  lang: string
): AggregatedSolutionEntry[] {
  const seen = new Set<string>()
  const entries: AggregatedSolutionEntry[] = []

  useCases.forEach((useCase) => {
    const resolvedSolutionKeys = resolveRobotKeys(
      useCase.solutionKeys?.filter(isPuduRobotKey)
    )
    const solutions = Array.isArray(useCase.solutions) ? useCase.solutions : []
    const solutionCount =
      resolvedSolutionKeys.length > 0
        ? Math.min(solutions.length, resolvedSolutionKeys.length)
        : solutions.length

    for (let index = 0; index < solutionCount; index += 1) {
      const solution = solutions[index]
      if (!solution) {
        continue
      }

      const robotKey = resolvedSolutionKeys[index]
      const dedupeKey =
        robotKey ?? `${solution.name.trim().toLowerCase()}::${solution.href}`

      if (seen.has(dedupeKey)) {
        continue
      }

      seen.add(dedupeKey)
      entries.push({
        solution,
        robotKey,
        imageUrl: resolveUseCaseSolutionMediaUrl(
          t,
          solution,
          index,
          resolvedSolutionKeys
        ),
        href: solution.href?.replace("{lang}", lang) ?? `/${lang}/contact`,
      })
    }
  })

  return entries
}

export default function IndustryUseCaseSection({
  industrySlug,
  variant = "light",
}: IndustryUseCaseSectionProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const prefersReduced = useReducedMotion()
  const sectionId = useId()
  const [activeSolution, setActiveSolution] = useState(0)
  const [solutionDirection, setSolutionDirection] = useState(0)

  const useCases = useMemo(() => {
    const raw = t(`innovation.industries.${industrySlug}.useCases`, {
      returnObjects: true,
    })
    return resolveUseCaseList(raw)
  }, [industrySlug, t])

  const impactChallengesRaw = t(
    `innovation.industries.${industrySlug}.impactPanels.challenges`,
    { returnObjects: true }
  )

  const challengeItems = useMemo(() => {
    const impactPanel =
      impactChallengesRaw && typeof impactChallengesRaw === "object"
        ? (impactChallengesRaw as { items?: unknown })
        : null
    const fromImpact = normalizeUseCaseChallengeItems(impactPanel?.items)
    if (fromImpact.length > 0) {
      return fromImpact
    }

    for (const useCase of useCases) {
      const fromUseCase = normalizeUseCaseChallengeItems(useCase.challenges?.items)
      if (fromUseCase.length > 0) {
        return fromUseCase
      }
    }

    return []
  }, [impactChallengesRaw, useCases])

  const challengesHeading = useMemo(() => {
    const impactPanel =
      impactChallengesRaw && typeof impactChallengesRaw === "object"
        ? (impactChallengesRaw as { heading?: string })
        : null
    const fromImpact = impactPanel?.heading?.trim()
    if (fromImpact) {
      return fromImpact
    }

    for (const useCase of useCases) {
      const fromUseCase = useCase.challenges?.heading?.trim()
      if (fromUseCase) {
        return fromUseCase
      }
    }

    return ""
  }, [impactChallengesRaw, useCases])

  const solutionsTitle = useMemo(
    () =>
      useCases
        .map((useCase) => useCase.solutionsTitle?.trim())
        .find(Boolean) ?? "",
    [useCases]
  )

  const solutionEntries = useMemo(
    () => aggregateSolutionEntries(useCases, t, lang),
    [lang, t, useCases]
  )

  const hasChallengesPanel =
    challengeItems.length > 0 && Boolean(challengesHeading)
  const solutionCount = solutionEntries.length
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
  }, [industrySlug, solutionCount])

  if (!hasChallengesPanel && !hasSolutions) {
    return null
  }

  const sectionLabelId = hasChallengesPanel
    ? `${sectionId}-challenges-heading`
    : `${sectionId}-solutions-heading`

  const sectionBg =
    variant === "tinted"
      ? "bg-[oklch(0.975_0.004_260)]"
      : "bg-[oklch(0.995_0.003_260)]"

  const activeSolutionIndex = hasSolutions
    ? Math.min(activeSolution, solutionCount - 1)
    : 0
  const activeEntry = hasSolutions
    ? solutionEntries[activeSolutionIndex]
    : undefined

  return (
    <section
      className={`${sectionBg} py-[clamp(4rem,8vw,6.5rem)]`}
      id="use-cases"
      aria-labelledby={sectionLabelId}
    >
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        {hasChallengesPanel && (
          <>
            <motion.header
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionSlideUp}
              className={`mb-[clamp(2rem,4vw,3rem)] ${isRTL ? "text-right" : "text-left"}`}
            >
              <h2
                id={`${sectionId}-challenges-heading`}
                className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]"
              >
                <FormattedText text={challengesHeading} />
              </h2>
            </motion.header>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="overflow-hidden rounded-[0.75rem] border border-[oklch(0.91_0.007_260)] bg-[oklch(0.985_0.006_260)] shadow-[0_18px_48px_-34px_oklch(0.18_0.02_260/0.34)]"
            >
              <UseCaseChallengesGrid items={challengeItems} isRTL={isRTL} />
            </motion.div>
          </>
        )}

        {hasSolutions && (
          <div
            className={
              hasChallengesPanel ? "mt-[clamp(3rem,6vw,4.5rem)]" : undefined
            }
          >
            <motion.header
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionSlideUp}
              className={`mb-[clamp(1.5rem,3vw,2.25rem)] ${isRTL ? "text-right" : "text-left"}`}
            >
              <h3
                id={`${sectionId}-solutions-heading`}
                className="text-[clamp(1.375rem,2.5vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-[oklch(0.18_0.01_260)]"
              >
                <FormattedText text={solutionsTitle} />
              </h3>
            </motion.header>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="hidden gap-[clamp(1.25rem,2.5vw,1.75rem)] lg:grid lg:grid-cols-2"
            >
              {solutionEntries.map((entry, index) => (
                <SolutionCard
                  key={`${entry.robotKey ?? entry.solution.name}-${index}`}
                  solution={entry.solution}
                  imageUrl={entry.imageUrl}
                  href={entry.href}
                  isRTL={isRTL}
                  learnMoreFallback={t("common.learnMore")}
                  imagePriority={index === 0}
                />
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="overflow-hidden rounded-[0.75rem] border border-[oklch(0.91_0.007_260)] bg-[oklch(0.998_0.003_260)] shadow-[0_18px_48px_-34px_oklch(0.18_0.02_260/0.34)] lg:hidden"
              role={hasMultipleSolutions ? "group" : undefined}
              aria-roledescription={hasMultipleSolutions ? "carousel" : undefined}
              aria-label={solutionsTitle}
            >
              <AnimatePresence initial={false} custom={solutionDirection} mode="wait">
                {activeEntry && (
                  <motion.div
                    key={`${activeEntry.robotKey ?? activeEntry.solution.name}-${activeSolutionIndex}`}
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
                      solution={activeEntry.solution}
                      imageUrl={activeEntry.imageUrl}
                      href={activeEntry.href}
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
                    aria-label={solutionsTitle}
                  >
                    {Array.from({ length: solutionCount }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={index === activeSolutionIndex}
                        aria-label={`Solution ${index + 1}`}
                        onClick={() => goToSolution(index)}
                        className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)]"
                      >
                        <span
                          className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            index === activeSolutionIndex
                              ? "w-8 bg-[oklch(0.52_0.12_264)]"
                              : "w-2.5 bg-[oklch(0.8_0.02_260)] group-hover:bg-[oklch(0.62_0.08_264)]"
                          }`}
                          aria-hidden
                        />
                      </button>
                    ))}
                  </div>

                  <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <button
                      type="button"
                      onClick={isRTL ? goNextSolution : goPrevSolution}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[oklch(0.86_0.01_260)] text-[oklch(0.28_0.02_260)] transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.52_0.12_264)] hover:bg-[oklch(0.96_0.01_264)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)]"
                      aria-label={t("common.previousImage")}
                    >
                      <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={isRTL ? goPrevSolution : goNextSolution}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[oklch(0.86_0.01_260)] text-[oklch(0.28_0.02_260)] transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[oklch(0.52_0.12_264)] hover:bg-[oklch(0.96_0.01_264)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.52_0.12_264)]"
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
