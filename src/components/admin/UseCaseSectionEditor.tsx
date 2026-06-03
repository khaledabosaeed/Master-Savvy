"use client"

import { Plus, Trash2 } from "lucide-react"
import RichTextArea from "@/components/admin/RichTextArea"
import {
  type InnovationUseCaseData,
  isPuduRobotKey,
  normalizeUseCaseChallengeItems,
  PUDU_ROBOT_KEYS,
  ROBOT_DISPLAY_NAMES,
  syncUseCaseSlides,
  type UseCaseChallengeItem,
} from "@/lib/innovation-use-cases"
import { IMPACT_STAT_ICON_KEYS } from "@/components/innovation-page/data/impact-stat-icons"
import type { PuduRobotKey } from "@/components/innovation-page/data/industries"
import { isHttpUrl } from "@/lib/media-url"

function parseUseCase(raw: unknown): InnovationUseCaseData {
  const fallback = syncUseCaseSlides({
    slideKeys: ["holabot"],
    solutionKeys: ["holabot"],
    aboutTitle: "",
    slides: [{ robotName: "HolaBot", imageAlt: "", imageUrl: "" }],
    challenges: { heading: "Challenges", items: [""] },
    whyChoose: { heading: "Why choose Pudu Robotics?", items: [""] },
    solutionsTitle: "Robotic Solutions",
    solutions: [
      {
        name: "HolaBot",
        imageAlt: "",
        imageUrl: "",
        features: [""],
        learnMoreLabel: "Learn More",
        href: "/{lang}/contact",
      },
    ],
  })

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return fallback
  }

  const entry = raw as Partial<InnovationUseCaseData>
  return syncUseCaseSlides({
    ...fallback,
    ...entry,
    slideKeys: Array.isArray(entry.slideKeys)
      ? entry.slideKeys.filter(isPuduRobotKey)
      : fallback.slideKeys,
    solutionKeys: Array.isArray(entry.solutionKeys)
      ? entry.solutionKeys.filter(isPuduRobotKey)
      : fallback.solutionKeys,
    slides: Array.isArray(entry.slides) ? entry.slides : fallback.slides,
    challenges: {
      heading: entry.challenges?.heading ?? fallback.challenges.heading,
      items: Array.isArray(entry.challenges?.items)
        ? entry.challenges.items
            .map((item) => {
              if (typeof item === "string") return item
              if (item && typeof item === "object" && "label" in item) {
                const record = item as { icon?: string; label?: string }
                return {
                  icon: record.icon?.trim() || "experience",
                  label: record.label ?? "",
                }
              }
              return ""
            })
            .filter((item) =>
              typeof item === "string" ? item.trim() : item.label.trim()
            )
        : fallback.challenges.items,
    },
    whyChoose: {
      heading: entry.whyChoose?.heading ?? fallback.whyChoose.heading,
      items: Array.isArray(entry.whyChoose?.items)
        ? entry.whyChoose.items.map(String)
        : fallback.whyChoose.items,
    },
    solutions: Array.isArray(entry.solutions)
      ? entry.solutions.map((s) => ({
          name: s?.name ?? "",
          imageAlt: s?.imageAlt ?? "",
          imageUrl: s?.imageUrl ?? "",
          features: Array.isArray(s?.features) ? s.features.map(String) : [""],
          learnMoreLabel: s?.learnMoreLabel ?? "Learn More",
          href: s?.href ?? "/{lang}/contact",
        }))
      : fallback.solutions,
  })
}

function ChallengeItemsEditor({
  items,
  onChange,
}: {
  items: UseCaseChallengeItem[]
  onChange: (next: UseCaseChallengeItem[]) => void
}) {
  return (
    <div className="space-y-2">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 p-3 sm:grid-cols-[minmax(0,8rem)_1fr_auto]"
          >
            <div>
              {fieldLabel("Icon")}
              <select
                value={item.icon}
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...item, icon: e.target.value }
                  onChange(next)
                }}
                className={textInputClass()}
              >
                {IMPACT_STAT_ICON_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {fieldLabel("Label")}
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...item, label: e.target.value }
                  onChange(next)
                }}
                className={textInputClass()}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="self-end rounded-md border border-red-900/50 p-2 text-red-300 hover:bg-red-950/40 sm:self-center"
              aria-label={`Remove challenge ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          onChange([...items, { icon: "experience", label: "" }])
        }
        className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900"
      >
        <Plus className="h-3.5 w-3.5" />
        Add challenge
      </button>
    </div>
  )
}

function StringListEditor({
  label,
  items,
  onChange,
  addLabel,
}: {
  label: string
  items: string[]
  onChange: (next: string[]) => void
  addLabel: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <RichTextArea
              id={`${label}-${index}`}
              label={`Item ${index + 1}`}
              value={item}
              onChange={(value) => {
                const next = [...items]
                next[index] = value
                onChange(next)
              }}
              padLeft={0}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="mt-6 shrink-0 self-start rounded-md border border-red-900/50 p-2 text-red-300 hover:bg-red-950/40"
              aria-label={`Remove ${label} item ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  )
}

function RobotKeysPicker({
  label,
  value,
  onChange,
}: {
  label: string
  value: PuduRobotKey[]
  onChange: (next: PuduRobotKey[]) => void
}) {
  const selected = new Set(value)

  function toggle(key: PuduRobotKey) {
    const next = selected.has(key)
      ? value.filter((k) => k !== key)
      : [...value, key]
    onChange(next)
  }

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {PUDU_ROBOT_KEYS.map((key) => {
          const active = selected.has(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? "border-primary bg-primary/20 text-white"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
            >
              {ROBOT_DISPLAY_NAMES[key]}
            </button>
          )
        })}
      </div>
    </div>
  )
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

type UseCaseSectionEditorProps = {
  value: unknown
  onChange: (next: InnovationUseCaseData) => void
}

export default function UseCaseSectionEditor({
  value,
  onChange,
}: UseCaseSectionEditorProps) {
  const useCase = parseUseCase(value)

  function update(partial: Partial<InnovationUseCaseData>) {
    onChange(syncUseCaseSlides({ ...useCase, ...partial }))
  }

  function updateSlideKeys(slideKeys: PuduRobotKey[]) {
    onChange(syncUseCaseSlides({ ...useCase, slideKeys }))
  }

  return (
    <div className="space-y-6">
      <div>
        {fieldLabel("Section title (category name)")}
        <input
          type="text"
          value={useCase.aboutTitle}
          onChange={(e) => update({ aboutTitle: e.target.value })}
          placeholder="e.g. Floor Cleaning"
          className={textInputClass()}
        />
      </div>

      <section className="rounded-lg border border-orange-900/30 bg-zinc-900/40 p-4">
        <h4 className="mb-1 text-sm font-semibold text-orange-200/90">
          Challenges carousel slide
        </h4>
        <p className="mb-3 text-xs leading-relaxed text-zinc-500">
          Shown as the first slide before robot images, with an icon for each
          challenge.
        </p>
        <div className="mb-3">
          {fieldLabel("Heading")}
          <input
            type="text"
            value={useCase.challenges.heading}
            onChange={(e) =>
              update({
                challenges: { ...useCase.challenges, heading: e.target.value },
              })
            }
            placeholder="e.g. Hospitality Industry Challenges"
            className={textInputClass()}
          />
        </div>
        <ChallengeItemsEditor
          items={normalizeUseCaseChallengeItems(useCase.challenges.items)}
          onChange={(items) =>
            update({ challenges: { ...useCase.challenges, items } })
          }
        />
      </section>

      <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <h4 className="mb-3 text-sm font-semibold text-zinc-200">
          Robot image slider
        </h4>
        <RobotKeysPicker
          label="Robots in carousel (order = slide order)"
          value={useCase.slideKeys ?? []}
          onChange={updateSlideKeys}
        />
        {(useCase.slideKeys ?? []).length > 0 && (
          <div className="mt-4 space-y-3">
            {(useCase.slideKeys ?? []).map((key, index) => {
              const slide = useCase.slides[index] ?? {
                robotName: ROBOT_DISPLAY_NAMES[key],
                imageAlt: "",
                imageUrl: "",
              }
              return (
                <div
                  key={`${key}-${index}`}
                  className="rounded-md border border-zinc-800 bg-zinc-950/60 p-3"
                >
                  <p className="mb-2 text-xs font-medium text-zinc-400">
                    Slide {index + 1} — {ROBOT_DISPLAY_NAMES[key]}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      {fieldLabel("Caption overlay")}
                      <input
                        type="text"
                        value={slide.robotName}
                        onChange={(e) => {
                          const slides = [...useCase.slides]
                          slides[index] = { ...slide, robotName: e.target.value }
                          update({ slides })
                        }}
                        className={textInputClass()}
                      />
                    </div>
                    <div>
                      {fieldLabel("Image alt text")}
                      <input
                        type="text"
                        value={slide.imageAlt}
                        onChange={(e) => {
                          const slides = [...useCase.slides]
                          slides[index] = { ...slide, imageAlt: e.target.value }
                          update({ slides })
                        }}
                        className={textInputClass()}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    {fieldLabel("Image URL (optional override)")}
                    <input
                      type="url"
                      value={slide.imageUrl ?? ""}
                      onChange={(e) => {
                        const slides = [...useCase.slides]
                        slides[index] = { ...slide, imageUrl: e.target.value }
                        update({ slides })
                      }}
                      placeholder="Leave empty for default robot image"
                      className={`${textInputClass()} font-mono text-xs`}
                    />
                    {isHttpUrl(slide.imageUrl ?? "") && (
                      <div className="mt-2 overflow-hidden rounded-md border border-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.imageUrl}
                          alt=""
                          className="max-h-28 w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-blue-900/30 bg-zinc-900/40 p-4">
        <h4 className="mb-3 text-sm font-semibold text-blue-200/90">
          Why choose Pudu Robotics panel
        </h4>
        <div className="mb-3">
          {fieldLabel("Heading")}
          <input
            type="text"
            value={useCase.whyChoose.heading}
            onChange={(e) =>
              update({
                whyChoose: { ...useCase.whyChoose, heading: e.target.value },
              })
            }
            className={textInputClass()}
          />
        </div>
        <StringListEditor
          label="Bullet points"
          items={useCase.whyChoose.items}
          onChange={(items) =>
            update({ whyChoose: { ...useCase.whyChoose, items } })
          }
          addLabel="Add benefit"
        />
      </section>

      <section className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <h4 className="mb-3 text-sm font-semibold text-zinc-200">
          Robotic solutions
        </h4>
        <div className="mb-4">
          {fieldLabel("Section heading")}
          <input
            type="text"
            value={useCase.solutionsTitle}
            onChange={(e) => update({ solutionsTitle: e.target.value })}
            className={textInputClass()}
          />
        </div>
        <RobotKeysPicker
          label="Solution robots (links cards to robot images when URL empty)"
          value={useCase.solutionKeys ?? []}
          onChange={(solutionKeys) => {
            const solutions = solutionKeys.map((key, index) => {
              const existing = useCase.solutions[index]
              const name = ROBOT_DISPLAY_NAMES[key]
              return (
                existing ?? {
                  name,
                  imageAlt: name,
                  imageUrl: "",
                  features: [""],
                  learnMoreLabel: "Learn More",
                  href: "/{lang}/contact",
                }
              )
            })
            update({ solutionKeys, solutions })
          }}
        />

        <div className="mt-4 space-y-4">
          {useCase.solutions.map((solution, index) => (
            <div
              key={index}
              className="rounded-md border border-zinc-800 bg-zinc-950/60 p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-300">
                  Solution {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const solutionKeys = (useCase.solutionKeys ?? []).filter(
                      (_, i) => i !== index
                    )
                    update({
                      solutionKeys,
                      solutions: useCase.solutions.filter((_, i) => i !== index),
                    })
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-red-900/50 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  {fieldLabel("Product name")}
                  <input
                    type="text"
                    value={solution.name}
                    onChange={(e) => {
                      const solutions = [...useCase.solutions]
                      solutions[index] = { ...solution, name: e.target.value }
                      update({ solutions })
                    }}
                    className={textInputClass()}
                  />
                </div>
                <div>
                  {fieldLabel("Learn more link")}
                  <input
                    type="text"
                    value={solution.href}
                    onChange={(e) => {
                      const solutions = [...useCase.solutions]
                      solutions[index] = { ...solution, href: e.target.value }
                      update({ solutions })
                    }}
                    placeholder="https://… or /{lang}/contact"
                    className={`${textInputClass()} font-mono text-xs`}
                  />
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  {fieldLabel("Image alt")}
                  <input
                    type="text"
                    value={solution.imageAlt}
                    onChange={(e) => {
                      const solutions = [...useCase.solutions]
                      solutions[index] = {
                        ...solution,
                        imageAlt: e.target.value,
                      }
                      update({ solutions })
                    }}
                    className={textInputClass()}
                  />
                </div>
                <div>
                  {fieldLabel("Image URL")}
                  <input
                    type="url"
                    value={solution.imageUrl ?? ""}
                    onChange={(e) => {
                      const solutions = [...useCase.solutions]
                      solutions[index] = {
                        ...solution,
                        imageUrl: e.target.value,
                      }
                      update({ solutions })
                    }}
                    className={`${textInputClass()} font-mono text-xs`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <StringListEditor
                  label="Features"
                  items={solution.features}
                  onChange={(features) => {
                    const solutions = [...useCase.solutions]
                    solutions[index] = { ...solution, features }
                    update({ solutions })
                  }}
                  addLabel="Add feature"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export { parseUseCase }
