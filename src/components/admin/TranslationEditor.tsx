"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import InnovationUseCasesEditor from "@/components/admin/InnovationUseCasesEditor"
import ValueField from "@/components/admin/ValueField"
import {
  INDUSTRY_SLUGS,
  type IndustrySlug,
} from "@/components/innovation-page/data/industries"

type JsonValue = unknown

function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

/** Human-readable path for labels (e.g. hero → title) */
function formatPathDisplay(path: string): string {
  return path.replace(/\./g, " → ")
}

const SITE_KEYS = new Set([
  "header",
  "nav",
  "footer",
  "topBanner",
  "common",
])
const HOME_KEYS = new Set([
  "hero",
  "home",
  "promo",
  "servicesGrid",
  "partnersSlider",
  "imageSlider",
  "gallerySection",
  "latestNewsSection",
  "savvySections",
])

function deepEqualJson(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

/** True if any string/number/boolean leaf contains `q` (case-insensitive). */
function valueContainsText(value: unknown, qLower: string): boolean {
  if (!qLower) return true
  const walk = (v: unknown): boolean => {
    if (v === null || v === undefined) return false
    if (typeof v === "string") return v.toLowerCase().includes(qLower)
    if (typeof v === "number" || typeof v === "boolean") {
      return String(v).toLowerCase().includes(qLower)
    }
    if (Array.isArray(v)) return v.some(walk)
    if (typeof v === "object") {
      return Object.values(v as Record<string, unknown>).some(walk)
    }
    return false
  }
  return walk(value)
}

/** One leaf match for sidebar search results (path is dot notation from section root). */
type SearchMatch = {
  section: string
  path: string
  value: string
}

const SEARCH_VALUE_PREVIEW_MAX = 160

function truncateForPreview(s: string, max = SEARCH_VALUE_PREVIEW_MAX): string {
  if (s.length <= max) return s
  return `${s.slice(0, max - 1)}…`
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function HighlightedSearchValue({
  text,
  query,
}: {
  text: string
  query: string
}) {
  const q = query.trim()
  const display = truncateForPreview(text)
  if (!q) {
    return <span className="break-words">{display}</span>
  }
  const re = new RegExp(`(${escapeRegExp(q)})`, "gi")
  const parts = display.split(re)
  return (
    <span className="break-words">
      {parts.map((part, idx) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={idx}
            className="rounded bg-amber-400/30 px-0.5 text-amber-200"
          >
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </span>
  )
}

/** Collect every string/number/boolean leaf whose text contains `qLower`. */
function collectMatches(
  section: string,
  value: unknown,
  qLower: string
): SearchMatch[] {
  const results: SearchMatch[] = []
  const walk = (v: unknown, path: string) => {
    if (v === null || v === undefined) return
    if (typeof v === "string") {
      if (v.toLowerCase().includes(qLower)) {
        results.push({ section, path, value: v })
      }
      return
    }
    if (typeof v === "number" || typeof v === "boolean") {
      const s = String(v)
      if (s.toLowerCase().includes(qLower)) {
        results.push({ section, path, value: s })
      }
      return
    }
    if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, `${path}[${i}]`))
      return
    }
    if (isPlainObject(v)) {
      for (const [k, child] of Object.entries(v)) {
        walk(child, `${path}.${k}`)
      }
    }
  }
  walk(value, section)
  return results
}

type LocaleTab = "en" | "ar"

type PreviewTarget =
  | "home"
  | "innovation"
  | "expo"
  | "media"
  | "contact"
  | "privacy"
  | "terms"
  | "robots"
  | "r1"
  | "g1"
  | "go2"
  | "h2"

function previewPathFor(
  loc: LocaleTab,
  target: PreviewTarget,
  innovationSlug?: IndustrySlug | null
): string {
  const base = `/${loc}`
  switch (target) {
    case "home":
      return base
    case "innovation":
      return innovationSlug
        ? `${base}/innovation/${innovationSlug}`
        : `${base}/innovation`
    case "expo":
    case "media":
    case "contact":
    case "privacy":
    case "terms":
      return `${base}/${target}`
    case "robots":
      return `${base}/robots`
    default:
      return `${base}/robots/${target}`
  }
}

/** Keys under `robots` that are shared across /robots (not per-product pages) */
const ROBOTS_HUB_EXCLUDE = new Set([
  "hero",
  "scrollSection",
  "imageSection",
  "flexibleSection",
  "specs",
  "product",
])

/** Keys under `robots` that contain one nested object per robot slug */
const ROBOTS_PER_PAGE_TOP_KEYS = [
  "hero",
  "scrollSection",
  "imageSection",
  "flexibleSection",
  "specs",
  "product",
] as const

type RobotSidebarPage = "robots" | "r1" | "g1" | "go2" | "h2"

function extractRobotsHub(r: Record<string, JsonValue>): Record<string, JsonValue> {
  const out: Record<string, JsonValue> = {}
  for (const [k, v] of Object.entries(r)) {
    if (!ROBOTS_HUB_EXCLUDE.has(k)) out[k] = v
  }
  return out
}

function extractRobotsForRobotPage(
  r: Record<string, JsonValue>,
  page: RobotSidebarPage
): Record<string, JsonValue> {
  if (page === "robots") {
    return extractRobotsHub(r)
  }
  const slug = page
  const out: Record<string, JsonValue> = {}
  for (const key of ROBOTS_PER_PAGE_TOP_KEYS) {
    const block = r[key]
    if (!isPlainObject(block)) continue
    const slice = (block as Record<string, JsonValue>)[slug]
    if (slice !== undefined) {
      out[key] = { [slug]: slice }
    }
  }
  return out
}

function applyRobotsRobotPageEdit(
  fullRobots: Record<string, JsonValue>,
  page: RobotSidebarPage,
  edited: Record<string, JsonValue>
): Record<string, JsonValue> {
  if (page === "robots") {
    return { ...fullRobots, ...edited }
  }
  const merged = { ...fullRobots }
  for (const [topKey, partial] of Object.entries(edited)) {
    if (!isPlainObject(partial)) continue
    const prevBlock = isPlainObject(merged[topKey])
      ? { ...(merged[topKey] as Record<string, JsonValue>) }
      : {}
    for (const [sk, val] of Object.entries(partial)) {
      prevBlock[sk] = val
    }
    merged[topKey] = prevBlock
  }
  return merged
}

const ROBOT_PRODUCT_SLUGS = new Set<RobotSidebarPage>(["r1", "g1", "go2", "h2"])

type InnovationPageFocus = "hub" | IndustrySlug

const INDUSTRY_SLUG_SET = new Set<string>(INDUSTRY_SLUGS)

const HUB_INDUSTRY_CARD_KEYS = [
  "title",
  "shortTitle",
  "summary",
  "imageAlt",
  "imageUrl",
] as const

function extractInnovationHub(
  innovation: Record<string, JsonValue>
): Record<string, JsonValue> {
  const out: Record<string, JsonValue> = {}
  for (const [key, value] of Object.entries(innovation)) {
    if (key !== "industries") {
      out[key] = value
    }
  }

  const industries = innovation.industries
  if (isPlainObject(industries)) {
    const hubIndustries: Record<string, JsonValue> = {}
    for (const slug of INDUSTRY_SLUGS) {
      const industry = (industries as Record<string, JsonValue>)[slug]
      if (!isPlainObject(industry)) continue
      const card: Record<string, JsonValue> = {}
      for (const field of HUB_INDUSTRY_CARD_KEYS) {
        if (industry[field] !== undefined) {
          card[field] = industry[field]
        }
      }
      if (Object.keys(card).length > 0) {
        hubIndustries[slug] = card
      }
    }
    if (Object.keys(hubIndustries).length > 0) {
      out.industries = hubIndustries
    }
  }

  return out
}

function extractInnovationForIndustry(
  innovation: Record<string, JsonValue>,
  slug: IndustrySlug
): Record<string, JsonValue> {
  const industries = innovation.industries
  const slice =
    isPlainObject(industries) &&
    (industries as Record<string, JsonValue>)[slug] !== undefined
      ? (industries as Record<string, JsonValue>)[slug]
      : {}
  return { industries: { [slug]: slice } }
}

function applyInnovationPageEdit(
  fullInnovation: Record<string, JsonValue>,
  focus: InnovationPageFocus,
  edited: Record<string, JsonValue>
): Record<string, JsonValue> {
  if (focus === "hub") {
    const merged = { ...fullInnovation }
    const { industries: editedIndustries, ...rootEdited } = edited
    Object.assign(merged, rootEdited)

    if (isPlainObject(editedIndustries)) {
      const prevIndustries = isPlainObject(merged.industries)
        ? { ...(merged.industries as Record<string, JsonValue>) }
        : {}
      for (const [slug, patch] of Object.entries(editedIndustries)) {
        if (!isPlainObject(patch)) continue
        const prev = isPlainObject(prevIndustries[slug])
          ? { ...(prevIndustries[slug] as Record<string, JsonValue>) }
          : {}
        for (const [field, value] of Object.entries(patch)) {
          prev[field] = value
        }
        prevIndustries[slug] = prev
      }
      merged.industries = prevIndustries
    }

    return merged
  }

  const merged = { ...fullInnovation }
  const prevIndustries = isPlainObject(merged.industries)
    ? { ...(merged.industries as Record<string, JsonValue>) }
    : {}
  const editedIndustries = edited.industries
  if (isPlainObject(editedIndustries)) {
    for (const [slug, value] of Object.entries(editedIndustries)) {
      prevIndustries[slug] = value
    }
  }
  merged.industries = prevIndustries
  return merged
}

function inferInnovationPageFromMatchPath(path: string): InnovationPageFocus {
  if (path === "innovation" || !path.startsWith("innovation.")) {
    return "hub"
  }
  const parts = path.split(".")
  if (
    parts.length >= 3 &&
    parts[1] === "industries" &&
    INDUSTRY_SLUG_SET.has(parts[2])
  ) {
    return parts[2] as IndustrySlug
  }
  return "hub"
}

function innovationIndustryLabel(
  content: Record<string, JsonValue> | null,
  slug: IndustrySlug
): string {
  if (!content || !isPlainObject(content.innovation)) {
    return slug
  }
  const industries = (content.innovation as Record<string, JsonValue>).industries
  if (!isPlainObject(industries)) {
    return slug
  }
  const industry = (industries as Record<string, JsonValue>)[slug]
  if (!isPlainObject(industry)) {
    return slug
  }
  const shortTitle = industry.shortTitle
  return typeof shortTitle === "string" && shortTitle.trim() ? shortTitle : slug
}

/** From a full field path under `robots.*`, pick which robot sidebar page to open so the field exists in the scoped editor. */
function inferRobotPageFromMatchPath(path: string): RobotSidebarPage {
  if (path === "robots" || !path.startsWith("robots.")) return "robots"
  const parts = path.split(".")
  if (parts.length < 3) return "robots"
  const topKey = parts[1]
  const slug = parts[2]
  if (
    (ROBOTS_PER_PAGE_TOP_KEYS as readonly string[]).includes(topKey) &&
    ROBOT_PRODUCT_SLUGS.has(slug as RobotSidebarPage)
  ) {
    return slug as RobotSidebarPage
  }
  return "robots"
}

/** Find the input/textarea for a ValueField `path` id (handles dots/brackets in ids). */
function findFieldElementByPath(path: string): HTMLElement | null {
  if (typeof document === "undefined") return null
  const el = document.getElementById(path)
  if (el) return el
  try {
    if (typeof CSS !== "undefined" && "escape" in CSS) {
      const byCss = document.querySelector(`#${CSS.escape(path)}`)
      if (byCss instanceof HTMLElement) return byCss
    }
  } catch {
    /* ignore */
  }
  const escAttr = path.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
  const byAttr = document.querySelector(`[id="${escAttr}"]`)
  if (byAttr instanceof HTMLElement) return byAttr
  const prefix = `${path}.`
  for (const node of document.querySelectorAll<HTMLElement>("[id]")) {
    if (node.id === path || node.id.startsWith(prefix)) return node
  }
  return null
}

/** Sidebar: main website pages + short copy so admins know which page they are editing */
const WEBSITE_PAGE_ENTRIES: {
  target: PreviewTarget
  section: string
  title: string
  description: string
}[] = [
  {
    target: "home",
    section: "home",
    title: "Home",
    description: "Homepage sections, landing copy, and shared page content.",
  },
  {
    target: "innovation",
    section: "innovation",
    title: "Innovation",
    description:
      "Industry hub hero, shared labels, and per-industry detail page copy.",
  },
  {
    target: "expo",
    section: "expo",
    title: "Expo",
    description: "Expo page hero, services, partners, and page copy.",
  },
  {
    target: "media",
    section: "media",
    title: "Media",
    description: "Media page content, gallery, projects, and page copy.",
  },
  {
    target: "contact",
    section: "contact",
    title: "Contact",
    description: "Contact page hero, form labels, sidebar, and FAQ copy.",
  },
  {
    target: "privacy",
    section: "privacy",
    title: "Privacy",
    description: "Privacy policy page sections and legal page copy.",
  },
  {
    target: "terms",
    section: "terms",
    title: "Terms",
    description: "Terms and conditions page sections and legal page copy.",
  },
]

type TranslationEditorProps = {
  onSignOut: () => void | Promise<void>
}

export default function TranslationEditor({ onSignOut }: TranslationEditorProps) {
  const [locale, setLocale] = useState<LocaleTab>("en")
  const [previewTarget, setPreviewTarget] = useState<PreviewTarget>("home")
  /** When set and activeSection is `robots`, editor shows only copy for that robot page (preview URL still driven by previewTarget). */
  const [robotPageFocus, setRobotPageFocus] = useState<RobotSidebarPage | null>(
    null
  )
  const [innovationPageFocus, setInnovationPageFocus] =
    useState<InnovationPageFocus>("hub")
  const [content, setContent] = useState<Record<string, JsonValue> | null>(null)
  const [baseline, setBaseline] = useState<Record<string, JsonValue> | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  /** Bumps iframe remount so preview can reload without a full save. */
  const [previewTick, setPreviewTick] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null)
  /** After clicking a search match, scroll this field path to the top of the editor. */
  const [scrollToFieldPath, setScrollToFieldPath] = useState<string | null>(null)
  const sectionNavRef = useRef<HTMLElement | null>(null)
  const editorScrollRef = useRef<HTMLDivElement | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/translations?locale=${locale}`, {
        credentials: "include",
      })
      const body = (await res.json()) as {
        content?: Record<string, JsonValue>
        updated_at?: string
        error?: string
      }
      if (!res.ok) {
        setError(body.error ?? res.statusText)
        setContent(null)
        setBaseline(null)
        setActiveSection(null)
        return
      }
      const next =
        body.content && typeof body.content === "object"
          ? { ...body.content }
          : {}
      setContent(next)
      setBaseline(JSON.parse(JSON.stringify(next)) as Record<string, JsonValue>)
      setUpdatedAt(body.updated_at ?? null)
      const keys = Object.keys(next).sort((a, b) => a.localeCompare(b))
      setActiveSection((prev) => (prev && prev in next ? prev : keys[0] ?? null))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
      setContent(null)
      setBaseline(null)
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    setToast(null)
  }, [locale])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (!activeSection || !sectionNavRef.current) return
    const esc =
      typeof CSS !== "undefined" && "escape" in CSS
        ? CSS.escape(activeSection)
        : activeSection.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
    const btn = sectionNavRef.current.querySelector<HTMLElement>(
      `[data-section="${esc}"]`
    )
    btn?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [activeSection])

  useEffect(() => {
    if (!scrollToFieldPath || loading) return

    const path = scrollToFieldPath
    let cancelled = false
    const timers: number[] = []

    const tryScroll = (): boolean => {
      if (cancelled) return true
      const field = findFieldElementByPath(path)
      if (!field) return false
      const scrollRoot = editorScrollRef.current
      if (scrollRoot) {
        const rootRect = scrollRoot.getBoundingClientRect()
        const fieldRect = field.getBoundingClientRect()
        const stickyHeader = scrollRoot.querySelector<HTMLElement>(
          ".sticky.top-0"
        )
        const offset = stickyHeader
          ? stickyHeader.getBoundingClientRect().height
          : 0
        const delta = fieldRect.top - rootRect.top - offset - 8
        scrollRoot.scrollBy({ top: delta, behavior: "smooth" })
      } else {
        field.scrollIntoView({ block: "start", behavior: "smooth" })
      }
      const focusable =
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLInputElement
          ? field
          : field.querySelector<HTMLTextAreaElement | HTMLInputElement>(
              "textarea, input:not([type=checkbox])"
            )
      focusable?.focus({ preventScroll: true })
      setScrollToFieldPath(null)
      return true
    }

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setScrollToFieldPath(null)
      }, 520)
    )
    for (const ms of [0, 50, 120, 250, 400]) {
      timers.push(
        window.setTimeout(() => {
          if (tryScroll()) {
            for (const t of timers) clearTimeout(t)
          }
        }, ms)
      )
    }

    return () => {
      cancelled = true
      for (const t of timers) clearTimeout(t)
    }
  }, [
    scrollToFieldPath,
    loading,
    activeSection,
    robotPageFocus,
    innovationPageFocus,
    content,
  ])

  const topLevelKeys = useMemo(
    () =>
      content
        ? Object.keys(content).sort((a, b) => a.localeCompare(b))
        : [],
    [content]
  )

  const filteredKeys = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return topLevelKeys
    if (!content) return topLevelKeys
    return topLevelKeys.filter((k) => {
      if (k.toLowerCase().includes(q)) return true
      return valueContainsText(content[k], q)
    })
  }, [topLevelKeys, search, content])

  const siteSidebarKeys = useMemo(
    () => topLevelKeys.filter((key) => SITE_KEYS.has(key)),
    [topLevelKeys]
  )

  const homeSidebarKeys = useMemo(
    () => topLevelKeys.filter((key) => HOME_KEYS.has(key)),
    [topLevelKeys]
  )

  /** When search is non-empty: flat list of all matching leaves (and section key if it matches). */
  const searchMatches = useMemo(() => {
    const q = search.trim()
    if (!q || !content) return null
    const qLower = q.toLowerCase()
    const all: SearchMatch[] = []
    for (const section of topLevelKeys) {
      if (section.toLowerCase().includes(qLower)) {
        all.push({ section, path: section, value: section })
      }
      all.push(...collectMatches(section, content[section], qLower))
    }
    return all
  }, [search, content, topLevelKeys])

  const robotsScopedSlice = useMemo(() => {
    if (
      !content ||
      !robotPageFocus ||
      !isPlainObject(content.robots)
    ) {
      return null
    }
    return extractRobotsForRobotPage(
      content.robots as Record<string, JsonValue>,
      robotPageFocus
    )
  }, [content, robotPageFocus])

  const innovationScopedSlice = useMemo(() => {
    if (!content || !isPlainObject(content.innovation)) {
      return null
    }
    const innovation = content.innovation as Record<string, JsonValue>
    return innovationPageFocus === "hub"
      ? extractInnovationHub(innovation)
      : extractInnovationForIndustry(innovation, innovationPageFocus)
  }, [content, innovationPageFocus])

  useEffect(() => {
    if (!content || filteredKeys.length === 0) return
    if (activeSection && !filteredKeys.includes(activeSection)) {
      setActiveSection(filteredKeys[0] ?? null)
    }
  }, [content, filteredKeys, activeSection])

  function isSectionDirty(section: string): boolean {
    if (!content || !baseline) return false
    return !deepEqualJson(content[section], baseline[section])
  }

  function hasAnyUnsaved(): boolean {
    if (!content || !baseline) return false
    return topLevelKeys.some((k) => !deepEqualJson(content[k], baseline[k]))
  }

  function trySetLocale(next: LocaleTab) {
    if (next === locale) return
    if (hasAnyUnsaved()) {
      const ok = window.confirm(
        "You have unsaved changes. Discard them and switch language?"
      )
      if (!ok) return
    }
    setLocale(next)
  }

  async function saveActiveSection() {
    if (!content || !activeSection || !(activeSection in content)) return
    setSaving(true)
    setToast(null)
    setError(null)
    try {
      const res = await fetch("/api/admin/translations", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          section: activeSection,
          data: content[activeSection],
        }),
      })
      const body = (await res.json()) as { error?: unknown; ok?: boolean }
      if (!res.ok) {
        const msg =
          typeof body.error === "string"
            ? body.error
            : JSON.stringify(body.error ?? res.statusText)
        setToast({ type: "err", text: msg })
        return
      }
      setToast({
        type: "ok",
        text: `Saved “${activeSection}”. Public cache updated.`,
      })
      await load()
    } catch (e) {
      setToast({
        type: "err",
        text: e instanceof Error ? e.message : "Save failed",
      })
    } finally {
      setSaving(false)
    }
  }

  const dirty = activeSection ? isSectionDirty(activeSection) : false
  const canSave =
    !loading &&
    !!content &&
    !!activeSection &&
    activeSection in (content ?? {}) &&
    dirty

  const previewPath = previewPathFor(
    locale,
    previewTarget,
    previewTarget === "innovation" && innovationPageFocus !== "hub"
      ? innovationPageFocus
      : null
  )

  return (
    <div
      className="flex h-dvh min-h-0 flex-col overflow-hidden"
      data-lenis-prevent
    >
      {/* Top bar: View site, Sign out, Save */}
      <header className="z-30 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur md:px-6">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Admin
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href={previewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            View website
          </Link>
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-200"
          >
            Sign out
          </button>
          <button
            type="button"
            disabled={saving || !canSave}
            onClick={() => void saveActiveSection()}
            className="min-w-[140px] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving
              ? "Saving…"
              : activeSection
                ? `Save “${activeSection}”`
                : "Save"}
          </button>
        </div>
      </header>

      {/* Grid + minmax(0,1fr) gives a hard height budget so nested overflow-y-auto can scroll */}
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(40vh,1fr)_minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1">
        {/* Site preview (left on large screens) */}
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/30 lg:border-b-0 lg:border-r">
          <div className="shrink-0 space-y-2 border-b border-zinc-800 p-2 sm:p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Preview
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPreviewTarget("home")}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition sm:text-sm ${
                  previewTarget === "home"
                    ? "border-primary bg-primary/20 text-white ring-1 ring-primary/40"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setPreviewTick((n) => n + 1)}
                className="rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:text-sm"
              >
                Refresh preview
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-500">
              Preview loads the live site from the server. Click{" "}
              <span className="font-medium text-zinc-400">Refresh</span> or save
              to see the latest published copy (unsaved edits stay in the editor
              only).
            </p>
          </div>
          <div className="relative min-h-0 flex-1 bg-zinc-950">
            <iframe
              key={`${previewPath}-${updatedAt ?? "init"}-${locale}-${previewTick}`}
              title="Site preview"
              src={`${previewPath}${previewPath.includes("?") ? "&" : "?"}_pv=${previewTick}&_at=${encodeURIComponent(updatedAt ?? "")}`}
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        {/* Translations: sidebar + editor */}
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden md:flex-row">
      {/* Sidebar */}
      <aside className="flex max-h-[40vh] w-full min-h-0 shrink-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/40 md:h-full md:max-h-none md:w-72 md:shrink-0 md:border-r">
        <div className="border-b border-zinc-800 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Language
          </p>
          <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            {(["en", "ar"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => trySetLocale(loc)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                  locale === loc
                    ? "bg-primary text-white shadow"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-zinc-800 p-3">
          <label
            htmlFor="section-search-sidebar"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Search (name or text)
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <input
              id="section-search-sidebar"
              type="search"
              placeholder="Section name or text inside…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        <nav
          ref={sectionNavRef}
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-2 pb-4"
        >
          {loading && (
            <p className="px-2 py-4 text-sm text-zinc-500">Loading…</p>
          )}
          {!loading && !search.trim() && (
            <>
              <div className="mb-4 border-b border-zinc-800 pb-3">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  Main pages
                </p>
                <ul className="space-y-1">
                  {WEBSITE_PAGE_ENTRIES.map((entry) => {
                    const pageSelected =
                      activeSection === entry.section &&
                      previewTarget === entry.target
                    return (
                      <li key={entry.target}>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewTarget(entry.target)
                            setRobotPageFocus(null)
                            if (entry.section === "innovation") {
                              setInnovationPageFocus("hub")
                            }
                            setActiveSection(entry.section)
                          }}
                          className={`flex w-full flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                            pageSelected
                              ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                              : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold leading-tight">
                            {entry.title}
                          </span>
                          <span className="text-[11px] font-normal leading-snug text-zinc-500">
                            {entry.description}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {content?.innovation && (
                <div className="mb-4 border-b border-zinc-800 pb-3">
                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Innovation pages
                  </p>
                  <ul className="space-y-0.5">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewTarget("innovation")
                          setInnovationPageFocus("hub")
                          setActiveSection("innovation")
                          setRobotPageFocus(null)
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                          activeSection === "innovation" &&
                          innovationPageFocus === "hub"
                            ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        <span className="truncate">Hub overview</span>
                      </button>
                    </li>
                    {INDUSTRY_SLUGS.map((slug) => {
                      const selected =
                        activeSection === "innovation" &&
                        innovationPageFocus === slug
                      return (
                        <li key={slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewTarget("innovation")
                              setInnovationPageFocus(slug)
                              setActiveSection("innovation")
                              setRobotPageFocus(null)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                              selected
                                ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            <span className="truncate">
                              {innovationIndustryLabel(content, slug)}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {siteSidebarKeys.length > 0 && (
                <div className="mb-4 border-b border-zinc-800 pb-3">
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Site
                  </p>
                  <ul className="space-y-0.5">
                    {siteSidebarKeys.map((key) => {
                      const isActive = activeSection === key
                      const unsaved = isSectionDirty(key)
                      return (
                        <li key={key}>
                          <button
                            type="button"
                            data-section={key}
                            onClick={() => {
                              setActiveSection(key)
                              setRobotPageFocus(null)
                              setPreviewTarget("home")
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                              isActive
                                ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                unsaved ? "bg-amber-400" : "bg-transparent"
                              }`}
                              title={unsaved ? "Unsaved changes" : undefined}
                              aria-hidden
                            />
                            <span className="truncate font-mono text-[13px]">
                              {key}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {homeSidebarKeys.length > 0 && (
                <div className="mb-4 border-b border-zinc-800 pb-3">
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Home sections
                  </p>
                  <ul className="space-y-0.5">
                    {homeSidebarKeys.map((key) => {
                      const isActive = activeSection === key
                      const unsaved = isSectionDirty(key)
                      return (
                        <li key={key}>
                          <button
                            type="button"
                            data-section={key}
                            onClick={() => {
                              setActiveSection(key)
                              setRobotPageFocus(null)
                              setPreviewTarget("home")
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                              isActive
                                ? "bg-primary/20 font-medium text-white ring-1 ring-primary/40"
                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                unsaved ? "bg-amber-400" : "bg-transparent"
                              }`}
                              title={unsaved ? "Unsaved changes" : undefined}
                              aria-hidden
                            />
                            <span className="truncate font-mono text-[13px]">
                              {key}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
          {!loading && search.trim() && searchMatches && (
            <>
              {searchMatches.length === 0 && (
                <p className="px-2 py-4 text-sm text-amber-200/90">
                  No matches for “{search.trim()}”.
                </p>
              )}
              {searchMatches.length > 0 && (
                <div className="mb-2 px-2">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Matches ({searchMatches.length})
                  </p>
                  <ul className="space-y-1">
                    {searchMatches.map((m, i) => {
                      const isActive = activeSection === m.section
                      return (
                        <li key={`${m.section}-${m.path}-${i}`}>
                          <button
                            type="button"
                            data-section={m.section}
                            onClick={() => {
                              setScrollToFieldPath(m.path)
                              setActiveSection(m.section)
                              if (m.section === "robots") {
                                const page = inferRobotPageFromMatchPath(m.path)
                                setRobotPageFocus(page)
                                setPreviewTarget(
                                  page === "robots" ? "robots" : page
                                )
                              } else if (m.section === "innovation") {
                                const page = inferInnovationPageFromMatchPath(
                                  m.path
                                )
                                setInnovationPageFocus(page)
                                setPreviewTarget("innovation")
                                setRobotPageFocus(null)
                              } else {
                                setRobotPageFocus(null)
                              }
                            }}
                            className={`flex w-full flex-col gap-1 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                              isActive
                                ? "bg-primary/20 ring-1 ring-primary/40"
                                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                                {m.section}
                              </span>
                              <span className="min-w-0 truncate font-mono text-[11px] text-zinc-500">
                                {formatPathDisplay(m.path)}
                              </span>
                            </div>
                            <div className="text-xs leading-snug text-zinc-200">
                              <HighlightedSearchValue
                                text={m.value}
                                query={search}
                              />
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
          {!loading &&
            !search.trim() &&
            topLevelKeys.length > 0 &&
            filteredKeys.length === 0 && (
              <p className="px-2 py-4 text-sm text-amber-200/90">
                No section name or text matches “{search.trim()}”.
              </p>
            )}
        </nav>
        {updatedAt && (
          <p className="shrink-0 border-t border-zinc-800 px-3 py-2 text-[10px] leading-relaxed text-zinc-600">
            Locale last saved: {new Date(updatedAt).toLocaleString()}
          </p>
        )}
      </aside>

      {/* Main editor */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-zinc-950 md:h-full">
        {toast && (
          <div
            className={`mx-4 mt-4 shrink-0 rounded-lg border px-4 py-3 text-sm md:mx-6 ${
              toast.type === "ok"
                ? "border-emerald-900/60 bg-emerald-950/50 text-emerald-100"
                : "border-red-900/60 bg-red-950/50 text-red-100"
            }`}
          >
            {toast.text}
          </div>
        )}
        {error && (
          <div className="mx-4 mt-4 shrink-0 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200 md:mx-6">
            {error}
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          {!loading && content && activeSection && (
            <>
              <div
                ref={editorScrollRef}
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 py-4 md:px-6"
              >
                <div className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center gap-2 border-b border-zinc-800/90 bg-zinc-950 px-4 py-3 md:-mx-6 md:px-6">
                  <span className="rounded-md bg-zinc-800 px-2 py-1 font-mono text-sm text-primary">
                    {activeSection}
                  </span>
                  {activeSection === "robots" && robotPageFocus !== null && (
                    <span className="text-sm text-zinc-400">
                      ·{" "}
                      {ROBOT_PRODUCT_SLUGS.has(robotPageFocus)
                        ? robotPageFocus.toUpperCase()
                        : "Robots overview"}
                    </span>
                  )}
                  {activeSection === "innovation" && (
                    <span className="text-sm text-zinc-400">
                      ·{" "}
                      {innovationPageFocus === "hub"
                        ? "Hub overview"
                        : innovationIndustryLabel(content, innovationPageFocus)}
                    </span>
                  )}
                  {activeSection !== "robots" && activeSection !== "innovation" && (
                    <span className="text-sm text-zinc-400">
                      ·{" "}
                      {WEBSITE_PAGE_ENTRIES.find((e) => e.section === activeSection)
                        ?.title ?? activeSection}
                    </span>
                  )}
                  {dirty && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                      Unsaved
                    </span>
                  )}
                </div>
                {activeSection === "robots" && robotPageFocus !== null ? (
                  <>
                    {robotsScopedSlice &&
                      Object.keys(robotsScopedSlice).length === 0 && (
                        <p className="mb-4 text-sm text-amber-200/90">
                          No robot-specific blocks found in locale data for this
                          page yet (check{" "}
                          <code className="rounded bg-zinc-800 px-1 text-xs">
                            hero
                          </code>
                          ,{" "}
                          <code className="rounded bg-zinc-800 px-1 text-xs">
                            product
                          </code>
                          , etc.).
                        </p>
                      )}
                    <ValueField
                      path="robots"
                      value={robotsScopedSlice ?? {}}
                      depth={0}
                      onChange={(next) => {
                        setContent((prev) => {
                          if (!prev || !isPlainObject(prev.robots)) return prev
                          const full = prev.robots as Record<string, JsonValue>
                          const updated = applyRobotsRobotPageEdit(
                            full,
                            robotPageFocus,
                            next as Record<string, JsonValue>
                          )
                          return { ...prev, robots: updated }
                        })
                      }}
                    />
                  </>
                ) : activeSection === "innovation" ? (
                  <>
                    {innovationScopedSlice &&
                      Object.keys(innovationScopedSlice).length === 0 && (
                        <p className="mb-4 text-sm text-amber-200/90">
                          No innovation copy found for this view yet.
                        </p>
                      )}
                    {innovationPageFocus !== "hub" &&
                      isPlainObject(innovationScopedSlice?.industries) && (() => {
                        const industriesBlock =
                          innovationScopedSlice!.industries as Record<
                            string,
                            JsonValue
                          >
                        const industryBlock = industriesBlock[innovationPageFocus]
                        const industryRecord = isPlainObject(industryBlock)
                          ? (industryBlock as Record<string, JsonValue>)
                          : {}
                        const useCases = Array.isArray(industryRecord.useCases)
                          ? (industryRecord.useCases as JsonValue[])
                          : []
                        const industryWithoutUseCases = Object.fromEntries(
                          Object.entries(industryRecord).filter(
                            ([key]) => key !== "useCases"
                          )
                        )

                        return (
                        <>
                          <InnovationUseCasesEditor
                            industrySlug={innovationPageFocus}
                            useCases={useCases}
                            industryRecord={industryRecord}
                            locale={locale}
                            onChange={(nextUseCases) => {
                              setContent((prev) => {
                                if (!prev || !isPlainObject(prev.innovation)) {
                                  return prev
                                }
                                const full = prev.innovation as Record<
                                  string,
                                  JsonValue
                                >
                                const industries = isPlainObject(full.industries)
                                  ? {
                                      ...(full.industries as Record<
                                        string,
                                        JsonValue
                                      >),
                                    }
                                  : {}
                                const prevIndustry = isPlainObject(
                                  industries[innovationPageFocus]
                                )
                                  ? {
                                      ...(industries[
                                        innovationPageFocus
                                      ] as Record<string, JsonValue>),
                                    }
                                  : {}
                                industries[innovationPageFocus] = {
                                  ...prevIndustry,
                                  useCases: nextUseCases,
                                }
                                const updated = applyInnovationPageEdit(
                                  full,
                                  innovationPageFocus,
                                  { industries }
                                )
                                return { ...prev, innovation: updated }
                              })
                            }}
                          />
                          <ValueField
                            path={`innovation.industries.${innovationPageFocus}`}
                            value={industryWithoutUseCases}
                            depth={0}
                            onChange={(nextIndustry) => {
                              setContent((prev) => {
                                if (!prev || !isPlainObject(prev.innovation)) {
                                  return prev
                                }
                                const full = prev.innovation as Record<
                                  string,
                                  JsonValue
                                >
                                const industries = isPlainObject(full.industries)
                                  ? {
                                      ...(full.industries as Record<
                                        string,
                                        JsonValue
                                      >),
                                    }
                                  : {}
                                const prevIndustry = isPlainObject(
                                  industries[innovationPageFocus]
                                )
                                  ? {
                                      ...(industries[
                                        innovationPageFocus
                                      ] as Record<string, JsonValue>),
                                    }
                                  : {}
                                industries[innovationPageFocus] = {
                                  ...prevIndustry,
                                  ...(nextIndustry as Record<string, JsonValue>),
                                }
                                const updated = applyInnovationPageEdit(
                                  full,
                                  innovationPageFocus,
                                  { industries }
                                )
                                return { ...prev, innovation: updated }
                              })
                            }}
                          />
                        </>
                        )
                      })()}
                    {innovationPageFocus === "hub" && (
                      <ValueField
                        path="innovation"
                        value={innovationScopedSlice ?? {}}
                        depth={0}
                        onChange={(next) => {
                          setContent((prev) => {
                            if (!prev || !isPlainObject(prev.innovation)) {
                              return prev
                            }
                            const full = prev.innovation as Record<string, JsonValue>
                            const updated = applyInnovationPageEdit(
                              full,
                              innovationPageFocus,
                              next as Record<string, JsonValue>
                            )
                            return { ...prev, innovation: updated }
                          })
                        }}
                      />
                    )}
                  </>
                ) : (
                  <ValueField
                    path={activeSection}
                    value={content[activeSection]}
                    depth={0}
                    onChange={(next) => {
                      setContent((prev) =>
                        prev ? { ...prev, [activeSection]: next } : prev
                      )
                    }}
                  />
                )}
              </div>
              {dirty && (
                <p className="border-t border-zinc-800/80 px-4 py-3 text-xs text-zinc-500 md:px-6">
                  Use <strong className="text-zinc-400">Save</strong> in the top bar
                  to publish this section to the live site.
                </p>
              )}
            </>
          )}

          {!loading && content && !activeSection && topLevelKeys.length === 0 && (
            <p className="p-6 text-sm text-zinc-500">No translation data.</p>
          )}
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}
