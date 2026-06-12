import type { TFunction } from "i18next"

/** Header nav labels passed from server or resolved on the client via `useHomePageTexts`. */
export type HomePageHeaderTexts = {
  main: string
  about: string
  contactUs: string
}

export type HomePageTextsResult = {
  texts: HomePageHeaderTexts

}

export function buildHomePageTexts(t: TFunction): HomePageTextsResult {
  return {
    texts: {
      main: t("common.main"),
      about: t("common.about"),
      contactUs: t("common.contactUs"),
    },
  }
}
