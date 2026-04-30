"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react"

interface ArticleDetailPageProps {
  lang: "en" | "ar"
}

export default function ArticleDetailPage({ lang }: ArticleDetailPageProps) {
  const isRTL = lang === "ar"

  // بيانات المقال
  const article = {
    title: "كيف تغير الشاشات التفاعلية مستقبل الفعاليات؟",
    date: "ديسمبر 5, 2024",
    image: "/news/news-1.jpg",
    category: "ابتكار",
    intro: "الشاشات التفاعلية في المعارض هي مستقبل، عملية اتصالات التفاعلية وتغيير طريقة تواصل العلامة مع الجمهور أو زوار المعارض حيث أنها تسمح بتفاعل مباشر مع المحتوى إنشاء تجربة غامرة تجذب الحضور وتزيد من فهمهم للخدمة أو منتج دون جهد وبطريقة تفاعلية آلية",
    sections: [
      {
        title: "رفع مستوى التفاعل المباشر مع الجمهور",
        content: "يوفر الشاشات التفاعلية بيانات يلزم تصميم منصة جاذبة، بينما يقدرون المحتوى من خلال الشاشات. حيث يلاء جانب تشارك فيل أو وقت التفاعلة الحالي العرض ضمن، تواصل يستدعى و أي وقت المشاريع قوق."
      },
      {
        title: "محتوى ديناميكي يتغير حسب الحدث",
        content: "يمكن تخصيص محتوى الشاشات بشكل ديناميكي لتلائم كل حدث أو فعالية. تمنح المرونة في عرض المحتوى المناسب في الوقت المناسب، وتساعد المنظمين على توصيل الرسائل المهمة بطريقة أكثر فعالية وجاذبية للجمهور المستهدف."
      },
      {
        title: "تقليل التكاليف وزيادة الكفاءة",
        content: "تقلل شاشات التفاعلية من يحتاج للمواد بالتقليدية، الخاصة بالطباعة والبرشورات والملصقات، حيث يلزم، وقل، يتحدث المحتوى. و في اي وقت شرح عناء يمتاز إيصال المعلوماتيه المسيرة المكلفة.",
        list: [
          "لا تكاليف إعادة الطباعة",
          "لا حاجة لطباعة مواد ورقية",
          "تحديث المحتوى فوري ومجاني"
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <section className="pt-32 pb-12">
        <div className="container px-6">
          <div className={`max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Back Button */}
            <Link href={`/${lang}/news`}>
              <motion.button
                whileHover={{ x: isRTL ? 5 : -5 }}
                className={`flex items-center gap-2 text-gray-600 hover:text-[#3960F9] mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                <span>{isRTL ? "العودة إلى الأخبار" : "Back to News"}</span>
              </motion.button>
            </Link>

            {/* Category & Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="px-4 py-2 bg-[#3960F9]/10 text-[#3960F9] rounded-full font-medium text-sm">
                {article.category}
              </span>
              <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{article.date}</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container px-6">
          <div className={`max-w-4xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className={`text-xl text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {article.intro}
              </p>
            </motion.div>

            {/* Content Sections */}
            {article.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                {/* Section Title */}
                <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {section.title}
                </h2>

                {/* Section Content */}
                <p className={`text-lg text-gray-700 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {section.content}
                </p>

                {/* List if exists */}
                {section.list && (
                  <ul className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-gray-700 text-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-2 h-2 bg-[#3960F9] rounded-full mt-2 flex-shrink-0" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Divider */}
            <div className="my-16 border-t border-gray-200" />

            {/* Share & Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Link href={`/${lang}/news`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#3960F9] text-white rounded-xl font-semibold hover:bg-[#2848C7] transition-all"
                >
                  {isRTL ? "المزيد من الأخبار" : "More News"}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}








