"use client"

import { useTranslation } from "react-i18next"
import { buildHomePageTexts } from "@/i18n/home-page-texts"

/** Client trees: same shape as `getHomePageTexts` for the active locale. */
export function useHomePageTexts() {
  const { t } = useTranslation()
  return buildHomePageTexts(t)
}
