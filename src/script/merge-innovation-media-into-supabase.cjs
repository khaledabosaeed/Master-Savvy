/**
 * Deep-merge missing keys from locale JSON into Supabase, including inside arrays
 * (e.g. useCases[].slides[].imageUrl). Never overwrites existing keys.
 *
 * Usage:
 *   npm run merge:innovation-media
 *   npm run merge:innovation-media -- --dry-run
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..", "..")
const dryRun = process.argv.includes("--dry-run")
const sectionFilter = "innovation"

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

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function mergeMissingKeys(dbValue, fileValue) {
  if (fileValue === undefined || fileValue === null) {
    return dbValue
  }

  if (Array.isArray(fileValue)) {
    const dbArray = Array.isArray(dbValue) ? dbValue : []
    const merged = dbArray.map((item, index) => {
      if (fileValue[index] === undefined) return item
      return mergeMissingKeys(item, fileValue[index])
    })
    if (fileValue.length > dbArray.length) {
      merged.push(...fileValue.slice(dbArray.length).map(deepClone))
    }
    return merged
  }

  if (isPlainObject(fileValue)) {
    const dbObject = isPlainObject(dbValue) ? { ...dbValue } : {}
    for (const [key, fileChild] of Object.entries(fileValue)) {
      if (!(key in dbObject)) {
        dbObject[key] = deepClone(fileChild)
      } else {
        dbObject[key] = mergeMissingKeys(dbObject[key], fileChild)
      }
    }
    return dbObject
  }

  return dbValue
}

function collectMissingPaths(base, override, prefix = "") {
  const paths = []
  if (Array.isArray(base)) {
    base.forEach((item, index) => {
      const childPrefix = `${prefix}[${index}]`
      if (!Array.isArray(override) || override[index] === undefined) {
        paths.push(childPrefix)
        return
      }
      paths.push(...collectMissingPaths(item, override[index], childPrefix))
    })
    return paths
  }
  if (!isPlainObject(base)) return paths

  for (const [key, baseChild] of Object.entries(base)) {
    const currentPath = prefix ? `${prefix}.${key}` : key
    const overrideChild = isPlainObject(override) ? override[key] : undefined
    if (overrideChild === undefined) {
      paths.push(currentPath)
    } else {
      paths.push(...collectMissingPaths(baseChild, overrideChild, currentPath))
    }
  }
  return paths
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

  if (dryRun) {
    console.log("DRY RUN — listing missing media/copy paths under innovation (arrays included)\n")
  }

  for (const locale of ["en", "ar"]) {
    console.log(`\n================ ${locale.toUpperCase()} ================`)

    const filePath = path.join(root, "public", "locales", `${locale}.json`)
    const fileInnovation = JSON.parse(fs.readFileSync(filePath, "utf8")).innovation
    if (!fileInnovation) {
      console.warn(`No innovation section in ${filePath}`)
      continue
    }

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
    const missingPaths = collectMissingPaths(
      fileInnovation,
      dbInnovation,
      sectionFilter
    ).filter((p) =>
      /(?:^|\.)(videoUrl|imageUrl|recommendedRobots|slideKeys|solutionKeys)(?:\.|\[|$)/.test(
        p
      )
    )

    const mergedInnovation = mergeMissingKeys(dbInnovation, fileInnovation)
    const nextContent = { ...dbContent, innovation: mergedInnovation }

    if (missingPaths.length > 0) {
      console.log(`Media-related paths missing in Supabase (${missingPaths.length}):`)
      missingPaths.slice(0, 60).forEach((p) => console.log("  ", p))
      if (missingPaths.length > 60) {
        console.log(`  ... and ${missingPaths.length - 60} more`)
      }
    } else {
      console.log("No missing innovation media paths detected.")
    }

    if (dryRun) {
      console.log("\nDry run complete — no write performed.")
      continue
    }

    const { error: upError } = await supabase.from("translations").upsert(
      {
        locale,
        content: nextContent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "locale" }
    )

    if (upError) {
      console.error(`[${locale}] upsert:`, upError.message)
      process.exit(1)
    }

    console.log(`[${locale}] OK — merged missing innovation keys (including array items).`)
  }

  if (!dryRun) {
    console.log(
      "\nDone. Refresh the site or redeploy so getDictionary() picks up the new media URLs."
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
