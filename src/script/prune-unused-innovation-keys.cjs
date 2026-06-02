/**
 * Remove innovation translation keys that are not used by the innovation hub
 * or industry detail pages.
 *
 * Usage:
 *   npm run prune:innovation-keys -- --dry-run
 *   npm run prune:innovation-keys
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..", "..")
const dryRun = process.argv.includes("--dry-run")
const syncLocales = !process.argv.includes("--supabase-only")

const INDUSTRY_SLUGS = [
  "food-beverage",
  "retail",
  "hospitality",
  "industrial-logistics",
  "healthcare",
  "transportation",
  "entertainment-sports",
  "real-estate",
  "education",
  "public-service",
]

/** Top-level innovation keys referenced by page components or header texts. */
const TOP_LEVEL_KEYS = new Set([
  "hero",
  "industriesNavLabel",
  "exploreIndustry",
  "backToIndustries",
  "impactNavLabel",
  "impactFootnote",
  "otherIndustriesTitle",
  "industries",
])

const HERO_KEYS = new Set(["title", "subtitle", "scrollHint", "videoUrl"])

const INDUSTRY_KEYS = new Set([
  "title",
  "shortTitle",
  "headline",
  "summary",
  "imageAlt",
  "imageUrl",
  "impactTitle",
  "impactStats",
  "scenarios",
  "useCases",
])

const IMPACT_STAT_KEYS = new Set(["icon", "label", "value"])
const SCENARIO_KEYS = new Set(["title", "subtitle", "imageAlt", "imageUrl"])
const USE_CASE_KEYS = new Set([
  "aboutTitle",
  "slides",
  "challenges",
  "whyChoose",
  "solutionsTitle",
  "solutions",
  "slideKeys",
  "solutionKeys",
])
const SLIDE_KEYS = new Set(["robotName", "imageAlt", "imageUrl"])
const PANEL_KEYS = new Set(["heading", "items"])
const SOLUTION_KEYS = new Set([
  "name",
  "imageAlt",
  "imageUrl",
  "features",
  "learnMoreLabel",
  "href",
])

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

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

function pruneArrayItems(items, allowedKeys, pruneObject) {
  if (!Array.isArray(items)) return items
  return items.map((item) => {
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
      return item
    }
    if (isPlainObject(item)) {
      return pruneObject(item, allowedKeys)
    }
    return item
  })
}

function pruneUseCase(useCase) {
  if (!isPlainObject(useCase)) return useCase
  const next = {}
  for (const key of USE_CASE_KEYS) {
    if (!(key in useCase)) continue
    const value = useCase[key]
    if (key === "slides") {
      next.slides = pruneArrayItems(value, SLIDE_KEYS, (obj, allowed) =>
        pruneObjectByAllowedKeys(obj, allowed)
      )
    } else if (key === "challenges" || key === "whyChoose") {
      next[key] = isPlainObject(value)
        ? pruneObjectByAllowedKeys(value, PANEL_KEYS)
        : value
    } else if (key === "solutions") {
      next.solutions = pruneArrayItems(value, SOLUTION_KEYS, (obj, allowed) =>
        pruneObjectByAllowedKeys(obj, allowed)
      )
    } else {
      next[key] = value
    }
  }
  return next
}

function pruneObjectByAllowedKeys(obj, allowedKeys) {
  const next = {}
  for (const key of allowedKeys) {
    if (key in obj) {
      next[key] = obj[key]
    }
  }
  return next
}

function pruneIndustry(industry) {
  if (!isPlainObject(industry)) return industry
  const next = {}
  for (const key of INDUSTRY_KEYS) {
    if (!(key in industry)) continue
    const value = industry[key]
    if (key === "impactStats") {
      next.impactStats = pruneArrayItems(value, IMPACT_STAT_KEYS, (obj, allowed) =>
        pruneObjectByAllowedKeys(obj, allowed)
      )
    } else if (key === "scenarios") {
      next.scenarios = pruneArrayItems(value, SCENARIO_KEYS, (obj, allowed) =>
        pruneObjectByAllowedKeys(obj, allowed)
      )
    } else if (key === "useCases") {
      next.useCases = Array.isArray(value) ? value.map(pruneUseCase) : value
    } else {
      next[key] = value
    }
  }
  return next
}

function pruneInnovationSection(innovation) {
  if (!isPlainObject(innovation)) return innovation

  const next = {}
  for (const key of TOP_LEVEL_KEYS) {
    if (!(key in innovation)) continue
    const value = innovation[key]

    if (key === "hero" && isPlainObject(value)) {
      next.hero = pruneObjectByAllowedKeys(value, HERO_KEYS)
    } else if (key === "industries" && isPlainObject(value)) {
      const industries = {}
      for (const slug of INDUSTRY_SLUGS) {
        if (value[slug] !== undefined) {
          industries[slug] = pruneIndustry(value[slug])
        }
      }
      next.industries = industries
    } else {
      next[key] = value
    }
  }

  return next
}

function collectPaths(obj, prefix = "") {
  const paths = []
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paths.push(...collectPaths(item, `${prefix}[${index}]`))
    })
    return paths
  }
  if (!isPlainObject(obj)) {
    if (prefix) paths.push(prefix)
    return paths
  }
  for (const [key, value] of Object.entries(obj)) {
    const current = prefix ? `${prefix}.${key}` : key
    if (isPlainObject(value) || Array.isArray(value)) {
      paths.push(...collectPaths(value, current))
    } else {
      paths.push(current)
    }
  }
  return paths
}

function diffRemovedPaths(before, after, prefix = "innovation") {
  const beforePaths = new Set(collectPaths(before).map((p) => `${prefix}.${p}`))
  const afterPaths = new Set(collectPaths(after).map((p) => `${prefix}.${p}`))
  return [...beforePaths].filter((p) => !afterPaths.has(p)).sort()
}

async function main() {
  loadEnvFromDotenv()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env")
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  for (const locale of ["en", "ar"]) {
    console.log(`\n================ ${locale.toUpperCase()} ================`)

    const filePath = path.join(root, "public", "locales", `${locale}.json`)
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const fileInnovation = fileContent.innovation ?? {}

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

    const dbInnovation = isPlainObject(dbContent.innovation) ? dbContent.innovation : {}
    const prunedFromDb = pruneInnovationSection(dbInnovation)
    const prunedFromFile = pruneInnovationSection(fileInnovation)

    const removedFromDb = diffRemovedPaths(dbInnovation, prunedFromDb)
    const removedFromFile = diffRemovedPaths(fileInnovation, prunedFromFile)

    console.log(`Supabase unused keys (${removedFromDb.length}):`)
    removedFromDb.slice(0, 80).forEach((p) => console.log("  ", p))
    if (removedFromDb.length > 80) {
      console.log(`  ... and ${removedFromDb.length - 80} more`)
    }

    if (syncLocales) {
      console.log(`\nLocale file unused keys (${removedFromFile.length}):`)
      removedFromFile.slice(0, 40).forEach((p) => console.log("  ", p))
      if (removedFromFile.length > 40) {
        console.log(`  ... and ${removedFromFile.length - 40} more`)
      }
    }

    if (dryRun) {
      console.log(`\n[${locale}] dry run — no writes`)
      continue
    }

    if (syncLocales) {
      const nextFileContent = { ...fileContent, innovation: prunedFromFile }
      fs.writeFileSync(filePath, `${JSON.stringify(nextFileContent, null, 2)}\n`, "utf8")
      console.log(`[${locale}] updated public/locales/${locale}.json`)
    }

    const mergedContent = {
      ...dbContent,
      innovation: prunedFromDb,
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

    console.log(`[${locale}] pruned innovation section in Supabase`)
  }

  if (dryRun) {
    console.log("\nDry run complete. Run without --dry-run to apply.")
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
