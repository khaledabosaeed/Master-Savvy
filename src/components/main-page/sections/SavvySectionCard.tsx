"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import FormattedText from "@/components/shared/FormattedText"

interface SavvySectionCardProps {
    title: string
    description: string
    features: string[]
    icon: string
    image: string
    link: string
    buttonText: string
    index: number
}

export default function SavvySectionCard({
    title,
    description,
    features,
    icon,
    image,
    link,
    buttonText,
}: SavvySectionCardProps) {
    const { language } = useLanguage()
    const isMobile = useIsMobile()
    const isRTL = language === "ar"
    const direction = isRTL ? "rtl" : "ltr"

    return (
        <Link
            href={`/${language}${link}`}
            aria-label={`${buttonText}: ${title}`}
            className="group relative block overflow-hidden rounded-2xl bg-[oklch(0.972_0.006_255)] p-5 shadow-[0_1px_0_rgba(6,11,19,0.08)] outline-none transition-[box-shadow,transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.982_0.008_255)] hover:shadow-[0_22px_54px_rgba(6,11,19,0.12)] focus-visible:ring-2 focus-visible:ring-[#3960F9] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.99_0.004_255)] md:p-8 lg:p-10"
            dir={direction}
        >
            <div className="mb-6 flex items-start gap-4 md:mb-8 md:gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1649F0] p-2.5 shadow-[0_18px_36px_rgba(22,73,240,0.22)] md:size-16 md:p-3 lg:size-20 lg:p-4">
                    <Image
                        src={icon}
                        alt=""
                        width={isMobile ? 32 : 48}
                        height={isMobile ? 32 : 48}
                        className="h-full w-full object-contain brightness-0 invert"
                        loading="lazy"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-xl font-extrabold leading-tight text-gray-950 md:text-2xl lg:text-3xl">
                        <FormattedText text={title} />
                    </h3>
                    <div className="mb-3 h-px w-full bg-[rgba(6,11,19,0.16)]" />
                    <p className="max-w-3xl text-sm leading-6 text-gray-700 md:text-base md:leading-7">
                        <FormattedText text={description} />
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-8">
                <div className={`flex min-w-0 flex-col justify-between ${isRTL ? 'md:order-2' : ''}`}>
                    <ul className="mb-6 space-y-2 md:mb-8 md:space-y-3">
                        {features.map((feature, idx) => (
                            <li key={`${feature}-${idx}`} className="flex items-start gap-3 border-b border-[rgba(6,11,19,0.16)] pb-2">
                                <span className="shrink-0 text-xs font-extrabold leading-6 text-[#1649F0] md:text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <FormattedText text={feature.trim()} className="text-sm font-bold leading-6 text-gray-950" />
                            </li>
                        ))}
                    </ul>

                    <span
                        className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-bold text-[oklch(0.985_0.006_255)] transition-[background-color,color,transform] duration-300 ease-out group-hover:bg-[#1649F0] group-hover:text-white ${isRTL ? 'flex-row-reverse self-start' : ''}`}
                    >
                        <FormattedText text={buttonText} />
                        <ArrowRight
                            className={`size-4 transition-transform duration-300 ease-out ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                            aria-hidden="true"
                        />
                    </span>
                </div>

                <div className={`relative min-h-[220px] overflow-hidden rounded-xl md:min-h-[300px] lg:min-h-[350px] ${isRTL ? 'md:order-1' : ''}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={isMobile ? 85 : 90}
                        loading="lazy"
                    />
                </div>
            </div>

            <Image
                src="/home-page/services/footer.svg"
                alt=""
                width={isMobile ? 500 : 800}
                height={20}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-4 w-full object-cover md:h-5"
                loading="lazy"
            />
        </Link>
    )
}
