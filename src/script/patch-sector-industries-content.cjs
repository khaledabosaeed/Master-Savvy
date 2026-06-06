/**
 * Patch transportation, entertainment-sports, real-estate, education, public-service.
 * Usage: node src/script/patch-sector-industries-content.cjs
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
  pudubot2: "https://www.pudurobotics.com/en/products/pudubot2",
}

const ROBOT_NAMES = {
  en: {
    bellabot: "BellaBot",
    kettybot: "KettyBot",
    flashbot: "FlashBot Max",
    cc1: "CC1 Pro",
    pudubot2: "PuduBot 2",
  },
  ar: {
    bellabot: "BellaBot",
    kettybot: "KettyBot",
    flashbot: "FlashBot Max",
    cc1: "CC1 Pro",
    pudubot2: "PuduBot 2",
  },
}

const SOLUTION_FEATURES = {
  en: {
    kettybotTransportation: [
      "Passenger guidance",
      "Gate and facility information",
      "Interactive information services",
      "Reduced front-desk workload",
    ],
    pudubot2Transportation: [
      "Material transportation",
      "Internal logistics workflows",
      "Operational facility support",
      "Multi-zone transportation",
    ],
    flashbotTransportation: [
      "Secure transport of sensitive items",
      "Multi-compartment delivery",
      "PIN and NFC authentication",
      "Elevator integration",
      "Multi-floor operations",
    ],
    cc1Transportation: [
      "Terminal and hallway cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced hygiene standards",
    ],
    kettybotEntertainment: [
      "Visitor guidance",
      "Event information",
      "Interactive displays",
      "Fan engagement",
      "Reduced information desk workload",
    ],
    bellabotEntertainment: [
      "Hospitality services",
      "Food and beverage delivery",
      "Guest experience enhancement",
      "Crowded venue support",
    ],
    pudubot2Entertainment: [
      "Internal logistics support",
      "Equipment transportation",
      "Operational team support",
      "Multi-zone venue operations",
    ],
    cc1Entertainment: [
      "Hallway and concourse cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced venue hygiene",
    ],
    kettybotRealEstate: [
      "Visitor guidance",
      "Building information services",
      "Tenant engagement",
      "Reduced reception workload",
    ],
    flashbotRealEstate: [
      "Parcel and document delivery",
      "Secure multi-compartment transport",
      "PIN and NFC authentication",
      "Elevator integration",
      "Multi-floor operations",
    ],
    pudubot2RealEstate: [
      "Internal logistics support",
      "Material transportation",
      "Facilities operations support",
      "Cross-building movement",
    ],
    cc1RealEstate: [
      "Lobby and hallway cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced hygiene standards",
    ],
    kettybotEducation: [
      "Student and visitor guidance",
      "Building and classroom information",
      "Student engagement",
      "Reception and information desk support",
    ],
    bellabotEducation: [
      "Educational facility service support",
      "Educational material delivery",
      "Event and activity support",
      "Enhanced student and visitor experience",
    ],
    pudubot2Education: [
      "Internal logistics support",
      "Document and supply transport",
      "Operational support",
      "Multi-building movement",
    ],
    cc1Education: [
      "Classroom and hallway cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced hygiene standards",
    ],
    kettybotPublicService: [
      "Visitor and beneficiary guidance",
      "Government service information",
      "Interactive displays",
      "Reduced information desk workload",
    ],
    bellabotPublicService: [
      "Internal service support",
      "Government event assistance",
      "Enhanced visitor experience",
      "Supporting services",
    ],
    pudubot2PublicService: [
      "Internal logistics support",
      "Document and supply transport",
      "Operational support",
      "Cross-department movement",
    ],
    flashbotPublicService: [
      "Secure document transport",
      "Multi-compartment delivery",
      "PIN and NFC authentication",
      "Elevator integration",
      "Multi-floor operations",
    ],
    cc1PublicService: [
      "Hallway and lobby cleaning",
      "Autonomous cleaning operations",
      "Facilities support",
      "Enhanced hygiene standards",
    ],
  },
  ar: {
    kettybotTransportation: [
      "إرشاد المسافرين",
      "معلومات البوابات والخدمات",
      "شاشة تفاعلية للمعلومات",
      "تقليل الضغط على مكاتب الاستعلامات",
    ],
    pudubot2Transportation: [
      "نقل المستلزمات والمواد",
      "الخدمات اللوجستية الداخلية",
      "دعم المرافق التشغيلية",
      "التنقل بين مناطق العمل المختلفة",
    ],
    flashbotTransportation: [
      "نقل المواد الحساسة",
      "حجرات آمنة متعددة",
      "مصادقة PIN و NFC",
      "التكامل مع المصاعد",
      "التشغيل متعدد الطوابق",
    ],
    cc1Transportation: [
      "تنظيف الصالات والممرات",
      "التنظيف الذاتي الذكي",
      "دعم فرق المرافق",
      "رفع معايير النظافة",
    ],
    kettybotEntertainment: [
      "إرشاد الزوار",
      "معلومات الفعاليات",
      "الشاشات التفاعلية",
      "التفاعل مع الجمهور",
      "تقليل الضغط على مراكز المعلومات",
    ],
    bellabotEntertainment: [
      "تقديم الضيافة",
      "توصيل المأكولات والمشروبات",
      "دعم المناطق الجماهيرية",
      "تحسين تجربة الزوار",
    ],
    pudubot2Entertainment: [
      "الخدمات اللوجستية الداخلية",
      "نقل المعدات والمواد",
      "دعم فرق التشغيل",
      "التنقل بين مناطق الفعاليات",
    ],
    cc1Entertainment: [
      "تنظيف الممرات والصالات",
      "التنظيف الذاتي الذكي",
      "دعم فرق المرافق",
      "الحفاظ على نظافة المواقع",
    ],
    kettybotRealEstate: [
      "إرشاد الزوار",
      "معلومات المبنى والخدمات",
      "التفاعل مع المستأجرين",
      "تقليل الضغط على الاستقبال",
    ],
    flashbotRealEstate: [
      "نقل الطرود والمستندات",
      "حجرات آمنة متعددة",
      "مصادقة PIN و NFC",
      "التكامل مع المصاعد",
      "التشغيل متعدد الطوابق",
    ],
    pudubot2RealEstate: [
      "الخدمات اللوجستية الداخلية",
      "نقل المواد والمستلزمات",
      "دعم فرق التشغيل",
      "التنقل بين المرافق المختلفة",
    ],
    cc1RealEstate: [
      "تنظيف الممرات والردهات",
      "التنظيف الذاتي الذكي",
      "دعم فرق المرافق",
      "رفع معايير النظافة",
    ],
    kettybotEducation: [
      "إرشاد الطلاب والزوار",
      "معلومات المباني والقاعات",
      "التفاعل مع الطلاب",
      "دعم مراكز الاستقبال والمعلومات",
    ],
    bellabotEducation: [
      "الخدمات داخل المنشآت التعليمية",
      "توصيل المواد التعليمية",
      "دعم الفعاليات والأنشطة",
      "تعزيز تجربة الطلاب والزوار",
    ],
    pudubot2Education: [
      "الخدمات اللوجستية الداخلية",
      "نقل المستندات والمستلزمات",
      "دعم العمليات التشغيلية",
      "التنقل بين المباني المختلفة",
    ],
    cc1Education: [
      "تنظيف القاعات والممرات",
      "التنظيف الذاتي الذكي",
      "دعم فرق المرافق",
      "رفع معايير النظافة",
    ],
    kettybotPublicService: [
      "إرشاد المراجعين والزوار",
      "معلومات الخدمات الحكومية",
      "الشاشات التفاعلية",
      "تقليل الضغط على مراكز المعلومات والاستقبال",
    ],
    bellabotPublicService: [
      "دعم الخدمات الداخلية",
      "المساعدة في الفعاليات والمؤتمرات الحكومية",
      "تعزيز تجربة الزوار",
      "الخدمات المساندة",
    ],
    pudubot2PublicService: [
      "الخدمات اللوجستية الداخلية",
      "نقل المستندات والمستلزمات",
      "دعم العمليات التشغيلية",
      "التنقل بين الإدارات المختلفة",
    ],
    flashbotPublicService: [
      "نقل المستندات الحساسة",
      "حجرات آمنة متعددة",
      "مصادقة PIN و NFC",
      "التكامل مع المصاعد",
      "التشغيل متعدد الطوابق",
    ],
    cc1PublicService: [
      "تنظيف الممرات والردهات",
      "التنظيف الذاتي الذكي",
      "دعم فرق المرافق",
      "رفع معايير النظافة",
    ],
  },
}

function solution(key, locale, featureKey, displayName) {
  const names = ROBOT_NAMES[locale]
  const features =
    SOLUTION_FEATURES[locale][featureKey] ?? SOLUTION_FEATURES[locale][key]
  const name = displayName ?? names[key]
  return {
    name,
    imageAlt: name,
    imageUrl: "",
    features,
    learnMoreLabel: locale === "ar" ? "اعرف المزيد" : "Learn More",
    href: ROBOT_HREFS[key],
  }
}

function buildUseCase(locale, config) {
  const names = ROBOT_NAMES[locale]
  const displayNames = config.robotNames ?? {}
  const slides = config.slideKeys.map((key) => {
    const robotName = displayNames[key] ?? names[key]
    return {
      robotName,
      imageAlt: `${robotName} — ${config.aboutTitle}`,
      imageUrl: "",
    }
  })

  return {
    aboutTitle: config.aboutTitle,
    slideKeys: config.slideKeys,
    solutionKeys: config.solutionKeys,
    slides,
    challenges: config.challenges,
    whyChoose: {
      heading: locale === "ar" ? "كيف تساعد روبوتات PUDU" : "How PUDU Helps",
      items: config.whyChooseItems ?? [],
    },
    solutionsTitle: locale === "ar" ? "الحلول الموصى بها" : "Recommended Solutions",
    solutions: config.solutionKeys.map((key) =>
      solution(
        key,
        locale,
        config.featureKeys?.[key] ?? key,
        config.robotNames?.[key]
      )
    ),
  }
}

const CONTENT = {
  en: {
    transportation: {
      title: "PUDU Robotics for Transportation & Mobility",
      shortTitle: "Transportation",
      headline:
        "Better Passenger Experience · Higher Operational Efficiency · Smarter Mobility Services",
      summary:
        "PUDU Robotics helps airports, railway stations, metro networks, transportation hubs, ports, and modern mobility facilities improve passenger experience, support daily operations, and deliver smarter services with greater efficiency and consistency.\n\nFrom passenger guidance and internal logistics to autonomous cleaning and facility support, PUDU provides practical solutions designed for the future of smart transportation.",
      impactPanels: {
        challenges: {
          heading: "Transportation Challenges",
          items: [
            { icon: "events", label: "Growing passenger volumes" },
            { icon: "experience", label: "Need for better travel experiences" },
            { icon: "building", label: "Managing large and complex facilities" },
            { icon: "cleaning", label: "Maintaining cleanliness in public areas" },
            { icon: "uptime", label: "Supporting continuous 24/7 operations" },
            { icon: "speed", label: "Managing passenger flow during peak periods" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "guidance", label: "Passenger & Visitor Guidance" },
            { icon: "service", label: "Information Services" },
            { icon: "transport", label: "Internal Logistics Support" },
            { icon: "experience", label: "VIP Lounge Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "uptime", label: "Around-the-Clock Operations" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Enhanced passenger experience" },
            { icon: "efficiency", label: "Higher operational efficiency" },
            { icon: "automation", label: "Reduced repetitive tasks" },
            { icon: "productivity", label: "Greater workforce productivity" },
            { icon: "transport", label: "Improved internal logistics" },
            { icon: "safety", label: "Higher hygiene and safety standards" },
            { icon: "speed", label: "Faster service response times" },
          ],
        },
      },
      scenarioTitle: "Ideal Applications",
      scenarioSubtitle:
        "Airports · Railway Stations · Metro Networks · Transportation Hubs · Ports · VIP Lounges · Bus Stations · Logistics Centers · Border Facilities · Smart City Mobility Projects",
      useCases: [
        {
          aboutTitle: "Passenger Arrival → Welcome & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotTransportation" },
        },
        {
          aboutTitle: "Terminal Operations → Internal Logistics Support",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Transportation" },
        },
        {
          aboutTitle: "VIP Areas → Secure Transport & Service Support",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotTransportation" },
        },
        {
          aboutTitle: "Public Areas → Autonomous Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Transportation" },
        },
      ],
    },
    "entertainment-sports": {
      title: "PUDU Robotics for Entertainment & Sports",
      shortTitle: "Entertainment & Sports",
      headline:
        "Exceptional Visitor Experiences · Smarter Events · More Efficient Venue Operations",
      summary:
        "PUDU Robotics helps stadiums, arenas, entertainment destinations, event venues, exhibitions, and tourism attractions improve visitor experiences, support daily operations, and enhance service delivery during events and large gatherings.\n\nFrom visitor guidance and information services to logistics support and autonomous cleaning, PUDU provides innovative solutions designed for the future of entertainment and sports.",
      impactPanels: {
        challenges: {
          heading: "Industry Challenges",
          items: [
            { icon: "events", label: "Large visitor volumes during events" },
            { icon: "experience", label: "Need for better fan experiences" },
            { icon: "guidance", label: "Managing crowd movement" },
            { icon: "service", label: "Supporting event operations efficiently" },
            { icon: "cleaning", label: "Maintaining cleanliness in public spaces" },
            { icon: "speed", label: "Delivering services during peak periods" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "guidance", label: "Visitor & Fan Guidance" },
            { icon: "events", label: "Event & Exhibition Support" },
            { icon: "transport", label: "Internal Logistics Support" },
            { icon: "experience", label: "VIP Hospitality Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "digitization", label: "Interactive Engagement" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Enhanced visitor experience" },
            { icon: "efficiency", label: "More efficient event operations" },
            { icon: "automation", label: "Reduced repetitive operational tasks" },
            { icon: "productivity", label: "Higher workforce productivity" },
            { icon: "guidance", label: "Improved crowd flow management" },
            { icon: "safety", label: "Higher hygiene and safety standards" },
            { icon: "digitization", label: "Stronger destination brand image" },
          ],
        },
      },
      scenarioTitle: "Ideal Applications",
      scenarioSubtitle:
        "Sports Stadiums · Arenas · Event Centers · Convention Centers · Exhibitions · Entertainment Complexes · Theme Parks · Museums · Tourism Attractions · Smart Entertainment Destinations",
      useCases: [
        {
          aboutTitle: "Arrival → Visitor Welcome & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotEntertainment" },
        },
        {
          aboutTitle: "Food & Beverage Areas → Service Support",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotEntertainment" },
        },
        {
          aboutTitle: "Event Operations → Internal Logistics Support",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Entertainment" },
        },
        {
          aboutTitle: "Venue Hygiene → Autonomous Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Entertainment" },
        },
      ],
    },
    "real-estate": {
      title: "PUDU Robotics for Real Estate & Property Management",
      shortTitle: "Real Estate",
      headline:
        "Better Tenant Experiences · Smarter Buildings · More Efficient Operations",
      summary:
        "PUDU Robotics helps commercial towers, residential communities, mixed-use developments, business districts, and smart real estate projects improve tenant experiences, enhance operational efficiency, and deliver smarter property services.\n\nFrom visitor guidance and tenant services to internal logistics and autonomous cleaning, PUDU provides practical solutions designed for the future of smart buildings.",
      impactPanels: {
        challenges: {
          heading: "Real Estate Challenges",
          items: [
            { icon: "experience", label: "Rising tenant expectations" },
            { icon: "building", label: "Managing multi-floor buildings" },
            { icon: "service", label: "Improving service quality" },
            { icon: "cost", label: "Increasing operational and maintenance costs" },
            { icon: "maintenance", label: "Managing shared facilities and common areas" },
            { icon: "cleaning", label: "Maintaining building cleanliness" },
            { icon: "uptime", label: "Supporting 24/7 operations" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "service", label: "Tenant & Visitor Services" },
            { icon: "guidance", label: "Building Navigation" },
            { icon: "transport", label: "Internal Logistics Support" },
            { icon: "experience", label: "Reception Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "building", label: "Multi-Floor Operations" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Enhanced tenant experience" },
            { icon: "efficiency", label: "Higher operational efficiency" },
            { icon: "automation", label: "Reduced repetitive tasks" },
            { icon: "productivity", label: "Greater facilities team productivity" },
            { icon: "transport", label: "Improved internal logistics" },
            { icon: "safety", label: "Higher hygiene and safety standards" },
            { icon: "digitization", label: "Stronger property brand image" },
            { icon: "service", label: "Increased tenant satisfaction" },
          ],
        },
      },
      scenarioTitle: "Ideal Applications",
      scenarioSubtitle:
        "Commercial Towers · Residential Communities · Mixed-Use Developments · Office Complexes · Shopping Centers · Business Parks · Financial Districts · Smart Real Estate Projects · Property Management Facilities · Smart City Developments",
      useCases: [
        {
          aboutTitle: "Visitor Arrival → Welcome & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotRealEstate" },
        },
        {
          aboutTitle: "Tenant Services → Parcel & Document Delivery",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotRealEstate" },
        },
        {
          aboutTitle: "Office & Facility Operations → Internal Logistics",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2RealEstate" },
        },
        {
          aboutTitle: "Common Areas → Autonomous Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1RealEstate" },
        },
      ],
    },
    education: {
      title: "PUDU Robotics for Education",
      shortTitle: "Education",
      headline:
        "Better Educational Experience · Smarter Educational Facilities · A More Innovative Future",
      summary:
        "PUDU Robotics helps schools, universities, colleges, training institutes, and educational centers improve student and visitor experiences, raise daily operational efficiency, and enhance modern learning environments through smart and safe robotic solutions.\n\nFrom guiding students and visitors to logistics within educational facilities and smart cleaning, PUDU provides practical solutions that support the future of education.",
      impactPanels: {
        challenges: {
          heading: "Education Sector Challenges",
          items: [
            { icon: "events", label: "Managing large numbers of students and visitors" },
            { icon: "experience", label: "Improving education and service experience" },
            { icon: "building", label: "Operating large, multi-building educational facilities" },
            { icon: "efficiency", label: "Raising daily service efficiency" },
            { icon: "sanitization", label: "Maintaining facility cleanliness and safety" },
            { icon: "digitization", label: "Supporting digital transformation and innovation" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "guidance", label: "Student & Visitor Guidance" },
            { icon: "service", label: "Information Center Support" },
            { icon: "transport", label: "Logistics within Educational Facilities" },
            { icon: "events", label: "Educational Event Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "education", label: "Innovation & Learning Engagement" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Improved student and visitor experience" },
            { icon: "efficiency", label: "Higher daily operational efficiency" },
            { icon: "automation", label: "Reduced repetitive operational tasks" },
            { icon: "productivity", label: "Greater team productivity" },
            { icon: "transport", label: "Improved internal logistics" },
            { icon: "safety", label: "Higher hygiene and safety standards" },
            { icon: "digitization", label: "Stronger institutional brand image" },
            { icon: "education", label: "Support for innovation culture" },
          ],
        },
      },
      scenarioTitle: "Ideal Applications",
      scenarioSubtitle:
        "Schools · Universities · Colleges · Training Institutes · Libraries · Research Centers · Innovation Hubs · Educational Laboratories · Smart Educational Facilities",
      useCases: [
        {
          aboutTitle: "Student or Visitor Arrival → Smart Welcome & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotEducation" },
        },
        {
          aboutTitle: "Educational Events → Activity & Visitor Support",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotEducation" },
        },
        {
          aboutTitle: "Educational Facilities → Internal Logistics",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Education" },
        },
        {
          aboutTitle: "Public Areas → Continuous Smart Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Education" },
        },
      ],
    },
    "public-service": {
      title: "PUDU Robotics for the Public Sector",
      shortTitle: "Public Sector",
      headline:
        "More Efficient Government Services · Better Beneficiary Experience · Smarter Government Facilities",
      summary:
        "PUDU Robotics helps government entities, public institutions, service centers, and beneficiary service hubs improve beneficiary experiences, raise daily operational efficiency, and deliver faster, more sustainable services aligned with digital transformation goals.\n\nFrom guiding visitors and beneficiaries to internal logistics and smart cleaning, PUDU provides practical solutions that support the future of smart government services.",
      impactPanels: {
        challenges: {
          heading: "Public Sector Challenges",
          items: [
            { icon: "events", label: "Growing numbers of visitors and beneficiaries" },
            { icon: "experience", label: "Need to improve beneficiary experience" },
            { icon: "speed", label: "Reducing waiting times" },
            { icon: "building", label: "Managing large government facilities" },
            { icon: "efficiency", label: "Raising operational efficiency" },
            { icon: "sanitization", label: "Maintaining facility cleanliness and safety" },
            { icon: "digitization", label: "Supporting digital transformation goals" },
          ],
        },
        puduHelp: {
          heading: "How PUDU Helps",
          items: [
            { icon: "guidance", label: "Visitor & Beneficiary Guidance" },
            { icon: "service", label: "Information Center Support" },
            { icon: "transport", label: "Internal Logistics Support" },
            { icon: "experience", label: "Reception Desk Support" },
            { icon: "cleaning", label: "Smart Cleaning" },
            { icon: "uptime", label: "Around-the-Clock Operations" },
          ],
        },
        results: {
          heading: "Expected Outcomes",
          items: [
            { icon: "experience", label: "Improved beneficiary experience" },
            { icon: "speed", label: "Reduced waiting times" },
            { icon: "efficiency", label: "Higher government service efficiency" },
            { icon: "automation", label: "Reduced repetitive operational tasks" },
            { icon: "productivity", label: "Increased employee productivity" },
            { icon: "transport", label: "Improved internal logistics" },
            { icon: "safety", label: "Higher hygiene and safety standards" },
            { icon: "digitization", label: "Support for digital transformation programs" },
          ],
        },
      },
      scenarioTitle: "Ideal Applications",
      scenarioSubtitle:
        "Ministries · Government Authorities · Municipalities · Service Centers · Beneficiary Service Hubs · Courts · Airports & Government Ports · Administrative Centers · Government Complexes · Smart City Projects",
      useCases: [
        {
          aboutTitle: "Beneficiary Arrival → Smart Reception & Guidance",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotPublicService" },
        },
        {
          aboutTitle: "Government Events → Hospitality & Supporting Services",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotPublicService" },
        },
        {
          aboutTitle: "Internal Operations → Document & Supply Logistics",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2PublicService" },
        },
        {
          aboutTitle: "Secure Operations → Sensitive Document Transport",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotPublicService" },
        },
        {
          aboutTitle: "Public Areas → Continuous Smart Cleaning",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1PublicService" },
        },
      ],
    },
  },
  ar: {
    transportation: {
      title: "روبوتات PUDU لقطاع النقل والخدمات المرتبطة",
      shortTitle: "النقل",
      headline: "تجربة مسافرين أفضل · تشغيل أكثر كفاءة · خدمات تنقل أكثر ذكاءً",
      summary:
        "تساعد روبوتات PUDU المطارات ومحطات القطارات ومحطات المترو ومراكز النقل والموانئ ومرافق التنقل الحديثة على تحسين تجربة المسافرين، ودعم العمليات اليومية، وتقديم خدمات أكثر كفاءة واستمرارية.\n\nمن إرشاد المسافرين ونقل المواد إلى التنظيف الذكي والخدمات اللوجستية الداخلية، توفر روبوتات PUDU حلولاً عملية تدعم مستقبل النقل الذكي.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع النقل",
          items: [
            { icon: "events", label: "ارتفاع أعداد الزوار والمسافرين" },
            { icon: "experience", label: "الحاجة إلى تحسين تجربة التنقل" },
            { icon: "building", label: "إدارة المرافق الكبيرة والمعقدة" },
            { icon: "cleaning", label: "الحفاظ على نظافة المرافق العامة" },
            { icon: "uptime", label: "تقديم خدمات مستمرة على مدار الساعة" },
            { icon: "speed", label: "إدارة تدفق المسافرين خلال أوقات الذروة" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "guidance", label: "إرشاد المسافرين والزوار" },
            { icon: "service", label: "دعم مراكز المعلومات" },
            { icon: "transport", label: "الخدمات اللوجستية الداخلية" },
            { icon: "experience", label: "دعم خدمات كبار الشخصيات" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "uptime", label: "تشغيل على مدار الساعة" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة المسافرين" },
            { icon: "efficiency", label: "رفع كفاءة العمليات التشغيلية" },
            { icon: "automation", label: "تقليل الأعمال اليدوية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية فرق العمل" },
            { icon: "transport", label: "تحسين الخدمات اللوجستية الداخلية" },
            { icon: "safety", label: "رفع معايير النظافة والسلامة" },
            { icon: "speed", label: "تحسين سرعة الاستجابة للخدمات" },
          ],
        },
      },
      scenarioTitle: "أين يمكن استخدام روبوتات PUDU",
      scenarioSubtitle:
        "المطارات · محطات القطارات · محطات المترو · مراكز النقل · الموانئ · صالات كبار الشخصيات · محطات الحافلات · مراكز الخدمات اللوجستية · المعابر الحدودية · مشاريع المدن الذكية",
      useCases: [
        {
          aboutTitle: "وصول المسافر → الترحيب والإرشاد",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotTransportation" },
        },
        {
          aboutTitle: "عمليات المحطة → الخدمات اللوجستية الداخلية",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Transportation" },
        },
        {
          aboutTitle: "مناطق كبار الشخصيات → النقل الآمن ودعم الخدمات",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotTransportation" },
        },
        {
          aboutTitle: "المناطق العامة → التنظيف الذاتي",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Transportation" },
        },
      ],
    },
    "entertainment-sports": {
      title: "روبوتات PUDU لقطاع الترفيه والرياضة",
      shortTitle: "الترفيه والرياضة",
      headline: "تجربة زوار استثنائية · فعاليات أكثر كفاءة · وجهات ترفيهية أكثر ذكاءً",
      summary:
        "تساعد روبوتات PUDU الملاعب الرياضية والمجمعات الترفيهية ومراكز الفعاليات والمعارض والوجهات السياحية على تحسين تجربة الزوار، ودعم العمليات التشغيلية، وتعزيز الخدمات المقدمة خلال الفعاليات والمناسبات.\n\nمن إرشاد الزوار وتقديم المعلومات إلى الخدمات اللوجستية والتنظيف الذكي، توفر روبوتات PUDU حلولاً مبتكرة تدعم مستقبل الترفيه والرياضة.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع الترفيه والرياضة",
          items: [
            { icon: "events", label: "ارتفاع أعداد الزوار خلال الفعاليات" },
            { icon: "experience", label: "الحاجة إلى تحسين تجربة الجمهور" },
            { icon: "guidance", label: "إدارة الحشود والتنقل داخل المواقع" },
            { icon: "service", label: "دعم العمليات التشغيلية أثناء الفعاليات" },
            { icon: "cleaning", label: "الحفاظ على نظافة المرافق العامة" },
            { icon: "speed", label: "تقديم خدمات متواصلة خلال أوقات الذروة" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "guidance", label: "إرشاد الزوار والجماهير" },
            { icon: "events", label: "دعم الفعاليات والمعارض" },
            { icon: "transport", label: "الخدمات اللوجستية الداخلية" },
            { icon: "experience", label: "دعم الضيافة وكبار الشخصيات" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "digitization", label: "التفاعل مع الزوار" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة الزوار" },
            { icon: "efficiency", label: "رفع كفاءة إدارة الفعاليات" },
            { icon: "automation", label: "تقليل الأعمال التشغيلية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية فرق العمل" },
            { icon: "guidance", label: "تحسين تدفق الحشود" },
            { icon: "safety", label: "رفع معايير النظافة والسلامة" },
            { icon: "digitization", label: "تعزيز صورة الوجهة الترفيهية" },
          ],
        },
      },
      scenarioTitle: "أين يمكن استخدام روبوتات PUDU",
      scenarioSubtitle:
        "الملاعب الرياضية · الساحات الرياضية · مراكز الفعاليات · مراكز المؤتمرات · المعارض · المجمعات الترفيهية · المدن الترفيهية · المتاحف · الوجهات السياحية · مشاريع الترفيه الذكية",
      useCases: [
        {
          aboutTitle: "وصول الزوار → الترحيب والإرشاد",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotEntertainment" },
        },
        {
          aboutTitle: "مناطق الطعام والشراب → دعم الخدمة",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotEntertainment" },
        },
        {
          aboutTitle: "عمليات الفعاليات → الخدمات اللوجستية الداخلية",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Entertainment" },
        },
        {
          aboutTitle: "نظافة الموقع → التنظيف الذاتي",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Entertainment" },
        },
      ],
    },
    "real-estate": {
      title: "روبوتات PUDU لقطاع العقارات وإدارة المرافق",
      shortTitle: "العقارات",
      headline: "تجربة مستأجرين أفضل · مبانٍ أكثر ذكاءً · تشغيل أكثر كفاءة",
      summary:
        "تساعد روبوتات PUDU الأبراج التجارية والمجمعات السكنية والمشاريع متعددة الاستخدامات والمراكز التجارية على تحسين تجربة المستأجرين والزوار، ورفع كفاءة العمليات التشغيلية، وتقديم خدمات عقارية أكثر ذكاءً واستدامة.\n\nمن خدمات المستأجرين والإرشاد إلى الخدمات اللوجستية الداخلية والتنظيف الذكي، توفر روبوتات PUDU حلولاً عملية تدعم مستقبل العقارات الذكية.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع العقارات",
          items: [
            { icon: "experience", label: "ارتفاع توقعات المستأجرين" },
            { icon: "building", label: "إدارة المباني متعددة الطوابق" },
            { icon: "service", label: "الحاجة إلى تحسين جودة الخدمات" },
            { icon: "cost", label: "زيادة تكاليف التشغيل والصيانة" },
            { icon: "maintenance", label: "إدارة المرافق والمساحات المشتركة" },
            { icon: "cleaning", label: "الحفاظ على نظافة المباني والمرافق" },
            { icon: "uptime", label: "تقديم خدمات مستمرة على مدار الساعة" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "service", label: "خدمات المستأجرين والزوار" },
            { icon: "guidance", label: "الإرشاد داخل المباني" },
            { icon: "transport", label: "الخدمات اللوجستية الداخلية" },
            { icon: "experience", label: "دعم خدمات الاستقبال" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "building", label: "تشغيل متعدد الطوابق" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة المستأجرين" },
            { icon: "efficiency", label: "رفع كفاءة العمليات التشغيلية" },
            { icon: "automation", label: "تقليل الأعمال اليدوية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية فرق المرافق" },
            { icon: "transport", label: "تحسين الخدمات اللوجستية الداخلية" },
            { icon: "safety", label: "رفع معايير النظافة والسلامة" },
            { icon: "digitization", label: "تعزيز صورة المشروع العقاري" },
            { icon: "service", label: "زيادة رضا المستأجرين والزوار" },
          ],
        },
      },
      scenarioTitle: "أين يمكن استخدام روبوتات PUDU",
      scenarioSubtitle:
        "الأبراج التجارية · المجمعات السكنية · المشاريع متعددة الاستخدامات · المجمعات المكتبية · المراكز التجارية · مراكز الأعمال · المناطق المالية · المشاريع العقارية الذكية · مرافق إدارة الممتلكات · مشاريع المدن الذكية",
      useCases: [
        {
          aboutTitle: "وصول الزوار → الترحيب والإرشاد",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotRealEstate" },
        },
        {
          aboutTitle: "خدمات المستأجرين → توصيل الطرود والمستندات",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotRealEstate" },
        },
        {
          aboutTitle: "عمليات المكاتب والمرافق → الخدمات اللوجستية الداخلية",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2RealEstate" },
        },
        {
          aboutTitle: "المناطق المشتركة → التنظيف الذاتي",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1RealEstate" },
        },
      ],
    },
    education: {
      title: "روبوتات PUDU لقطاع التعليم",
      shortTitle: "التعليم",
      headline: "تجربة تعليمية أفضل · منشآت تعليمية أكثر ذكاءً · مستقبل تعليمي أكثر ابتكاراً",
      summary:
        "تساعد روبوتات PUDU المدارس والجامعات والكليات والمعاهد التعليمية ومراكز التدريب على تحسين تجربة الطلاب والزوار، ورفع كفاءة العمليات اليومية، وتعزيز بيئات التعلم الحديثة من خلال حلول روبوتية ذكية وآمنة.\n\nمن إرشاد الطلاب والزوار إلى الخدمات اللوجستية داخل المنشآت التعليمية والتنظيف الذكي، توفر روبوتات PUDU حلولاً عملية تدعم مستقبل التعليم.",
      impactPanels: {
        challenges: {
          heading: "تحديات قطاع التعليم",
          items: [
            { icon: "events", label: "إدارة أعداد كبيرة من الطلاب والزوار" },
            { icon: "experience", label: "تحسين تجربة التعليم والخدمات" },
            { icon: "building", label: "تشغيل منشآت تعليمية واسعة ومتعددة المباني" },
            { icon: "efficiency", label: "رفع كفاءة الخدمات اليومية" },
            { icon: "sanitization", label: "الحفاظ على نظافة وسلامة المرافق التعليمية" },
            { icon: "digitization", label: "دعم التحول الرقمي والابتكار" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "guidance", label: "إرشاد الطلاب والزوار" },
            { icon: "service", label: "دعم مراكز المعلومات" },
            { icon: "transport", label: "الخدمات اللوجستية داخل المنشآت التعليمية" },
            { icon: "events", label: "دعم الفعاليات التعليمية" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "education", label: "تعزيز الابتكار والتعلم" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة الطلاب والزوار" },
            { icon: "efficiency", label: "رفع كفاءة العمليات اليومية" },
            { icon: "automation", label: "تقليل الأعمال التشغيلية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية فرق العمل" },
            { icon: "transport", label: "تحسين الخدمات اللوجستية الداخلية" },
            { icon: "safety", label: "رفع معايير النظافة والسلامة" },
            { icon: "digitization", label: "تعزيز صورة المؤسسة التعليمية" },
            { icon: "education", label: "دعم ثقافة الابتكار والتقنيات الحديثة" },
          ],
        },
      },
      scenarioTitle: "أين يمكن استخدام روبوتات PUDU",
      scenarioSubtitle:
        "المدارس · الجامعات · الكليات · المعاهد التعليمية · مراكز التدريب · المكتبات · مراكز الأبحاث · مراكز الابتكار · المختبرات التعليمية · المنشآت التعليمية الذكية",
      useCases: [
        {
          aboutTitle: "وصول الطالب أو الزائر → الإرشاد والاستقبال الذكي",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotEducation" },
        },
        {
          aboutTitle: "المؤتمرات والمعارض التعليمية → دعم الفعاليات والزوار",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotEducation" },
        },
        {
          aboutTitle: "المكتبات والخدمات التعليمية → نقل المواد والمستندات",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2Education" },
        },
        {
          aboutTitle: "المرافق العامة → التنظيف الذكي المستمر",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1Education" },
        },
      ],
    },
    "public-service": {
      title: "روبوتات PUDU للقطاع الحكومي",
      shortTitle: "القطاع الحكومي",
      headline: "خدمات حكومية أكثر كفاءة · تجربة مستفيد أفضل · مرافق حكومية أكثر ذكاءً",
      summary:
        "تساعد روبوتات PUDU الجهات الحكومية والهيئات والمؤسسات العامة والمراكز الخدمية على تحسين تجربة المستفيدين، ورفع كفاءة العمليات اليومية، وتقديم خدمات أكثر سرعة واستدامة.\n\nمن إرشاد المراجعين والزوار إلى الخدمات اللوجستية الداخلية والتنظيف الذكي، توفر روبوتات PUDU حلولاً عملية تدعم مستقبل الخدمات الحكومية الذكية.",
      impactPanels: {
        challenges: {
          heading: "تحديات القطاع الحكومي",
          items: [
            { icon: "events", label: "ارتفاع أعداد المراجعين والزوار" },
            { icon: "experience", label: "الحاجة إلى تحسين تجربة المستفيد" },
            { icon: "speed", label: "تقليل أوقات الانتظار" },
            { icon: "building", label: "إدارة المرافق الحكومية الكبيرة" },
            { icon: "efficiency", label: "رفع كفاءة العمليات التشغيلية" },
            { icon: "sanitization", label: "الحفاظ على نظافة وسلامة المرافق" },
            { icon: "digitization", label: "دعم مستهدفات التحول الرقمي" },
          ],
        },
        puduHelp: {
          heading: "كيف تساعد روبوتات PUDU",
          items: [
            { icon: "guidance", label: "إرشاد المراجعين والزوار" },
            { icon: "service", label: "دعم مراكز المعلومات" },
            { icon: "transport", label: "الخدمات اللوجستية الداخلية" },
            { icon: "experience", label: "دعم مكاتب الاستقبال" },
            { icon: "cleaning", label: "التنظيف الذكي" },
            { icon: "uptime", label: "تشغيل على مدار الساعة" },
          ],
        },
        results: {
          heading: "النتائج المتوقعة",
          items: [
            { icon: "experience", label: "تحسين تجربة المستفيد" },
            { icon: "speed", label: "تقليل أوقات الانتظار" },
            { icon: "efficiency", label: "رفع كفاءة الخدمات الحكومية" },
            { icon: "automation", label: "تقليل الأعمال التشغيلية المتكررة" },
            { icon: "productivity", label: "زيادة إنتاجية الموظفين" },
            { icon: "transport", label: "تحسين الخدمات اللوجستية الداخلية" },
            { icon: "safety", label: "رفع معايير النظافة والسلامة" },
            { icon: "digitization", label: "دعم برامج التحول الرقمي" },
          ],
        },
      },
      scenarioTitle: "أين يمكن استخدام روبوتات PUDU",
      scenarioSubtitle:
        "الوزارات · الهيئات الحكومية · الأمانات والبلديات · المراكز الخدمية · مراكز خدمة المستفيدين · المحاكم · المطارات والمنافذ الحكومية · المراكز الإدارية · المجمعات الحكومية · مشاريع المدن الذكية",
      useCases: [
        {
          aboutTitle: "وصول المستفيد → الاستقبال والإرشاد الذكي",
          slideKeys: ["kettybot"],
          solutionKeys: ["kettybot"],
          featureKeys: { kettybot: "kettybotPublicService" },
        },
        {
          aboutTitle: "الفعاليات والمؤتمرات الحكومية → دعم الضيافة والخدمات المساندة",
          slideKeys: ["bellabot"],
          solutionKeys: ["bellabot"],
          featureKeys: { bellabot: "bellabotPublicService" },
        },
        {
          aboutTitle: "العمليات الداخلية → نقل المستندات والمستلزمات",
          slideKeys: ["pudubot2"],
          solutionKeys: ["pudubot2"],
          featureKeys: { pudubot2: "pudubot2PublicService" },
        },
        {
          aboutTitle: "العمليات الآمنة → نقل المستندات الحساسة",
          slideKeys: ["flashbot"],
          solutionKeys: ["flashbot"],
          featureKeys: { flashbot: "flashbotPublicService" },
        },
        {
          aboutTitle: "المرافق العامة → التنظيف الذكي المستمر",
          slideKeys: ["cc1"],
          solutionKeys: ["cc1"],
          featureKeys: { cc1: "cc1PublicService" },
        },
      ],
    },
  },
}

const SLUGS = [
  "transportation",
  "entertainment-sports",
  "real-estate",
  "education",
  "public-service",
]

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

    industry.title = patch.title
    industry.shortTitle = patch.shortTitle
    industry.headline = patch.headline
    industry.summary = patch.summary
    industry.impactPanels = patch.impactPanels

    if (Array.isArray(industry.scenarios) && industry.scenarios[0]) {
      if (patch.scenarioTitle) industry.scenarios[0].title = patch.scenarioTitle
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
