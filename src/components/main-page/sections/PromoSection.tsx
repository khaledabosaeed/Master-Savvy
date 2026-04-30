"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import FormattedText from "@/components/shared/FormattedText"

export default function PromoSection() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const lang = language as "en" | "ar"

    return (
        <section className="w-full py-12 md:py-16 lg:py-20  mt-0 md:mt-50" >
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10" >
                <div className={`relative flex flex-col items-center gap-8 md:gap-12 lg:gap-16 bg-[#F4F4F4] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-16 shadow-xl overflow-visible md:flex-row-reverse `}>
                    {/* Image - Optimized for mobile */}
                    <motion.div
                        className={`shrink-0 w-full md:w-96 md:-my-24 md:-mr-8 `}
                        // initial={isMobile ? { opacity: 0 } : { opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: isMobile ? 0.2 : 0.3 }}
                        transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
                    >
                        <div className={`relative md:absolute md:top-[-150px]  ${lang === 'ar' ? 'rotate-y-180 ' : ''}`}>
                            <Image
                                src={t("promo.image")}
                                alt="Savvy World"
                                width={isMobile ? 350 : 450}
                                height={isMobile ? 467 : 600}
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                sizes="(max-width: 768px) 100vw, 450px"
                                quality={isMobile ? 85 : 90}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content - Optimized for mobile */}
                    <motion.div
                        className={`flex-1 flex flex-col gap-4 md:gap-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                        initial={{ opacity: 0, x: isMobile ? 0 : (lang === 'ar' ? -50 : 50), y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                            <FormattedText text={t("promo.title")} />
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            <FormattedText text={t("promo.description")} />
                        </p>
                        <div className="mt-2 md:mt-4 flex md:justify-start justify-center">
                        <Link
                            href={`/${lang}/contact`}
                            className={`px-8 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-xl text-base md:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 ${lang === 'ar' ? 'self-end' : 'self-start'} md:${lang === 'ar' ? 'self-end' : 'self-start'} self-center`}
                        >
                            <FormattedText text={t("promo.buttonText")} />
                        </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
