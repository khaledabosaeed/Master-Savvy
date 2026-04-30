"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { fadeInUp, viewportConfig, sectionSlideUp } from "@/lib/animations"
import FormattedText from "@/components/shared/FormattedText"

// Partner logos data - you can add your logo paths here
const partners = [
    {
        name: "Al Awaly",
        logo: "/home-page/partners/al-awaly.svg",
        imageSizeClassName: "max-w-[140px] max-h-[56px] md:max-w-[180px] md:max-h-[80px]",
    },
    {
        name: "Sakani",
        logo: "/home-page/partners/sakani.svg",
        imageSizeClassName: "max-w-[140px] max-h-[56px] md:max-w-[180px] md:max-h-[80px]",
    },
    {
        name: "NHC",
        logo: "/home-page/partners/nhc.svg",
        imageSizeClassName: "max-w-[140px] max-h-[56px] md:max-w-[180px] md:max-h-[80px]",
    },
    {
        name: "Hisense",
        logo: "/home-page/partners/hisense.svg",
        imageSizeClassName: "max-w-[100px] max-h-[30px] md:max-w-[180px] md:max-h-[70px]",
    },
    {
        name: "Mohammed Al Habib",
        logo: "/home-page/partners/mohammed-al-habib.svg",
        imageSizeClassName: "max-w-[120px] max-h-[44px] md:max-w-[180px] md:max-h-[80px]",
    },
    {
        name: "Manzil Alarabia",
        logo: "/home-page/partners/manzil-alarabia.svg",
        imageSizeClassName: "max-w-[140px] max-h-[56px] md:max-w-[180px] md:max-h-[80px]",
    },
    {
        name: "Samsung",
        logo: "/home-page/partners/samsung.svg",
        imageSizeClassName: "max-w-[120px] max-h-[44px] md:max-w-[100px] md:max-h-[60px]",
    },
    {
        name: "UniTree",
        logo: "/home-page/partners/1.svg",
        imageSizeClassName: "max-w-[110px] max-h-[140px] md:max-w-[250px] md:max-h-[160px]",
    },
    {
        name: "SGBF",
        logo: "/home-page/partners/2.svg",
        imageSizeClassName: "max-w-[110px] max-h-[140px] md:max-w-[250px] md:max-h-[160px]",
    },
    {
        name: "SOTI One",
        logo: "/home-page/partners/3.svg",
        imageSizeClassName: "max-w-[150px] max-h-[140px] md:max-w-[200px] md:max-h-[160px]",
    },
]

export default function ExpoPartners() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const lang = language as "en" | "ar"
    const isRTL = lang === "ar"

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${isRTL ? '' : ''}`}>
                    {/* Title Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={sectionSlideUp}
                        className={`flex-shrink-0 lg:w-1/3 ${isRTL ? "text-right" : "text-left"}`}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            <FormattedText text={t("expo.partners.title")} />
                        </h2>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            <FormattedText text={t("expo.partners.subtitle")} />
                        </h2>
                    </motion.div>

                    {/* Partners Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center"
                    >
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative w-full h-20 md:h-24 flex items-center justify-center transition-all duration-300"
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={180}
                                    height={80}
                                    className={`object-contain w-auto h-auto mx-auto ${partner.imageSizeClassName ?? ""}`}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
