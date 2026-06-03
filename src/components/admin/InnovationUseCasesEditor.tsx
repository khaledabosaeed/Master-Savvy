"use client"

import { Plus, RefreshCw, Trash2 } from "lucide-react"
import UseCaseSectionEditor from "@/components/admin/UseCaseSectionEditor"
import {
  buildUseCasesFromIndustry,
  createDefaultUseCase,
  type InnovationUseCaseData,
} from "@/lib/innovation-use-cases"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"

type JsonValue = unknown

type InnovationUseCasesEditorProps = {
  industrySlug: IndustrySlug
  useCases: JsonValue[]
  industryRecord: Record<string, JsonValue>
  locale: "en" | "ar"
  onChange: (next: JsonValue[]) => void
}

function getUseCaseTitle(entry: JsonValue, index: number): string {
  if (
    entry &&
    typeof entry === "object" &&
    !Array.isArray(entry) &&
    typeof (entry as Record<string, unknown>).aboutTitle === "string"
  ) {
    const title = (entry as Record<string, string>).aboutTitle.trim()
    if (title) return title
  }
  return `Use case ${index + 1}`
}

export default function InnovationUseCasesEditor({
  industrySlug,
  useCases,
  industryRecord,
  locale,
  onChange,
}: InnovationUseCasesEditorProps) {
  function addUseCase() {
    onChange([...useCases, createDefaultUseCase()])
  }

  function resetFromIndustryDefaults() {
    const ok = window.confirm(
      "Replace all use case sections for this industry with defaults from impact panels? Unsaved section edits will be lost until you save."
    )
    if (!ok) return
    const built = buildUseCasesFromIndustry(
      industrySlug,
      industryRecord,
      locale
    )
    onChange(built as JsonValue[])
  }

  function removeUseCase(index: number) {
    const title = getUseCaseTitle(useCases[index], index)
    const ok = window.confirm(
      `Remove "${title}"? Save innovation to publish changes to Supabase.`
    )
    if (!ok) return
    onChange(useCases.filter((_, i) => i !== index))
  }

  function updateUseCase(index: number, next: InnovationUseCaseData) {
    const copy = [...useCases]
    copy[index] = next
    onChange(copy)
  }

  return (
    <section className="mb-8 rounded-xl border border-primary/25 bg-primary/5 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Use case sections</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-zinc-400">
            Each section renders on the industry page: robot slider, challenges
            and benefits panels, and robotic solutions. Click{" "}
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
            Reset from industry defaults
          </button>
          <button
            type="button"
            onClick={addUseCase}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/25"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add section
          </button>
        </div>
      </div>

      {useCases.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-6 text-sm text-zinc-500">
          No use case sections yet. Click{" "}
          <span className="font-medium text-zinc-300">Reset from industry defaults</span>{" "}
          to generate the standard layout for this category, or{" "}
          <span className="font-medium text-zinc-300">Add section</span> to start
          blank.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {useCases.map((entry, index) => (
            <div
              key={`${industrySlug}-use-case-${index}`}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2.5">
                <p className="text-sm font-medium text-zinc-200">
                  Section {index + 1}
                  <span className="ml-2 font-normal text-zinc-500">
                    {getUseCaseTitle(entry, index)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => removeUseCase(index)}
                  className="inline-flex items-center gap-1 rounded-md border border-red-900/50 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove section
                </button>
              </div>
              <div className="p-3">
                <UseCaseSectionEditor
                  value={entry}
                  onChange={(next) => updateUseCase(index, next)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
