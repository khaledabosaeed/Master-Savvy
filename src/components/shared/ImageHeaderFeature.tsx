"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import FormattedText from "@/components/shared/FormattedText"
import { fadeInUp, sectionSlideUp, viewportConfig } from "@/lib/animations"

export interface ImageHeaderFeatureProps {
  header: string
  subtitle?: string
  imageUrl: string
  imageAlt: string
}

export default function ImageHeaderFeature({
  header,
  subtitle,
  imageUrl,
  imageAlt,
}: ImageHeaderFeatureProps) {
  return (
    <article className="flex flex-col items-center text-center">
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionSlideUp}
        className="mb-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[48rem]"
      >
        <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[oklch(0.18_0.01_260)]">
          <FormattedText text={header} />
        </h2>
        {subtitle && (
          <p className="mt-[clamp(0.625rem,1.25vw,0.875rem)] text-[clamp(0.9375rem,1.6vw,1.0625rem)] leading-[1.6] text-[oklch(0.52_0.015_260)]">
            <FormattedText text={subtitle} />
          </p>
        )}
      </motion.header>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
        className="relative w-full max-w-[64rem]"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={1280}
          height={720}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, 1024px"
        />
      </motion.div>
    </article>
  )
}
