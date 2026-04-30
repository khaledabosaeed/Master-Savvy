/**
 * One-time seed: inserts en.json / ar.json into Supabase `translations` table.
 * Usage: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed:translations
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..", "..")
const enPath = path.join(root, "public/locales/en.json")
const arPath = path.join(root, "public/locales/ar.json")

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
  }

  const en = JSON.parse(fs.readFileSync(enPath, "utf8"))
  const ar = JSON.parse(fs.readFileSync(arPath, "utf8"))

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { error: e1 } = await supabase.from("translations").upsert(
    { locale: "en", content: en, updated_at: new Date().toISOString() },
    { onConflict: "locale" }
  )
  if (e1) {
    console.error("en upsert:", e1)
    process.exit(1)
  }

  const { error: e2 } = await supabase.from("translations").upsert(
    { locale: "ar", content: ar, updated_at: new Date().toISOString() },
    { onConflict: "locale" }
  )
  if (e2) {
    console.error("ar upsert:", e2)
    process.exit(1)
  }

  console.log("Seeded translations for en and ar.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
