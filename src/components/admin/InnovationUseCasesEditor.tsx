"use client"

import { Plus, RefreshCw, Trash2 } from "lucide-react"
import UseCaseSectionEditor, {
  ChallengeItemsEditor,
  getRobotCardTitle,
  parseUseCase,
} from "@/components/admin/UseCaseSectionEditor"
import {
  buildUseCasesFromIndustry,
  createDefaultUseCase,
  normalizeUseCaseChallengeItems,
  type InnovationUseCaseData,
  type UseCaseChallengeItem,
} from "@/lib/innovation-use-cases"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"

type JsonValue = unknown

type ImpactChallengesPanel = {
  heading: string
  items: UseCaseChallengeItem[]
}

type InnovationUseCasesEditorProps = {
  industrySlug: IndustrySlug
  useCases: JsonValue[]
  industryRecord: Record<string, JsonValue>
  locale: "en" | "ar"
  onChange: (next: JsonValue[]) => void
  onChallengesChange: (next: ImpactChallengesPanel) => void
}

function fieldLabel(text: string) {
  return (
    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
      {text}
    </label>
  )
}

function textInputClass() {
  return "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/25"
}

function parseImpactChallenges(
  industryRecord: Record<string, JsonValue>
): ImpactChallengesPanel {
  const impactPanels = industryRecord.impactPanels
  if (!impactPanels || typeof impactPanels !== "object" || Array.isArray(impactPanels)) {
    return { heading: "", items: [] }
  }

  const challenges = (impactPanels as Record<string, unknown>).challenges
  if (!challenges || typeof challenges !== "object" || Array.isArray(challenges)) {
    return { heading: "", items: [] }
  }

  const record = challenges as { heading?: string; items?: unknown }
  return {
    heading: record.heading?.trim() ?? "",
    items: normalizeUseCaseChallengeItems(record.items),
  }
}

function getSharedSolutionsTitle(useCases: JsonValue[]): string {
  for (const entry of useCases) {
    const title = parseUseCase(entry).solutionsTitle?.trim()
    if (title) return title
  }
  return "Recommended Solutions"
}

export default function InnovationUseCasesEditor({
  industrySlug,
  useCases,
  industryRecord,
  locale,
  onChange,
  onChallengesChange,
}: InnovationUseCasesEditorProps) {
  const challenges = parseImpactChallenges(industryRecord)
  const solutionsTitle = getSharedSolutionsTitle(useCases)

  function addRobotCard() {
    const next = createDefaultUseCase()
    next.solutionsTitle = solutionsTitle
    onChange([...useCases, next])
  }

  function resetFromIndustryDefaults() {
    const ok = window.confirm(
      "Replace challenges and all robot cards for this industry with defaults from impact panels? Unsaved edits will be lost until you save."
    )
    if (!ok) return
    const built = buildUseCasesFromIndustry(
      industrySlug,
      industryRecord,
      locale
    )
    onChange(built as JsonValue[])
  }

  function removeRobotCard(index: number) {
    const title = getRobotCardTitle(useCases[index], index)
    const ok = window.confirm(
      `Remove "${title}"? Save innovation to publish changes to Supabase.`
    )
    if (!ok) return
    onChange(useCases.filter((_, i) => i !== index))
  }

  function updateRobotCard(index: number, next: InnovationUseCaseData) {
    const copy = [...useCases]
    copy[index] = { ...next, solutionsTitle }
    onChange(copy)
  }

  function updateSolutionsTitle(title: string) {
    onChange(
      useCases.map((entry) => ({
        ...parseUseCase(entry),
        solutionsTitle: title,
      }))
    )
  }

  return (
    <section className="mb-8 rounded-xl border border-primary/25 bg-primary/5 p-4 md:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Industry page layout
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
            The public industry page shows two blocks: challenges once at the
            top, then a combined grid of all robot cards below. Click{" "}
            <span className="font-medium text-zinc-300">Save innovation</span>{" "}
            in the header to sync copy to Supabase.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetFromIndustryDefaults}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Reset from defaults
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-lg border border-orange-900/30 bg-zinc-900/40 p-4">
          <h4 className="mb-1 text-sm font-semibold text-orange-200/90">
            1. Challenges
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-zinc-500">
            Shown once as the main heading and icon grid on the industry page.
          </p>
          <div className="mb-3">
            {fieldLabel("Heading")}
            <input
              type="text"
              value={challenges.heading}
              onChange={(e) =>
                onChallengesChange({
                  ...challenges,
                  heading: e.target.value,
                })
              }
              placeholder="e.g. Hospitality Industry Challenges"
              className={textInputClass()}
            />
          </div>
          <ChallengeItemsEditor
            items={challenges.items}
            onChange={(items) =>
              onChallengesChange({ ...challenges, items })
            }
          />
        </section>

        <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-zinc-200">
                2. Recommended solutions
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Each robot card below is merged into one grid on the public
                page. Duplicate robots are shown only once.
              </p>
            </div>
            <button
              type="button"
              onClick={addRobotCard}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/25"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add robot card
            </button>
          </div>

          <div className="mb-4">
            {fieldLabel("Section heading")}
            <input
              type="text"
              value={solutionsTitle}
              onChange={(e) => updateSolutionsTitle(e.target.value)}
              placeholder="e.g. Recommended Solutions"
              className={textInputClass()}
            />
          </div>

          {useCases.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-6 text-sm text-zinc-500">
              No robot cards yet. Click{" "}
              <span className="font-medium text-zinc-300">
                Reset from defaults
              </span>{" "}
              or{" "}
              <span className="font-medium text-zinc-300">Add robot card</span>{" "}
              to start.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {useCases.map((entry, index) => (
                <div
                  key={`${industrySlug}-robot-card-${index}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2.5">
                    <p className="text-sm font-medium text-zinc-200">
                      Robot card {index + 1}
                      <span className="ml-2 font-normal text-zinc-500">
                        {getRobotCardTitle(entry, index)}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => removeRobotCard(index)}
                      className="inline-flex items-center gap-1 rounded-md border border-red-900/50 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:bg-red-950/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      Remove
                    </button>
                  </div>
                  <div className="p-3">
                    <UseCaseSectionEditor
                      value={entry}
                      onChange={(next) => updateRobotCard(index, next)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}
