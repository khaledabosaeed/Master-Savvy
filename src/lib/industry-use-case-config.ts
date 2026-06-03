import type { IndustrySlug, PuduRobotKey } from "@/components/innovation-page/data/industries"

export type UseCaseKeysConfig = {
  slideKeys: PuduRobotKey[]
  solutionKeys: PuduRobotKey[]
}

export type IndustryUseCaseConfig = {
  titles: { en: string[]; ar: string[] }
  keys: UseCaseKeysConfig[]
}

/** Per-industry use case section titles and robot key pairings. */
export const INDUSTRY_USE_CASE_CONFIG: Record<IndustrySlug, IndustryUseCaseConfig> =
  {
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

export const ROBOT_PRODUCT_HREFS: Record<PuduRobotKey, string> = {
  bellabot: "https://www.pudurobotics.com/products/bellabot",
  kettybot: "https://www.pudurobotics.com/en/products/kettybot_pro",
  holabot: "https://www.pudurobotics.com/products/holabot",
  flashbot: "https://www.pudurobotics.com/products/flashbot-new",
  cc1: "https://www.pudurobotics.com/en/products/cc1-pro/",
  t300: "https://www.pudurobotics.com/products/pudut300",
  pudubot2: "https://www.pudurobotics.com/en/products/pudubot2",
}
