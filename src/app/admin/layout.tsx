import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin — Savvy",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="h-dvh min-h-0 overflow-hidden bg-zinc-950 text-zinc-100 antialiased"
      data-lenis-prevent
    >
      {children}
    </div>
  )
}
