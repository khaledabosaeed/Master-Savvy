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
        en: [
          "Passenger Arrival → Welcome & Guidance",
          "Terminal Operations → Internal Logistics Support",
          "VIP Areas → Secure Transport & Service Support",
          "Public Areas → Autonomous Cleaning",
        ],
        ar: [
          "وصول المسافر → الترحيب والإرشاد",
          "عمليات المحطة → الخدمات اللوجستية الداخلية",
          "مناطق كبار الشخصيات → النقل الآمن ودعم الخدمات",
          "المناطق العامة → التنظيف الذاتي",
        ],
      },
      keys: [
        { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
        { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
        { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
        { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
      ],
    },
    "entertainment-sports": {
      titles: {
        en: [
          "Arrival → Visitor Welcome & Guidance",
          "Food & Beverage Areas → Service Support",
          "Event Operations → Internal Logistics Support",
          "Venue Hygiene → Autonomous Cleaning",
        ],
        ar: [
          "وصول الزوار → الترحيب والإرشاد",
          "مناطق الطعام والشراب → دعم الخدمة",
          "عمليات الفعاليات → الخدمات اللوجستية الداخلية",
          "نظافة الموقع → التنظيف الذاتي",
        ],
      },
      keys: [
        { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
        { slideKeys: ["bellabot"], solutionKeys: ["bellabot"] },
        { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
        { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
      ],
    },
    "real-estate": {
      titles: {
        en: [
          "Visitor Arrival → Welcome & Guidance",
          "Tenant Services → Parcel & Document Delivery",
          "Office & Facility Operations → Internal Logistics",
          "Common Areas → Autonomous Cleaning",
        ],
        ar: [
          "وصول الزوار → الترحيب والإرشاد",
          "خدمات المستأجرين → توصيل الطرود والمستندات",
          "عمليات المكاتب والمرافق → الخدمات اللوجستية الداخلية",
          "المناطق المشتركة → التنظيف الذاتي",
        ],
      },
      keys: [
        { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
        { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
        { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
        { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
      ],
    },
    education: {
      titles: {
        en: [
          "Student or Visitor Arrival → Smart Welcome & Guidance",
          "Educational Events → Activity & Visitor Support",
          "Educational Facilities → Internal Logistics",
          "Public Areas → Continuous Smart Cleaning",
        ],
        ar: [
          "وصول الطالب أو الزائر → الإرشاد والاستقبال الذكي",
          "المؤتمرات والمعارض التعليمية → دعم الفعاليات والزوار",
          "المكتبات والخدمات التعليمية → نقل المواد والمستندات",
          "المرافق العامة → التنظيف الذكي المستمر",
        ],
      },
      keys: [
        { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
        { slideKeys: ["bellabot"], solutionKeys: ["bellabot"] },
        { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
        { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
      ],
    },
    "public-service": {
      titles: {
        en: [
          "Beneficiary Arrival → Smart Reception & Guidance",
          "Government Events → Hospitality & Supporting Services",
          "Internal Operations → Document & Supply Logistics",
          "Secure Operations → Sensitive Document Transport",
          "Public Areas → Continuous Smart Cleaning",
        ],
        ar: [
          "وصول المستفيد → الاستقبال والإرشاد الذكي",
          "الفعاليات والمؤتمرات الحكومية → دعم الضيافة والخدمات المساندة",
          "العمليات الداخلية → نقل المستندات والمستلزمات",
          "العمليات الآمنة → نقل المستندات الحساسة",
          "المرافق العامة → التنظيف الذكي المستمر",
        ],
      },
      keys: [
        { slideKeys: ["kettybot"], solutionKeys: ["kettybot"] },
        { slideKeys: ["bellabot"], solutionKeys: ["bellabot"] },
        { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
        { slideKeys: ["flashbot"], solutionKeys: ["flashbot"] },
        { slideKeys: ["cc1"], solutionKeys: ["cc1"] },
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
