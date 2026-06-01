/**
 * Add to Supabase only keys that exist in public/locales/*.json but are missing from the DB.
 * Starts from a deep clone of DB `content` and copies missing branches from the file — never
 * overwrites an existing key (primitives, arrays, or nested objects already in DB stay unchanged).
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run merge:translations
 *   ... --dry-run                    # preview only, no writes; lists paths in repo JSON missing from DB
 *   ... --dry-run --verbose          # also list paths where repo and DB both exist but values differ (DB wins on merge)
 *   ... --section=innovation         # only add missing keys under the `innovation` section (other DB sections untouched)
 *
 * Run from repo root (the folder that contains `package.json` and `public/`).
 * Or from repo root: `npm run merge:translations -- --dry-run`
 * Innovation only: `npm run merge:innovation -- --dry-run`
 *
 * After a real run, redeploy or revalidateTag("translations") so Next cached getDictionary() refreshes.
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..", "..")
const dryRun = process.argv.includes("--dry-run")
const verbose = process.argv.includes("--verbose")

function parseSectionArg() {
  const eq = process.argv.find((a) => a.startsWith("--section="))
  if (eq) return eq.slice("--section=".length).trim() || null
  const idx = process.argv.indexOf("--section")
  if (idx !== -1 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("-")) {
    return process.argv[idx + 1].trim()
  }
  return null
}

const sectionFilter = parseSectionArg()

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function deepClone(v) {
  return JSON.parse(JSON.stringify(v))
}

/**
 * Deep-clone `dbTree`, then for every key path in `fileTree`, copy from file only where the
 * key is missing in DB. If the key exists in both and both values are plain objects, recurse.
 * Never assigns over an existing key (arrays/primitives/objects already in DB are left as-is).
 */
function addOnlyMissingKeysFromFile(dbTree, fileTree) {
  const out = deepClone(dbTree)
  function walk(d, f) {
    for (const key of Object.keys(f)) {
      if (!(key in d)) {
        d[key] = deepClone(f[key])
      } else if (isPlainObject(f[key]) && isPlainObject(d[key])) {
        walk(d[key], f[key])
      }
    }
  }
  walk(out, fileTree)
  return out
}

function topLevelKeysOnlyInBase(base, override) {
  return Object.keys(base).filter((k) => override[k] === undefined)
}

/** Paths present in `base` (repo file) but absent from `override` (DB). Recurses into plain objects only. */
function getMissingPaths(base, override, prefix = "") {
  let paths = []
  for (const key of Object.keys(base)) {
    const currentPath = prefix ? `${prefix}.${key}` : key
    if (!(key in override)) {
      paths.push(currentPath)
    } else if (isPlainObject(base[key]) && isPlainObject(override[key])) {
      paths = paths.concat(getMissingPaths(base[key], override[key], currentPath))
    }
  }
  return paths
}

function getChangedPaths(base, override, prefix = "") {
  let paths = []
  for (const key of Object.keys(base)) {
    if (!(key in override)) continue
    const currentPath = prefix ? `${prefix}.${key}` : key
    const bb = base[key]
    const ob = override[key]
    if (isPlainObject(bb) && isPlainObject(ob)) {
      paths = paths.concat(getChangedPaths(bb, ob, currentPath))
    } else if (JSON.stringify(bb) !== JSON.stringify(ob)) {
      paths.push(currentPath)
    }
  }
  return paths
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  if (sectionFilter) {
    console.log(`Section filter: "${sectionFilter}" (only missing keys under this branch)`)
  }

  if (dryRun) {
    console.log("\nDRY RUN — no database writes")
    console.log(
      "Listing: paths in public/locales/*.json that are not in Supabase (nested keys use dot notation)."
    )
    if (verbose) {
      console.log(
        "--verbose: also show keys that exist in both but differ (additive run never overwrites these)."
      )
    }
    console.log("")
  }

  for (const locale of ["en", "ar"]) {
    console.log(`\n================ ${locale.toUpperCase()} ================`)

    const filePath = path.join(root, "public", "locales", `${locale}.json`)
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"))

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

    const fileSlice = sectionFilter ? fileContent[sectionFilter] : fileContent
    const dbSlice =
      sectionFilter && isPlainObject(dbContent[sectionFilter])
        ? dbContent[sectionFilter]
        : sectionFilter
          ? {}
          : dbContent

    if (sectionFilter && fileSlice === undefined) {
      console.warn(
        `[${locale}] Section "${sectionFilter}" not found in public/locales/${locale}.json — skipped.`
      )
      continue
    }

    if (!sectionFilter) {
      const onlyInFile = topLevelKeysOnlyInBase(fileContent, dbContent)
      if (onlyInFile.length > 0) {
        console.log(`Top-level keys present only in repo file: ${onlyInFile.join(", ")}`)
      }
    }

    const missingPaths = getMissingPaths(
      fileSlice ?? {},
      dbSlice ?? {},
      sectionFilter ?? ""
    )
    const changedPaths = getChangedPaths(
      fileSlice ?? {},
      dbSlice ?? {},
      sectionFilter ?? ""
    )

    if (missingPaths.length > 0) {
      console.log(`In locale file, not in database (${missingPaths.length}):`)
      missingPaths.forEach((p) => console.log("  ", p))
    } else {
      console.log("In locale file, not in database: (none — every repo path exists in DB at object level)")
    }

    if (dryRun && verbose && changedPaths.length > 0) {
      console.log(
        `\nAlso in both but different value — not overwritten (${changedPaths.length}):`
      )
      changedPaths.slice(0, 50).forEach((p) => console.log("  ~", p))
      if (changedPaths.length > 50) console.log(`  ... and ${changedPaths.length - 50} more`)
    }

    let next
    if (sectionFilter) {
      const mergedSection = addOnlyMissingKeysFromFile(dbSlice ?? {}, fileSlice ?? {})
      next = { ...dbContent, [sectionFilter]: mergedSection }
    } else {
      next = addOnlyMissingKeysFromFile(dbContent, fileContent)
    }

    if (dryRun) {
      console.log(
        `\nSummary: ${missingPaths.length} path(s) only in repo would be added; additive-only write not performed.`
      )
      continue
    }

    const { error: upError } = await supabase.from("translations").upsert(
      { locale, content: next, updated_at: new Date().toISOString() },
      { onConflict: "locale" }
    )

    if (upError) {
      console.error(`[${locale}] upsert:`, upError.message)
      process.exit(1)
    }

    console.log(
      `[${locale}] OK — added missing keys from locale file only (no existing DB keys changed).`
    )
  }

  if (!dryRun) {
    console.log(
      "\nDone. Invalidate Next cache for translations (redeploy or revalidateTag(\"translations\")) so visitors see updates."
    )
  } else {
    console.log("\nDry run complete. Run without --dry-run to write to Supabase.")
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
