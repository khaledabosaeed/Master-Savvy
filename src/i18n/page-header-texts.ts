import type { LocaleDictionary } from "./getDictionary"

/** UnifiedHeader `texts` maps keyed for nav / mobile menu. */
export type PageHeaderTexts = Record<string, string>

export function mediaPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  return {
    main: c.main,
    news: c.news,
    gallery: c.gallery,
    "why-savvy": c.whySavvy,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

export function contactPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const h = d.header
  return {
    main: c.main,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

export function expoPageHeaderTexts(d: LocaleDictionary): {
  texts: PageHeaderTexts
  imageSliderHeading: string
} {
  const c = d.common
  return {
    texts: {
      main: c.main,
      services: c.servicesLabel,
      projects: c.projects,
      partners: c.partnersLabel,
      ourRobots: c.robots,
      contactUs: c.contactUs,
    },
    imageSliderHeading: d.imageSlider.heading,
  }
}

export function innovationPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  return {
    main: c.main,
    industries: d.innovation.industriesNavLabel,
    contactUs: c.contactUs,
  }
}

export function innovationIndustryPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  return {
    main: c.main,
    "use-cases": d.innovation.useCasesTitle,
    robots: d.innovation.robotsTitle,
    "other-industries": d.innovation.otherIndustriesTitle,
    contactUs: c.contactUs,
  }
}

export function privacyPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const h = d.header
  return {
    main: c.main,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

export function termsPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const h = d.header
  return {
    main: c.main,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

/** /robots — eStore label for robots entry in header. */
export function robotsIndexHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const base = robotsSubpageHeaderTexts(d)
  return {
    main: base.main,
    ourRobots: c.savvyEStore,
    contactUs: base.contactUs,
  }
}

/** /robots/* detail, product, responsible-use — full header map from locale JSON. */
export function robotsSubpageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  return {
    main: c.main,
    projects: c.projects,
    services: c.mediaGallery,
    about: c.about,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

export function newsSectionHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const h = d.header
  return {
    main: c.main,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}

/** Article detail route — no `news` entry (matches previous static headers). */
export function articleDetailPageHeaderTexts(d: LocaleDictionary): PageHeaderTexts {
  const c = d.common
  const h = d.header
  return {
    main: c.main,
    ourServices: h.ourServices,
    ourRobots: c.robots,
    contactUs: c.contactUs,
  }
}
