"use client"

import i18n from "i18next"
import { initReactI18next, I18nextProvider } from "react-i18next"
import { useMemo } from "react"
import type { AppLanguage } from "./settings"

type TranslationRecord = Record<string, unknown>

type TranslationsProviderProps = {
  children: React.ReactNode
  locale: AppLanguage
  resources: TranslationRecord
}

/**
 * Client tree: one i18next instance per locale with inlined JSON as the default namespace `translation`.
 */
export function TranslationsProvider({
  children,
  locale,
  resources,
}: TranslationsProviderProps) {
  const i18nInstance = useMemo(() => {
    const instance = i18n.createInstance()
    instance.use(initReactI18next).init({
      lng: locale,
      resources: {
        [locale]: {
          translation: resources,
        },
      },
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })
    return instance
  }, [locale, resources])

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
