/**
 * Industry / innovation hub copy — source of truth for update-innovation-industry-content.cjs
 * Maps to public.translations.content.innovation in Supabase.
 */

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

/** Icon keys per industry panel item (same order as locale copy arrays). */
const industryItemIcons = {
  "food-beverage": {
    challenges: ["cost", "workforce", "speed", "experience"],
    puduHelp: ["delivery", "service", "cleaning"],
    results: ["efficiency", "cost", "experience", "productivity"],
  },
  retail: {
    challenges: ["speed", "experience", "guidance", "workforce"],
    puduHelp: ["guidance", "delivery", "service", "cleaning"],
    results: ["experience", "efficiency", "workforce"],
  },
  hospitality: {
    challenges: ["experience", "delivery", "speed", "efficiency"],
    puduHelp: ["delivery", "guidance", "automation", "cleaning"],
    results: ["experience", "efficiency", "service"],
  },
  "industrial-logistics": {
    challenges: ["transport", "safety", "efficiency", "warehouse"],
    puduHelp: ["transport", "production", "warehouse", "automation"],
    results: ["automation", "productivity", "safety"],
  },
  healthcare: {
    challenges: ["workforce", "transport", "sanitization", "uptime"],
    puduHelp: ["samples", "medicine", "delivery", "sanitization"],
    results: ["service", "efficiency", "safety"],
  },
  transportation: {
    challenges: [],
    puduHelp: ["guidance", "delivery", "service", "cleaning"],
    results: [],
  },
  "entertainment-sports": {
    challenges: [],
    puduHelp: ["service", "guidance", "events", "transport"],
    results: [],
  },
  "real-estate": {
    challenges: [],
    puduHelp: ["service", "building", "cleaning", "delivery"],
    results: [],
  },
  education: {
    challenges: [],
    puduHelp: ["guidance", "transport", "education", "events"],
    results: [],
  },
  "public-service": {
    challenges: [],
    puduHelp: ["service", "guidance", "transport", "maintenance"],
    results: [],
  },
}

const hubCopy = {
  en: {
    hero: {
      title: "Robotics & AI for Saudi Industries",
      subtitle: "22 Years of Localizing Global Technologies in Saudi Arabia",
    },
    industriesSectionTitle: "Industries We Serve",
    industriesSectionSubtitle:
      "Helping public and private sector organizations improve operations, increase efficiency, and enhance customer experience through robotics, artificial intelligence, and smart automation.",
    savvy: {
      title: "SAVVY",
      headline: "Your Gateway to the New World",
      lead: "We do not simply deploy technology.",
      description:
        "We help organizations select, localize, integrate, and operate robotics and AI solutions that deliver measurable operational impact.",
      focusAreasTitle: "Our Focus Areas",
      focusAreas: [
        "Robotics",
        "Artificial Intelligence",
        "Automation",
        "Sustainability",
        "Digital Transformation",
        "Training & Knowledge Transfer",
      ],
    },
    panelHeadings: {
      challenges: "Challenges",
      puduHelp: "How PUDU Robots Help",
      results: "Results",
    },
  },
  ar: {
    hero: {
      title: "الروبوتات والذكاء الاصطناعي لخدمة القطاعات السعودية",
      subtitle: "22 عاماً من الخبرة في توطين التقنيات العالمية داخل المملكة",
    },
    industriesSectionTitle: "القطاعات التي نخدمها",
    industriesSectionSubtitle:
      "نساعد الجهات الحكومية والخاصة على تحسين التشغيل، رفع الكفاءة، وتعزيز تجربة العملاء من خلال الروبوتات والذكاء الاصطناعي والأتمتة الذكية.",
    savvy: {
      title: "ساڤي",
      headline: "بوابتك للعالم الجديد",
      lead: "لا نبيع الروبوتات فقط.",
      description:
        "نساعد الجهات الحكومية والخاصة على اختيار التقنية المناسبة، وتوطينها، ودمجها داخل بيئة العمل لتحقيق أثر تشغيلي حقيقي ومستدام.",
      focusAreasTitle: "مجالاتنا",
      focusAreas: [
        "الروبوتات",
        "الذكاء الاصطناعي",
        "الأتمتة",
        "الاستدامة",
        "التحول الرقمي",
        "التدريب ونقل المعرفة",
      ],
    },
    panelHeadings: {
      challenges: "التحديات",
      puduHelp: "كيف تساعد روبوتات PUDU",
      results: "النتائج",
    },
  },
}

const industriesCopy = {
  en: {
    "food-beverage": {
      title: "Food & Beverage",
      shortTitle: "Food & Beverage",
      challenges: [
        "High operating costs",
        "Labor shortages",
        "Service speed",
        "Customer satisfaction",
      ],
      puduHelp: [
        "Food and beverage delivery",
        "Customer reception",
        "Self-cleaning",
      ],
      results: [
        "Faster service",
        "Lower operating costs",
        "Better customer experience",
        "Increased productivity",
      ],
    },
    retail: {
      title: "Retail",
      shortTitle: "Retail",
      challenges: [
        "Managing peak hours",
        "Customer service",
        "Visitor guidance",
        "Staff shortages",
      ],
      puduHelp: [
        "Shopper guidance",
        "Product delivery",
        "Point-of-sale support",
        "Store cleaning",
      ],
      results: [
        "Improved shopping experience",
        "Higher operational efficiency",
        "Reduced pressure on staff",
      ],
    },
    hospitality: {
      title: "Hospitality",
      shortTitle: "Hospitality",
      challenges: [
        "Guest experience",
        "In-room delivery",
        "Fast service",
        "Operational quality",
      ],
      puduHelp: [
        "Room service",
        "Guidance and reception",
        "Autonomous delivery",
        "Facility cleaning",
      ],
      results: [
        "Outstanding guest experience",
        "More efficient operations",
        "Improved service quality",
      ],
    },
    "industrial-logistics": {
      title: "Industrial & Logistics",
      shortTitle: "Industrial & Logistics",
      challenges: [
        "Repetitive transport",
        "Safety",
        "Operational efficiency",
        "Warehouse management",
      ],
      puduHelp: [
        "Material transport",
        "Production line support",
        "Warehouse automation",
        "Autonomous mobility",
      ],
      results: [
        "Reduced manual work",
        "Higher productivity",
        "Improved safety",
      ],
    },
    healthcare: {
      title: "Healthcare",
      shortTitle: "Healthcare",
      challenges: [
        "Workload pressure",
        "Supply transport",
        "Infection control",
        "Time management",
      ],
      puduHelp: [
        "Sample transport",
        "Medicine distribution",
        "Supply transport",
        "Sanitization and cleaning",
      ],
      results: [
        "More time for patient care",
        "Improved efficiency",
        "Reduced risk",
      ],
    },
    transportation: {
      title: "Transportation",
      shortTitle: "Transportation",
      challenges: [],
      puduHelp: [
        "Smart guidance",
        "Order delivery",
        "Passenger services",
        "Facility cleaning",
      ],
      results: [],
    },
    "entertainment-sports": {
      title: "Entertainment & Sports",
      shortTitle: "Entertainment & Sports",
      challenges: [],
      puduHelp: [
        "Visitor services",
        "Guidance",
        "Event support",
        "Logistics services",
      ],
      results: [],
    },
    "real-estate": {
      title: "Real Estate",
      shortTitle: "Real Estate",
      challenges: [],
      puduHelp: [
        "Tenant services",
        "Facility tours",
        "Smart cleaning",
        "Internal delivery",
      ],
      results: [],
    },
    education: {
      title: "Education",
      shortTitle: "Education",
      challenges: [],
      puduHelp: [
        "On-campus guidance",
        "Logistics services",
        "Student engagement",
        "Event support",
      ],
      results: [],
    },
    "public-service": {
      title: "Public Sector",
      shortTitle: "Public Sector",
      challenges: [],
      puduHelp: [
        "Visitor services",
        "Smart wayfinding",
        "Internal transport",
        "Facility maintenance",
      ],
      results: [],
    },
  },
  ar: {
    "food-beverage": {
      title: "الأغذية والمشروبات",
      shortTitle: "الأغذية والمشروبات",
      challenges: [
        "ارتفاع تكاليف التشغيل",
        "نقص العمالة",
        "سرعة الخدمة",
        "رضا العملاء",
      ],
      puduHelp: ["توصيل الطعام والمشروبات", "استقبال العملاء", "التنظيف الذاتي"],
      results: [
        "خدمة أسرع",
        "تكلفة تشغيل أقل",
        "تجربة عملاء أفضل",
        "زيادة الإنتاجية",
      ],
    },
    retail: {
      title: "التجزئة",
      shortTitle: "التجزئة",
      challenges: [
        "إدارة أوقات الذروة",
        "خدمة العملاء",
        "توجيه الزوار",
        "نقص الموظفين",
      ],
      puduHelp: [
        "إرشاد المتسوقين",
        "توصيل المنتجات",
        "دعم نقاط البيع",
        "تنظيف المتاجر",
      ],
      results: [
        "تحسين تجربة التسوق",
        "رفع كفاءة التشغيل",
        "تقليل الضغط على الموظفين",
      ],
    },
    hospitality: {
      title: "الضيافة",
      shortTitle: "الضيافة",
      challenges: ["تجربة الضيف", "التوصيل الداخلي", "الخدمة السريعة", "جودة التشغيل"],
      puduHelp: [
        "خدمة الغرف",
        "الإرشاد والاستقبال",
        "التوصيل الذاتي",
        "تنظيف المرافق",
      ],
      results: ["تجربة ضيوف متميزة", "تشغيل أكثر كفاءة", "تحسين جودة الخدمة"],
    },
    "industrial-logistics": {
      title: "الصناعة واللوجستيات",
      shortTitle: "الصناعة واللوجستيات",
      challenges: [
        "النقل المتكرر",
        "السلامة",
        "الكفاءة التشغيلية",
        "إدارة المستودعات",
      ],
      puduHelp: [
        "نقل المواد",
        "دعم خطوط الإنتاج",
        "أتمتة المستودعات",
        "التنقل الذاتي",
      ],
      results: ["تقليل العمل اليدوي", "رفع الإنتاجية", "تحسين السلامة"],
    },
    healthcare: {
      title: "الرعاية الصحية",
      shortTitle: "الرعاية الصحية",
      challenges: ["ضغط العمل", "نقل الإمدادات", "العدوى", "إدارة الوقت"],
      puduHelp: [
        "نقل العينات",
        "توزيع الأدوية",
        "نقل المستلزمات",
        "التعقيم والتنظيف",
      ],
      results: ["وقت أكبر لرعاية المرضى", "تحسين الكفاءة", "تقليل المخاطر"],
    },
    transportation: {
      title: "النقل",
      shortTitle: "النقل",
      challenges: [],
      puduHelp: [
        "الإرشاد الذكي",
        "توصيل الطلبات",
        "خدمة المسافرين",
        "تنظيف المرافق",
      ],
      results: [],
    },
    "entertainment-sports": {
      title: "الترفيه والرياضة",
      shortTitle: "الترفيه والرياضة",
      challenges: [],
      puduHelp: ["خدمة الزوار", "الإرشاد", "دعم الفعاليات", "الخدمات اللوجستية"],
      results: [],
    },
    "real-estate": {
      title: "العقارات",
      shortTitle: "العقارات",
      challenges: [],
      puduHelp: [
        "خدمة المستأجرين",
        "جولات المرافق",
        "التنظيف الذكي",
        "التوصيل الداخلي",
      ],
      results: [],
    },
    education: {
      title: "التعليم",
      shortTitle: "التعليم",
      challenges: [],
      puduHelp: [
        "الإرشاد داخل الحرم",
        "الخدمات اللوجستية",
        "التفاعل مع الطلاب",
        "دعم الفعاليات",
      ],
      results: [],
    },
    "public-service": {
      title: "القطاع الحكومي",
      shortTitle: "القطاع الحكومي",
      challenges: [],
      puduHelp: [
        "خدمة المراجعين",
        "التوجيه الذكي",
        "النقل الداخلي",
        "صيانة المرافق",
      ],
      results: [],
    },
  },
}

function buildHubSummary(items, locale) {
  if (!items.length) return ""
  return items.slice(0, 3).join(locale === "ar" ? " · " : " · ")
}

function buildPanelItems(labels, icons = []) {
  return labels.map((label, index) => ({
    icon: icons[index] ?? "service",
    label,
  }))
}

function buildImpactPanels(slug, copy, headings) {
  const icons = industryItemIcons[slug] ?? {}
  return {
    challenges: {
      heading: headings.challenges,
      items: buildPanelItems(copy.challenges ?? [], icons.challenges),
    },
    puduHelp: {
      heading: headings.puduHelp,
      items: buildPanelItems(copy.puduHelp ?? [], icons.puduHelp),
    },
    results: {
      heading: headings.results,
      items: buildPanelItems(copy.results ?? [], icons.results),
    },
  }
}

function buildUseCase(industry, headings) {
  const existingUseCase = industry.useCases?.[0]
  const slide =
    existingUseCase?.slides?.[0] ??
    (industry.imageUrl
      ? {
          robotName: "Pudu",
          imageAlt: industry.imageAlt ?? industry.title,
          imageUrl: industry.imageUrl,
        }
      : null)

  if (!slide) {
    return industry.useCases
  }

  return [
    {
      aboutTitle: industry.title,
      slides: [slide],
      challenges: {
        heading: headings.challenges,
        items: [],
      },
      whyChoose: {
        heading: headings.puduHelp,
        items: [],
      },
      solutionsTitle: headings.puduHelp,
      solutions: [],
      slideKeys: existingUseCase?.slideKeys?.slice(0, 1) ?? ["bellabot"],
      solutionKeys: [],
    },
  ]
}

function applyIndustryPatch(existing, slug, copy, headings, locale) {
  const next = { ...existing }
  next.title = copy.title
  next.shortTitle = copy.shortTitle
  next.headline = copy.title
  next.summary = buildHubSummary(copy.puduHelp ?? [], locale)
  next.impactPanels = buildImpactPanels(slug, copy, headings)
  delete next.impactTitle
  delete next.impactStats
  next.useCases = buildUseCase(next, headings)
  return next
}

function applyInnovationPatch(innovation, locale) {
  const hub = hubCopy[locale]
  const copyBySlug = industriesCopy[locale]
  const next = { ...innovation }

  next.hero = { ...(next.hero ?? {}), ...hub.hero }

  const industries = { ...(next.industries ?? {}) }
  for (const slug of INDUSTRY_SLUGS) {
    const existing = industries[slug]
    const copy = copyBySlug[slug]
    if (!existing || !copy) continue
    industries[slug] = applyIndustryPatch(existing, slug, copy, hub.panelHeadings, locale)
  }
  next.industries = industries

  return next
}

module.exports = {
  INDUSTRY_SLUGS,
  hubCopy,
  industriesCopy,
  industryItemIcons,
  applyInnovationPatch,
}
