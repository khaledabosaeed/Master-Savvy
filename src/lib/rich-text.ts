/**
 * Lightweight BBCode-style markup for translations:
 * - `[color=#rrggbb]...[/color]` (also #rgb, #rrggbbaa; # optional on hex)
 * - Newlines in the source string render as line breaks on the site.
 */

export type RichTextSegment =
  | { type: "text"; content: string }
  | { type: "colored"; color: string; segments: RichTextSegment[] }

const COLOR_OPEN = "[color="
const COLOR_CLOSE = "[/color]"

/** Matches `--primary` in globals.css; used by admin TipTap “primary color” control. */
export const SITE_PRIMARY_HEX = "#3960f9" as const

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function segmentsToInlineHtml(segments: RichTextSegment[]): string {
  return segments
    .map((s) => {
      if (s.type === "text") {
        return escapeHtml(s.content).replace(/\n/g, "<br />")
      }
      return `<span style="color: ${escapeHtml(s.color)}">${segmentsToInlineHtml(s.segments)}</span>`
    })
    .join("")
}

/**
 * Convert stored BBCode + newlines to a single-paragraph HTML fragment for TipTap.
 */
export function bbcodeToHtml(text: string): string {
  const inner = segmentsToInlineHtml(parseRichText(text))
  return `<p>${inner}</p>`
}

export function cssColorToHex(css: string): string | null {
  const t = css.trim().toLowerCase()
  if (t.startsWith("#")) return normalizeHexForCss(t)
  const rgb = t.match(
    /^rgba?\(\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i
  )
  if (rgb) {
    let r = parseFloat(rgb[1])
    let g = parseFloat(rgb[2])
    let b = parseFloat(rgb[3])
    if (t.includes("%")) {
      r = Math.round((r / 100) * 255)
      g = Math.round((g / 100) * 255)
      b = Math.round((b / 100) * 255)
    } else {
      r = Math.round(r)
      g = Math.round(g)
      b = Math.round(b)
    }
    const toHex = (n: number) =>
      Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0")
    return normalizeHexForCss(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
  }
  return null
}

function concatChildrenBbcode(el: HTMLElement): string {
  return Array.from(el.childNodes).map((c) => nodeToBbcode(c)).join("")
}

/** DOM nodeType constants (avoid relying on global `Node` during SSR). */
const DOM_TEXT = 3
const DOM_ELEMENT = 1

function nodeToBbcode(node: ChildNode): string {
  if (node.nodeType === DOM_TEXT) {
    return node.textContent ?? ""
  }
  if (node.nodeType !== DOM_ELEMENT) return ""
  const el = node as HTMLElement
  const tag = el.tagName.toLowerCase()
  /* TipTap / ProseMirror: hard break serializes as <br> (often with classes). */
  if (tag === "br") return "\n"
  if (tag === "span") {
    const style = el.getAttribute("style") ?? ""
    const colorMatch = style.match(/color:\s*([^;!]+)/i)
    const inner = concatChildrenBbcode(el)
    if (colorMatch) {
      const hex = cssColorToHex(colorMatch[1].trim())
      if (hex) return `[color=${hex}]${inner}[/color]`
    }
    return inner
  }
  return concatChildrenBbcode(el)
}

/**
 * Convert TipTap / ProseMirror HTML back to BBCode + newlines (client-only; uses DOM).
 */
export function htmlToBbcode(html: string): string {
  if (!html?.trim()) return ""
  if (typeof document === "undefined") return ""

  const wrapper = document.createElement("div")
  wrapper.innerHTML = html.trim()

  const parts = Array.from(wrapper.childNodes).map((n) => nodeToBbcode(n))
  return parts.join("\n").replace(/\n+$/, "")
}

/** Normalize user/admin hex to a safe CSS color or null if invalid. */
export function normalizeHexForCss(raw: string): string | null {
  const v = raw.trim()
  const withoutHash = v.startsWith("#") ? v.slice(1) : v
  if (
    !/^[0-9a-fA-F]{3}$/.test(withoutHash) &&
    !/^[0-9a-fA-F]{6}$/.test(withoutHash) &&
    !/^[0-9a-fA-F]{8}$/.test(withoutHash)
  ) {
    return null
  }
  return `#${withoutHash.toLowerCase()}`
}

function mergeAdjacentText(segments: RichTextSegment[]): RichTextSegment[] {
  const merged: RichTextSegment[] = []
  for (const s of segments) {
    const last = merged[merged.length - 1]
    if (s.type === "text" && last?.type === "text") {
      last.content += s.content
    } else {
      merged.push(s)
    }
  }
  return merged
}

/**
 * Parse a fragment that may contain `[color=#hex]...[/color]` tags (nested allowed).
 */
export function parseRichText(text: string): RichTextSegment[] {
  if (!text) return []

  const out: RichTextSegment[] = []
  let i = 0

  while (i < text.length) {
    const openIdx = text.indexOf(COLOR_OPEN, i)
    if (openIdx === -1) {
      if (i < text.length) {
        out.push({ type: "text", content: text.slice(i) })
      }
      break
    }

    if (openIdx > i) {
      out.push({ type: "text", content: text.slice(i, openIdx) })
    }

    const afterOpen = openIdx + COLOR_OPEN.length
    const closeBracket = text.indexOf("]", afterOpen)
    if (closeBracket === -1) {
      out.push({ type: "text", content: text.slice(openIdx) })
      break
    }

    const colorRaw = text.slice(afterOpen, closeBracket)
    const color = normalizeHexForCss(colorRaw)
    const afterBracket = closeBracket + 1
    const closeTag = text.indexOf(COLOR_CLOSE, afterBracket)

    if (color === null || closeTag === -1) {
      // Not a valid opening tag — emit literal "[" and continue from next char
      out.push({ type: "text", content: text[openIdx] ?? "" })
      i = openIdx + 1
      continue
    }

    const inner = text.slice(afterBracket, closeTag)
    out.push({
      type: "colored",
      color,
      segments: parseRichText(inner),
    })
    i = closeTag + COLOR_CLOSE.length
  }

  return mergeAdjacentText(out)
}

/** Plain text for aria-labels, titles, etc. (preserves newlines). */
export function richTextToPlainText(text: string): string {
  function walk(segments: RichTextSegment[]): string {
    return segments
      .map((s) =>
        s.type === "text" ? s.content : walk(s.segments)
      )
      .join("")
  }
  return walk(parseRichText(text))
}

/**
 * Remove one or more layers of color tags from a string (e.g. selection in admin).
 */
export function stripColorMarkup(selected: string): string {
  let prev = ""
  let s = selected
  const re =
    /\[color=#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\]([\s\S]*?)\[\/color\]/gi
  while (s !== prev) {
    prev = s
    s = s.replace(re, "$1")
  }
  return s
}

/** True if string contains our color markup (for optional fast path in UI). */
export function hasRichTextMarkup(text: string): boolean {
  return text.includes(COLOR_OPEN) || text.includes("\n")
}
