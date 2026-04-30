export const languages = ["en", "ar"] as const

export type AppLanguage = (typeof languages)[number]

export const defaultLanguage: AppLanguage = "en"

export const fallbackLanguage: AppLanguage = "en"

export function isAppLanguage(value: string): value is AppLanguage {
  return languages.includes(value as AppLanguage)
}
