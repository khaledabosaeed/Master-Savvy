'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const textContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.25,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const floatingCardsContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

const cardLeftVariant: Variants = {
  hidden: { opacity: 0, x: -50, y: 30, scale: 0.95, rotate: -6 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const cardRightVariant: Variants = {
  hidden: { opacity: 0, x: 50, y: 30, scale: 0.95, rotate: 6 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const cardBottomVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const Hero: React.FC = () => {
  const { t } = useTranslation();


  return (
    <section id="robots" className="min-h-screen scroll-mt-24 relative overflow-hidden bg-transparent pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden relative z-10 min-h-screen flex flex-col">

        {/* Text Content - Top Center */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={textContainerVariants}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h1
            variants={headingVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight"
          >
            <span className="text-foreground">{t("media.robots.title")}</span>
            <br />
            <span className="text-primary">{t("media.robots.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            variants={descriptionVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed text-gray-600 max-w-3xl mx-auto px-4"
          >
            {t("media.robots.description")}
          </motion.p>


        </motion.div>

        {/* Robot Image with Cards - Center Bottom */}
        <div className="flex-1 flex items-end justify-center relative pb-0 overflow-visible">
          <div
            className="relative w-full max-w-5xl mx-auto"
            style={{ marginBottom: '-10%' }}
          >

            {/* Robot Image - Center Bottom (90% visible) */}
            <motion.div
              initial={{ opacity: 0, rotateY: -14, rotateZ: -6, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, rotateY: 0, rotateZ: 0, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] mx-auto z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotateY: [0, 3, 0, -3, 0],
                  rotateZ: [0, 1.5, 0, -1.5, 0],
                }}
                transition={{
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  },
                  rotateY: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  },
                  rotateZ: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  },
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={t("media.robots.heroImage")}
                  alt={t("media.robots.imageAlt")}
                  width={650}
                  height={780}
                  priority
                  className="w-full h-auto "
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={floatingCardsContainer}
            >




              {/* Floating Card 3 - Left Bottom (Star Badge) */}
              <motion.div
                variants={cardBottomVariant}
                className="absolute bottom-[16%] left-2 sm:bottom-[10%] sm:left-[4%] md:left-[6%] lg:left-[10%] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl px-2.5 sm:px-5 py-2.5 sm:py-4 border border-gray-100 z-20 w-[135px] sm:w-auto"
                style={{
                  boxShadow: '0 20px 60px rgba(57, 96, 249, 0.15), 0 0 0 1px rgba(57, 96, 249, 0.1)'
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-base font-bold">★</span>
                  </div>
                  <p className="text-[9.5px] sm:text-sm font-bold text-foreground whitespace-nowrap">
                    {t("media.robots.floatingCards.enhanceBrand")}
                  </p>
                </div>
              </motion.div>


            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
