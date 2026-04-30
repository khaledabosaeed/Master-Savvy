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
          "Delivers hyper-realistic content that creates immersive audience experiences and enhances engagement in product showcases, brand activations, and storytelling. We use advanced CGI, 3D modeling, and real-time ray tracing to achieve stunning detail and high realism. Ideal for luxury brands, exhibitions, retail spaces, and interactive events, captivating audiences and elevating brand narratives.",
        video: "/videos/Activ_Hyper Realistic Content.mp4",
      },
      {
        title: "Anamorphic Content",
        description:
          "Anamorphic projections create illusions of depth and transformation, visible only from a specific angle. We use 3D modeling, animation, and high-resolution projection to craft custom content. Perfect for events, exhibitions, and flagship retail spaces, offering innovative ways to captivate audiences and strengthen brand presence.",
          video: "/videos/Activ_Anamorphic Content.mp4",
        },
      {
        title: "Triple Helix Flat",
        description:
          "A versatile display that transforms any space into a dynamic digital experience. It captivates visitors with high-resolution visuals and seamless storytelling, enabling interaction through touch, motion sensors, or transparent OLED screens. The technology adapts to any environment, delivering an immersive experience that blends real-time data with promotional content.",
        video: "/videos/Activ_Tech _ Helix Flat.mp4",
      },
      {
        title: "Triple Helix Cylinder",
        description:
          "Visitors embark on an interactive journey within a kinetic structure that responds to motion and touch, symbolizing technological evolution and innovation. These installations highlight key achievements, guide visitors, and enhance brand and product awareness. The synchronized motion creates a fully immersive and engaging experience.",
        video: "/videos/Activ _ Helix Cylinder.mp4",
      },
      {
        title: "Sliding Rotating Dynamic Wall",
        description:
          "A dynamic kinetic display featuring moving panels, mirrored ceilings, and LED screens. Panels can move independently or in sync, delivering an evolving visual experience. It offers a comprehensive and interactive brand and service presentation that is easy for visitors to understand.",
        video: "/videos/Activ_Dynamic rotating wall final.mp4",
      },
      {
        title: "Sliding Lens",
        description:
          "Visitors are drawn to an elegant platform featuring a glowing, curved sliding lens. Through a touch interface, they explore inspiring topics in engineering and defense. The lens displays interactive content illustrating the impact of defense systems, offering deeper insight into the industry, products, and services.",
        video: "/videos/Activ _ Sliding Lens.mp4",
      },
      {
        title: "Augmented Reality Sliding Screen",
        description:
          "An interactive LED wall with a sliding screen attracts visitors by displaying dynamic brand and product information. The background LED provides real-time data, while sliding the screen reveals deeper details. This rich and informative interaction inspires visitors through the brand’s commitment to technological innovation.",
        video: "/videos/Activ_Augmented Reality Sliding Screen redo 2.mp4",
      },
      {
        title: "Analog Augmented Reality Sliding Screen",
        description:
          "Visitors interact with an intuitive wayfinding system and rotating vehicle models for a hands-on experience. Controlled via a tablet within an augmented environment, this solution delivers an immersive and innovative experience ideal for exhibitions, product showcases, and enhanced customer engagement.",
        video: "/videos/Activ_Analog Augmented Reality Sliding Screen redo.mp4",
      },
      {
        title: "Sliding Face",
        description:
          "Designed as an innovative storytelling tool that delivers immersive information and narratives in a dynamic and visually engaging way. A 3D AI-powered face acts as a compelling narrator, guiding audiences through personalized and realistic interactive content. Combined with sliding screens, it creates a futuristic and unforgettable experience for brands, exhibitions, and educational centers.",
        video: "/videos/Activ_Sliding Face.mp4",
      },
      {
        title: "Tangible Table + Curved Screen",
        description:
          "Lenticular LED screens captivate visitors by changing designs in real time, enhancing interaction and engagement. Dynamic visuals adapt to event themes and architectural needs, transforming kinetic engineering into living art with limitless animation and video possibilities that leave a lasting impression.",
        video: "/videos/Activ_Tangible table redo.mp4",
      },
      {
        title: "Sustainability Table",
        description:
          "The Sustainability Table offers an immersive experience to explore 3D models in virtual reality and interact with data via a transparent touch screen. Visitors control content dynamically using a navigation dial, making it ideal for exhibitions, events, and conferences as an educational and interactive sustainability showcase.",
        video: "/videos/Activ_Sustainability Table_V3.mp4",
      },
      {
        title: "Conveyor Belt",
        description:
          "Visitors encounter an interactive conveyor belt showcasing products alongside an OLED screen. Each item pauses to present detailed information before moving seamlessly to the next. This immersive experience simplifies brand and service storytelling while delivering deeper understanding.",
          video: "/videos/Activ _ Conveyer Belt.mp4",
        },
      {
        title: "The Hive",
        description:
          "More than a sculpture, this installation integrates volumetric holographic screens to deliver live, engaging content. Standing 4.2 meters tall, it features a structural frame with LEDs and 33 Ultra HD screens in an ascending spiral. It can present immersive visuals, interactive displays, or live AI-driven dialogue, elevating brand storytelling to new heights.",
          video: "/videos/Activ_The Hive.mp4",
        },
      {
        title: "Paradigm Tunnel",
        description:
          "As visitors walk through, walls transform into ceilings and back again, surrounding them in a story that unfolds around them. Accompanied by narrative audio, the tunnel features 85-inch Ultra HD screens that move seamlessly, creating a powerful and memorable immersive experience.",
          video: "/videos/Activ_Paradigm Tunnel.mp4",
      },
      {
        title: "The Gyroscope",
        description:
          "Visitors engage with a kinetic quantum drum installation that captivates emotions and creates unforgettable moments. Featuring four LED-lined chrome rings rotating gracefully with a 4.2-meter diameter, it transforms storytelling into an interactive and immersive experience adaptable to any space.",
          video: "/videos/Activ _ Gyroscope redo.mp4",
      },
      {
        title: "The Warp",
        description:
          "A fusion of art and technology through a kinetic light display within an octagonal frame. Featuring high-resolution visuals and customizable motion, it adapts to any space and enhances brand storytelling, live performances, and event atmospheres with unforgettable impact.",
          video: "/videos/Activ_The Warp.mp4",
      },
      {
        title: "Tesseract",
        description:
          "The Tesseract hologram instantly captivates visitors with transparent multi-screen displays creating a stunning 3D effect. As they approach, the structure comes alive with dynamic holographic content representing brand identity, products, and innovation in an inspiring showcase.",
          video: "/videos/Activ_Tesseract redo.mp4",
      },
      {
        title: "Metamorphosis",
        description:
          "A shape-shifting kinetic sphere within a transparent 6×6m mesh cage reflects dazzling digital content. Dynamic animations showcase innovation and defense advancements, symbolizing continuous evolution, growth, and limitless potential.",
          video: "/videos/Activ_Metamorphosis.mp4",
      },
      {
        title: "Celestial Spiral",
        description:
          "Visitors journey through an architectural masterpiece featuring volumetric mirrored screens delivering breathtaking visuals. With 33 Ultra HD screens, a 4.2-meter spiral, and real-time AI interactions, it offers advanced storytelling with unlimited interactive possibilities.",
          video: "/videos/Activ_Celestial Spiral_v2.mp4",
      },
      {
        title: "The Twist",
        description:
          "A 4.2-meter immersive structure with a mirrored base, synchronized Neopixel DMX lighting, Ultra HD screens, and holographic effects. Crafted from sustainable recycled materials, it delivers a powerful, eco-conscious brand narrative for exhibitions and events.",
          video: "/videos/Activ_The Twist.mp4",
      },
      {
        title: "Mannequin with LED Head",
        description:
          "An interactive mannequin displaying customized content from multiple angles, serving as a 360-degree information hub. Enhanced with AI-driven cameras and tracking, it delivers personalized interactions that leave a strong impression.",
          video: "/videos/Activ_Mannequin.mp4",
      },
      {
        title: "The Patola",
        description:
          "A kinetic art piece blending motion and technology, with illuminated rotating rings symbolizing energy, sustainability, and renewal. Synchronized sound and light effects create a sensory experience that sparks conversations around innovation and the future of energy.",
          video: "/videos/Activ_The Patola redo.mp4",
      },
      {
        title: "The Peekaboo",
        description:
          "A rotating LED installation with multi-sensory interaction, featuring a 6-meter platform, high-resolution LED screens, interactive sensors, and directional sound. Perfect for product launches and large-scale events, delivering bold and memorable impact.",
          video: "/videos/Activ_The Peekaboo redo.mp4",
      },
      {
        title: "Tunnel of Fame",
        description:
          "Visitors enter a custom tunnel and immediately engage with interactive holo-boxes showcasing expert content. Multiple touchpoints allow exploration of brand, products, and industry insights, ending with a dynamic exit experience.",
          video: "/videos/Activ_Tunnel of Fame.mp4",
      },
      {
        title: "Static Lenticular Facade",
        description:
          "A visually striking facade that enhances engagement through captivating lenticular designs. Featuring a 4.2-meter kinetic quantum disc with LED detailing and chrome finishes, it transforms storytelling into a powerful kinetic experience.",
video: "/videos/Activ_Lenticular Facade_Static redo.mp4",
      },
      {
        title: "Kinetic Lenticular Facade",
        description:
          "Dynamic lenticular LED screens change designs in real time, adapting animations and video to event themes and architectural needs. This revolutionary facade transforms kinetic engineering into living art.",
         video: "/videos/SE_TECH_Lenticular Facade_kinetic.mp4",
      },
      {
        title: "Kinect Sensor Motion Activated LED Wall",
        description:
          "A motion-responsive LED wall that reacts to visitor movement, displaying brand logos or interactive content. Customizable in size or as a permanent installation, it creates a captivating and immersive focal point.",
          video: "/videos/Activ_Kinect Sensor Motion Activated LED Wall redo.mp4",
      },
      {
        title: "Kinetic Wall",
        description:
          "A visually striking kinetic wall that enhances exhibition spaces through dynamic motion. Its interactivity sparks curiosity and leaves a memorable experience, adaptable as a temporary or permanent installation.",
          video: "/videos/Activ_Kinetic Wall.mp4",
      },
      {
        title: "Kinetic Ceiling",
        description:
          "A kinetic ceiling animates the space with smooth, synchronized motion, lighting, and customizable effects. It creates a powerful emotional and visual impact, adaptable to any venue.",
          video: "/videos/Activ_Kinetic Ceiling.mp4",
      },
      {
        title: "Holocube + OLED",
        description:
          "A transparent OLED screen merges the digital and physical worlds, enabling touch interaction while preserving visibility of the real environment. 3D holograms highlight products, creating a futuristic healthcare experience.",
          video: "/videos/Activ_Holocube + OLED.mp4",
      },
      {
        title: "Kinetic Globe Immersive",
        description:
          "A kinetic globe dynamically displays key information, splitting into four sections to highlight initiatives before reforming into a complete visual narrative that inspires innovation and workforce development.",
          video: "/videos/Activ_Kinetic Globe Immersive.mp4",
      },
      {
        title: "Immersive Room",
        description:
          "A fully customizable immersive room designed to align with brand vision. Featuring LED displays and interactive controls, it delivers realistic, engaging scenarios through seamless interaction.",
          video: "/videos/Activ_Immersive Room.mp4",
      },
      {
        title: "Kinetic Discovery",
        description:
          "Visitors are welcomed by a kinetic table and vibrant LED wall, interacting with a transparent OLED screen to explore products and brand stories in an immersive environment.",
          video: "/videos/Activ_Kinetic Discovery.mp4",
      },
      {
        title: "Kinetic Hoist Platform",
        description:
          "Visitors step onto a floating racing platform and secure themselves for an adrenaline-filled VR racing experience paired with a massive LED screen—ideal for events and brand activations.",
          video: "/videos/Activ_Kinetic Hoist Platform.mp4",
      },
      {
        title: "Isolation Pod",
        description:
          "An isolation pod offers a personal, immersive brand experience featuring a transparent touch screen to explore products and services interactively, boosting brand awareness and understanding.",
          video: "/videos/Activ_Isolation Pod.mp4",
      },
      {
        title: "Quantum LED Sculpture",
        description:
          "A fully customized Quantum LED sculpture designed to captivate audiences with dynamic LED visuals. Perfect for exhibitions, events, and brand activations, it creates immersive experiences with lasting impact.",
              video: "/videos/Activ_Quantum LED Sculpture.mp4",
      }]as ProjectData[]
  },
  
  ar: {
    title: "صناعة محتوى مختلف! أجمل .. أبسط ..",
    subtitle: "يقدّم المحتوى الرقمي الغامر تقنيات مثل الـ Hyper Realistic والأنامورفيك والـ AR التي تخلق مشاهد حيّة وتفاعلية بجودة بصرية عالية، مع محتوى ذكاء اصطناعي، تفاعلي، ثلاثي الأبعاد، غني بالمعلومات يناسب جميع الاحتياجات التسويقية",

    projects: [
      {
        title: 'Hyper Realistic Content',
        description: "يقدم محتوى فائق الواقعية تجارب غامرة للجمهور، ويعزز التفاعل في عروض المنتجات وتنشيط العلامات التجارية والسرد القصصي.نستخدم CGI متقدم، ونمذجة ثلاثية الأبعاد، وتتبع الأشعة في الوقت الفعلي لتفاصيل مذهلة وواقعية عالية.مثالي للعلامات الفاخرة والمعارض والمتاجر والفعاليات التفاعلية، حيث يجذب الجمهور ويرتقي بسرد العلامة التجارية.",
        video: "/videos/Activ_Hyper Realistic Content.mp4",
   

      },{
        title: 'Anamorphic Content',
        description: "تخلق الإسقاطات التشوهية وهم العمق والتحول لتجربة بصرية غامرة تظهر من زاوية معينة فقط. نستخدم النمذجة ثلاثية الأبعاد والرسوم المتحركة والإسقاطات عالية الدقة لصنع محتوى مخصص. مثالية للفعاليات والمعارض والمتاجر الكبرى، وتوفر طرقًا مبتكرة لجذب الجمهور وتعزيز العلامة التجارية.",
        video: "/videos/Activ_Anamorphic Content.mp4",

},
      {
        title: "Triple Helix Flat",
        description: "شاشة متعددة الاستخدامات تحول أي مساحة إلى عرض رقمي ديناميكي. تجذب  الزوار بصور عالية الدقة وسرد سلس، وتتيح التفاعل عبر اللمس أو مستشعرات الحركة أو شاشات OLED شفافة. تتكيف التقنية مع أي بيئة، مقدمة تجربة غامرة تجمع بين البيانات الفورية والمحتوى الدعائي.",
        video: "/videos/Activ_Tech _ Helix Flat.mp4",
    
      },
      {
        title: "Triple Helix Cylinder",
        description: "يخوض الزوار رحلة تفاعلية داخل المكان عبر هيكل حركي يستجيب للحركة واللمس، رمزًا لتطور التكنولوجيا والابتكار.تسلط هذه التركيبات الضوء على الإنجازات الرئيسية وتوجه الزوار وتعزز الوعي بالعلامة التجارية والمنتجات.تتحرك التركيبات بتناغم كامل عند تنشيطها بالحركة، مما يخلق تجربة غامرة ومشوقة.",
        video: "/videos/Activ _ Helix Cylinder.mp4",
  
   
      },
      {
        title: "Sliding Rotating Dynamic Wall",
        description: "هو عرض حركي ديناميكي بلوحات محركة وأسقف عاكسة وشاشات LED.تتحرك اللوحات بشكل مستقل أو متزامن لتقديم تجربة بصرية متغيرة ومتطورة.يوفر هذا العرض عرضًا شاملًا للعلامة التجارية والخدمات بطريقة تفاعلية وسهلة الفهم للزوار.",
        video: "/videos/Activ_Dynamic rotating wall final.mp4",

      }
      ,{
        title: "Sliding Lens",
        description: "الزوار ينجذبون إلى منصة أنيقة بعدسة منزلقة منحنية ومتوهجة.يتفاعلون مع واجهة لمس لاختيار مواضيع ملهمة في الهندسة والدفاع.تعرض العدسة محتوى تفاعلي يوضح أثر أنظمة الدفاع، مما يمنح الزوار فهمًا أعمق للصناعة والمنتجات والخدمات.",
        video: "/videos/Activ _ Sliding Lens.mp4",
      },
      {
        title: "Augmented Reality Sliding Screen",
        description: "يجذب الزوار جدار LED تفاعلي مزود بشاشة منزلقة تعرض معلومات ديناميكية عن العلامة التجارية ومنتجاتها. يوفر LED الخلفي معلومات آنية، ويتيح للزوار استكشاف تفاصيل أكثر عن طريق تحريك الشاشة. تقدم هذه التجربة تفاعلًا غنيًا ومعلوماتية، مما يلهم الزوار بإلتزام العلامة التجارية بالابتكار التكنولوجي.",
        video: "/videos/Activ_Analog Augmented Reality Sliding Screen redo.mp4",
      },
      ,
      {
        title: "Analog Augmented Reality Sliding Screen",
        description: "يتفاعل الزوار مع نظام توجيه تفاعلي ونماذج سيارات دوارة لتجربة عملية مباشرة.يمكن التحكم بالتجربة عبر جهاز لوحي ضمن بيئة ديناميكية مدعومة بالواقع المعزز.توفر التقنية تجربة غامرة ومبتكرة مثالية للمعارض وعروض المنتجات وزيادة تفاعل العملاء.",
        video: "/videos/Activ_Analog Augmented Reality Sliding Screen redo.mp4",
      }
      , 
      {
        title: "Sliding Face",
        description: "تم تصميم هذه التقنية كأداة سردية مبتكرة تقدم معلومات وقصص غامرة بطريقة ديناميكية وجذابة بصريًا.يعمل الوجه الثلاثي الأبعاد بالذكاء الاصطناعي كراوي قوي يوجه الجمهور عبر محتوى مخصص وتفاعلية واقعية.تجمع التقنية بين شاشات منزلقة ووجه AI تفاعلي، لتقدم تجربة مستقبلية لا تُنسى للعلامات التجارية والمعارض والمراكز التعليمية.",
        video: "/videos/Activ_Sliding Face.mp4",
      }
      ,
      {
        title: "Tangible Table + Curved Screen",
        description: "تجذب الشاشات LED العدسية الزوار بقدرتها على تغيير التصاميم في الوقت الحقيقي، مما يعزز التفاعل والمشاركة.توفر تصاميم ديناميكية ومتنوعة تتكيف مع موضوعات الفعاليات واحتياجات المباني، لخلق تجارب بصرية جذابة.تحول الواجهة الثورية الهندسة الحركية إلى فن حي، مع إمكانيات غير محدودة للرسوم المتحركة والفيديو، تاركة انطباعًا دائمًا للزوار.",
        video: "/videos/Activ_Tangible table redo.mp4",
      }
      ,
      {
        title: "Sustainability Table",
        description: "توفر طاولة الاستدامة تجربة غامرة لاستكشاف نماذج ثلاثية الأبعاد في الواقع الافتراضي والتفاعل مع البيانات عبر شاشة لمس شفافة.يمكن للزوار التحكم بالمحتوى ديناميكيًا باستخدام قرص تحكم للتنقل والتفاعل بطريقة بديهية.تعد هذه التجربة مثالية للمعارض والفعاليات والمؤتمرات، حيث تقدم طريقة تعليمية وتفاعلية لاستكشاف موضوعات الاستدامة الرئيسية.",
        video: "/videos/Activ_Sustainability Table_V3.mp4",
      }
      ,
      {
        title: "Conveyor Belt",
        description: "يواجه الزوار حزام ناقل تفاعلي يعرض المنتجات مع شاشة OLED لتعزيز التفاعل.تتوقف كل قطعة عند الشاشة لتقديم معلومات مفصلة عن الميزات والخدمات قبل الانتقال بسلاسة إلى المنتج التالي.توفر هذه التجربة عرضًا شاملًا للعلامة التجارية والخدمات بطريقة غامرة ومبسطة، مما يمنح الزوار فهمًا أعمق.",
        video: "/videos/Activ _ Conveyer Belt.mp4",
      }
      ,
      {
        title: "The Hive",
        description: "لا يقتصر الأمر على التمتع بالتمثال فقط، بل يدمج التكنولوجيا شاشات هولوغرافية volumetric لتقديم محتوى جذاب حي.يبلغ ارتفاع التحفة 4.2 متر، وتحتوي على إطار هيكلي مزين بـ LEDs و33 شاشة Ultra HD على لولب تصاعدي.يمكن استخدام التقنية بشكل فردي أو متكامل لتقديم رسومات غامرة، عروض تفاعلية، أو حوار مباشر مع ذكاء اصطناعي يرفع سرد العلامة التجارية إلى مستويات جديدة.",
        video: "/videos/Activ_The Hive.mp4",
      }
      ,
      {
        title: "Paradigm Tunnel",
        description: "عند مرور الزوار، تتحول الجدران إلى سقف ثم تعود لتغلفهم في قصة تتكشف حولهم.يرافقهم سرد صوتي يأخذهم في مغامرة ملحمية بين الإنجازات الماضية والحاضر المميز وانطلاقة نحو المستقبل.يعرض الممر شاشات Ultra HD بحجم 85 بوصة تتحرك وتتغير بسلاسة، ليخلق تجربة غامرة تترك انطباعًا دائمًا.",
        video: "/videos/Activ_The Hive.mp4",
      }
      ,
      {
        title: "The Gyroscope",
        description: "يتفاعل الزوار مع تركيب كوانتم درام الحركي الذي يجذب الانتباه ويثير المشاعر ويخلق لحظات لا تُنسى.يتألف من أربع حلقات مزينة بـ LEDs دقيقة وكروم أنيق تدور بشكل رائع لتعرض محتوى مذهل، ويصل قطره إلى 4.2 متر.يقدم هذا التركيب حلاً ثوريًا لتحويل سرد القصص إلى تجربة تفاعلية وغامرة، مع إمكانية تخصيص الحجم وفقًا للمساحة أو متطلبات العميل.",
        video: "/videos/Activ _ Gyroscope redo.mp4",
      }
      ,
      {
        title: "The Warp",
        description: "يختبر الزوار The Warp تلاقي الفن والتقنية من خلال عرض ضوئي وحركي ضمن إطار مثمن.يتميز بصور عالية الدقة وحركة مخصصة، مع حجم قابل للتكييف ليناسب أي مساحة ويعزز سرد العلامة التجارية والأداءات الحية وأجواء الفعاليات.يقدم تركيبًا حركيًا غامرًا يتيح للعلامات التجارية ومنظمي الفعاليات منصة مبتكرة للمعارض وإطلاق المنتجات والعروض الحية، مع تأثير لا يُنسى.",
        video: "/videos/Activ_The Warp.mp4",
      }
      ,
      {
        title: "Tesseract",
        description: "يجذب الهولوغرافيك تيسراكت الزوار فورًا بشاشاته الشفافة المتعددة التي تخلق تأثيرًا ثلاثي الأبعاد مذهلًا.عند اقترابهم، تنبض المجسّم بالحياة ليعرض محتوى هولوغرافيًا نابضًا يمثل شعار العلامة التجارية ومنتجاتها وابتكاراتها عبر تحركات ديناميكية غامرة.توفر هذه التجربة عرضًا مبهرًا يلهم الزوار ويعكس رؤية العلامة والتزامها بأحدث الحلول التقنية.",
        video: "/videos/Activ_Tesseract redo.mp4",
      }
      ,
      {
        title: " Metamorphosis",
        description: "يجذب الزوار فورًا تمثال الكرة الحركية المتغيرة الشكل داخل قفص شبكي شفاف بمساحة 6x6 متر، حيث تتلألأ أسطحه وتعكس محتوى رقميًا مذهلًا.تعرض الرسوم المتحركة الديناميكية ابتكارات وتقدمات رئيسية في القدرات الدفاعية، مما يخلق جوًا غامرًا وغنيًا.ترمز قدرة الكرة على التغير إلى التطور المستمر والتقدم الناتج عن جهود البحث والتطوير، ملهمة الزوار بقصة بصرية للنمو والتكيف والإمكانات اللامحدودة.",
        video: "/videos/Activ_Metamorphosis.mp4",
      }
      ,
      {
        title: "Celestial Spiral",
        description: "يخوض الزوار رحلة داخل تحفة معمارية مزودة بشاشات عاكسة volumetric تمنح تجربة بصرية مذهلة.تتميز Celestial Spiral بقدرات سرد قصصي متقدمة تضم 33 شاشة فائقة الدقة وحلزونًا بارتفاع 4.2 متر وتفاعلات لحظية عبر الذكاء الاصطناعي.تتيح التقنية عرض قصة العلامة التجارية بطريقة غامرة ولا تُنسى، مع إمكانيات لا محدودة للرسوم التفاعلية والتجارب البصرية الجاذبة.",
        video: "/videos/Activ_Celestial Spiral_v2.mp4",
      }
      ,
      {
        title: "The Twist",
        description: "يخوض الزوار رحلة عبر هيكل بطول 4.2 متر بقاعدة عاكسة تغمرهم في احتفال بصري يجسّد طموح المدينة في إعادة تعريف المستقبل الرقمي.تحيطهم إضاءة Neopixel DMX المتزامنة وشاشات فائقة الدقة ومؤثرات هولوغرافية تروي قصة رقمية جذابة ضمن تصميم أنيق ومستدام مصنوع من مواد معاد تدويرها.يعد هذا التركيب مثاليًا للمعارض والفعاليات وتفعيل العلامات التجارية، حيث يبرز رؤية العلامة بطريقة مبتكرة وواعية بيئيًا.",
        video: "/videos/Activ_The Twist.mp4",
      }
      ,
      {
        title: "Mannequin with LED Head",
        description: "يتفاعل الزوار مع المانيكان التفاعلي الذي يعرض محتوى مخصصًا من زوايا متعددة ويعمل كنقطة استعلام تقنية في جميع الاتجاهات.يمكن استخدامه كمنصة معلومات تفاعلية تقدم تجربة جذابة وشاملة للزوار.يمكن تطويره ليشمل كاميرات وتتبعًا دقيقًا للمستخدم باستخدام الذكاء الاصطناعي لتقديم تفاعلات مخصّصة تترك انطباعًا قويًا.",
        video: "/videos/Activ_Mannequin.mp4",
      }

      ,
      {
        title: "The Patola",
        description: "جذب Patola الزوار كقطعة حركية تمزج بين الفن والتقنية، حيث تدور حلقاته المضيئة لتجسّد الطاقة والقوة وتقدّم عرضًا لا يُنسى.ترمز الحلقات الدوارة إلى الاستدامة والحركة والتجدد، مع مؤثرات صوتية وضوئية متزامنة تعكس دورة الطبيعة والابتكار.يُعد Patola عنصرًا بصريًا محوريًا في المعارض والفعاليات، يخلق تجربة حسية ملهمة ويثير نقاشات حول مستقبل الطاقة والاستدامة.",
        video: "/videos/Activ_The Patola redo.mp4",
      }

      ,
      {
        title: "The Peekaboo",
        description: "تأسر رحلة Peekaboo الجمهور بعرض LED دوار وتفاعل متعدد الحواس يترك انطباعًا دائمًا.تحتوي على منصة دوارة بقطر 6 أمتار وشاشات LED عالية الدقة مع تحكم دقيق وحساسات تفاعلية وصوت اتجاهي لتعزيز الانغماس.توفر تجربة قوية وملفتة للانتباه في إطلاق المنتجات والمعارض والفعاليات الكبرى، مما يجعل العلامة التجارية بارزة ولا تُنسى.",
        video: "/videos/Activ_The Peekaboo redo.mp4",
      }

      ,
      {
        title: "Tunnel of Fame",
        description: "يدخل الزوار النفق المخصص وينغمسون فورًا في هولوبوكس تفاعلية تعرض محتوى خبير ومعلومات جذابة.يمكنهم استكشاف نقاط تفاعلية متعددة للتعرف أكثر على العلامة التجارية والمنتجات والصناعة.يختتم النفق بتجربة خروج ديناميكية، مما يترك الزوار مطلعين ومتواصلين مع العلامة التجارية.",
        video: "/videos/Activ_Tunnel of Fame.mp4",
      }

      ,
      {
        title: "Static Lenticular Facade",
        description: "يجذب الزوار بتصاميمه المبهرة، مما يعزز التفاعل والمشاركة مع المحتوى.يتميز بقرص كوانتم حركي بقطر 4.2 متر مزين بـ LEDs دقيقة وكروم أنيق، يعرض محتوى مذهل أثناء دوران حلقاته.يقدم تجربة ثورية للعلامات التجارية والعروض الحية، ليكون بوابة تفاعلية لتحويل سرد القصص إلى تجربة حركية جذابة.",
        video: "/videos/Activ_Lenticular Facade_Static redo.mp4",
      }

      ,
      {
        title: "Kinetic Lenticular Facade",
        description: "تجذب الشاشات العدسية LED الزوار بتغيير تصاميمها في الوقت الحقيقي، مما يعزز التفاعل والمشاركة.توفر الشاشات قدرات ديناميكية لعرض الرسوم المتحركة والفيديوهات، وتتكيف مع موضوعات الفعاليات واحتياجات المباني.تحوّل الواجهة الثورية الهندسة الحركية إلى فن حي، لتخلق تجربة بصرية جذابة وتترك انطباعًا لا يُنسى للزوار.",
        video: "/videos/Activ_Lenticular Facade_Static redo.mp4",
      }

      ,
      {
        title: "Kinect Sensor Motion Activated LED Wall",
        description: "تتفاعل الجدار الحركي مع حركة الزوار والمدخلات الحسية ليخلق عرضًا ديناميكيًا وجذابًا يعزز أجواء الجناح.يمكن للجدار عرض شعار العلامة التجارية أو محتوى تفاعلي.يمكن تخصيص الجدار حسب حجم الجناح أو استخدامه كتركيب دائم، ليكون مركزًا بارزًا يخلق تجربة غامرة ولا تُنسى للزوار.",
        video: "/videos/Activ_Kinect Sensor Motion Activated LED Wall redo.mp4",
      }
      ,
      {
        title: "Kinetic Wall",
        description: "تجذب الجدار الحركي الزوار بحركته الديناميكية المذهلة التي تعزز مساحة المعرض.الحركة التفاعلية تثير الفضول وتزيد من التفاعل، مما يترك تجربة لا تُنسى للزوار.يمكن تخصيص الجدار حسب حجم الجناح أو استخدامه كتركيب دائم، ليكون مركزًا بارزًا يعكس حيوية وجوهر العلامة التجارية.",
        video: "/videos/Activ_Kinetic Wall.mp4",
      }  ,
      {
        title: "Kinetic Ceiling",
        description: "يقوم السقف الحركي بتحريك المكان بحركة ديناميكية وسلسة، مما يجذب انتباه الزوار ويعزز الأجواء.يعرض السقف حركة متزامنة وإضاءة وتأثيرات قابلة للتخصيص، لخلق تجربة لا تُنسى وتأثير بصري وعاطفي قوي.يمكن تكييفه ليناسب أي مكان أو جناح، سواء كتركيب مؤقت أو دائم لإضافة لمسة فنية وتقنية مبتكرة.",
        video: "/videos/Activ_Kinetic Ceiling.mp4",
      }  ,
      {
        title: "Holocube + OLED",
        description: "تجمع شاشة OLED الشفافة بين العالمين الرقمي والواقعي لتقديم تجربة تفاعلية حساسة للمس.تعرض المعلومات مع الحفاظ على الشفافية، مما يتيح للزوار رؤية البيئة الواقعية، مع إبراز المنتجات عبر هولوجرام ثلاثي الأبعاد.تخلق هذه التجربة الغامرة أجواء مستقبلية تجمع بين الابتكار والتكنولوجيا وسياق العالم الحقيقي في قطاع الرعاية الصحية.",
        video: "/videos/Activ_Holocube + OLED.mp4",
      }  ,
      {
        title: "Kinetic Globe Immersive",
        description: "يجذب الزوار الكرة الأرضية الحركية التي تعرض بشكل ديناميكي أهم المعلومات. تنقسم الكرة إلى أربعة أقسام لتسليط الضوء على مبادرات مختلفة ثم تعود لتشكل عرضًا متكاملًا. توفر هذه التجربة تفاعلية ومعلوماتية تلهم الزوار بالتقدم في الابتكار التكنولوجي وتطوير القوى العاملة.",
        video: "/videos/Activ_Kinetic Globe Immersive.mp4",
      }  ,
      {
        title: "Immersive Room",
        description: "تم تصميم النموذج لتقديم تجربة تفاعلية غامرة وواقعية تتماشى مع رؤية العلامة التجارية.يتيح عرض سيناريوهات متعددة أو مفهوم واحد باستخدام نموذج ثلاثي الأبعاد محاط بالزجاج مع إمكانية التخصيص الكامل.تعرض شاشات LED المحتوى الديناميكي، مع تحكم سلس بالتفاعل عبر جهاز تحكم أو iPad لتقديم تجربة جذابة ومتكاملة.",
        video: "/videos/Activ_Immersive Room.mp4",
      }  ,
      {
        title: "Kinetic Discovery",
        description: "يرحب الزوار بطاولة حركية جذابة وجدار LED نابض بالحياة لتقديم تجربة تفاعلية.يمكن للزوار التفاعل مع شاشة OLED الشفافة لاستكشاف المنتجات أو العلامة التجارية بشكل مباشر.تخلق هذه التجربة بيئة غامرة وتفاعلية، مما يمنح الزوار معلومات ورؤية واضحة عن الخدمات وتأثيرها.",
        video: "/videos/Activ_Kinetic Discovery.mp4",
      }  ,
      {
        title: "Kinetic Hoist Platform",
        description: "يخطو الزوار إلى منطقة Race Elevate ويثبتون بأمان على منصة السباق الطافية لتجربة مثيرة.يمكنهم استخدام نظارات الواقع الافتراضي للانغماس الكامل في سباق عالي السرعة مع شاشة LED ضخمة.توفر التقنية تجربة سباق غامرة وممتعة، مناسبة للفعاليات والمعارض وحملات العلامات التجارية لإشراك الجمهور.",
        video: "/videos/Activ_Kinetic Hoist Platform.mp4",
      }  ,
      {
        title: "Isolation Pod",
        description: "وفر الكبسولة العازلة للزوار تجربة شخصية وغامرة مع العلامة التجارية.تحتوي داخليًا على شاشة شفافة وتحكم باللمس لاستكشاف المنتجات والخدمات بشكل تفاعلي.تقدم طريقة جذابة مدفوعة بالتقنية لزيادة الوعي وفهم العلامة التجارية.",
        video: "/videos/Activ_Isolation Pod.mp4",
      }  ,
      {
        title: "Quantum LED Sculpture",
        description: "تم تصميم تمثال كونتم LED لجذب الانتباه وتعزيز تجربة العلامة التجارية من خلال تصاميم LED ديناميكية قابلة للتخصيص يتيح دمج الشعارات والرسائل والعناصر الإبداعية، مما يجعله مثالياً للفعاليات والمعارض وتفعيل العلامات التجارية.مُصمم بالكامل وفق احتياجات العميل ليخلق تجارب غامرة ويترك انطباعاً دائماً.",
        video: "/videos/Activ_Quantum LED Sculpture.mp4",
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

