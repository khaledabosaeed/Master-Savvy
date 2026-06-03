/**
 * Patch hospitality, industrial-logistics, and healthcare industry page content.
 * Usage: node src/script/patch-pudu-industry-content.cjs
 */
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "..")
const enPath = path.join(root, "public/locales/en.json")
const arPath = path.join(root, "public/locales/ar.json")

const ROBOT_HREFS = {
  bellabot: "https://www.pudurobotics.com/products/bellabot",
  kettybot: "https://www.pudurobotics.com/en/products/kettybot_pro",
  flashbot: "https://www.pudurobotics.com/products/flashbot-new",
  cc1: "https://www.pudurobotics.com/en/products/cc1-pro/",
  t300: "https://www.pudurobotics.com/products/pudut300",
  pudubot2: "https://www.pudurobotics.com/en/products/pudubot2",
}

const ROBOT_NAMES = {
  en: {
    bellabot: "BellaBot",
    kettybot: "KettyBot",
    flashbot: "FlashBot Max",
    cc1: "CC1 Pro",
    t300: "PUDU T300",
    pudubot2: "PuduBot 2",
  },
  ar: {
    bellabot: "BellaBot",
    kettybot: "KettyBot",
    flashbot: "FlashBot Max",
    cc1: "CC1 Pro",
    t300: "PUDU T300",
    pudubot2: "PuduBot 2",
  },
}

const SOLUTION_FEATURES = {
  en: {
    bellabot: [
      "Interactive hospitality experience",
      "Food and beverage delivery",
      "Guest-facing service support",
      "Restaurant and lounge operations",
    ],
    kettybot: [
      "Guest guidance",
      "Event information",
      "Digital engagement",
      "Visitor assistance",
    ],
    kettybotHealthcare: [
      "Patient and visitor guidance",
      "Department information services",
      "Interactive visitor engagement",
      "Reduced front-desk workload",
    ],
    flashbot: [
      "Secure material transport",
      "Multi-compartment delivery",
      "PIN and NFC authentication",
      "Multi-floor operations",
      "Elevator integration",
    ],
    flashbotHospitality: [
      "Room service delivery",
      "Elevator integration",
      "Multi-floor operations",
      "Secure delivery of food and amenities",
    ],
    flashbotHealthcare: [
      "Secure transport of sensitive materials",
      "Multi-compartment delivery",
      "PIN and NFC authentication",
      "Elevator integration",
      "Multi-floor operations",
    ],
    cc1: [
      "Lobby and hallway cleaning",
      "Autonomous cleaning operations",
      "Higher hygiene standards",
      "Facilities support",
    ],
    cc1Healthcare: [
      "Hallway and lobby cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced hygiene standards",
    ],
    t300: [
      "Autonomous cart towing",
      "Up to 300 kg payload",
      "Material transportation automation",
      "Industrial-grade operations",
      "Facility-wide navigation",
    ],
    pudubot2: [
      "Flexible material transport",
      "Compact footprint",
      "Internal logistics operations",
      "Warehouse and distribution workflows",
    ],
    pudubot2Healthcare: [
      "Medical supply transportation",
      "Internal logistics workflows",
      "Medication and materials movement",
      "Inter-department operations",
    ],
  },
  ar: {
    bellabot: [
      "تجربة ضيافة تفاعلية",
      "توصيل الطعام والمشروبات",
      "دعم خدمة الضيوف",
      "دعم عمليات المطاعم والصالات",
    ],
    kettybot: [
      "إرشاد الضيوف",
      "معلومات الفعاليات",
      "التفاعل الرقمي",
      "مساعدة الزوار",
    ],
    kettybotHealthcare: [
      "إرشاد المرضى والزوار",
      "معلومات الأقسام والعيادات",
      "التفاعل مع المراجعين",
      "تقليل الضغط على مكاتب الاستقبال",
    ],
    flashbot: [
      "نقل المواد الحساسة",
      "حجرات آمنة متعددة",
      "مصادقة PIN و NFC",
      "تنقل متعدد الطوابق",
      "تكامل مع المصاعد",
    ],
    flashbotHospitality: [
      "توصيل الطلبات وخدمة الغرف",
      "التكامل مع المصاعد",
      "التنقل بين الطوابق",
      "نقل الطعام والمستلزمات بشكل آمن",
    ],
    flashbotHealthcare: [
      "نقل المواد الحساسة",
      "حجرات آمنة متعددة",
      "مصادقة PIN و NFC",
      "التكامل مع المصاعد",
      "التنقل بين الطوابق",
    ],
    cc1: [
      "تنظيف الممرات والردهات",
      "التنظيف الذاتي الذكي",
      "رفع معايير النظافة",
      "دعم فرق المرافق",
    ],
    cc1Healthcare: [
      "تنظيف الممرات والردهات",
      "التنظيف الذاتي الذكي",
      "دعم فرق النظافة",
      "رفع معايير التعقيم والنظافة",
    ],
    t300: [
      "نقل وسحب العربات",
      "حمولة تصل إلى 300 كجم",
      "أتمتة نقل المواد",
      "العمل في البيئات الصناعية",
      "التنقل الذاتي عبر المنشآت",
    ],
    pudubot2: [
      "نقل المواد والطرود",
      "مرونة عالية للممرات الضيقة",
      "عمليات النقل الداخلية",
      "المستودعات ومراكز التوزيع",
    ],
    pudubot2Healthcare: [
      "نقل المستلزمات الطبية",
      "الخدمات اللوجستية الداخلية",
      "نقل الأدوية والمواد الطبية",
      "التنقل بين الأقسام المختلفة",
    ],
  },
}

function solution(key, locale, featureKey = key) {
  const names = ROBOT_NAMES[locale]
  const features = SOLUTION_FEATURES[locale][featureKey] ?? SOLUTION_FEATURES[locale][key]
  return {
    name: names[key],
    imageAlt: names[key],
    imageUrl: "",
    features,
    learnMoreLabel: locale === "ar" ? "اعرف المزيد" : "Learn More",
    href: ROBOT_HREFS[key],
  }
}

function buildUseCase(locale, config) {
  const names = ROBOT_NAMES[locale]
  const primaryKey = config.slideKeys[0]
  return {
    aboutTitle: config.aboutTitle,
    slideKeys: config.slideKeys,
    solutionKeys: config.solutionKeys,
    slides: [
      {
        robotName: names[primaryKey],
        imageAlt: `${names[primaryKey]} — ${config.aboutTitle}`,
        imageUrl: "",
      },
    ],
    challenges: config.challenges,
    whyChoose: {
      heading: locale === "ar" ? "كيف تساعد روبوتات PUDU" : "How PUDU Helps",
      items: config.whyChooseItems,
    },
    solutionsTitle: locale === "ar" ? "الحلول الموصى بها" : "Recommended Solutions",
    solutions: config.solutionKeys.map((key) =>
      solution(key, locale, config.featureKeys?.[key] ?? key)
    ),
  }
}

const CONTENT = {
  en: {
    hospitality: {
      headline: "PUDU Robotics for Hospitality",
      summary:
        "Smarter Hospitality · Faster Service · Happier Guests — PUDU Robotics helps hotels, resorts, and hospitality destinations deliver a more efficient and consistent guest experience.",
      impactPanels: {
        challenges: {
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
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "delivery", label: "Smart Room Service" },
            { icon: "guidance", label: "Guest Reception & Guidance" },
            { icon: "transport", label: "Hotel Operations Support" },
            { icon: "events", label: "Events & Conference Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "uptime", label: "24/7 Operations Support" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Enhanced guest experience" },
            { icon: "speed", label: "Faster service response times" },
            { icon: "efficiency", label: "Improved operational efficiency" },
            { icon: "automation", label: "Reduced repetitive tasks" },
            { icon: "productivity", label: "Higher staff productivity" },
            { icon: "digitization", label: "Stronger innovation-driven brand image" },
            { icon: "service", label: "More consistent service quality" },
          ],
        },
      },
      scenarioSubtitle:
        "Guest Arrival · Room Service · Dining · Events · Autonomous Cleaning",
      useCases: [
        {
          aboutTitle: "Guest Arrival → Welcome & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybot" },
          whyChooseItems: [
            "Guest Reception & Guidance — Help visitors navigate rooms, facilities, meeting spaces, and hotel services.",
          ],
        },
        {
          aboutTitle: "Guest Stay → Room Service & Amenities",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotHospitality" },
          whyChooseItems: [
            "Smart Room Service — Deliver food, beverages, amenities, and guest requests safely and efficiently.",
          ],
        },
        {
          aboutTitle: "Dining Experience → Food & Beverage Service",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          whyChooseItems: [
            "Food and beverage delivery with interactive guest-facing service support in restaurants and lounges.",
          ],
        },
        {
          aboutTitle: "Events & Meetings → Logistics & Guest Assistance",
          slideKeys: ["bellabot", "kettybot"],
          solutionKeys: ["bellabot", "kettybot"],
          whyChooseItems: [
            "Events & Conference Support — Assist with logistics and guest services during conferences, exhibitions, and events.",
          ],
        },
        {
          aboutTitle: "Facility Operations → Autonomous Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          whyChooseItems: [
            "Smart Cleaning — Maintain cleaner hallways, lobbies, and public spaces throughout the day.",
          ],
        },
      ],
    },
    "industrial-logistics": {
      headline: "PUDU Robotics for Industrial & Logistics Operations",
      summary:
        "Smarter Material Movement · Safer Operations · Higher Productivity — PUDU Robotics helps factories, warehouses, and logistics facilities automate material transportation and improve goods flow.",
      impactPanels: {
        challenges: {
          heading: "Industry Challenges",
          items: [
            { icon: "cost", label: "Rising operational costs" },
            { icon: "workforce", label: "Labor shortages" },
            { icon: "safety", label: "Workplace safety requirements" },
            { icon: "transport", label: "Repetitive internal transportation" },
            { icon: "warehouse", label: "Congested warehouse and loading areas" },
            { icon: "uptime", label: "Need for continuous 24/7 operations" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "production", label: "Production Line Material Transport" },
            { icon: "warehouse", label: "Warehouse & Distribution Support" },
            { icon: "automation", label: "Internal Logistics Automation" },
            { icon: "delivery", label: "Shipping & Receiving Operations" },
            { icon: "building", label: "Multi-Floor Operations" },
            { icon: "digitization", label: "Fleet Management & Visibility" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "productivity", label: "Higher productivity" },
            { icon: "automation", label: "Reduced manual labor" },
            { icon: "safety", label: "Improved workplace safety" },
            { icon: "transport", label: "Better material flow" },
            { icon: "speed", label: "Reduced operational delays" },
            { icon: "efficiency", label: "Greater logistics efficiency" },
            { icon: "uptime", label: "Continuous 24/7 operations" },
          ],
        },
      },
      scenarioSubtitle:
        "Receiving · Storage · Production · Quality Control · Packing · Shipping · 24/7 Operations",
      useCases: [
        {
          aboutTitle: "Receiving → Material Arrival & Sorting",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "Shipping & Receiving Operations — Improve material flow between receiving, processing, and outbound areas.",
          ],
        },
        {
          aboutTitle: "Storage → Warehouse Transport",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "Warehouse & Distribution Support — Transport products between storage, staging, picking, and shipping zones.",
          ],
        },
        {
          aboutTitle: "Production → Line Feeding & Material Movement",
          slideKeys: ["t300"],
          solutionKeys: ["t300"],
          whyChooseItems: [
            "Production Line Material Transport — Move raw materials and work-in-progress items between workstations autonomously.",
          ],
        },
        {
          aboutTitle: "Quality Control → Secure Sample & Component Transport",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          whyChooseItems: [
            "Secure transport of sensitive materials with multi-compartment delivery and PIN/NFC authentication.",
          ],
        },
        {
          aboutTitle: "Packing → Movement Between Packaging Stations",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "Internal Logistics Automation — Reduce dependency on manual carts and repetitive transportation tasks.",
          ],
        },
        {
          aboutTitle: "Shipping → Outbound Logistics & Dispatch Support",
          slideKeys: ["t300", "pudubot2"],
          solutionKeys: ["t300", "pudubot2"],
          whyChooseItems: [
            "Improve material flow between staging, processing, and outbound shipping areas.",
          ],
        },
        {
          aboutTitle: "24/7 Operations → Continuous Autonomous Material Flow",
          slideKeys: ["t300", "pudubot2", "flashbot"],
          solutionKeys: ["t300", "pudubot2", "flashbot"],
          whyChooseItems: [
            "Fleet Management & Visibility — Monitor robot performance, routes, and operational activities in real time.",
            "Multi-Floor Operations — Navigate across facilities using elevator integration and smart infrastructure.",
          ],
        },
      ],
    },
    healthcare: {
      headline: "PUDU Robotics for Healthcare",
      summary:
        "Better Patient Care · Higher Operational Efficiency · Smarter Healthcare Services — PUDU Robotics helps hospitals and healthcare campuses automate internal logistics and improve patient experience.",
      impactPanels: {
        challenges: {
          heading: "Healthcare Challenges",
          items: [
            { icon: "workforce", label: "Growing pressure on healthcare staff" },
            { icon: "experience", label: "Need for better patient experiences" },
            {
              icon: "transport",
              label: "Transporting supplies and samples between departments",
            },
            { icon: "building", label: "Managing large healthcare facilities" },
            { icon: "sanitization", label: "Maintaining high hygiene standards" },
            { icon: "uptime", label: "Supporting continuous 24/7 operations" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "medicine", label: "Medical Supply Delivery" },
            { icon: "delivery", label: "Internal Logistics Support" },
            { icon: "guidance", label: "Patient & Visitor Guidance" },
            { icon: "samples", label: "Laboratory Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "uptime", label: "Around-the-Clock Operations" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Improved patient experience" },
            { icon: "efficiency", label: "Higher healthcare service efficiency" },
            { icon: "automation", label: "Reduced repetitive operational tasks" },
            { icon: "productivity", label: "Greater staff productivity" },
            { icon: "transport", label: "Better internal logistics performance" },
            { icon: "sanitization", label: "Improved hygiene and safety standards" },
            { icon: "speed", label: "Faster service response times" },
          ],
        },
      },
      scenarioSubtitle:
        "Patient Arrival · Supply Chain · Laboratory · Patient Care · Facility Hygiene · 24/7 Operations",
      useCases: [
        {
          aboutTitle: "Patient Arrival → Visitor Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotHealthcare" },
          whyChooseItems: [
            "Patient & Visitor Guidance — Help patients and visitors navigate clinics, departments, and healthcare facilities.",
          ],
        },
        {
          aboutTitle: "Registration & Reception → Navigation Assistance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotHealthcare" },
          whyChooseItems: [
            "Interactive visitor engagement and department information services that reduce front-desk workload.",
          ],
        },
        {
          aboutTitle: "Pharmacy & Supply Chain → Medical Supply Transport",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Healthcare" },
          whyChooseItems: [
            "Medical Supply Delivery — Transport medications, consumables, and medical supplies across departments.",
          ],
        },
        {
          aboutTitle: "Laboratory Operations → Secure Sample Transport",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotHealthcare" },
          whyChooseItems: [
            "Laboratory Support — Transport samples and documents through secure and controlled workflows.",
          ],
        },
        {
          aboutTitle: "Patient Care Areas → Internal Logistics Support",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Healthcare" },
          whyChooseItems: [
            "Internal Logistics Support — Improve the flow of materials between pharmacies, laboratories, nursing stations, and wards.",
          ],
        },
        {
          aboutTitle: "Facility Hygiene → Autonomous Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Healthcare" },
          whyChooseItems: [
            "Smart Cleaning — Maintain cleaner hallways, lobbies, and public areas throughout the day.",
          ],
        },
        {
          aboutTitle: "24/7 Hospital Operations → Continuous Logistics & Service Support",
          slideKeys: ["pudubot2", "flashbot", "cc1"],
          solutionKeys: ["pudubot2", "flashbot", "cc1"],
          featureKeys: {
            pudubot2: "pudubot2Healthcare",
            flashbot: "flashbotHealthcare",
            cc1: "cc1Healthcare",
          },
          whyChooseItems: [
            "Around-the-Clock Operations — Support healthcare operations continuously, 24 hours a day.",
          ],
        },
      ],
    },
  },
  ar: {
    hospitality: {
      headline: "روبوتات PUDU للضيافة",
      summary:
        "ضيافة أذكى · خدمة أسرع · ضيوف أسعد — تساعد روبوتات PUDU الفنادق والمنتجعات على تقديم تجربة ضيوف أكثر كفاءة واستمرارية.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع الضيافة",
          items: [
            { icon: "experience", label: "ارتفاع توقعات الضيوف" },
            { icon: "speed", label: "الحاجة إلى خدمة أسرع وأكثر استمرارية" },
            { icon: "workforce", label: "نقص الكوادر التشغيلية" },
            { icon: "events", label: "إدارة أوقات الذروة" },
            { icon: "building", label: "تشغيل المنشآت متعددة الطوابق" },
            { icon: "service", label: "الحفاظ على جودة الخدمة طوال الوقت" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "delivery", label: "خدمة الغرف الذكية" },
            { icon: "guidance", label: "استقبال وإرشاد الضيوف" },
            { icon: "transport", label: "دعم العمليات الفندقية" },
            { icon: "events", label: "دعم الفعاليات والمؤتمرات" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "uptime", label: "العمل على مدار الساعة" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة الضيوف" },
            { icon: "speed", label: "تسريع الاستجابة للطلبات" },
            { icon: "efficiency", label: "رفع كفاءة العمليات" },
            { icon: "automation", label: "تقليل الأعمال المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية الموظفين" },
            { icon: "digitization", label: "تعزيز صورة المنشأة كوجهة مبتكرة" },
            { icon: "service", label: "تحسين جودة الخدمة بشكل مستمر" },
          ],
        },
      },
      scenarioSubtitle:
        "وصول الضيوف · خدمة الغرف · الطعام · الفعاليات · التنظيف الذاتي",
      useCases: [
        {
          aboutTitle: "وصول الضيوف → الترحيب والإرشاد",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          whyChooseItems: [
            "استقبال وإرشاد الضيوف — مساعدة الزوار في الوصول إلى الغرف والمرافق وقاعات الاجتماعات.",
          ],
        },
        {
          aboutTitle: "إقامة الضيوف → خدمة الغرف والمستلزمات",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotHospitality" },
          whyChooseItems: [
            "خدمة الغرف الذكية — توصيل الطعام والمشروبات والمستلزمات إلى الغرف بشكل آمن وفعال.",
          ],
        },
        {
          aboutTitle: "تجربة الطعام → خدمة المأكولات والمشروبات",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          whyChooseItems: [
            "توصيل الطعام والمشروبات مع دعم تفاعلي للضيوف داخل المطاعم والصالات.",
          ],
        },
        {
          aboutTitle: "الفعاليات والاجتماعات → اللوجستيات ومساعدة الضيوف",
          slideKeys: ["bellabot", "kettybot"],
          solutionKeys: ["bellabot", "kettybot"],
          whyChooseItems: [
            "دعم الفعاليات والمؤتمرات — المساعدة في الخدمات اللوجستية للمعارض والاجتماعات والمناسبات.",
          ],
        },
        {
          aboutTitle: "عمليات المرافق → التنظيف الذاتي",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          whyChooseItems: [
            "التنظيف الذكي — الحفاظ على نظافة الممرات والردهات والمناطق المشتركة.",
          ],
        },
      ],
    },
    "industrial-logistics": {
      headline: "روبوتات PUDU للعمليات الصناعية واللوجستية",
      summary:
        "نقل مواد أذكى · عمليات أكثر أماناً · إنتاجية أعلى — تساعد روبوتات PUDU المصانع والمستودعات على أتمتة نقل المواد وتحسين تدفق البضائع.",
      impactPanels: {
        challenges: {
          heading: "تحديات القطاع الصناعي واللوجستي",
          items: [
            { icon: "cost", label: "ارتفاع تكاليف التشغيل" },
            { icon: "workforce", label: "نقص العمالة المؤهلة" },
            { icon: "safety", label: "الحاجة إلى تحسين السلامة" },
            { icon: "transport", label: "تكرار عمليات النقل الداخلية" },
            { icon: "warehouse", label: "ازدحام الممرات ومناطق التحميل" },
            { icon: "uptime", label: "الحاجة إلى تشغيل مستمر 24/7" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "production", label: "نقل المواد بين خطوط الإنتاج" },
            { icon: "warehouse", label: "دعم المستودعات ومراكز التوزيع" },
            { icon: "automation", label: "أتمتة النقل الداخلي" },
            { icon: "delivery", label: "دعم عمليات الشحن والاستلام" },
            { icon: "building", label: "تشغيل متعدد الطوابق" },
            { icon: "digitization", label: "مراقبة وإدارة الأسطول" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "productivity", label: "زيادة الإنتاجية" },
            { icon: "automation", label: "تقليل الأعمال اليدوية" },
            { icon: "safety", label: "رفع مستويات السلامة" },
            { icon: "transport", label: "تحسين تدفق المواد" },
            { icon: "speed", label: "تقليل أوقات الانتظار" },
            { icon: "efficiency", label: "رفع كفاءة العمليات اللوجستية" },
            { icon: "uptime", label: "تشغيل مستمر على مدار الساعة" },
          ],
        },
      },
      scenarioSubtitle:
        "الاستلام · التخزين · الإنتاج · مراقبة الجودة · التعبئة · الشحن · التشغيل 24/7",
      useCases: [
        {
          aboutTitle: "الاستلام → وصول المواد والفرز",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "دعم عمليات الشحن والاستلام — تحسين تدفق المواد بين مناطق الاستلام والتجهيز والإرسال.",
          ],
        },
        {
          aboutTitle: "التخزين → النقل داخل المستودع",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "دعم المستودعات ومراكز التوزيع — نقل البضائع بين مناطق التخزين والتجهيز والشحن.",
          ],
        },
        {
          aboutTitle: "الإنتاج → تغذية خط الإنتاج ونقل المواد",
          slideKeys: ["t300"],
          solutionKeys: ["t300"],
          whyChooseItems: [
            "نقل المواد بين خطوط الإنتاج — نقل المواد الخام والمنتجات نصف المصنعة بين محطات العمل بشكل مستقل.",
          ],
        },
        {
          aboutTitle: "مراقبة الجودة → نقل العينات والمكونات الآمن",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          whyChooseItems: [
            "نقل المواد الحساسة مع حجرات آمنة متعددة ومصادقة PIN و NFC.",
          ],
        },
        {
          aboutTitle: "التعبئة → النقل بين محطات التعبئة",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          whyChooseItems: [
            "أتمتة النقل الداخلي — تقليل الاعتماد على العربات اليدوية وعمليات النقل التقليدية.",
          ],
        },
        {
          aboutTitle: "الشحن → لوجستيات الصادر والإرسال",
          slideKeys: ["t300", "pudubot2"],
          solutionKeys: ["t300", "pudubot2"],
          whyChooseItems: [
            "تحسين تدفق المواد بين مناطق التجهيز والمعالجة والشحن.",
          ],
        },
        {
          aboutTitle: "التشغيل 24/7 → تدفق مواد ذاتي مستمر",
          slideKeys: ["t300", "pudubot2", "flashbot"],
          solutionKeys: ["t300", "pudubot2", "flashbot"],
          whyChooseItems: [
            "مراقبة وإدارة الأسطول — متابعة حركة الروبوتات والمهام التشغيلية بشكل لحظي.",
            "تشغيل متعدد الطوابق — التنقل بين الطوابق والمناطق المختلفة عبر تكامل المصاعد والبنية الذكية.",
          ],
        },
      ],
    },
    healthcare: {
      headline: "روبوتات PUDU للرعاية الصحية",
      summary:
        "رعاية أفضل للمرضى · كفاءة تشغيلية أعلى · خدمات صحية أذكى — تساعد روبوتات PUDU المستشفيات على أتمتة اللوجستيات الداخلية وتحسين تجربة المرضى.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع الرعاية الصحية",
          items: [
            { icon: "workforce", label: "ضغط متزايد على الكوادر الطبية" },
            { icon: "experience", label: "الحاجة إلى تحسين تجربة المرضى" },
            { icon: "transport", label: "نقل المستلزمات والعينات بين الأقسام" },
            { icon: "building", label: "إدارة المنشآت الطبية الكبيرة" },
            { icon: "sanitization", label: "الحفاظ على أعلى معايير النظافة" },
            { icon: "uptime", label: "تقديم خدمات متواصلة على مدار الساعة" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "medicine", label: "نقل المستلزمات الطبية" },
            { icon: "delivery", label: "دعم الخدمات اللوجستية الداخلية" },
            { icon: "guidance", label: "إرشاد المرضى والزوار" },
            { icon: "samples", label: "دعم المختبرات" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "uptime", label: "تشغيل على مدار الساعة" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة المرضى" },
            { icon: "efficiency", label: "رفع كفاءة الخدمات الصحية" },
            { icon: "automation", label: "تقليل الأعمال التشغيلية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية الموظفين" },
            { icon: "transport", label: "تحسين الخدمات اللوجستية الداخلية" },
            { icon: "sanitization", label: "رفع معايير النظافة والسلامة" },
            { icon: "speed", label: "تحسين استجابة الخدمات الطبية" },
          ],
        },
      },
      scenarioSubtitle:
        "وصول المريض · سلسلة الإمداد · المختبر · رعاية المرضى · نظافة المرافق · التشغيل 24/7",
      useCases: [
        {
          aboutTitle: "وصول المريض → إرشاد الزوار",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotHealthcare" },
          whyChooseItems: [
            "إرشاد المرضى والزوار — مساعدة المرضى والزوار في الوصول إلى العيادات والأقسام والمرافق المختلفة.",
          ],
        },
        {
          aboutTitle: "التسجيل والاستقبال → المساعدة في التنقل",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotHealthcare" },
          whyChooseItems: [
            "التفاعل مع المراجعين ومعلومات الأقسام والعيادات لتقليل الضغط على مكاتب الاستقبال.",
          ],
        },
        {
          aboutTitle: "الصيدلية وسلسلة الإمداد → نقل المستلزمات الطبية",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Healthcare" },
          whyChooseItems: [
            "نقل المستلزمات الطبية — نقل الأدوية والمستهلكات والمستلزمات الطبية بين الأقسام المختلفة.",
          ],
        },
        {
          aboutTitle: "عمليات المختبر → نقل العينات الآمن",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotHealthcare" },
          whyChooseItems: [
            "دعم المختبرات — نقل العينات والوثائق بين المختبرات والأقسام وفق مسارات محددة وآمنة.",
          ],
        },
        {
          aboutTitle: "مناطق رعاية المرضى → دعم اللوجستيات الداخلية",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Healthcare" },
          whyChooseItems: [
            "دعم الخدمات اللوجستية الداخلية — تحسين تدفق المواد والإمدادات بين الصيدليات والمختبرات والأجنحة الطبية.",
          ],
        },
        {
          aboutTitle: "نظافة المرافق → التنظيف الذاتي",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Healthcare" },
          whyChooseItems: [
            "التنظيف الذكي — الحفاظ على نظافة الممرات والردهات والمناطق العامة بشكل مستمر.",
          ],
        },
        {
          aboutTitle: "عمليات المستشفى 24/7 → دعم لوجستي وخدمي مستمر",
          slideKeys: ["pudubot2", "flashbot", "cc1"],
          solutionKeys: ["pudubot2", "flashbot", "cc1"],
          featureKeys: {
            pudubot2: "pudubot2Healthcare",
            flashbot: "flashbotHealthcare",
            cc1: "cc1Healthcare",
          },
          whyChooseItems: [
            "تشغيل على مدار الساعة — دعم العمليات اليومية دون انقطاع على مدار 24 ساعة.",
          ],
        },
      ],
    },
  },
}

const SLUGS = ["hospitality", "industrial-logistics", "healthcare"]

function patchLocale(filePath, locale) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
  const industries = data.innovation?.industries
  if (!industries) {
    throw new Error(`No innovation.industries in ${filePath}`)
  }

  for (const slug of SLUGS) {
    const industry = industries[slug]
    const patch = CONTENT[locale][slug]
    if (!industry || !patch) continue

    const challengesHeading = patch.impactPanels.challenges.heading

    industry.headline = patch.headline
    industry.summary = patch.summary
    industry.impactPanels = patch.impactPanels

    if (Array.isArray(industry.scenarios) && industry.scenarios[0]) {
      industry.scenarios[0].subtitle = patch.scenarioSubtitle
    }

    industry.useCases = patch.useCases.map((cfg) =>
      buildUseCase(locale, {
        ...cfg,
        challenges: {
          heading: challengesHeading,
          items: patch.impactPanels.challenges.items,
        },
      })
    )

    industries[slug] = industry
  }

  data.innovation.industries = industries
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`Patched ${SLUGS.join(", ")} in ${filePath}`)
}

patchLocale(enPath, "en")
patchLocale(arPath, "ar")
console.log("Done.")
