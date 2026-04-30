'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FormattedText from '../FormattedText';

const PartnersSlider: React.FC = () => {
    const { t } = useTranslation()

    const partners = [
        { name: "Al Awaly", logo: "/home-page/partners/al-awaly.svg" },
        { name: "Sakani", logo: "/home-page/partners/sakani.svg" },
        { name: "NHC", logo: "/home-page/partners/nhc.svg" },
        { name: "Hisense", logo: "/home-page/partners/hisense.svg" },
        { name: "Mohammed Al Habib", logo: "/home-page/partners/mohammed-al-habib.svg" },
        { name: "Manzil Alarabia", logo: "/home-page/partners/manzil-alarabia.svg" },
        { name: "Samsung", logo: "/home-page/partners/samsung.svg" },
        { name: "UniTree", logo: "/home-page/partners/1.svg" },
        { name: "SGBF", logo: "/home-page/partners/2.svg" },
        { name: "SOTI One", logo: "/home-page/partners/3.svg" },
    ]

   // Double the array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  // Animation with continuous scrolling
  const baseX = useMotionValue(0);
  const scrollSpeed = -50; // Pixels per second (negative = left, positive = right) - increased speed

  useAnimationFrame((_t, delta) => {
    const moveBy = (scrollSpeed * delta) / 1000;
    baseX.set(baseX.get() + moveBy);
  });

  // Get container width dynamically
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 200; // Approximate width including gap
  const totalWidth = partners.length * itemWidth;

  // Create seamless loop by resetting position
  useEffect(() => {
    const unsubscribe = baseX.on('change', (latest) => {
      if (latest <= -totalWidth) {
        baseX.set(0);
      }
    });
    return () => unsubscribe();
  }, [baseX, totalWidth]);

  const x = useTransform(baseX, (v) => `${v}px`);

  return (
    <section className=" bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-foreground">
            <FormattedText text={t("partnersSlider.heading")} />
          </h2>
        </motion.div>

        {/* Sliding Partners */}
        <div className="relative" dir="ltr">
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center will-change-transform"
              style={{ x, transform: 'translateZ(0)' }}
            >
              {duplicatedPartners.map((partner, index) => {
                // Custom sizes for specific partners
                const getImageSize = (name: string) => {
                  if (name === 'Hisense') return 'h-4 sm:h-6 md:h-7 lg:h-8'; // Smaller
                  if (name === 'Company 3') return 'h-10 sm:h-12 md:h-14 lg:h-18'; // Larger for sakani
                  if (name === 'Samsung') return 'h-4 sm:h-6 md:h-7 lg:h-8'; // Larger for Samsung
                  if (name === 'UniTree') return 'h-30 sm:h-30 md:h-30 lg:h-40'; // Larger for UniTree
                  if (name === 'SGBF') return 'h-24 sm:h-24 md:h-24 lg:h-40 '; // Larger for SGBF
                  if (name === 'SOTI One') return 'h-24 sm:h-24 md:h-24 lg:h-40'; // Larger for SOTI One
                  return 'h-8 sm:h-10 md:h-12 lg:h-12'; // Default - reduced size
                };

                return (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={30}
                      height={30}
                      className={`${getImageSize(partner.name)} w-auto object-contain`}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 h-full w-20 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 h-full w-20 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;
