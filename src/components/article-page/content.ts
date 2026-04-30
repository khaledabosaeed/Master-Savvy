export type Language = "en" | "ar"

export interface Article {
  id: string
  title: string
  date: string
  image: string
  category: string
  content: {
    intro: string
    sections: {
      title: string
      content: string
      list?: string[]
    }[]
  }
}

export const articlesData: Record< Language,Record<string, Article>> = {
ar:{
    
"interactive-displays-future": {
  "id": "interactive-displays-future",
  "title": "كيف تعزز الابتكارات الحديثة تجربة الزائر في المعارض المعاصرة؟",
  "date": "ديسمبر 5, 2024",
  "image": "/news/news-1.jpg",
  "category": "ابتكار",
  "content": {
    "intro": "تشهد المعارض المعاصرة تحولاً عميقاً في طريقة تصميم تجارب الزوار. لم يعد الهدف مجرد عرض المعلومات، بل خلق بيئات تفاعلية تُشرك الزائر، وتُحفّز فضوله، وتمنحه تجربة سلسة وقابلة للتذكّر. وتلعب الابتكارات الحديثة دوراً محورياً في هذا التحول، من خلال دمج التكنولوجيا بالمساحة المادية بشكل ذكي ومدروس.",
    "sections": [
      {
        "title": "من التفاعل المحدود إلى التجربة الشاملة",
        "content": "تعتمد المعارض الحديثة على تحويل الزائر من متلقٍ سلبي إلى مشارك فعلي. تتيح الشاشات التفاعلية، ومناطق الألعاب، والتجارب الرقمية المدعومة بالذكاء الاصطناعي مسارات متعددة للتفاعل، ما يزيد من زمن التواجد ويعمّق الارتباط بالمحتوى.\n\nأصبحت التجربة هي العنصر الأساسي، وليس العرض بحد ذاته."
      },
      {
        "title": "Mr. Savvy: واجهة ذكية لتجربة إنسانية",
        "content": "من أبرز عناصر التفاعل في معارض Savvy هو Mr. Savvy، الروبوت الإنساني الذي يعمل كسفير للتكنولوجيا الذكية. يساهم Mr. Savvy في استقبال الزوار، وتوجيههم، وتحويل الابتكار إلى تجربة مفهومة وقريبة من الإنسان.\n\nوجود واجهة بشرية ذكية داخل المعرض يخلق نقطة جذب فورية، ويُسهم في كسر الحواجز بين الزائر والتكنولوجيا."
      },
      {
        "title": "تجارب تفاعلية قائمة على الواقع",
        "content": "تعتمد Savvy على تفعيل ابتكارات مطبّقة فعلياً داخل المعارض، مثل:\n\nAI Photo Booths التي تتيح للزوار إنشاء محتوى بصري مخصص وسهل المشاركة.\n\nGaming Zones التي تحوّل المعرض إلى مساحة تفاعلية وحيوية.\n\nأنظمة تتبع الحركة وتعبيرات الوجه التي تساعد على فهم سلوك الزوار ومستوى التفاعل بشكل غير تدخلي.\n\nشاشات غامرة مثل الشاشات الأسطوانية، والكروية، والأنمورفية التي تضيف بعداً بصرياً وتجريبياً جديداً.\n\nهذه التقنيات لا تُستخدم للعرض فقط، بل لتصميم تجربة متكاملة تُشرك الزائر على عدة مستويات."
      },
      {
        "title": "التكنولوجيا كجزء من الفضاء المعماري",
        "content": "تعتمد Savvy على دمج الشاشات الذكية ضمن البنية المعمارية للمعارض. من خلال شبكات DOOH، والواجهات الإعلامية، والشاشات الضخمة والمتعددة الأشكال، تتحول المساحة إلى منظومة إعلامية متصلة.\n\nيسمح هذا النهج بإنشاء مسار بصري موحّد، وتناسق في الرسائل، وتجربة غامرة تمتد عبر كامل المعرض."
      },
      {
        "title": "نحو معيار جديد لتجربة الزائر",
        "content": "تعيد الابتكارات الحديثة تعريف تجربة الزائر في المعارض. فالتجارب التي تجمع بين التفاعل، والذكاء، والتصميم المكاني تخلق ارتباطاً أعمق وتترك أثراً طويل الأمد.\n\nمن خلال هذا التوجه، تساهم Savvy في نقل المعارض من فضاءات عرض تقليدية إلى بيئات حيّة تُصمَّم حول الإنسان والتجربة."
      }
    ]
  }
}


,
  "Advertising-Screens": {
    "id": "Advertising-Screens",
    "title": "كيف تُشكّل الشاشات الإعلانية مستقبل التسويق التفاعلي",
    "date": "ديسمبر 3, 2024",
    "image": "/news/news-2.jpg",
    "category": "ذكاء اصطناعي",
    "content": {
      "intro": "لم تعد الشاشات الإعلانية مجرد وسائط عرض ثابتة، بل تطورت لتصبح أنظمة إعلامية ذكية وغامرة. في البيئات العامة والتجريبية، تلعب هذه الشاشات اليوم دوراً محورياً في جذب الانتباه، وتحفيز التفاعل، وخلق تجارب تُرسّخ في الذاكرة.\n\nيمثل مستقبل التسويق التفاعلي تحولاً في كيفية تفاعل الشاشات مع المكان والمحتوى والجمهور.",
      "sections": [
        {
          "title": "من الشاشات المسطحة إلى الوسائط المكانية",
          "content": "لم تعد الشاشات الإعلانية الحديثة مقتصرة على الأشكال التقليدية. فقد ظهرت تنسيقات متقدمة مثل الشاشات الأنمورفية (Anamorphic Screens)، والشاشات الأسطوانية، والشاشات الكروية (Globe Screens)، التي تضيف عمقاً وحركة وخداعاً بصرياً يلفت الانتباه بشكل فوري.\n\nمن خلال تجاوز حدود الإطار المسطح، تتحول الإعلانات من مجرد مشاهدة إلى تجربة بصرية غامرة تتكامل مع الفضاء المحيط."
        },
        {
          "title": "التفاعل دون احتكاك",
          "content": "لا يعتمد التسويق التفاعلي اليوم على اللمس فقط. تسمح تقنيات استشعار الحركة، ورصد الحضور، والتحليل المدعوم بالذكاء الاصطناعي للشاشات بالتفاعل تلقائياً مع سلوك الجمهور.\n\nيتكيّف المحتوى في الوقت الحقيقي مع حركة الأشخاص أو قربهم أو مستوى تفاعلهم، مما يخلق تجربة طبيعية وسلسة دون الحاجة إلى تدخل مباشر من المستخدم."
        },
        {
          "title": "الشاشات كنظم إعلامية ذكية",
          "content": "أصبحت الشاشات الإعلانية جزءاً من منظومات مترابطة. يمكن تنسيق المحتوى، ومزامنته، وتكييفه عبر أنواع مختلفة من الشاشات والمواقع. كما تسمح أدوات التحليل بقياس التفاعل وتحسين الرسائل مع مرور الوقت.\n\nبهذا، تتحول الشاشات من وحدات منفصلة إلى شبكات إعلامية متجاوبة وقابلة للتطوير."
        },
        {
          "title": "كيف تمكّن Savvy التسويق التفاعلي",
          "content": "تعتمد Savvy مقاربة تعتبر الشاشات الإعلانية منصات إعلامية تجريبية متكاملة. من خلال شبكات DOOH، والواجهات الإعلامية الرقمية، والشاشات الأنمورفية، والشاشات الكروية، والمنشآت الرقمية واسعة النطاق، تتيح Savvy تنفيذ حملات تفاعلية على مستوى معماري.\n\nومن خلال دمج تنسيقات الشاشات المتقدمة مع إدارة المحتوى وطبقات التفاعل الذكية، تحوّل Savvy الشاشات الإعلانية إلى بيئات تواصل متكيفة، مصممة للتفاعل وليس للعرض فقط."
        },
        {
          "title": "معيار جديد للتفاعل في الفضاء العام",
          "content": "مع انتقال الإعلان إلى ما بعد الصيغ التقليدية، تعيد الشاشات التفاعلية تعريف التفاعل في الفضاءات العامة. فالتجارب البصرية الغامرة والمحتوى المتجاوب والسرد المكاني تخلق ارتباطاً أعمق مع الجمهور.\n\nالعلامات التي تعتمد هذا النهج تنتقل من منطق الظهور إلى منطق التجربة، حيث تصبح الشاشات وسائط حيّة وليست مجرد أسطح عرض."
        }
      ]
    }
  }
,
  "innovation-mode": {
    "id": "innovation-mode",
    "title": "الابتكار ببساطة: حلول عملية تخدم شركات اليوم وتدعم نمو أعمال الغد",
    "date": "نوفمبر 28, 2024",
    "image": "/news/news-3.jpg",
    "category": "إعلان رقمي",
    "content": {
      "intro": "غالباً ما يُفهم الابتكار على أنه تعقيد أو تغيير جذري أو استثمار مكلف. لكن في الواقع، يتمثل الابتكار الأكثر فاعلية اليوم في الحلول العملية والمتكاملة التي تُعالج تحديات تشغيلية حقيقية. بالنسبة للشركات التي تعمل في أسواق سريعة التغير، ينجح الابتكار عندما يحقق الوضوح والكفاءة وقيمة قابلة للقياس، دون إضافة أعباء غير ضرورية.\n\nلم يعد الابتكار الحديث مرتبطاً بالتجربة من أجل التجربة، بل ببناء أنظمة قابلة للتشغيل، والتوسع، والتكيّف مع الواقع.",
      "sections": [
        {
          "title": "الابتكار كميزة تشغيلية",
          "content": "تواجه الشركات اليوم ضغوطاً متزايدة للتحديث مع الحفاظ على الاستقرار. يصبح الابتكار ذا معنى عندما يُحسّن العمليات القائمة بدلاً من استبدالها بالكامل. يركز الابتكار العملي على تطوير أساليب العمل، والتواصل، والتفاعل مع الجمهور، بطريقة تدريجية وقابلة للتطبيق.\n\nهذا التحول ينقل الابتكار من المفهوم النظري إلى حلول قابلة للتنفيذ، يمكن اختبارها في بيئات حقيقية وتطويرها بمرور الوقت."
        },
        {
          "title": "التكنولوجيا كأداة تبسيط",
          "content": "ساهم تطور الذكاء الاصطناعي، والأتمتة، والبنى الرقمية المتصلة في جعل الابتكار أكثر سهولة في التبني. تتيح المنصات السحابية والحلول المعيارية إدخال قدرات جديدة دون الحاجة إلى تغييرات جذرية أو فترات تنفيذ طويلة.\n\nعندما تُدمج التكنولوجيا بشكل صحيح، فإنها تدعم سرعة اتخاذ القرار، وتحسّن التنسيق، وتزيد من مرونة العمليات. القيمة الحقيقية لا تكمن في تعقيد الأدوات، بل في مدى انسجامها مع سير العمل اليومي."
        },
        {
          "title": "من الحضور الرقمي إلى التجارب الذكية",
          "content": "يتجه الابتكار اليوم بشكل متزايد إلى البيئات المادية، مثل المعارض، والمساحات العامة، والمقار المؤسسية، والواجهات الحضرية. في هذه السياقات، يجب أن تعمل التكنولوجيا على نطاق واسع، مع الحفاظ على بساطة التفاعل وسهولة الفهم.\n\nتُحوّل الشاشات الضخمة، والمنشآت التفاعلية، والواجهات الإعلامية الرقمية المساحات إلى منصات تواصل حيّة. وعند دمجها مع التحليل الذكي للبيانات، تصبح هذه البيئات قادرة على التفاعل مع سلوك الجمهور والسياق الزمني."
        },
        {
          "title": "كيف تطبق Savvy الابتكار العملي",
          "content": "تُسهم Savvy في الابتكار من خلال الربط بين المساحات المادية والأنظمة الرقمية الذكية. عبر شبكات DOOH، والواجهات الإعلامية، والشاشات الأسطوانية، وشاشات LED كبيرة الحجم، تُمكّن Savvy المؤسسات من تطبيق الابتكار حيث يوجد الجمهور فعلياً.\n\nولا يقتصر دور Savvy على البنية التحتية فقط، بل يشمل إدارة المحتوى، وطبقات التفاعل، وقياس الأداء، مما يجعل الابتكار قابلاً للتشغيل، والقياس، والتطوير المستمر.\n\nيركز نهج Savvy على بناء منظومات متكاملة تعمل فيها المساحة، والمحتوى، والبيانات كوحدة واحدة."
        },
        {
          "title": "إضفاء الطابع الإنساني على الابتكار",
          "content": "يُعد الوصول وسهولة الفهم عنصرين أساسيين في الابتكار العملي. فالتكنولوجيا لا تحقق أثراً حقيقياً ما لم تكن مفهومة وقابلة للتفاعل. من خلال التجارب التفاعلية، ومناطق الألعاب، وأكشاك الذكاء الاصطناعي، والواجهات الإنسانية مثل Mr. Savvy، يتحول الابتكار إلى تجربة ملموسة وقريبة من الجمهور.\n\nتساعد هذه العناصر على تبسيط التقنيات المتقدمة وتحويلها إلى تجارب يمكن للزوار التفاعل معها وتذكّرها دون الحاجة إلى شروحات تقنية معقدة."
        },
        {
          "title": "الابتكار كقدرة طويلة الأمد",
          "content": "لم يعد الابتكار مبادرة مؤقتة، بل قدرة أساسية يجب أن تتطور مع احتياجات الأعمال. الحلول العملية القابلة للتوسع والإدارة، والمبنية على حالات استخدام واقعية، هي التي تدعم النمو المستدام.\n\nمن خلال التركيز على التكامل، والبساطة، والتطبيق العملي، يصبح الابتكار أساساً مستقراً للنمو بدلاً من مخاطرة تشغيلية."
        }
      ]
    }
  }
  ,
"create-high-quality": {
  "id": "create-high-quality",
  "title": "كيف نُنشئ معارض وعروضاً عالية الجودة تترك انطباعاً أولياً قوياً",
  "date": "نوفمبر 28, 2024",
  "image": "/news/news-1.jpg",
  "category": "مشاريع",
  "content": {
    "intro": "في المعارض والبيئات العامة واسعة النطاق، يتكوّن الانطباع الأول خلال ثوانٍ معدودة. يقيّم الزوار المكان مباشرة من خلال التأثير البصري، ومستوى التفاعل، ومدى انسجام التكنولوجيا مع الفضاء المحيط. لذلك، لم تعد العروض عالية الجودة عناصر جمالية فقط، بل أصبحت أدوات استراتيجية تؤثر في الإدراك، والتفاعل، ومصداقية العلامة.\n\nاليوم، يتطلب بناء انطباع أول قوي مقاربة متكاملة تجمع بين المحتوى، والتصميم، والبنية الرقمية على نطاق معماري.",
    "sections": [
      {
        "title": "من العرض الثابت إلى التجربة التفاعلية",
        "content": "لم تعد المعارض الحديثة تعتمد على الشاشات الثابتة أو المواد المطبوعة فقط. بل تتجه بشكل متزايد نحو تجارب تفاعلية تحوّل الزائر من متلقٍ سلبي إلى مشارك فعلي.\nتسهم الشاشات الضخمة، والمساحات الرقمية الغامرة، والمناطق التفاعلية في جذب الانتباه وزيادة مدة التفاعل وتعزيز التذكّر."
      },
      {
        "title": "Mr. Savvy: واجهة إنسانية للتكنولوجيا",
        "content": "من أبرز عناصر التميز في تجارب Savvy هو Mr. Savvy، الروبوت الإنساني الذي يعمل كسفير للتقنيات الذكية.\nيُجسّد Mr. Savvy التكنولوجيا بشكل إنساني، حيث يستقبل الزوار، ويقود التفاعل، ويحوّل الابتكار إلى تجربة مفهومة وقريبة من الجمهور.\n\nوجود عنصر بشري ذكي داخل المعرض يخلق نقطة جذب قوية، ويُسهم في تعزيز التفاعل، والتغطية الإعلامية، والمشاركة على المنصات الرقمية."
      },
      {
        "title": "تفعيل التجربة من خلال تقنيات تفاعلية حقيقية",
        "content": "تعتمد Savvy على تفعيل تجارب قائمة على المشاركة الفعلية، وليس العرض فقط، مثل:\n\nBurn & Earn Activations\nتجارب قائمة على التحدي والمكافأة تشجع الزوار على التفاعل والمشاركة النشطة، مما يزيد من زمن التواجد ويخلق ارتباطاً مباشراً مع التجربة.\n\nGaming Zones\nمناطق ألعاب تفاعلية تحوّل مساحة المعرض إلى بيئة ديناميكية، تجذب مختلف الفئات، وتشجع على التفاعل المتكرر.\n\nAI Photo Booths\nأكشاك مدعومة بالذكاء الاصطناعي تتيح للزوار إنشاء محتوى بصري مخصص وسهل المشاركة، دون الحاجة إلى شرح أو توجيه معقّد.\n\nAI Tracking & Expression Monitoring Screens\nشاشات ذكية ترصد الحركة وتعبيرات الوجه بشكل فوري، ما يساعد على فهم تفاعل الجمهور ومستوى الانتباه، وتحويل التفاعل المادي إلى بيانات تحليلية قابلة للاستفادة."
      },
      {
        "title": "التكنولوجيا كجزء من البنية المعمارية",
        "content": "لا تقتصر العروض عالية الجودة على المساحات الداخلية فقط. تعمل Savvy على دمج التكنولوجيا ضمن الهياكل المعمارية من خلال:\n\nشبكات DOOH\n\nالواجهات الإعلامية الرقمية\n\nالشاشات الأسطوانية (Cylinder Screens)\n\nشاشات LED كبيرة الحجم\n\nيحوّل هذا الدمج المباني والهياكل إلى منصات تواصل رقمية حيّة، تضمن حضوراً بصرياً قوياً وتناسقاً في الرسائل عبر جميع نقاط التفاعل."
      },
      {
        "title": "انطباعات أولى تدوم",
        "content": "تُبنى المعارض الناجحة على الوضوح، والتكامل، وجودة التنفيذ. وعندما تجتمع البنية الرقمية واسعة النطاق، والتفاعل الذكي، والواجهة الإنسانية، تتحول المعارض من عروض ثابتة إلى منظومات حيّة تترك أثراً طويل الأمد.\n\nمن خلال هذا النهج، تساعد Savvy الجهات المنظمة والعلامات على تقديم انطباع أول قوي يتحول إلى تجربة متكاملة وذات معنى."
      }
    ]
  }
}
,"smart-ai-tools": {
  "id": "smart-ai-tools",
  "title": "أدوات الذكاء الاصطناعي الذكية: تحويل التفاعلات الخارجية إلى رؤى ذكية",
  "date": "ديسمبر 3, 2024",
  "image": "/news/news-2.jpg",
  "category": "ذكاء اصطناعي",
  "content": {
    "intro": "لم تعد التفاعلات الخارجية تقتصر على الظهور البصري أو عدد المشاهدات فقط. مع تطور تقنيات الذكاء الاصطناعي، وأجهزة الاستشعار، والبنية التحتية الذكية، أصبحت المساحات الخارجية مصدراً مهماً للبيانات القابلة للتحليل والاستفادة. اليوم، تُمكّن أدوات الذكاء الاصطناعي المؤسسات من تحويل التفاعل المادي إلى رؤى ذكية تساعد على تحسين التجربة، ودعم اتخاذ القرار، وقياس الأثر الفعلي.\n\nمع ازدياد الاعتماد على التجارب الذكية في الأماكن العامة، والمعارض، والمساحات الحضرية، أصبحت القدرة على جمع البيانات وتحليلها عاملاً استراتيجياً أساسياً.",
    "sections": [
      {
        "title": "من الظهور إلى الذكاء",
        "content": "اعتمدت الوسائل الخارجية التقليدية على قياس الوصول والانطباعات. أما اليوم، فتضيف تقنيات الذكاء الاصطناعي طبقات تحليل متقدمة تتيح فهم كيفية تفاعل الجمهور مع البيئة المحيطة.\nمن خلال تقنيات مثل الرؤية الحاسوبية، والذكاء الاصطناعي الطرفي (Edge AI)، وأجهزة الاستشعار، يمكن تحليل حركة الزوار، ومدة التفاعل، وأنماط السلوك، وأوقات الذروة، دون التأثير على تجربة المستخدم."
      },
      {
        "title": "جمع البيانات في الوقت الفعلي",
        "content": "تتيح الأنظمة الذكية في البيئات الخارجية جمع البيانات بشكل مستمر وعلى نطاق واسع. يمكن للكاميرات الذكية تقدير كثافة الحركة وأنماط التفاعل، بينما تقيس أجهزة الاستشعار القرب والحركة والعوامل البيئية.\nوعند ربط هذه البيانات بمنصات تحليل رقمية، تتحول إلى أداة فعالة لتحسين المحتوى، وتخطيط المساحات، وتوقيت الرسائل.\n\nفي البيئات ذات الكثافة العالية، مثل الفعاليات الكبرى والمساحات العامة، تسمح هذه الرؤى باتخاذ قرارات فورية بدلاً من الاعتماد على تقارير لاحقة."
      },
      {
        "title": "محتوى أكثر ذكاءً وتفاعلاً",
        "content": "من أبرز استخدامات الذكاء الاصطناعي في البيئات الخارجية هو تحسين المحتوى المعروض. إذ يمكن للأنظمة الذكية تعديل الرسائل تلقائياً بناءً على عوامل سياقية مثل الوقت، وكثافة الجمهور، أو طبيعة الحدث.\n\nيساهم هذا النهج في تقديم محتوى أكثر ملاءمة للجمهور، ويعزز مستوى التفاعل دون الحاجة إلى تدخل يدوي مستمر."
      },
      {
        "title": "قياس الأثر بشكل أعمق",
        "content": "تتجاوز أدوات الذكاء الاصطناعي قياس عدد المشاهدات التقليدي، لتشمل مؤشرات أكثر دقة مثل مدة التفاعل، وتكرار التعرض، وأنماط الاستجابة.\nتساعد هذه البيانات الجهات المنظمة وأصحاب القرار على فهم ما يحقق التأثير الحقيقي، وتحسين التخطيط، وتطوير الاستراتيجيات المستقبلية بناءً على معطيات واقعية."
      },
      {
        "title": "كيف تساهم Savvy في بناء تجارب خارجية ذكية",
        "content": "تعمل Savvy على الربط بين البيئات المادية الخارجية والأنظمة الرقمية الذكية. من خلال دمج البنية التحتية الإعلامية الذكية، وأدوات التحليل المدعومة بالذكاء الاصطناعي، والمنصات المتصلة، تساعد Savvy المؤسسات على تحويل التفاعل الخارجي إلى بيانات قابلة للتحليل واتخاذ القرار.\n\nتوفر حلول Savvy منظومة متكاملة تشمل الشاشات الذكية، والتجارب التفاعلية، ولوحات التحكم التحليلية، مما يتيح تحسين المحتوى في الوقت الفعلي، وفهم سلوك الجمهور، وبناء استراتيجيات أكثر فعالية."
      },
      {
        "title": "نحو استراتيجيات خارجية قائمة على البيانات",
        "content": "مع استمرار تطور البيئات الخارجية، سيظل الذكاء الاصطناعي عنصراً أساسياً لاستخلاص القيمة من التفاعل المادي. لم تعد الأدوات الذكية خياراً إضافياً، بل أصبحت ضرورة لأي جهة تسعى إلى الكفاءة، والوضوح، ونتائج قابلة للقياس"
      }
    ]
  }
}


},

en:{
"interactive-displays-future": {
  "id": "interactive-displays-future",
  "title": "How Modern Innovations Are Enhancing Visitor Experiences in Contemporary Exhibitions",
  "date": "December 5, 2024",
  "image": "/news/news-1.jpg",
  "category": "Innovation",
  "content": {
    "intro": "Visitor experiences in contemporary exhibitions are undergoing a significant transformation. Audiences no longer expect static displays or one-directional information. Instead, they seek interactive, intuitive, and immersive environments that place them at the center of the experience. Modern innovations are redefining how exhibitions engage visitors by blending technology, space, and storytelling.",
    "sections": [
      {
        "title": "From Passive Viewing to Active Participation",
        "content": "Today’s exhibitions prioritize participation over observation. Interactive screens, gaming zones, and AI-powered experiences invite visitors to engage actively with content. This approach increases dwell time, enhances understanding, and creates more memorable journeys. Experience design has become as important as the content itself."
      },
      {
        "title": "Mr. Savvy: A Human Interface for Innovation",
        "content": "A distinctive element of Savvy’s exhibition experiences is Mr. Savvy, the humanoid robot ambassador. Mr. Savvy welcomes visitors, guides interactions, and translates advanced technology into an accessible, human-centered experience. By introducing a human interface, innovation becomes approachable, engaging, and easier to understand."
      },
      {
        "title": "Real-World Interactive Activations",
        "content": "Savvy builds visitor engagement through deployed, real-world activations, including AI Photo Booths that generate personalized and shareable content, gaming zones that turn exhibition spaces into dynamic participatory environments, AI-based tracking and expression monitoring systems that help understand visitor behavior, and immersive screen formats such as cylinder screens, globe screens, and anamorphic displays. These technologies work together to create layered experiences rather than isolated interactions."
      },
      {
        "title": "Technology Integrated into the Space",
        "content": "Savvy integrates digital media directly into the architectural fabric of exhibitions. Through DOOH networks, media façades, and large-scale digital installations, exhibition spaces become connected media environments. This integration ensures visual consistency, fluid navigation, and a cohesive narrative across the entire venue."
      },
      {
        "title": "A New Standard for Visitor-Centered Exhibitions",
        "content": "Modern innovation is reshaping exhibitions into living environments where technology supports engagement, clarity, and emotional connection. Experiences that combine intelligent interaction, immersive visuals, and thoughtful spatial design define the new standard. By focusing on human-centered innovation and scalable media systems, Savvy helps exhibitions evolve from static showcases into meaningful, experience-driven spaces."
      }
    ]
  }
}
,
  "Advertising-Screens": {
    "id": "Advertising-Screens",
    "title": "Smart AI Tools: Turning Outdoor Interactions into Intelligent Insights",
    "date": "December 3, 2024",
    "image": "/news/news-2.jpg",
    "category": "Artificial Intelligence",
    "content": {
      "intro": "Advertising screens have evolved from static display surfaces into intelligent, immersive media systems. In public and experiential environments, they now play a central role in capturing attention, encouraging interaction, and creating memorable experiences.\n\nThe future of interactive marketing lies in how screens engage with space, content, and people.",
      "sections": [
        {
          "title": "From Flat Displays to Spatial Media",
          "content": "Modern advertising screens are no longer limited to traditional flat formats. Advanced screen types such as anamorphic displays, cylinder screens, and globe screens introduce depth, motion, and visual illusion that instantly attract attention.\n\nBy extending content beyond the screen’s surface, advertising shifts from passive viewing to immersive visual experience."
        },
        {
          "title": "Interaction Without Friction",
          "content": "Interactive marketing no longer relies solely on touch. Motion sensing, presence detection, and AI-powered tracking allow screens to respond dynamically to audience behavior.\n\nContent adapts in real time based on movement, proximity, or engagement—creating intuitive interactions without interrupting the audience’s journey."
        },
        {
          "title": "Screens as Intelligent Media Systems",
          "content": "Advertising screens are increasingly part of connected ecosystems. Content can be orchestrated, synchronized, and adapted across multiple screen formats and locations. Performance insights enable continuous optimization, transforming physical advertising into a measurable and evolving channel.\n\nScreens are no longer isolated assets, but responsive media networks."
        },
        {
          "title": "How Savvy Enables Interactive Advertising",
          "content": "Savvy approaches advertising screens as experiential media platforms. Through DOOH networks, media façades, anamorphic screens, globe screens, and large-scale digital installations, Savvy enables brands to deploy interactive campaigns at architectural scale.\n\nBy combining advanced screen formats with content orchestration and intelligent interaction layers, Savvy transforms advertising screens into adaptive communication environments—designed for engagement rather than static visibility."
        },
        {
          "title": "A New Standard for Public Engagement",
          "content": "As advertising moves beyond traditional formats, interactive screens are redefining public engagement. Immersive visuals, responsive content, and spatial storytelling create experiences audiences remember and interact with.\n\nBrands that embrace this evolution move from exposure-driven advertising to experience-led communication, where screens become living media rather than passive surfaces."
        }
      ]
    }
  }
,
  "innovation-mode": {
    "id": "innovation-mode",
    "title": "Innovation Made Simple: Practical Solutions for Today’s Companies and Tomorrow’s Growth",
    "date": "December 3, 2024",
    "image": "/news/news-3.jpg",
    "category": "Digital Advertising",
    "content": {
      "intro": "Innovation is often misunderstood as complexity, disruption, or costly transformation. In reality, the most effective innovation today is practical, integrated, and focused on solving real operational challenges. For companies navigating fast-changing markets, innovation succeeds when it delivers clarity, efficiency, and measurable value—without unnecessary friction.\n\nModern innovation is no longer about experimentation for novelty. It is about building systems that operate, scale, and adapt in real-world conditions.",
      "sections": [
        {
          "title": "Innovation as an Operational Advantage",
          "content": "Companies today face increasing pressure to modernize while maintaining stability. Innovation becomes meaningful when it enhances existing processes rather than replacing them entirely. Practical innovation improves how organizations operate, communicate, and engage—through solutions that can be deployed progressively and refined over time.\n\nThis approach shifts innovation from abstract concepts to applied systems tested in real environments."
        },
        {
          "title": "Technology That Simplifies, Not Complicates",
          "content": "Advances in artificial intelligence, automation, and connected infrastructures have made innovation more accessible. Modular platforms and cloud-based systems allow organizations to introduce new capabilities without major restructuring or long implementation cycles.\n\nWhen technology is well integrated, it supports faster decision-making, improved coordination, and more responsive operations. The real value lies not in the complexity of tools, but in how seamlessly they integrate into daily workflows."
        },
        {
          "title": "From Digital Presence to Intelligent Experiences",
          "content": "Innovation increasingly takes place in physical environments—exhibitions, public spaces, corporate venues, and urban settings. Here, technology must operate at scale while remaining intuitive for users.\n\nLarge-format displays, interactive installations, and connected media surfaces transform spaces into communication platforms. Combined with data intelligence, these environments become adaptive systems that respond to audience behavior, context, and timing."
        },
        {
          "title": "How Savvy Applies Practical Innovation",
          "content": "Savvy enables practical innovation by bridging physical environments with intelligent digital systems. Through DOOH networks, media façades, cylinder screens, and large-scale LED displays, Savvy helps organizations deploy innovation where audiences actively engage.\n\nBeyond infrastructure, Savvy integrates content management, interaction layers, and performance monitoring—making innovation operational, measurable, and adaptable.\n\nRather than isolated technologies, Savvy focuses on connected ecosystems where media, space, and data function as one."
        },
        {
          "title": "Humanizing Innovation Through Interaction",
          "content": "Accessibility is central to practical innovation. Technology must be understandable and engaging to be effective. Through interactive experiences, gaming zones, AI-powered booths, and human interfaces such as Mr. Savvy, innovation becomes tangible rather than abstract.\n\nThese elements translate advanced technology into experiences people can immediately understand, interact with, and remember—without technical explanation."
        },
        {
          "title": "Innovation as a Long-Term Capability",
          "content": "For today’s companies, innovation is not a one-time initiative. It is a capability that evolves alongside business needs. Practical, scalable solutions grounded in real use cases are those that support sustainable growth.\n\nBy prioritizing integration, simplicity, and real-world application, innovation becomes a stable foundation rather than a disruptive risk."
        }
      ]
    }
  }
  ,
"create-high-quality": {
  "id": "create-high-quality",
  "title": "How to Create High-Quality Exhibits and Displays for Strong First Impressions",
  "date": "November 28, 2024",
  "image": "/news/news-1.jpg",
  "category": "Projects",
  "content": {
    "intro": "In exhibitions and large-scale public environments, first impressions are formed within seconds. Visitors immediately react to visual impact, interactivity, and the coherence between technology and space. High-quality exhibits are therefore not decorative elements, but strategic assets that shape perception, engagement, and brand credibility.\n\nCreating strong first impressions today requires an integrated approach that combines content, design, and digital infrastructure at an architectural scale.",
    "sections": [
      {
        "title": "From Static Displays to Interactive Experiences",
        "content": "Modern exhibitions are moving beyond static screens and printed materials. Interactive environments now transform visitors from passive observers into active participants.\nLarge digital displays, immersive installations, and interactive zones capture attention, increase dwell time, and enhance memorability."
      },
      {
        "title": "Mr. Savvy: A Human Interface for Technology",
        "content": "One of Savvy’s most distinctive elements is Mr. Savvy, the humanoid robot ambassador.\nMr. Savvy acts as a human interface for advanced technology—welcoming visitors, guiding interactions, and turning innovation into an accessible experience.\n\nBy introducing a humanized presence, Savvy creates a strong focal point that drives engagement, media attention, and social sharing."
      },
      {
        "title": "Activations That Turn Attention into Interaction",
        "content": "Savvy builds high-quality exhibits through real, deployed activations designed to encourage participation:\n\nBurn & Earn Activations\nChallenge-and-reward experiences that motivate visitors to engage actively, increasing interaction time and emotional connection.\n\nGaming Zones\nInteractive gaming areas that energize exhibition spaces, attract diverse audiences, and promote repeat engagement.\n\nAI Photo Booths\nAI-powered booths that generate personalized, shareable visual content with minimal effort from visitors.\n\nAI Tracking & Expression Monitoring Screens\nIntelligent screens that analyze movement and facial expressions in real time, helping translate physical interactions into actionable insights without disrupting the experience."
      },
      {
        "title": "Technology Integrated at Architectural Scale",
        "content": "High-quality exhibits extend beyond indoor installations. Savvy integrates digital media into the architecture itself through:\n\nDOOH networks\n\nMedia façades\n\nCylinder screens\n\nLarge-format LED displays\n\nThis approach transforms buildings and structures into living communication platforms, ensuring visibility, consistency, and immersive impact across the entire environment."
      },
      {
        "title": "First Impressions That Last",
        "content": "High-quality exhibits succeed through clarity, integration, and execution. When large-scale digital infrastructure, intelligent interaction, and human interfaces come together, exhibitions evolve from static displays into dynamic ecosystems.\n\nBy combining DOOH, AI-powered experiences, and physical engagement, Savvy helps organizations deliver strong first impressions that translate into lasting connections"
      }
    ]
  }
},
"smart-ai-tools": {
  "id": "smart-ai-tools",
  "title": "Smart AI Tools: Turning Outdoor Interactions into Intelligent Insights",
  "date": "December 3, 2024",
  "image": "/news/news-2.jpg",
  "category": "Artificial Intelligence",
  "content": {
    "intro": "Outdoor interactions are no longer limited to visibility and reach. With the advancement of artificial intelligence, connected sensors, and smart infrastructure, outdoor environments have become valuable sources of actionable data. Today, AI-powered tools enable organizations to transform physical interactions into intelligent insights that enhance experiences, support decision-making, and measure real-world impact.\n\nAs smart outdoor experiences expand across public spaces, events, and urban environments, the ability to capture and analyze data has become a strategic necessity.",
    "sections": [
      {
        "title": "From Exposure to Intelligence",
        "content": "Traditional outdoor media focused primarily on impressions and reach. Modern AI technologies add intelligent layers that help understand how audiences interact with physical environments.\nThrough computer vision, edge AI, and sensor-based systems, it is possible to analyze movement patterns, dwell time, engagement levels, and peak activity periods—without disrupting the visitor experience."
      },
      {
        "title": "Real-Time Data Collection",
        "content": "AI-powered outdoor systems enable continuous data collection at scale. Smart cameras estimate traffic and interaction patterns, while sensors capture movement, proximity, and environmental signals.\nWhen connected to digital analytics platforms, this data becomes a powerful tool for optimizing content, layouts, and timing.\n\nIn high-traffic environments such as public spaces and large-scale events, real-time insights allow operators to respond immediately rather than relying solely on post-event analysis."
      },
      {
        "title": "Smarter Content Through AI Adaptation",
        "content": "One of the most effective applications of AI in outdoor environments is content optimization. Intelligent systems can adapt displayed content based on contextual factors such as time of day, audience density, or event schedules.\n\nThis approach enables more relevant communication, improves engagement, and ensures that messaging remains aligned with operational goals."
      },
      {
        "title": "Measuring Impact Beyond Impressions",
        "content": "AI tools extend measurement beyond basic exposure metrics. Organizations can evaluate qualitative indicators such as interaction duration, repeat engagement, and behavioral response.\nThese insights support better planning, more informed investments, and continuous improvement of outdoor strategies."
      },
      {
        "title": "How Savvy Enables Intelligent Outdoor Experiences",
        "content": "Savvy connects physical outdoor environments with intelligent digital systems. By combining smart media infrastructure, AI-driven analytics, and connected platforms, Savvy helps organizations transform outdoor interactions into structured, actionable insights.\n\nThrough integrated solutions—including smart displays, interactive installations, and performance analytics—Savvy enables real-time optimization, audience understanding, and data-informed decision-making."
      },
      {
        "title": "Toward Data-Driven Outdoor Strategies",
        "content": "As outdoor environments continue to evolve, AI will remain central to extracting value from physical interactions. Intelligent tools are no longer optional; they are essential for organizations seeking clarity, efficiency, and measurable outcomes"
      }
    ]
  }
}


}

}
export const getArticleBySlug = (lang:Language,  slug: string): Article | null => {
  return articlesData[lang][slug] || null;
}








