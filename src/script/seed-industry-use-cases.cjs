/**
 * Populate innovation.industries.*.useCases for all categories in locale JSON.
 * Usage: node src/script/seed-industry-use-cases.cjs
 * Then: npm run seed:translations (to push to Supabase)
 */
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "..")
const enPath = path.join(root, "public/locales/en.json")
const arPath = path.join(root, "public/locales/ar.json")

const INDUSTRY_SLUGS = [
  "food-beverage",
  "retail",
  "hospitality",
  "industrial-logistics",
  "healthcare",
  "transportation",
  "entertainment-sports",
  "real-estate",
  "education",
  "public-service",
]

const ROBOT_DISPLAY_NAMES = {
  bellabot: "BellaBot",
  kettybot: "KettyBot",
  holabot: "HolaBot",
  flashbot: "FlashBot",
  cc1: "CC1",
  t300: "T300",
  pudubot2: "PUDUbot2",
}

const ROBOT_PRODUCT_HREFS = {
  bellabot: "https://www.pudurobotics.com/products/bellabot",
  kettybot: "https://www.pudurobotics.com/en/products/kettybot_pro",
  holabot: "https://www.pudurobotics.com/products/holabot",
  flashbot: "https://www.pudurobotics.com/products/flashbot-new",
  cc1: "https://www.pudurobotics.com/en/products/cc1-pro/",
  t300: "https://www.pudurobotics.com/products/pudut300",
  pudubot2: "https://www.pudurobotics.com/en/products/pudubot2",
}

const INDUSTRY_USE_CASE_CONFIG = {
  "food-beverage": {
    titles: {
      en: ["Table Service & Delivery", "Floor Cleaning"],
      ar: ["خدمة الطاولات والتوصيل", "تنظيف الأرضيات"],
    },
    keys: [
      { slideKeys: ["holabot", "bellabot"], solutionKeys: ["holabot", "bellabot"] },
      { slideKeys: ["holabot", "kettybot"], solutionKeys: ["holabot", "kettybot"] },
    ],
  },
  retail: {
    titles: {
      en: ["In-Store Delivery", "Shopper Guidance"],
      ar: ["التوصيل داخل المتجر", "إرشاد المتسوقين"],
    },
    keys: [
      { slideKeys: ["bellabot", "flashbot"], solutionKeys: ["bellabot", "flashbot"] },
      { slideKeys: ["kettybot", "bellabot"], solutionKeys: ["kettybot", "bellabot"] },
    ],
  },
  hospitality: {
    titles: {
      en: [
        "Guest Arrival → Welcome & Guidance",
        "Guest Stay → Room Service & Amenities",
        "Dining Experience → Food & Beverage Service",
        "Events & Meetings → Logistics & Guest Assistance",
        "Facility Operations → Autonomous Cleaning",
      ],
      ar: [
        "وصول الضيوف → الترحيب والإرشاد",
        "إقامة الضيوف → خدمة الغرف والمستلزمات",
        "تجربة الطعام → خدمة المأكولات والمشروبات",
        "الفعاليات والاجتماعات → اللوجستيات ومساعدة الضيوف",
        "عمليات المرافق → التنظيف الذاتي",
      ],
    },
    keys: [
      { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
      { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
      { slideKeys: ["bellabot"], solutionKeys: ["bellabot"] },
      { slideKeys: ["bellabot", "kettybot"], solutionKeys: ["bellabot", "kettybot"] },
      { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
    ],
  },
  "industrial-logistics": {
    titles: {
      en: [
        "Receiving → Material Arrival & Sorting",
        "Storage → Warehouse Transport",
        "Production → Line Feeding & Material Movement",
        "Quality Control → Secure Sample & Component Transport",
        "Packing → Movement Between Packaging Stations",
        "Shipping → Outbound Logistics & Dispatch Support",
        "24/7 Operations → Continuous Autonomous Material Flow",
      ],
      ar: [
        "الاستلام → وصول المواد والفرز",
        "التخزين → النقل داخل المستودع",
        "الإنتاج → تغذية خط الإنتاج ونقل المواد",
        "مراقبة الجودة → نقل العينات والمكونات الآمن",
        "التعبئة → النقل بين محطات التعبئة",
        "الشحن → لوجستيات الصادر والإرسال",
        "التشغيل 24/7 → تدفق مواد ذاتي مستمر",
      ],
    },
    keys: [
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["t300"], solutionKeys: ["t300"] },
      { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["t300", "pudubot2"], solutionKeys: ["t300", "pudubot2"] },
      {
        slideKeys: ["t300", "pudubot2", "flashbot"],
        solutionKeys: ["t300", "pudubot2", "flashbot"],
      },
    ],
  },
  healthcare: {
    titles: {
      en: [
        "Patient Arrival → Visitor Guidance",
        "Registration & Reception → Navigation Assistance",
        "Pharmacy & Supply Chain → Medical Supply Transport",
        "Laboratory Operations → Secure Sample Transport",
        "Patient Care Areas → Internal Logistics Support",
        "Facility Hygiene → Autonomous Cleaning",
        "24/7 Hospital Operations → Continuous Logistics & Service Support",
      ],
      ar: [
        "وصول المريض → إرشاد الزوار",
        "التسجيل والاستقبال → المساعدة في التنقل",
        "الصيدلية وسلسلة الإمداد → نقل المستلزمات الطبية",
        "عمليات المختبر → نقل العينات الآمن",
        "مناطق رعاية المرضى → دعم اللوجستيات الداخلية",
        "نظافة المرافق → التنظيف الذاتي",
        "عمليات المستشفى 24/7 → دعم لوجستي وخدمي مستمر",
      ],
    },
    keys: [
      { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
      { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
      {
        slideKeys: ["pudubot2", "flashbot", "cc1"],
        solutionKeys: ["pudubot2", "flashbot", "cc1"],
      },
    ],
  },
  transportation: {
    titles: {
      en: ["Passenger Guidance", "Facility Support"],
      ar: ["إرشاد المسافرين", "دعم المرافق"],
    },
    keys: [
      { slideKeys: ["pudubot2", "flashbot"], solutionKeys: ["pudubot2", "flashbot"] },
      { slideKeys: ["flashbot", "t300"], solutionKeys: ["flashbot", "t300"] },
    ],
  },
  "entertainment-sports": {
    titles: {
      en: ["Concession Delivery", "Visitor Guidance"],
      ar: ["توصيل نقاط البيع", "إرشاد الزوار"],
    },
    keys: [
      { slideKeys: ["holabot", "bellabot"], solutionKeys: ["holabot", "bellabot"] },
      { slideKeys: ["kettybot", "holabot"], solutionKeys: ["kettybot", "holabot"] },
    ],
  },
  "real-estate": {
    titles: {
      en: ["Tenant Amenity Delivery", "Property Tours"],
      ar: ["توصيل خدمات المستأجرين", "جولات في العقار"],
    },
    keys: [
      { slideKeys: ["bellabot", "kettybot"], solutionKeys: ["bellabot", "kettybot"] },
      { slideKeys: ["kettybot", "cc1"], solutionKeys: ["kettybot", "cc1"] },
    ],
  },
  education: {
    titles: {
      en: ["Reception & Guided Tours", "Campus Logistics"],
      ar: ["الاستقبال والجولات", "لوجستيات الحرم"],
    },
    keys: [
      { slideKeys: ["pudubot2", "holabot"], solutionKeys: ["pudubot2", "holabot"] },
      { slideKeys: ["kettybot", "pudubot2"], solutionKeys: ["kettybot", "pudubot2"] },
    ],
  },
  "public-service": {
    titles: {
      en: ["Visitor Services", "Internal Transport"],
      ar: ["خدمات الزوار", "النقل الداخلي"],
    },
    keys: [
      { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
      { slideKeys: ["t300", "cc1"], solutionKeys: ["t300", "cc1"] },
    ],
  },
}

const USE_CASE_COPY = {
  en: {
    challengesHeading: "Challenges",
    whyChooseHeading: "Why choose Pudu Robotics?",
    solutionsTitle: "Robotic Solutions",
    learnMore: "Learn More",
    features: [
      "Autonomous navigation and reliable operation",
      "Designed for high-traffic commercial environments",
      "Integrates with existing service workflows",
    ],
  },
  ar: {
    challengesHeading: "التحديات",
    whyChooseHeading: "لماذا تختار Pudu Robotics؟",
    solutionsTitle: "الحلول الروبوتية",
    learnMore: "اعرف المزيد",
    features: [
      "تنقل ذاتي وتشغيل موثوق",
      "مصمم لبيئات تجارية عالية الحركة",
      "يتكامل مع سير العمل الحالي",
    ],
  },
}

const HOSPITALITY_CHALLENGES = {
  en: {
    heading: "Hospitality Industry Challenges",
    items: [
      { icon: "experience", label: "Rising guest expectations" },
      { icon: "speed", label: "Need for faster and more consistent service" },
      { icon: "workforce", label: "Staff shortages and turnover" },
      { icon: "events", label: "Managing peak occupancy periods" },
      { icon: "building", label: "Operating multi-floor facilities" },
      { icon: "service", label: "Maintaining service quality at all times" },
    ],
  },
  ar: {
    heading: "تحديات قطاع الضيافة",
    items: [
      { icon: "experience", label: "ارتفاع توقعات الضيوف" },
      { icon: "speed", label: "الحاجة إلى خدمة أسرع وأكثر اتساقاً" },
      { icon: "workforce", label: "نقص العمالة ومعدل دوران الموظفين" },
      { icon: "events", label: "إدارة فترات الذروة والإشغال" },
      { icon: "building", label: "تشغيل مرافق متعددة الطوابق" },
      { icon: "service", label: "الحفاظ على جودة الخدمة في جميع الأوقات" },
    ],
  },
}

function extractPanelStrings(panel) {
  if (!panel || typeof panel !== "object") return []
  if (!Array.isArray(panel.items)) return []
  return panel.items
    .map((item) => (typeof item === "string" ? item : item?.label ?? ""))
    .map((s) => String(s).trim())
    .filter(Boolean)
}

function extractChallengeItems(panel) {
  if (!panel || typeof panel !== "object") return []
  if (!Array.isArray(panel.items)) return []
  return panel.items
    .map((item) => {
      if (typeof item === "string") {
        const label = item.trim()
        return label ? { icon: "experience", label } : null
      }
      if (item && typeof item === "object" && item.label) {
        return {
          icon: item.icon?.trim() || "experience",
          label: String(item.label).trim(),
        }
      }
      return null
    })
    .filter(Boolean)
}

function industryChallengesHeading(industry, locale, fallback) {
  const title = typeof industry.title === "string" ? industry.title.trim() : ""
  if (!title) return fallback
  return locale === "ar" ? `تحديات ${title}` : `${title} Industry Challenges`
}

function extractPanelHeading(panel, fallback) {
  if (!panel || typeof panel !== "object") return fallback
  return typeof panel.heading === "string" && panel.heading.trim()
    ? panel.heading.trim()
    : fallback
}

function buildSolutionFromKey(key, copy) {
  const name = ROBOT_DISPLAY_NAMES[key] ?? key
  return {
    name,
    imageAlt: name,
    imageUrl: "",
    features: [...copy.features],
    learnMoreLabel: copy.learnMore,
    href: ROBOT_PRODUCT_HREFS[key] ?? "/{lang}/contact",
  }
}

function buildUseCasesForIndustry(slug, industry, locale) {
  const config = INDUSTRY_USE_CASE_CONFIG[slug]
  const copy = USE_CASE_COPY[locale]
  const impactPanels = industry.impactPanels ?? {}
  const hospitalityChallenges =
    slug === "hospitality" ? HOSPITALITY_CHALLENGES[locale] : null
  const challengeItems = hospitalityChallenges
    ? hospitalityChallenges.items
    : extractChallengeItems(impactPanels.challenges)
  const whyItems = extractPanelStrings(impactPanels.puduHelp)
  const challengesHeading = hospitalityChallenges
    ? hospitalityChallenges.heading
    : industryChallengesHeading(
        industry,
        locale,
        extractPanelHeading(impactPanels.challenges, copy.challengesHeading)
      )

  return config.keys.map((keyCfg, index) => {
    const aboutTitle = config.titles[locale][index] ?? `Section ${index + 1}`
    const primarySlideKey = keyCfg.slideKeys[0] ?? "holabot"
    const primaryName = ROBOT_DISPLAY_NAMES[primarySlideKey] ?? "Robot"

    return {
      aboutTitle,
      slideKeys: keyCfg.slideKeys,
      solutionKeys: keyCfg.solutionKeys,
      slides: [
        {
          robotName: primaryName,
          imageAlt: `${primaryName} — ${aboutTitle}`,
          imageUrl: "",
        },
      ],
      challenges: {
        heading: challengesHeading,
        items: challengeItems.length > 0 ? challengeItems : [""],
      },
      whyChoose: {
        heading: copy.whyChooseHeading,
        items: whyItems.length > 0 ? whyItems : [""],
      },
      solutionsTitle: copy.solutionsTitle,
      solutions: keyCfg.solutionKeys.map((key) =>
        buildSolutionFromKey(key, copy)
      ),
    }
  })
}

function hasRichContent(useCase) {
  if (!useCase || typeof useCase !== "object") return false
  const challenges = useCase.challenges?.items ?? []
  const hasIconChallenges = challenges.some(
    (item) => item && typeof item === "object" && item.label
  )
  const why = useCase.whyChoose?.items?.filter(Boolean) ?? []
  const solutions = useCase.solutions ?? []
  const richSolutions = solutions.some(
    (s) => Array.isArray(s?.features) && s.features.filter(Boolean).length > 1
  )
  return hasIconChallenges || why.length > 0 || richSolutions
}

function mergeUseCase(generated, existing) {
  if (!hasRichContent(existing)) return generated
  return {
    ...generated,
    aboutTitle: existing.aboutTitle?.trim() || generated.aboutTitle,
    slideKeys: existing.slideKeys?.length ? existing.slideKeys : generated.slideKeys,
    solutionKeys: existing.solutionKeys?.length
      ? existing.solutionKeys
      : generated.solutionKeys,
    slides: Array.isArray(existing.slides) && existing.slides.length
      ? existing.slides
      : generated.slides,
    challenges:
      existing.challenges?.items?.some(
        (item) =>
          item &&
          typeof item === "object" &&
          String(item.label ?? "").trim()
      )
        ? existing.challenges
        : generated.challenges,
    whyChoose:
      existing.whyChoose?.items?.filter(Boolean).length > 0
        ? existing.whyChoose
        : generated.whyChoose,
    solutionsTitle: existing.solutionsTitle?.trim() || generated.solutionsTitle,
    solutions:
      existing.solutions?.some(
        (s) => Array.isArray(s?.features) && s.features.filter(Boolean).length > 1
      )
        ? existing.solutions
        : generated.solutions,
  }
}

function patchLocale(filePath, locale) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
  const industries = data.innovation?.industries
  if (!industries) {
    console.warn(`No innovation.industries in ${filePath}`)
    return
  }

  for (const slug of INDUSTRY_SLUGS) {
    const industry = industries[slug]
    if (!industry) continue

    const generated = buildUseCasesForIndustry(slug, industry, locale)
    const existing = Array.isArray(industry.useCases) ? industry.useCases : []

    industry.useCases = generated.map((gen, index) =>
      mergeUseCase(gen, existing[index])
    )
    industries[slug] = industry
  }

  data.innovation.industries = industries
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`Patched useCases in ${filePath}`)
}

patchLocale(enPath, "en")
patchLocale(arPath, "ar")
console.log("Done. Run npm run seed:translations to sync Supabase.")
