"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LatestNews() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const lang = language as "en" | "ar"
    const content = t("latestNewsSection", { returnObjects: true }) as {
      sectionTitle: string
      cards: Array<{
        id: string
        title: string
        date: string
        image: string
        buttonText: string
        link: string
      }>
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    }

    return (
        <section className="w-full py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                {/* Title */}
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {content.sectionTitle}
                </motion.h2>

                {/* News Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {content.cards.map((card) => (
                        <motion.a
                            href={`/${lang}${card.link.startsWith("/") ? card.link : `/${card.link}`}`}
                            key={card.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Image */}
                            <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col gap-4">
                                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem] leading-relaxed">
                                    {card.title}
                                </h3>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                    <span className="text-sm text-gray-500">{card.date}</span>
                                    <Link
                                        href={`/${lang}${card.link.startsWith("/") ? card.link : `/${card.link}`}`}
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        {card.buttonText}
                                    </Link>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
