"use client"

import { type ElementType, type ReactNode, useMemo } from "react"
import { type RichTextSegment, parseRichText } from "@/lib/rich-text"

export type FormattedTextProps = {
  text: string
  className?: string
  /** Element wrapper; default `span` keeps headings valid when nested. */
  as?: ElementType
}



function renderTextWithBreaks(content: string, keyPrefix: string): ReactNode[] {
  const lines = content.split("\n")
  const nodes: ReactNode[] = []
  lines.forEach((line, i) => {
    if (i > 0) {
      nodes.push(<br key={`${keyPrefix}-br-${i}`} />)
    }
    nodes.push(line)
  })
  return nodes
}



function SegmentNodes({
  segment,
  keyPrefix,
}: {
  segment: RichTextSegment
  keyPrefix: string
}): ReactNode {
  if (segment.type === "text") {
    return <>{renderTextWithBreaks(segment.content, keyPrefix)}</>
  }
  return (
    <span style={{ color: segment.color }} className="rich-text-colored">
      {segment.segments.map((child, i) => (
        <SegmentNodes
          key={`${keyPrefix}-c-${i}`}
          segment={child}
          keyPrefix={`${keyPrefix}-c-${i}`}
        />
      ))}
    </span>
  )
}


/**
 * Renders translation strings that may include `[color=#hex]...[/color]` and newlines.
 */
export default function FormattedText({
  text,
  className,
  as: Component = "span",
}: FormattedTextProps) {
  const segments = useMemo(() => parseRichText(text ?? ""), [text])

  if (text == null || text === "") {
    return null
  }

  return (
    <Component className={className}>
      {segments.map((segment, i) => (
        <SegmentNodes
          key={`seg-${i}`}
          segment={segment}
          keyPrefix={`seg-${i}`}
        />
      ))}
    </Component>
  )
}
