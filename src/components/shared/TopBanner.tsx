"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import FormattedText from "./FormattedText"

export default function TopBanner() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const lang = language as "en" | "ar"
    const isRTL = lang === "ar"

    return (
        <div className="w-full bg-[#0066FF] py-1.5 md:py-2 px-2 md:px-4 text-center">
            <p className={`text-white text-xs md:text-sm lg:text-base ${isRTL ? 'rtl' : 'ltr'}`}>
                <FormattedText text={t("topBanner.text")} />
                <Link href={`/${lang}/contact`} className="text-white underline ml-1">
                    <FormattedText text={t("topBanner.learnMore")} />
                </Link>
            </p>
        </div>
    )
}
