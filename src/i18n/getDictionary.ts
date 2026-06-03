import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"
import { createClient } from "@supabase/supabase-js"
import type { AppLanguage } from "./settings"

export type LocaleDictionary = typeof en

type DictionaryValue = Record<string, unknown>

function getLocalDictionary(lang: AppLanguage): LocaleDictionary {
  return (lang === "ar" ? ar : en) as LocaleDictionary
}

function isRecord(value: unknown): value is DictionaryValue {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function mergeDictionary(
  fallback: DictionaryValue,
  override: DictionaryValue
): DictionaryValue {
  const merged: DictionaryValue = { ...fallback }

  for (const [key, value] of Object.entries(override)) {
    const fallbackValue = merged[key]
    if (isRecord(fallbackValue) && isRecord(value)) {
      merged[key] = mergeDictionary(fallbackValue, value)
    } else {
      merged[key] = value
    }
  }

  return merged
}

async function getSupabaseDictionary(
  lang: AppLanguage
): Promise<DictionaryValue | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase
    .from("translations")
    .select("content")
    .eq("locale", lang)
    .maybeSingle()

  if (error || !isRecord(data?.content)) {
    return null
  }

  return data.content
}

export async function getDictionary(lang: AppLanguage): Promise<LocaleDictionary> {
  // Supabase is the source of truth when configured; local JSON fills gaps and
  // keeps the site rendering if Supabase is unavailable.
  const localDictionary = getLocalDictionary(lang)
  const supabaseDictionary = await getSupabaseDictionary(lang)

  if (!supabaseDictionary) {
    return localDictionary
  }

  return mergeDictionary(
    localDictionary as DictionaryValue,
    supabaseDictionary
  ) as LocaleDictionary
}
