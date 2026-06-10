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
    title: "Creating Unique Content! More Beautiful … Simpler …",
    subtitle: "Immersive digital content features technologies like Hyper Realistic, Anamorphic, and AR to create vivid, interactive scenes with high visual quality, enriched with AI-driven, interactive, 3D content suitable for all marketing needs.",
    projects: [
      {
        title: "Hyper Realistic Content",
        description:
          "Ultra-real visuals for immersive brand storytelling.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Hyper%20Realistic%20Content.mp4",
      },
      {
        title: "Anamorphic Content",
        description:
          "Depth illusions that captivate from one angle.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Anamorphic%20Content.mp4",
        },
      {
        title: "Triple Helix Flat",
        description:
          "Dynamic digital display for interactive storytelling.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tech%20_%20Helix%20Flat.mp4",
      },
      {
        title: "Triple Helix Cylinder",
        description:
          "Kinetic cylinder for immersive visitor journeys.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Helix%20Cylinder.mp4",
      },
      {
        title: "Sliding Rotating Dynamic Wall",
        description:
          "Moving panels for evolving brand presentations.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Dynamic%20rotating%20wall%20final.mp4",
      },
      {
        title: "Sliding Lens",
        description:
          "Curved lens for interactive content exploration.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Sliding%20Lens.mp4",
      },
      {
        title: "Augmented Reality Sliding Screen",
        description:
          "Sliding AR screen revealing deeper product details.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Augmented%20Reality%20Sliding%20Screen%20redo%202.mp4",
      },
      {
        title: "Analog Augmented Reality Sliding Screen",
        description:
          "Hands-on AR experience with guided interaction.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Analog%20Augmented%20Reality%20Sliding%20Screen%20redo.mp4",
      },
      {
        title: "Sliding Face",
        description:
          "AI face narrator for futuristic storytelling.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Sliding%20Face.mp4",
      },
      {
        title: "Tangible Table + Curved Screen",
        description:
          "Interactive table with curved visual storytelling.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tangible%20table%20redo.mp4",
      },
      {
        title: "Sustainability Table",
        description:
          "Interactive sustainability showcase with 3D exploration.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Sustainability%20Table_V3.mp4",
      },
      {
        title: "Conveyor Belt",
        description:
          "Product storytelling through an interactive conveyor display.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Conveyer%20Belt.mp4",
        },
      {
        title: "The Hive",
        description:
          "Spiral holographic sculpture for immersive storytelling.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Hive.mp4",
        },
        {
        title: "Paradigm Tunnel",
        description:
          "Transforming tunnel with surrounding visual narratives.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Paradigm%20Tunnel.mp4",
      },
      {
        title: "The Gyroscope",
        description:
          "Rotating LED rings for immersive experiences.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Gyroscope%20redo.mp4",
      },
      {
        title: "The Warp",
        description:
          "Kinetic light frame for impactful storytelling.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Warp.mp4",
      },
      {
        title: "Tesseract",
        description:
          "Transparent holographic displays for 3D impact.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Tesseract%20redo.mp4",
      },
      {
        title: "Metamorphosis",
        description:
          "Shape-shifting sphere symbolizing innovation and evolution.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Metamorphosis.mp4",
      },
      {
        title: "Celestial Spiral",
        description:
          "Mirrored spiral screens with AI interaction.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Celestial%20Spiral_v2.mp4",
      },
      {
        title: "The Twist",
        description:
          "Sustainable immersive structure with holographic effects.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Twist.mp4",
      },
      {
        title: "Mannequin with LED Head",
        description:
          "Interactive mannequin for 360-degree information.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Mannequin.mp4",
      },
      {
        title: "The Patola",
        description:
          "Kinetic rings celebrating energy and sustainability.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Patola%20redo.mp4",
      },
      {
        title: "The Peekaboo",
        description:
          "Rotating LED platform for memorable activations.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Peekaboo%20redo.mp4",
      },
      {
        title: "Tunnel of Fame",
        description:
          "Interactive tunnel with expert holo-box content.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Tunnel%20of%20Fame.mp4",
      },
      {
        title: "Static Lenticular Facade",
        description:
          "Striking lenticular facade for visual engagement.",
video: "https://cdn.savvyworld.ai/media/videos/Activ_Lenticular%20Facade_Static%20redo.mp4",
      },
      {
        title: "Kinetic Lenticular Facade",
        description:
          "Dynamic lenticular screens that change in real time.",
         video: "https://cdn.savvyworld.ai/media/videos/SE_TECH_Lenticular%20Facade_kinetic.mp4",
      },
      {
        title: "Kinect Sensor Motion Activated LED Wall",
        description:
          "Motion-reactive LED wall for visitor engagement.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinect%20Sensor%20Motion%20Activated%20LED%20Wall%20redo.mp4",
      },
      {
        title: "Kinetic Wall",
        description:
          "Dynamic moving wall for memorable exhibition spaces.",
              video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Wall.mp4",
      },
      {
        title: "Kinetic Ceiling",
        description:
          "Animated ceiling with synchronized motion and light.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Ceiling.mp4",
      },
      {
        title: "Holocube + OLED",
        description:
          "Transparent OLED with interactive holographic product display.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Holocube%20+%20OLED.mp4",
      },
      {
        title: "Kinetic Globe Immersive",
        description:
          "Moving globe presenting initiatives dynamically.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Globe%20Immersive.mp4",
      },
      {
        title: "Immersive Room",
        description:
          "Custom LED room for realistic brand experiences.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Immersive%20Room.mp4",
      },
      {
        title: "Kinetic Discovery",
        description:
          "Kinetic table and LED wall for exploration.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Discovery.mp4",
      },
      {
        title: "Kinetic Hoist Platform",
        description:
          "Floating VR racing platform for activations.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Hoist%20Platform.mp4",
      },
      {
        title: "Isolation Pod",
        description:
          "Personal immersive pod for brand exploration.",
          video: "https://cdn.savvyworld.ai/media/videos/Activ_Isolation%20Pod.mp4",
      },
      {
        title: "Quantum LED Sculpture",
        description:
          "Custom LED sculpture for immersive brand impact.",
              video: "https://cdn.savvyworld.ai/media/videos/Activ_Quantum%20LED%20Sculpture.mp4",
      }]as ProjectData[]
  },
  
  ar: {
    title: "صناعة محتوى مختلف! أجمل .. أبسط ..",
    subtitle: "يقدّم المحتوى الرقمي الغامر تقنيات مثل الـ Hyper Realistic والأنامورفيك والـ AR التي تخلق مشاهد حيّة وتفاعلية بجودة بصرية عالية، مع محتوى ذكاء اصطناعي، تفاعلي، ثلاثي الأبعاد، غني بالمعلومات يناسب جميع الاحتياجات التسويقية",

    projects: [
      {
        title: 'Hyper Realistic Content',
        description: "محتوى واقعي غامر يعزز سرد العلامة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Hyper%20Realistic%20Content.mp4",
   

      },{
        title: 'Anamorphic Content',
        description: "خدع بصرية عميقة تجذب الجمهور من زاوية محددة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Anamorphic%20Content.mp4",

},
      {
        title: "Triple Helix Flat",
        description: "شاشة ديناميكية لسرد تفاعلي داخل أي مساحة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tech%20_%20Helix%20Flat.mp4",
    
      },
      {
        title: "Triple Helix Cylinder",
        description: "هيكل حركي لتجربة زوار غامرة وتفاعلية.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Helix%20Cylinder.mp4",
  
   
      },
      {
        title: "Sliding Rotating Dynamic Wall",
        description: "جدار متحرك لعرض العلامة بطريقة متجددة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Dynamic%20rotating%20wall%20final.mp4",

      }
      ,{
        title: "Sliding Lens",
        description: "عدسة منزلقة لاستكشاف المحتوى بطريقة تفاعلية.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Sliding%20Lens.mp4",
      },
      {
        title: "Augmented Reality Sliding Screen",
        description: "شاشة AR منزلقة تكشف تفاصيل أعمق.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Analog%20Augmented%20Reality%20Sliding%20Screen%20redo.mp4",
      },
      ,
      {
        title: "Analog Augmented Reality Sliding Screen",
        description: "تجربة AR عملية بتفاعل مباشر وسلس.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Analog%20Augmented%20Reality%20Sliding%20Screen%20redo.mp4",
      }
      , 
      {
        title: "Sliding Face",
        description: "وجه ذكاء اصطناعي لسرد قصصي مستقبلي.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Sliding%20Face.mp4",
      }
      ,
      {
        title: "Tangible Table + Curved Screen",
        description: "طاولة تفاعلية مع شاشة منحنية للسرد البصري.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tangible%20table%20redo.mp4",
      }
      ,
      {
        title: "Sustainability Table",
        description: "عرض استدامة تفاعلي بنماذج ثلاثية الأبعاد.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Sustainability%20Table_V3.mp4",
      }
      ,
      {
        title: "Conveyor Belt",
        description: "حزام تفاعلي لعرض المنتجات بسلاسة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Conveyer%20Belt.mp4",
      }
      ,
      {
        title: "The Hive",
        description: "منحوتة هولوغرافية حلزونية لسرد غامر.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Hive.mp4",
      }
      ,
      {
        title: "Paradigm Tunnel",
        description: "نفق متحول بقصة بصرية محيطة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Paradigm%20Tunnel.mp4",
      }
      ,
      {
        title: "The Gyroscope",
        description: "حلقات LED دوارة لتجربة غامرة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ%20_%20Gyroscope%20redo.mp4",
      }
      ,
      {
        title: "The Warp",
        description: "إطار ضوئي حركي لسرد مؤثر.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Warp.mp4",
      }
      ,
      {
        title: "Tesseract",
        description: "شاشات شفافة بتأثير هولوغرافي ثلاثي الأبعاد.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tesseract%20redo.mp4",
      }
      ,
      {
        title: " Metamorphosis",
        description: "كرة متحولة ترمز للابتكار والتطور.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Metamorphosis.mp4",
        }
      ,
      {
        title: "Celestial Spiral",
        description: "شاشات حلزونية عاكسة بتفاعل ذكاء اصطناعي.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Celestial%20Spiral_v2.mp4",
      }
      ,
      {
        title: "The Twist",
        description: "هيكل غامر مستدام بمؤثرات هولوغرافية.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Twist.mp4",
      }
      ,
      {
        title: "Mannequin with LED Head",
        description: "مانيكان تفاعلي كمركز معلومات بزاوية 360.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Mannequin.mp4",
      }

      ,
      {
        title: "The Patola",
        description: "حلقات حركية تعكس الطاقة والاستدامة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Patola%20redo.mp4",
      }

      ,
      {
        title: "The Peekaboo",
        description: "منصة LED دوارة لتفعيل لا يُنسى.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_The%20Peekaboo%20redo.mp4",
      }

      ,
      {
        title: "Tunnel of Fame",
        description: "نفق تفاعلي بمحتوى هولوغرافي خبير.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Tunnel%20of%20Fame.mp4",
      }

      ,
      {
        title: "Static Lenticular Facade",
        description: "واجهة عدسية جذابة لتعزيز التفاعل البصري.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Lenticular%20Facade_Static%20redo.mp4",
      }

      ,
      {
        title: "Kinetic Lenticular Facade",
        description: "شاشات عدسية متحركة تتغير لحظيًا.",
        video: "https://cdn.savvyworld.ai/media/videos/SE_TECH_Lenticular%20Facade_kinetic.mp4",
      }

      ,
      {
        title: "Kinect Sensor Motion Activated LED Wall",
        description: "جدار LED يستجيب لحركة الزوار.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinect%20Sensor%20Motion%20Activated%20LED%20Wall%20redo.mp4",
      }
      ,
      {
        title: "Kinetic Wall",
        description: "جدار حركي يضيف تجربة معرض مميزة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Wall.mp4",
      }  ,
      {
        title: "Kinetic Ceiling",
        description: "سقف حركي بإضاءة وحركة متزامنة.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Ceiling.mp4",
      }  ,
      {
        title: "Holocube + OLED",
        description: "شاشة OLED شفافة لعرض هولوغرافي تفاعلي.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Holocube%20+%20OLED.mp4",
      }  ,
      {
        title: "Kinetic Globe Immersive",
        description: "كرة حركية تعرض المبادرات بشكل ديناميكي.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Globe%20Immersive.mp4",
      }  ,
      {
        title: "Immersive Room",
        description: "غرفة LED مخصصة لتجارب علامة واقعية.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Immersive%20Room.mp4",
      }  ,
      {
        title: "Kinetic Discovery",
        description: "طاولة حركية وجدار LED للاستكشاف التفاعلي.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Discovery.mp4",
      }  ,
      {
        title: "Kinetic Hoist Platform",
        description: "منصة سباق VR عائمة للفعاليات.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Kinetic%20Hoist%20Platform.mp4",
      }  ,
      {
        title: "Isolation Pod",
        description: "كبسولة شخصية لاستكشاف العلامة بعمق.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Isolation%20Pod.mp4",
      }  ,
      {
        title: "Quantum LED Sculpture",
        description: "منحوتة LED مخصصة لتأثير بصري غامر.",
        video: "https://cdn.savvyworld.ai/media/videos/Activ_Quantum%20LED%20Sculpture.mp4",
      }


      
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