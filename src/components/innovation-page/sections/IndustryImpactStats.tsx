"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import { getImpactStatIcon } from "@/components/innovation-page/data/impact-stat-icons"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"
import { fastStagger, staggerItem, viewportConfig } from "@/lib/animations"

interface IndustryImpactStatsProps {
  slug: IndustrySlug
}

interface ImpactPanelItem {
  icon: string
  label: string
}

interface ImpactPanel {
  heading: string
  items: ImpactPanelItem[]
}

interface ImpactPanels {
  challenges?: ImpactPanel
  puduHelp?: ImpactPanel
  results?: ImpactPanel
}

type PanelAccent = "challenge" | "solution" | "result"

function ImpactPanelBlock({
  panel,
  accent,
  isRTL,
}: {
  panel: ImpactPanel
  accent: PanelAccent
  isRTL: boolean
}) {
  if (!panel.items?.length) {
    return null
  }

  const accentClass =
    accent === "challenge"
      ? "border-t-[3px] border-t-[oklch(0.68_0.17_55)]"
      : accent === "solution"
        ? "border-t-[3px] border-t-[oklch(0.52_0.12_264)]"
        : "border-t-[3px] border-t-[oklch(0.58_0.14_155)]"

  return (
    <motion.article
      variants={staggerItem}
      className={`flex flex-col rounded-[0.875rem] bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-[0_4px_24px_-8px_oklch(0.2_0.02_260/0.08)] ${accentClass} ${isRTL ? "text-right" : "text-left"}`}
    >
      <h2 className="text-[clamp(1rem,1.8vw,1.125rem)] font-bold leading-[1.25] text-[oklch(0.18_0.01_260)]">
        <FormattedText text={panel.heading} />
      </h2>
      <ul className="mt-[clamp(0.875rem,1.75vw,1.125rem)] space-y-[0.75rem]">
        {panel.items.map((item, index) => {
          const Icon = getImpactStatIcon(item.icon)

          return (
            <li
              key={index}
              className={`flex items-start gap-[0.75rem] ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span
                className="mt-[0.125rem] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.96_0.006_260)] text-[oklch(0.38_0.12_264)]"
                aria-hidden
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 pt-[0.1875rem] text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-[1.55] text-[oklch(0.42_0.02_260)]">
                <FormattedText text={item.label} />
              </span>
            </li>
          )
        })}
      </ul>
    </motion.article>
  )
}

export default function IndustryImpactStats({ slug }: IndustryImpactStatsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isRTL = language === "ar"
  const baseKey = `innovation.industries.${slug}`
  const impactPanels = t(`${baseKey}.impactPanels`, { returnObjects: true }) as ImpactPanels

  const panels = [
    impactPanels?.challenges?.items?.length
      ? { key: "challenges", panel: impactPanels.challenges, accent: "challenge" as const }
      : null,
    impactPanels?.puduHelp?.items?.length
      ? { key: "puduHelp", panel: impactPanels.puduHelp, accent: "solution" as const }
      : null,
    impactPanels?.results?.items?.length
      ? { key: "results", panel: impactPanels.results, accent: "result" as const }
      : null,
  ].filter(Boolean) as {
    key: string
    panel: ImpactPanel
    accent: PanelAccent
  }[]

  if (panels.length === 0) {
    return null
  }

  const gridClass =
    panels.length === 1
      ? "mx-auto max-w-[36rem]"
      : panels.length === 2
        ? "grid grid-cols-1 gap-[clamp(1rem,2vw,1.25rem)] md:grid-cols-2"
        : "grid grid-cols-1 gap-[clamp(1rem,2vw,1.25rem)] lg:grid-cols-3"

  return (
    <section
      className="bg-[oklch(0.985_0.003_260)] py-[clamp(4rem,8vw,6.5rem)]"
      id="impact"
    >
      <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,3vw,2.5rem)]">
        <motion.div
          className={gridClass}
          dir={isRTL ? "rtl" : "ltr"}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fastStagger}
        >
          {panels.map(({ key, panel, accent }) => (
            <ImpactPanelBlock
              key={key}
              panel={panel}
              accent={accent}
              isRTL={isRTL}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
