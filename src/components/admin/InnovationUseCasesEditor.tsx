"use client"

import { Plus, Trash2 } from "lucide-react"
import ValueField from "@/components/admin/ValueField"
import { createDefaultUseCase } from "@/lib/innovation-use-cases"
import type { IndustrySlug } from "@/components/innovation-page/data/industries"

type JsonValue = unknown

type InnovationUseCasesEditorProps = {
  industrySlug: IndustrySlug
  useCases: JsonValue[]
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
  onChange,
}: InnovationUseCasesEditorProps) {
  const path = `innovation.industries.${industrySlug}.useCases`

  function addUseCase() {
    onChange([...useCases, createDefaultUseCase()])
  }

  function removeUseCase(index: number) {
    const title = getUseCaseTitle(useCases[index], index)
    const ok = window.confirm(
      `Remove "${title}"? This deletes the section and its copy. Save innovation to publish.`
    )
    if (!ok) return
    onChange(useCases.filter((_, i) => i !== index))
  }

  return (
    <section className="mb-8 rounded-xl border border-primary/25 bg-primary/5 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Use case sections</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-zinc-400">
            Each section renders as an{" "}
            <span className="text-zinc-300">IndustryUseCaseSection</span> on the
            industry detail page. Remove all sections to fall back to the
            scenarios + robots layout.
          </p>
        </div>
        <button
          type="button"
          onClick={addUseCase}
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/25"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Add use case section
        </button>
      </div>

      {useCases.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-6 text-sm text-zinc-500">
          No use case sections for this industry. Click{" "}
          <span className="font-medium text-zinc-300">Add use case section</span>{" "}
          to create one.
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
                <ValueField
                  path={`${path}[${index}]`}
                  value={entry}
                  depth={0}
                  onChange={(next) => {
                    const copy = [...useCases]
                    copy[index] = next
                    onChange(copy)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
