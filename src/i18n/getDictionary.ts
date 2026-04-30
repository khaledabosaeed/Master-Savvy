import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"
import type { AppLanguage } from "./settings"

export type LocaleDictionary = typeof en

export function getDictionary(lang: AppLanguage): LocaleDictionary {
  // Locale files can diverge slightly in nested shape; treat as one dictionary at runtime.
  return (lang === "ar" ? ar : en) as LocaleDictionary
}
