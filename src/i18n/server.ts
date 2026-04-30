import i18n from "i18next"
import type { AppLanguage } from "./settings"
import en from "../../public/locales/en.json"
import ar from "../../public/locales/ar.json"

const resources: Record<AppLanguage, { translation: typeof en | typeof ar }> = {
  en: { translation: en },
  ar: { translation: ar },
}

/**
 * Server Components: create a fresh i18next instance per request with the active locale.
 */
export function getServerI18n(lang: AppLanguage) {
  const instance = i18n.createInstance()
  instance.init({
    lng: lang,
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  return instance
}
