'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ImageItem {
  name: string;
  logo: string;
}

interface ImageSliderProps {
  images: ImageItem[];
  heading?: string;
}

const ImageSlider = ({ images, heading }: ImageSliderProps) => {
    const { t } = useTranslation()
    const displayHeading = heading ?? t('imageSlider.heading');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

   // Double the array for seamless loop
  const duplicatedPartners = [...images, ...images];

  // Manual scroll control with infinite loop
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 350; // Approximate width including gap (larger images)
  const itemWidthWithGap = 350; // Width + gap
  const totalWidth = duplicatedPartners.length * itemWidthWithGap;
  const loopPoint = -(totalWidth / 2); // Half way point for seamless loop

  // Motion value for manual control
  const x = useMotionValue(0);

  // Infinite loop navigation functions
  const scrollLeft = () => {
    let newPosition = currentPosition + itemWidthWithGap;
    
    // If we've scrolled past the right boundary, loop to left side
    if (newPosition >= 0) {
      newPosition = loopPoint + newPosition;
    }
    
    setCurrentPosition(newPosition);
    animate(x, newPosition, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.5
    });
  };

  const scrollRight = () => {
    let newPosition = currentPosition - itemWidthWithGap;
    
    // If we've scrolled past the left boundary, loop to right side
    if (newPosition <= loopPoint) {
      newPosition = 0 + (newPosition - loopPoint);
    }
    
    setCurrentPosition(newPosition);
    animate(x, newPosition, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.5
    });
  };

  // Handle drag end with infinite loop
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // Minimum drag distance to trigger scroll
    const velocity = info.velocity.x;
    const currentX = x.get();

    if (Math.abs(velocity) > 500 || Math.abs(info.offset.x) > threshold) {
      if (velocity > 0 || info.offset.x > 0) {
        scrollLeft();
      } else {
        scrollRight();
      }
    } else {
      // Snap back to current position with smooth animation
      let snapPosition = currentX;
      
      // Handle loop reset if needed (before animating)
      if (snapPosition >= 0) {
        snapPosition = loopPoint + snapPosition;
      } else if (snapPosition <= loopPoint) {
        snapPosition = snapPosition - loopPoint;
      }
      
      setCurrentPosition(snapPosition);
      animate(x, snapPosition, {
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.3
      });
    }
  };

  // Update position when dragging (allow infinite scrolling)
  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newPosition = currentPosition + info.delta.x;
    x.set(newPosition);
  };

  // Initialize motion value (only on mount)
  useEffect(() => {
    x.set(0);
  }, [x]);

  // Handle infinite loop - reset position seamlessly when crossing boundaries
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      // If we've scrolled past the right boundary, reset to left side seamlessly
      if (latest >= 0) {
        const offset = latest;
        const newPosition = loopPoint + offset;
        setCurrentPosition(newPosition);
        // Use set without animation for instant reset (seamless loop)
        x.set(newPosition);
      }
      // If we've scrolled past the left boundary, reset to right side seamlessly
      else if (latest <= loopPoint) {
        const offset = latest - loopPoint;
        const newPosition = offset;
        setCurrentPosition(newPosition);
        // Use set without animation for instant reset (seamless loop)
        x.set(newPosition);
      }
    });
    return unsubscribe;
  }, [x, loopPoint]);

  // Navigation functions
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setDirection('right');
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setDirection('left');
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setDirection('right');
        setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setDirection('left');
        setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white overflow-hidden">
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
            {displayHeading}
          </h2>
        </motion.div>

        {/* Sliding Partners */}
        <div className="relative" dir="ltr">
          {/* Navigation Buttons - Always enabled for infinite loop */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white shadow-lg rounded-full transition-all duration-200 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white shadow-lg rounded-full transition-all duration-200 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>

          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex gap-4 sm:gap-6 md:gap-8 items-center will-change-transform cursor-grab active:cursor-grabbing"
              style={{ 
                x,
                transition: "none" // Disable default transitions, we use animate() instead
              }}
              drag="x"
              dragElastic={0.2}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {duplicatedPartners.map((partner, index) => {
                // Get the original index (not duplicated)
                const originalIndex = index % images.length;
                return (  
                  <div
                    key={`${partner.name}-${index}`}
                    className="relative shrink-0 w-[280px] md:w-[400px] h-[160px] md:h-[240px] mx-2 rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:scale-105 transition-transform duration-300 select-none"
                    onClick={() => setSelectedIndex(originalIndex)}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 280px, 400px"
                      draggable={false}
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

        {/* Image Popup Modal */}
        <AnimatePresence>
          {selectedImage && selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300 group shadow-lg"
                aria-label="Close"
              >
                <X className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Previous Button */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300 group shadow-lg hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:translate-x-[-2px] transition-transform" />
                </button>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300 group shadow-lg hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:translate-x-[2px] transition-transform" />
                </button>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
                >
                  <span className="text-white text-sm md:text-base font-medium">
                    {selectedIndex + 1} / {images.length}
                  </span>
                </motion.div>
              )}

              {/* Image Container - No white background */}
              <motion.div
                key={selectedIndex}
                initial={{ 
                  opacity: 0, 
                  scale: 0.96,
                  x: direction === 'left' ? 60 : -60,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.96,
                  x: direction === 'left' ? -60 : 60,
                }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  x: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                }}
                className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div 
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={selectedImage.logo}
                    alt={selectedImage.name}
                    fill
                    className="object-contain transition-opacity duration-300"
                    sizes="(max-width: 768px) 95vw, 85vw"
                    priority
                  />
                </motion.div>
                
                {/* Image Name - Subtle overlay */}
                {/* {selectedImage.name && (
                  <motion.div
                    key={`name-${selectedIndex}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.15, 
                      ease: [0.25, 0.1, 0.25, 1] 
                    }}
                    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40"
                  >
                    <div className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                      <h3 className="text-white text-base md:text-lg font-medium text-center">
                        {selectedImage.name}
                      </h3>
                    </div>
                  </motion.div>
                )} */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImageSlider;