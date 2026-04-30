"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"

export interface GalleryImage {
  id: string
  src: string
  alt: string
  gridSpan?: {
    cols?: 1 | 2
    rows?: 1 | 2
  }
}
import Image from "next/image"
import { motion } from "framer-motion"
import styles from "./GallerySection.module.css"

export default function GallerySection() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const lang = language as "en" | "ar"
    const content = t("gallerySection", { returnObjects: true }) as {
      title: string
      images: GalleryImage[]
      emptyState: string
    }

    // Animation variants - Optimized for mobile
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.05 : 0.1,
                delayChildren: isMobile ? 0.1 : 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: isMobile ? 15 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.4 : 0.6,
            },
        },
    }

    const titleVariants = {
        hidden: { opacity: 0, y: isMobile ? -15 : -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.5 : 0.8,
            },
        },
    }

    return (
        <section className={styles.gallerySection}>
            <div className={styles.container}>
                {/* Title */}
                <motion.h2
                    className={styles.title}
                    
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={titleVariants}
                >
                    {content.title}
                </motion.h2>


                {/* Gallery Grid */}
         {content.images.length > 0 ? (
       <motion.div
    className={styles.gallery}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={containerVariants}
    style={{ position: "relative" }} // مهم للـ absolute overlays
  >
    {/* Left fog */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "10%", // عرض الظل
        height: "100%",
        background: "linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0))",
        pointerEvents: "none", // لا يتداخل مع hover على الصور
        zIndex: 20,
      }}
    />

    {/* Right fog */}
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "10%",
        height: "100%",
        background: "linear-gradient(to left, rgba(255,255,255,0.8), rgba(255,255,255,0))",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />

    {content.images.map((image: GalleryImage) => {
      const colSpan = image.gridSpan?.cols || 1
      const rowSpan = image.gridSpan?.rows || 1

      return (
        <motion.div
          key={image.id}
          className={styles.galleryItem}
          style={{
            gridColumn: `span ${colSpan}`,
            gridRow: `span ${rowSpan}`,
          }}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.overlay} />
          </div>
        </motion.div>
      )
    })}
  </motion.div>
) : (
  <div className={styles.emptyState}>
    <p className={styles.emptyText}>
      {content.emptyState}
    </p>
  </div>
)}
            </div>
        </section>
    )
}
