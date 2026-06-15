"use client"

import { Plus, Trash2 } from "lucide-react"
import ValueField from "@/components/admin/ValueField"
import RichTextArea from "@/components/admin/RichTextArea"

type JsonValue = unknown

type SavvySectionCard = {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  image: string
  link: string
  buttonText: string
}

type SavvySectionCardDetails = Omit<SavvySectionCard, "features">

type SavvySectionsData = {
  sectionTitle: string
  cards: SavvySectionCard[]
}

type SavvySectionsEditorProps = {
  value: JsonValue
  onChange: (next: SavvySectionsData) => void
}

function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function parseCard(raw: unknown): SavvySectionCard | null {
  if (!isPlainObject(raw)) return null
  const features = Array.isArray(raw.features)
    ? raw.features.filter((f): f is string => typeof f === "string")
    : []
  if (
    typeof raw.id !== "string" ||
    typeof raw.title !== "string" ||
    typeof raw.description !== "string" ||
    typeof raw.icon !== "string" ||
    typeof raw.image !== "string" ||
    typeof raw.link !== "string" ||
    typeof raw.buttonText !== "string"
  ) {
    return null
  }
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    features,
    icon: raw.icon,
    image: raw.image,
    link: raw.link,
    buttonText: raw.buttonText,
  }
}

function parseCardDetails(raw: unknown): SavvySectionCardDetails | null {
  if (!isPlainObject(raw)) return null
  if (
    typeof raw.id !== "string" ||
    typeof raw.title !== "string" ||
    typeof raw.description !== "string" ||
    typeof raw.icon !== "string" ||
    typeof raw.image !== "string" ||
    typeof raw.link !== "string" ||
    typeof raw.buttonText !== "string"
  ) {
    return null
  }
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    icon: raw.icon,
    image: raw.image,
    link: raw.link,
    buttonText: raw.buttonText,
  }
}

function parseSavvySections(raw: unknown): SavvySectionsData {
  if (!isPlainObject(raw)) {
    return { sectionTitle: "", cards: [] }
  }
  const cards = Array.isArray(raw.cards)
    ? raw.cards
        .map(parseCard)
        .filter((card): card is SavvySectionCard => card !== null)
    : []
  return {
    sectionTitle:
      typeof raw.sectionTitle === "string" ? raw.sectionTitle : "",
    cards,
  }
}

function getCardLabel(card: SavvySectionCard, index: number): string {
  const title = card.title.trim()
  if (title) return title
  const id = card.id.trim()
  if (id) return id
  return `Section ${index + 1}`
}

export default function SavvySectionsEditor({
  value,
  onChange,
}: SavvySectionsEditorProps) {
  const data = parseSavvySections(value)

  function updateSectionTitle(sectionTitle: string) {
    onChange({ ...data, sectionTitle })
  }

  function updateCardDetails(index: number, next: JsonValue) {
    const parsed = parseCardDetails(next)
    if (!parsed) return
    const cards = [...data.cards]
    cards[index] = { ...cards[index], ...parsed }
    onChange({ ...data, cards })
  }

  function updateCardFeatures(index: number, features: string[]) {
    const card = data.cards[index]
    if (!card) return
    const cards = [...data.cards]
    cards[index] = { ...card, features }
    onChange({ ...data, cards })
  }

  function removeCard(index: number) {
    const card = data.cards[index]
    if (!card) return
    const label = getCardLabel(card, index)
    const ok = window.confirm(
      `Remove "${label}" from the homepage Savvy sections? Save the section to publish this change.`
    )
    if (!ok) return
    onChange({
      ...data,
      cards: data.cards.filter((_, i) => i !== index),
    })
  }

  return (
    <section className="mb-8 rounded-xl border border-primary/25 bg-primary/5 p-4 md:p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-zinc-200">Savvy sections</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          Each card appears on the homepage. Remove a section to hide it from the
          public site after you save.
        </p>
      </div>

      <div className="mb-6">
        <RichTextArea
          id="savvySections.sectionTitle"
          label="savvySections → sectionTitle"
          value={data.sectionTitle}
          onChange={updateSectionTitle}
          padLeft={0}
        />
      </div>

      {data.cards.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-6 text-sm text-zinc-500">
          No homepage sections. Add cards in locale JSON or restore from a
          backup.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {data.cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2.5">
                <p className="text-sm font-medium text-zinc-200">
                  Section {index + 1}
                  <span className="ml-2 font-normal text-zinc-500">
                    {getCardLabel(card, index)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="inline-flex items-center gap-1 rounded-md border border-red-900/50 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove section
                </button>
              </div>
              <div className="space-y-5 p-3">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Points
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        updateCardFeatures(index, [...card.features, ""])
                      }
                      className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                      Add point
                    </button>
                  </div>

                  {card.features.length === 0 ? (
                    <p className="rounded-md border border-dashed border-zinc-800 bg-zinc-950/60 px-3 py-4 text-sm text-zinc-500">
                      No points yet.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <li
                          key={`${card.id}-feature-${featureIndex}`}
                          className="grid gap-2 rounded-md border border-zinc-800 bg-zinc-950/70 p-3 sm:grid-cols-[minmax(0,1fr)_auto]"
                        >
                          <RichTextArea
                            id={`savvySections.cards[${index}].features[${featureIndex}]`}
                            label={`Point ${featureIndex + 1}`}
                            value={feature}
                            onChange={(nextFeature) => {
                              const features = [...card.features]
                              features[featureIndex] = nextFeature
                              updateCardFeatures(index, features)
                            }}
                            padLeft={0}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateCardFeatures(
                                index,
                                card.features.filter(
                                  (_, i) => i !== featureIndex
                                )
                              )
                            }
                            className="mt-6 shrink-0 self-start rounded-md border border-red-900/50 p-2 text-red-300 transition hover:bg-red-950/40"
                            aria-label={`Remove point ${featureIndex + 1}`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <ValueField
                  path={`savvySections.cards[${index}]`}
                  value={{
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    icon: card.icon,
                    image: card.image,
                    link: card.link,
                    buttonText: card.buttonText,
                  }}
                  depth={0}
                  onChange={(next) => updateCardDetails(index, next)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
