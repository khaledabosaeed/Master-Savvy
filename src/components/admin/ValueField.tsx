"use client"

import RichTextArea from "@/components/admin/RichTextArea"
import {
  isMediaUrlFieldKey,
  isPlainUrlFieldKey,
  isHttpUrl,
} from "@/lib/media-url"
import {
  isPuduRobotKey,
  PUDU_ROBOT_KEYS,
  ROBOT_DISPLAY_NAMES,
} from "@/lib/innovation-use-cases"

type JsonValue = unknown

function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function withOptionalMediaFields(
  path: string,
  value: Record<string, JsonValue>
): Record<string, JsonValue> {
  if (/\.(slides|solutions|scenarios)\[\d+\]$/.test(path)) {
    return "imageUrl" in value ? value : { ...value, imageUrl: "" }
  }
  if (/\.industries\.[^.]+$/.test(path)) {
    const next = { ...value }
    if (!("imageUrl" in next)) next.imageUrl = ""
    if (!("recommendedRobots" in next)) next.recommendedRobots = []
    return next
  }
  if (/\.robots\.[^.]+$/.test(path)) {
    return "imageUrl" in value ? value : { ...value, imageUrl: "" }
  }
  if (/\.hero$/.test(path) || path.endsWith(".innovation.hero")) {
    return "videoUrl" in value ? value : { ...value, videoUrl: "" }
  }
  return value
}

function formatPathDisplay(path: string): string {
  return path.replace(/\./g, " → ")
}

function RobotKeysField({
  path,
  value,
  onChange,
  padLeft,
}: {
  path: string
  value: JsonValue
  onChange: (next: JsonValue) => void
  padLeft: number
}) {
  const selected = new Set(
    Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : []
  )

  function toggle(key: string) {
    if (!isPuduRobotKey(key)) return
    const next = new Set(selected)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    onChange(PUDU_ROBOT_KEYS.filter((robot) => next.has(robot)))
  }

  return (
    <div className="min-w-0" style={{ marginLeft: padLeft }}>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {formatPathDisplay(path)}
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

function MediaUrlField({
  path,
  value,
  onChange,
  padLeft,
}: {
  path: string
  value: string
  onChange: (next: JsonValue) => void
  padLeft: number
}) {
  const label = formatPathDisplay(path)
  const fieldKey = path.split(".").pop() ?? path
  const showPreview = isHttpUrl(value) && !fieldKey.toLowerCase().includes("video")

  return (
    <div className="min-w-0" style={{ marginLeft: padLeft }}>
      <label
        htmlFor={path}
        className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
      >
        {label}
      </label>
      <input
        id={path}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://cdn.example.com/media.webp"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/25"
      />
      <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
        Paste a full image or video URL. Leave empty to use the default robot
        image.
      </p>
      {showPreview && (
        <div className="mt-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="max-h-36 w-full object-cover object-center"
          />
        </div>
      )}
    </div>
  )
}

function PlainUrlField({
  path,
  value,
  onChange,
  padLeft,
}: {
  path: string
  value: string
  onChange: (next: JsonValue) => void
  padLeft: number
}) {
  return (
    <div className="min-w-0" style={{ marginLeft: padLeft }}>
      <label
        htmlFor={path}
        className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
      >
        {formatPathDisplay(path)}
      </label>
      <input
        id={path}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/{lang}/contact"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/25"
      />
    </div>
  )
}

export default function ValueField({
  path,
  value,
  onChange,
  depth,
}: {
  path: string
  value: JsonValue
  onChange: (next: JsonValue) => void
  depth: number
}) {
  const pad = Math.min(depth, 6) * 10

  if (value === null) {
    return (
      <span className="text-xs text-zinc-500" style={{ marginLeft: pad }}>
        null
      </span>
    )
  }

  if (typeof value === "string") {
    const fieldKey = path.split(".").pop() ?? path
    if (isMediaUrlFieldKey(fieldKey)) {
      return (
        <MediaUrlField
          path={path}
          value={value}
          onChange={onChange}
          padLeft={pad}
        />
      )
    }
    if (isPlainUrlFieldKey(fieldKey)) {
      return (
        <PlainUrlField
          path={path}
          value={value}
          onChange={onChange}
          padLeft={pad}
        />
      )
    }
    return (
      <RichTextArea
        key={path}
        id={path}
        label={formatPathDisplay(path)}
        value={value}
        onChange={(next) => onChange(next)}
        padLeft={pad}
      />
    )
  }

  if (typeof value === "number") {
    return (
      <div className="min-w-0" style={{ marginLeft: pad }}>
        <label
          htmlFor={path}
          className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
        >
          {formatPathDisplay(path)}
        </label>
        <input
          id={path}
          type="number"
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => {
            const n = parseFloat(e.target.value)
            onChange(Number.isNaN(n) ? 0 : n)
          }}
          className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary"
        />
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div style={{ marginLeft: pad }}>
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600"
          />
          {String(value)}
        </label>
      </div>
    )
  }

  if (Array.isArray(value)) {
    if (/\.(slideKeys|solutionKeys)$/.test(path)) {
      return (
        <RobotKeysField
          path={path}
          value={value}
          onChange={onChange}
          padLeft={pad}
        />
      )
    }

    return (
      <div
        className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4"
        style={{ marginLeft: pad }}
      >
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </span>
        {value.map((item, i) => (
          <div
            key={`${path}[${i}]`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <div className="mb-2 text-xs font-medium text-zinc-500">Item [{i}]</div>
            <ValueField
              path={`${path}[${i}]`}
              value={item}
              depth={0}
              onChange={(next) => {
                const copy = [...value]
                copy[i] = next
                onChange(copy)
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (isPlainObject(value)) {
    const displayValue = withOptionalMediaFields(path, value)
    const entries = Object.entries(displayValue)
    return (
      <div
        className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4"
        style={{ marginLeft: pad }}
      >
        {depth > 0 && (
          <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            {formatPathDisplay(path)}
          </span>
        )}
        {entries.map(([key, child]) => (
          <div key={key} className="min-w-0">
            <ValueField
              path={`${path}.${key}`}
              value={child}
              depth={depth + 1}
              onChange={(next) => {
                onChange({ ...displayValue, [key]: next })
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <span className="text-xs text-zinc-400" style={{ marginLeft: pad }}>
      {String(value)}
    </span>
  )
}
