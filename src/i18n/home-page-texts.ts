import type { TFunction } from "i18next"

/** Header nav labels passed from server or resolved on the client via `useHomePageTexts`. */
export type HomePageHeaderTexts = {
  main: string
  projects: string
  services: string
  about: string
  ourRobots: string
  contactUs: string
}

export type HomePageTextsResult = {
  texts: HomePageHeaderTexts
  galleryHeading: string
}

export function buildHomePageTexts(t: TFunction): HomePageTextsResult {
  return {
    texts: {
      main: t("common.main"),
      projects: t("common.projects"),
      services: t("common.services"),
      about: t("common.about"),
      ourRobots: t("common.robots"),
      contactUs: t("common.contactUs"),
    },
    galleryHeading: t("common.gallery"),
  }
}
