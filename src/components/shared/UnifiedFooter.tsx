"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useMemo } from "react"
import { Instagram } from "lucide-react"
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6"
import Image from "next/image"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import FormattedText from "./FormattedText"

export default function UnifiedFooter() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: isMobile ? 0.1 : 0.2 })

  const footerSections = useMemo(
    () => [
      {
        title: t("common.savvyWorld"),
        titleHref: `/${lang}`,
        links: [
          { label: t("common.ourSections"), href: `/${lang}#about` },
          { label: t("common.gallery"), href: `/${lang}#services` },
        ],
      },
      {
        title: t("common.savvyMedia"),
        titleHref: `/${lang}/media`,
        links: [
          { label: t("common.mediaContentSection"), href: `/${lang}/media#content` },
          { label: t("common.mediaGallerySection"), href: `/${lang}/media#gallery` },
        ],
      },
      {
        title: t("common.savvyExpo"),
        titleHref: `/${lang}/expo`,
        links: [
          { label: t("common.servicesLabel"), href: `/${lang}/expo#services` },
          { label: t("common.projects"), href: `/${lang}/expo#projects` },
        ],
      },
      {
        title: t("common.savvyInnovation"),
        titleHref: `/${lang}/innovation`,
        links: [{ label: t("common.solutions"), href: `/${lang}/innovation#solutions` }],
      },
      {
        title: t("common.otherPages"),
        titleHref: null,
        links: [
          { label: t("common.contactUs"), href: `/${lang}/contact` },
          { label: t("common.savvyEStore"), href: `/${lang}/robots` },
        ],
      },
    ],
    [t, lang]
  )

  return (
    <footer ref={footerRef} className="relative bg-white text-gray-700 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-8 md:mb-12 ${isRTL ? "text-right" : "text-left"}`}
        >
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.5 }}
            className="col-span-2 md:col-span-1 flex flex-col items-start"
          >
            <div className="mb-4">
              <Image src="/footer.svg" alt="Savvy Logo" width={120} height={60} className="h-12 w-auto" />
            </div>
            <p className={`text-sm text-gray-600 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              <FormattedText text={t("common.gateway")} />
            </p>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1"
            >
              {section.titleHref ? (
                <a
                  href={section.titleHref}
                  className="text-base font-bold mb-4 text-gray-900 hover:text-blue-600 transition-colors duration-200 inline-block"
                >
                  <FormattedText text={section.title} />
                </a>
              ) : (
                <h3 className="text-base font-bold mb-4 text-gray-900">
                  <FormattedText text={section.title} />
                </h3>
              )}
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      <FormattedText text={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="h-px bg-gray-200 mb-8" />

        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mr.savvy_saudi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/mrsavvy_saudi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/savvy-world/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>

          <div className={`flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <FormattedText text={t("common.copyrightFull")} />
            <div className="flex items-center gap-4">
              <a href={`/${lang}/privacy`} className="hover:text-gray-900 transition-colors">
                <FormattedText text={t("common.privacyPolicy")} />
              </a>
              <a href={`/${lang}/terms`} className="hover:text-gray-900 transition-colors">
                <FormattedText text={t("common.termsOfUse")} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
