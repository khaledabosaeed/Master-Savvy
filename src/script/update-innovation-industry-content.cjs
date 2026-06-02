/**
 * Apply innovation industry copy to locale JSON files and Supabase translations.
 *
 * Usage:
 *   npm run update:innovation-content
 *   npm run update:innovation-content -- --dry-run
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")
const { applyInnovationPatch } = require("./innovation-industry-content")

const root = path.join(__dirname, "..", "..")
const dryRun = process.argv.includes("--dry-run")

function loadEnvFromDotenv() {
  const envPath = path.join(root, ".env")
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[m[1]]) process.env[m[1]] = value
  }
}

async function main() {
  loadEnvFromDotenv()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  for (const locale of ["en", "ar"]) {
    const filePath = path.join(root, "public", "locales", `${locale}.json`)
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const prevInnovation = fileContent.innovation
    const nextInnovation = applyInnovationPatch(prevInnovation, locale)
    const nextContent = { ...fileContent, innovation: nextInnovation }

    console.log(`\n[${locale}] innovation.hero.title -> ${nextInnovation.hero.title}`)

    if (dryRun) {
      console.log(`[${locale}] dry run — locale file and Supabase not written`)
      continue
    }

    fs.writeFileSync(filePath, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8")
    console.log(`[${locale}] updated public/locales/${locale}.json`)

    const { data: row, error: fetchError } = await supabase
      .from("translations")
      .select("content")
      .eq("locale", locale)
      .maybeSingle()

    if (fetchError) {
      console.error(`[${locale}] fetch:`, fetchError.message)
      process.exit(1)
    }

    const dbContent =
      row?.content && typeof row.content === "object" && !Array.isArray(row.content)
        ? row.content
        : {}

    const mergedContent = {
      ...dbContent,
      innovation: applyInnovationPatch(dbContent.innovation ?? prevInnovation, locale),
    }

    const { error: upError } = await supabase.from("translations").upsert(
      {
        locale,
        content: mergedContent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "locale" }
    )

    if (upError) {
      console.error(`[${locale}] upsert:`, upError.message)
      process.exit(1)
    }

    console.log(`[${locale}] upserted innovation section to Supabase`)
  }

  if (dryRun) {
    console.log("\nDry run complete. Run without --dry-run to write.")
  } else {
    console.log(
      '\nDone. Redeploy or revalidateTag("translations") so cached pages refresh.'
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
