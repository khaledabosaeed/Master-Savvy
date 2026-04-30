import { getDictionary } from "./getDictionary"
import type { HomePageTextsResult } from "./home-page-texts"
import type { AppLanguage } from "./settings"

/** Server Components: home header labels + gallery heading from active dictionary. */
export async function getHomePageTexts(lang: AppLanguage): Promise<HomePageTextsResult> {
  const d = await getDictionary(lang)
  const c = d.common
  return {
    texts: {
      main: c.main,
      projects: c.projects,
      services: c.services,
      about: c.about,
      ourRobots: c.robots,
      contactUs: c.contactUs,
    },
    galleryHeading: c.gallery,
  }
}
