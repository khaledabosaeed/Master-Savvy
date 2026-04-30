"use client"

import type { Editor } from "@tiptap/core"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useRef, useState } from "react"
import {
  SITE_PRIMARY_HEX,
  bbcodeToHtml,
  cssColorToHex,
  htmlToBbcode,
  normalizeHexForCss,
} from "@/lib/rich-text"

type RichTextAreaProps = {
  id: string
  label: string
  value: string
  onChange: (next: string) => void
  padLeft: number
}

function selectionHasPrimaryColor(editor: Editor): boolean {
  const raw = editor.getAttributes("textStyle").color as string | undefined
  if (!raw) return false
  const hex = cssColorToHex(raw) ?? normalizeHexForCss(raw)
  return hex === SITE_PRIMARY_HEX
}

export default function RichTextArea({
  id,
  label,
  value,
  onChange,
  padLeft,
}: RichTextAreaProps) {
  /** Skip the next prop→editor sync: it came from this editor’s onUpdate. */
  const syncFromEditorRef = useRef(false)
  const [toolbarOpen, setToolbarOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        hardBreak: {
          keepMarks: true,
        },
      }),
      TextStyle,
      Color,
    ],
    content: bbcodeToHtml(value),
    editorProps: {
      attributes: {
        id,
        class:
          "min-h-[100px] w-full bg-transparent px-3 py-3 text-sm text-zinc-100 outline-none focus:ring-0 focus:outline-none prose prose-invert max-w-none [&_p]:m-0",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const bb = htmlToBbcode(ed.getHTML())
      syncFromEditorRef.current = true
      onChange(bb)
    },
  })

  useEffect(() => {
    if (!editor) return

    if (syncFromEditorRef.current) {
      syncFromEditorRef.current = false
      return
    }

    const currentBb = htmlToBbcode(editor.getHTML())
    if (currentBb === value) return

    editor.commands.setContent(bbcodeToHtml(value), { emitUpdate: false })
  }, [editor, value])

  useEffect(() => {
    if (!editor) return

    const hideToolbarIfLeftField = () => {
      window.setTimeout(() => {
        const root = containerRef.current
        const ae = document.activeElement
        if (root && ae && root.contains(ae)) return
        setToolbarOpen(false)
      }, 200)
    }

    editor.on("blur", hideToolbarIfLeftField)
    return () => {
      editor.off("blur", hideToolbarIfLeftField)
    }
  }, [editor])

  const primaryActive = editor ? selectionHasPrimaryColor(editor) : false

  return (
    <div className="min-w-0" style={{ marginLeft: padLeft }}>
      <label
        htmlFor={id}
        className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
      >
        {label}
      </label>

      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/40 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/25"
      >
        <div
          className={`bg-zinc-950 ${toolbarOpen ? "rounded-t-lg" : "rounded-lg"}`}
          onPointerDownCapture={(e) => {
            const t = e.target as HTMLElement | null
            if (!editor || !t?.closest?.(".ProseMirror")) return
            setToolbarOpen(true)
          }}
        >
          <EditorContent editor={editor} />
        </div>

        {toolbarOpen && editor && (
          <div
            className="flex flex-wrap items-center gap-2 border-t border-zinc-800 bg-zinc-900/80 px-3 py-2.5"
            onMouseDownCapture={(e) => e.preventDefault()}
          >
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              Format
            </span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!editor) return
                if (primaryActive) {
                  editor.chain().focus().extendMarkRange("textStyle").unsetColor().run()
                } else {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("textStyle")
                    .setColor(SITE_PRIMARY_HEX)
                    .run()
                }
              }}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                primaryActive
                  ? "border-primary bg-primary/25 text-white"
                  : "border-zinc-600 bg-zinc-800/80 text-zinc-200 hover:border-primary hover:text-white"
              }`}
            >
              Primary color
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!editor) return
                const ok = editor.chain().focus().setHardBreak().run()
                if (!ok) {
                  editor.chain().focus().insertContent({ type: "hardBreak" }).run()
                }
              }}
              className="rounded-md border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              Line break
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor?.chain().focus().extendMarkRange("textStyle").unsetColor().run()
              }}
              className="rounded-md border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              Clear color
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
