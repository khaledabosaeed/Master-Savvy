"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"

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

    return (
        <Link 
            href={`/${language}${link}`} 
            className="relative rounded-xl md:rounded-2xl overflow-hidden p-6 md:p-8 lg:p-12 block hover:shadow-lg transition-shadow duration-300" 
            style={{ backgroundColor: '#F6F6F6' }}
        >

            {/* Top Section: Icon + Title + Description - Better mobile spacing */}
            <div className={`flex items-start gap-4 md:gap-6 mb-6 md:mb-8`}>
                {/* Icon - Smaller on mobile */}
                <div
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl flex items-center justify-center p-2.5 md:p-3 lg:p-4 shrink-0"
                    style={{ backgroundColor: '#1649F0' }}
                >
                    <Image
                        src={icon}
                        alt={`${title} icon`}
                        width={isMobile ? 32 : 48}
                        height={isMobile ? 32 : 48}
                        className="w-full h-full object-contain brightness-0 invert"
                        loading="lazy"
                    />
                </div>

                {/* Title and Description - Better mobile typography */}
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">
                        {title}
                    </h3>
                    <div className="w-full h-px bg-gray-300 mb-2 md:mb-3" />
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm lg:text-base">
                        {description}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Image + Features List - Better mobile layout */}
            <div className={`grid md:grid-cols-2 gap-6 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Features List - Tighter spacing on mobile */}
                <div className={`flex flex-col justify-between ${isRTL ? 'md:order-2' : ''}`}>
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                        {features.map((feature, idx) => (
                            <li key={idx} className={`flex items-start gap-2 md:gap-3 border-b border-[rgba(0,0,0,0.2)]`}>
                                <span className="text-gray-900 font-bold  text-xs md:text-sm pb-1.5 md:pb-2">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-gray-900 font-bold   text-xs md:text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Learn More Button - span only; parent Link handles navigation */}
                    <span
                        className={`inline-flex items-center gap-2 text-gray-900 text-sm md:text-base font-medium hover:text-blue-600 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        <span>{buttonText}</span>
                        <svg
                            className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>

                {/* Image - Smaller height on mobile */}
                <div className={`relative h-[200px] md:h-[300px] lg:h-[350px] ${isRTL ? 'md:order-1' : ''}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-lg md:rounded-xl"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={isMobile ? 85 : 90}
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Decorative Pattern at Bottom */}
            <Image
                src="/home-page/services/footer.svg"
                alt="Decorative Pattern"
                width={isMobile ? 500 : 800}
                height={20}
                className="absolute bottom-0 left-0 right-0 w-full h-4 md:h-5 object-cover"
                loading="lazy"
            />
         
        </Link>
    )
}
