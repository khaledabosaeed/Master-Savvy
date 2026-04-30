export type Language = "en" | "ar"

export interface ProjectStatistic {
  value: number
  label?: string
  description: string
  formatter?: string // "+" or "million" etc
}

export interface ProjectData {
  title: string
  description: string
  video: string // YouTube video URL
  images: string[] // Array of all photos for the third row infinite slider
  ctaButton: string
  statistics: ProjectStatistic[]
}

export const latestProjectsContent = {
en: {
    title: "Our Past Exhibitions",
    subtitle: "Experience from the exhibition floor… not just design.",

    projects: [
      {
        title: 'Hajj confex',
        description: "Savvy World participated in HajjConfex, one of the leading international platforms dedicated to the Hajj and Umrah ecosystem, with participation from countries around the world. Our presence was not merely a participation, but a live demonstration of how innovation, smart infrastructure, and digital solutions can support the Hajj and Umrah ecosystem in alignment with Saudi Vision 2030.",
        // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", 
        images: [
          "/ouer_project/haje/1.jpg", "/ouer_project/haje/2.jpg",
          "/ouer_project/haje/3.jpg", "/ouer_project/haje/4.jpg",
          "/ouer_project/haje/5.jpg", "/ouer_project/haje/6.jpg"
        ],
          ctaButton: 'HajjConfex',
             statistics: [
          {
            value: 420000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 750,
            description: "Exhibitors",
            formatter: "+"
          },
           {
            value: 450,
            description: "Speakers",
            formatter: "+"
          },
           {
            value: 137,
            description: "Countries",
            formatter: "+"
          },
        ]

      },{
        title: 'Cityscape',
        description: "Savvy World took part in Cityscape, a global platform bringing together key stakeholders in real estate development and urban environments from around the world. Our presence was not merely a participation, but a live demonstration of smart-city innovation and digital solutions supporting more efficient and sustainable urban development in line with Saudi Vision 2030.",
             video: "https://www.youtube.com/watch?v=wiMQFHMIUy8", // Replace with actual YouTube URL

        images: [
          "/ouer_project/city-scape/1.jpg", "/ouer_project/city-scape/2.jpg", "/ouer_project/city-scape/7.jpg", "/ouer_project/city-scape/8.jpg",
          "/ouer_project/city-scape/3.jpg", "/ouer_project/city-scape/4.jpg", "/ouer_project/city-scape/9.jpg", "/ouer_project/city-scape/10.jpg",
          "/ouer_project/city-scape/5.jpg", "/ouer_project/city-scape/6.jpg", "/ouer_project/city-scape/11.jpg", "/ouer_project/city-scape/12.jpg"
        ],
          ctaButton: 'Cityscape',
             statistics: [
          {
            value: 550,
            description: "Exhibitors",
            formatter: "+"
          },
           {
            value: 470,
            description: "Speakers",
            formatter: "+"
          },
           {
            value: 120,
            description: "Countries Represented",
            formatter: "+"
          },
              {
            value: 10,
            description: "Country Pavilions",
            formatter: ""
          },
        ]

      },
      {
        title: "Global PropTech Summit",
        description: "Savvy World participated in the Global PropTech Summit as one of the leading entities driving technological transformation in the real estate sector in Saudi Arabia. Our presence was not just participation, but a live showcase of the future of smart cities, demonstrating how sustainability, AI, and robotics can come together in a single system supporting Saudi Vision 2030.",
        video: "https://www.youtube.com/watch?v=8l047bfZsW8", // Replace with actual YouTube URL
        images: [
          "/ouer_project/propTeach/1.png", "/ouer_project/propTeach/2.png", "/ouer_project/propTeach/3.png", "/ouer_project/propTeach/4.jpg",
          "/ouer_project/propTeach/5.jpg", "/ouer_project/propTeach/6.jpg", "/ouer_project/propTeach/7.jpg", "/ouer_project/propTeach/8.jpg",
          "/ouer_project/propTeach/9.jpg", "/ouer_project/propTeach/10.jpg", "/ouer_project/propTeach/11.jpg", "/ouer_project/propTeach/12.jpg"
        ],
        ctaButton: "Global PropTech Summit",
        statistics: [
          {
            value: 8000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 60,
            description: "Booths",
            formatter: "+"
          },
          {
            value: 250,
            label: "Million",
            description: "Interactions across all social platforms",
            formatter: "+"
          }
        ]
      },
      {
        title: '"Customer First" Exhibition - Jeddah',
        description: "In Jeddah, the Customer First Exhibition was a marketing/real estate event for NHC, presenting residential units within the company's projects.",
        video: "https://www.youtube.com/watch?v=2KLtvXSgR-U", 
        images: [
          "/ouer_project/skani-jadha/1.jpg", "/ouer_project/skani-jadha/2.jpg", "/ouer_project/skani-jadha/3.jpg", "/ouer_project/skani-jadha/4.jpg",
          "/ouer_project/skani-jadha/6.jpg", "/ouer_project/skani-jadha/5.jpg", "/ouer_project/skani-jadha/7.jpg", "/ouer_project/skani-jadha/8.jpg",
          "/ouer_project/skani-jadha/9.jpg", "/ouer_project/skani-jadha/10.jpg", "/ouer_project/skani-jadha/11.jpg", "/ouer_project/skani-jadha/12.jpg"
        ],
        ctaButton: '"Customer First" Exhibition - Jeddah',
        statistics: [
          {
            value: 7886,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 147,
            description: "Valuable Prizes",
            formatter: ""
          },
          {
            value: 133,
            label: "Bookings",
            description: "From real estate developers and banks",
            formatter: ""
          }
        ]
      },
      {
        title: '"Customer First" Exhibition - Khobar',
        description: "In Khobar, the exhibition served as a marketing/sales opportunity for residential projects, with discounts, special offers, and multiple prizes, featuring NHC as the showcasing entity.",
        video: "https://www.youtube.com/watch?v=3bMZeQJjs5g", // Replace with actual YouTube URL
        images: [
          "/ouer_project/khoubar-skani/1.jpg", "/ouer_project/khoubar-skani/2.jpg", "/ouer_project/khoubar-skani/3.jpg",
          "/ouer_project/khoubar-skani/4.jpg", "/ouer_project/khoubar-skani/5.jpg", "/ouer_project/khoubar-skani/6.jpg",
          "/ouer_project/khoubar-skani/7.jpg", "/ouer_project/khoubar-skani/8.jpg", "/ouer_project/khoubar-skani/9.jpg"
        ],
        ctaButton: '"Customer First" Exhibition - Khobar',
        statistics: [
          {
            value: 4000,
            description: "Visitors",
            formatter: "+"
          },
          {
            value: 15,
            description: "Sales",
            formatter: "M+"
          },
          {
            value: 120,
            label: "Valuable Prizes",
            description: "Online Engagement",
            formatter: ""
          }
        ]
      },
      
      {
        title: "Al-Khozama Exhibition",
        description: "The Al-Khozama event witnessed wide attendance and significant engagement, with valuable prizes awarded in a distinctive atmosphere. The event also launched a dedicated employee loyalty program in collaboration with Samsung.",
        // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Replace with actual YouTube URL
        images: [
          "/ouer_project/khouzma/1.jpg", "/ouer_project/khouzma/2.jpg", "/ouer_project/khouzma/3.jpg", "/ouer_project/khouzma/10.jpg",
          "/ouer_project/khouzma/4.jpg", "/ouer_project/khouzma/5.jpg", "/ouer_project/khouzma/6.jpg", "/ouer_project/khouzma/11.jpg",
          "/ouer_project/khouzma/7.jpg", "/ouer_project/khouzma/8.jpg", "/ouer_project/khouzma/9.jpg"
        ],
        ctaButton: "Al-Khozama Exhibition",
        statistics: [
          {
            value: 50,
            description: "Valuable Prizes",
            formatter: ""
          },
          {
            value: 1500,
            description: "Employees",
            formatter: "+"
          },
          {
            label: "Samsung Employee Loyalty Program Activated",
            description: "",
            formatter: ""
          }
        ]
      },
    ] as ProjectData[]
  },
  
  ar: {
    title: "معارضنا السابقة",
    subtitle: "خبرة من أرض المعارض .. وليست مجرد تصميم.",
    
    projects: [
      {
        title: 'الحج والعمرة ',
        description: "شاركت Savvy World في HajjConfex، إحدى المنصات الدولية الرائدة المخصصة لمنظومة الحج والعمرة، بمشاركة من عشرات الدول حول العالم. ولم يكن حضورنا مجرد مشاركة، بل عرضًا حيًا لكيفية توظيف الابتكار والبنية التحتية الذكية والحلول الرقمية لدعم منظومة الحج والعمرة بما يتماشى مع رؤية السعودية 2030.",
        // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", 
        images: [
          "/ouer_project/haje/1.jpg", "/ouer_project/haje/2.jpg",
          "/ouer_project/haje/3.jpg", "/ouer_project/haje/4.jpg",
          "/ouer_project/haje/5.jpg", "/ouer_project/haje/6.jpg"
        ],
ctaButton: 'الحج والعمرة ',
statistics: [
  {
    value: 420000,
    description: "زائر",
    formatter: "+"
  },
  {
    value: 750,
    description: "عارض",
    formatter: "+"
  },
  {
    value: 450,
    description: "متحدث",
    formatter: "+"
  },
  {
    value: 137,
    description: "دولة",
    formatter: "+"
  },
]

      },{
        title: 'سيتي سكيب',
        description: "شاركت Savvy World في Cityscape، وهي منصة عالمية تجمع صُنّاع القرار والجهات الفاعلة في قطاع التطوير العقاري والبيئات الحضرية من مختلف دول العالم. ولم يكن حضورنا مجرد مشاركة، بل عرضًا حيًا لابتكارات المدن الذكية والحلول الرقمية التي تسهم في بناء مدن أكثر كفاءة واستدامة، انسجامًا مع رؤية السعودية 2030.",
             video: "https://www.youtube.com/watch?v=wiMQFHMIUy8", // Replace with actual YouTube URL
        images: [
          "/ouer_project/city-scape/1.jpg", "/ouer_project/city-scape/2.jpg", "/ouer_project/city-scape/7.jpg", "/ouer_project/city-scape/8.jpg",
          "/ouer_project/city-scape/3.jpg", "/ouer_project/city-scape/4.jpg", "/ouer_project/city-scape/9.jpg", "/ouer_project/city-scape/10.jpg",
          "/ouer_project/city-scape/5.jpg", "/ouer_project/city-scape/6.jpg", "/ouer_project/city-scape/11.jpg", "/ouer_project/city-scape/12.jpg"
        ],
  ctaButton: 'سيتي سكيب',
  statistics: [
    {
      value: 550,
      description: "عارض",
      formatter: "+"
    },
    {
      value: 470,
      description: "متحدث",
      formatter: "+"
    },
    {
      value: 120,
      description: "دولة ممثَّلة",
      formatter: "+"
    },
    {
      value: 10,
      description: "أجنحة دول",
      formatter: ""
    },
  ]
},
      {
        title: "القمة العالمية للبروبتيك",
        description: "ساڤي وورلد شاركت في القمة العالمية للبروبتك أحد أبرز الجهات التي تقود التحول التقني في قطاع العقار داخل المملكة.وجودنا في القمة لم يكن مجرد مشاركة .. بل كان عرضًا حيًا لمستقبل المدن الذكية، وكيف يمكن الجمع بين الاستدامة، الذكاء الاصطناعي، والروبوتات في منظومة واحدة تخدم رؤية السعودية 2030.",
        video: "https://www.youtube.com/watch?v=8l047bfZsW8", // Replace with actual YouTube URL
        images: [
          "/ouer_project/propTeach/1.png", "/ouer_project/propTeach/2.png", "/ouer_project/propTeach/3.png", "/ouer_project/propTeach/4.jpg",
          "/ouer_project/propTeach/5.jpg", "/ouer_project/propTeach/6.jpg", "/ouer_project/propTeach/7.jpg", "/ouer_project/propTeach/8.jpg",
          "/ouer_project/propTeach/9.jpg", "/ouer_project/propTeach/10.jpg", "/ouer_project/propTeach/11.jpg", "/ouer_project/propTeach/12.jpg"
        ],
        ctaButton: " القمة العالمية للبروبتيك",
        statistics: [
          {
            value: 8000,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 60,
            description: "بوث",
            formatter: "+"
          },
          {
            value: 250,
            label: "مليون",
            description: "تفاعل على جميع منصات التواصل",
            formatter: "+"
          }
        ]
      },
      {
        title: "معرض \"العميل اولاً\" - جدة",
        description: "في جدة، معرض العميل أولاً كان فعالية تسويقية/عقارية لـ NHC، يقدّم وحدات سكنية ضمن مشاريع الشركة،",
        video: "https://www.youtube.com/watch?v=2KLtvXSgR-U", 
        images: [
          "/ouer_project/skani-jadha/1.jpg", "/ouer_project/skani-jadha/2.jpg", "/ouer_project/skani-jadha/3.jpg", "/ouer_project/skani-jadha/4.jpg",
          "/ouer_project/skani-jadha/6.jpg", "/ouer_project/skani-jadha/5.jpg", "/ouer_project/skani-jadha/7.jpg", "/ouer_project/skani-jadha/8.jpg",
          "/ouer_project/skani-jadha/9.jpg", "/ouer_project/skani-jadha/10.jpg", "/ouer_project/skani-jadha/11.jpg", "/ouer_project/skani-jadha/12.jpg"
        ],
        ctaButton: "معرض \"العميل اولاً\" - جدة",
        statistics: [
          {
            value: 7886,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 147,
            description: "جائزة قيمة",
            formatter: ""
          },
          {
            value: 133,
            label: "حجز",
            description: "من المطوريين العقاريين والبنوك ",
            formatter: ""
          }
        ]
      },
      {
        title: "معرض  \"العميل اولاً\" - الخُبر",
        description: "في الخبر، المعرض بدا كفرصة تسويقية/عروض تملك ضمن مشاريع سكنيي, بتخفيضات وعروض خاصة وعدة جوائز، مع مشاركة الNHC كجهة عرض",
        video: "https://www.youtube.com/watch?v=3bMZeQJjs5g", // Replace with actual YouTube URL
        images: [
          "/ouer_project/khoubar-skani/1.jpg", "/ouer_project/khoubar-skani/2.jpg", "/ouer_project/khoubar-skani/3.jpg","/ouer_project/khoubar-skani/8.jpg",
          "/ouer_project/khoubar-skani/4.jpg", "/ouer_project/khoubar-skani/5.jpg", "/ouer_project/khoubar-skani/6.jpg", "/ouer_project/khoubar-skani/5.jpg", 
          "/ouer_project/khoubar-skani/7.jpg", "/ouer_project/khoubar-skani/4.jpg", "/ouer_project/khoubar-skani/9.jpg", "/ouer_project/khoubar-skani/2.jpg", "/ouer_project/khoubar-skani/3.jpg"
        ],
        ctaButton: "معرض  \"العميل اولاً\" - الخُبر",
        statistics: [
          {
            value: 4000,
            description: "زائر",
            formatter: "+"
          },
          {
            value: 15,
            description: "مبيعات ",
            formatter: "M+"
          },
          {
            value: 120,
            label: "جائزة قيمة  ",
            description: "تفاعل على الإنترنت",
            formatter: ""
          }
        ]
      }
      ,{
        title: "معرض الخزامى",
        description: "شهدت فعالية الخزامى حضوراً واسعاً وتفاعلاً كبيراً، حيث قدّمت جوائز قيّمة ضمن أجواء مميزة، كما جرى خلالها إطلاق برنامج ولاء مخصّص للموظفين بالتعاون مع شركة سامسونج..",
        // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Replace with actual YouTube URL
        images: [
          "/ouer_project/khouzma/1.jpg", "/ouer_project/khouzma/2.jpg", "/ouer_project/khouzma/3.jpg", "/ouer_project/khouzma/10.jpg",
          "/ouer_project/khouzma/4.jpg", "/ouer_project/khouzma/5.jpg", "/ouer_project/khouzma/6.jpg", "/ouer_project/khouzma/11.jpg",
          "/ouer_project/khouzma/7.jpg", "/ouer_project/khouzma/8.jpg", "/ouer_project/khouzma/9.jpg"
        ],
        ctaButton: "معرض الخزامى",
        statistics: [
          {
            value: 50,
            description: "جائزة قيمة",
            formatter: ""
          },
          {
            value: 1500,
            description: "موظف",
            formatter: "+"
          },
          {
            label: "تفعيل برنامج ولاء الموظفين من سامسونج",
            description: "",
            formatter: ""
          }
        ]
      },

      
    ] as ProjectData[]
  },
}

export function getProjects(lang: Language): ProjectData[] {
  return latestProjectsContent[lang].projects
}

export function getLatestProjectsTitle(lang: Language): string {
  return latestProjectsContent[lang].title
}

export function getLatestProjectsSubtitle(lang: Language): string {
  return latestProjectsContent[lang].subtitle
}

