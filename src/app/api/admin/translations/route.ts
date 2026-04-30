import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin"

const putSchema = z.object({
  locale: z.enum(["en", "ar"]),
  section: z.string().min(1),
  data: z.unknown(),
})

async function requireUser() {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return {
        user: null as null,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      }
    }
    return { user, error: null as null }
  } catch {
    return {
      user: null as null,
      error: NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 503 }
      ),
    }
  }
}

export async function GET(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  const { searchParams } = new URL(request.url)
  const locale = searchParams.get("locale")
  if (locale !== "en" && locale !== "ar") {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 })
  }

  try {
    const admin = createSupabaseServiceRoleClient()
    const { data, error: dbError } = await admin
      .from("translations")
      .select("content, updated_at")
      .eq("locale", locale)
      .maybeSingle()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }
    if (!data) {
      return NextResponse.json(
        { error: "No row for this locale — run scripts/seed-translations.cjs" },
        { status: 404 }
      )
    }
    return NextResponse.json({
      content: data.content,
      updated_at: data.updated_at,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server configuration error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { user, error } = await requireUser()
  if (!user) return error!

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = putSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { locale, section, data: sectionData } = parsed.data

  try {
    const admin = createSupabaseServiceRoleClient()
    const { data: row } = await admin
      .from("translations")
      .select("content")
      .eq("locale", locale)
      .maybeSingle()

    const current = (row?.content as Record<string, unknown>) ?? {}
    const merged = { ...current, [section]: sectionData }

    const { error: upError } = await admin
      .from("translations")
      .upsert(
        {
          locale,
          content: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "locale" }
      )

    if (upError) {
      return NextResponse.json({ error: upError.message }, { status: 500 })
    }

    revalidateTag("translations")
    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server configuration error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
