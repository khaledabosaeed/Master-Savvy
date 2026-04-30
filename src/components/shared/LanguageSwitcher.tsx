'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'ar';
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({
  currentLang,
  className = '',
  isMobile = false
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we're on the client side for Portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (isTransitioning) {
      setProgress(0);
      const duration = 800; // Total duration in ms
      const steps = 60; // Number of animation steps
      const increment = 100 / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setProgress(Math.min(currentStep * increment, 100));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isTransitioning]);

  const switchLanguage = () => {
    setIsTransitioning(true);
    const newLang = currentLang === 'en' ? 'ar' : 'en';

    setTimeout(() => {
      const currentPath = pathname.split('/').slice(2).join('/');
      const newPath = `/${newLang}${currentPath ? `/${currentPath}` : ''}`;
      router.push(newPath);
    }, 800);
  };

  return (
    <>
      {/* Elegant Loading Screen with Savvy Branding - Rendered at body level */}
      {isMounted && createPortal(
        <AnimatePresence mode="wait">
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#3960F9] via-[#2848C7] to-[#1a3399] flex items-center justify-center"
              style={{ pointerEvents: isTransitioning ? 'all' : 'none' }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />
              </div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-white text-center relative z-10"
              >
                {/* Savvy Logo with Animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="mb-8"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  >
                    <Image
                      src="/Savvy 2 1.svg"
                      alt="Savvy"
                      width={120}
                      height={120}
                      className="mx-auto drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {currentLang === 'ar' ? 'Switching Language...' : 'جاري تبديل اللغة...'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {currentLang === 'ar' ? 'Please wait' : 'يرجى الانتظار'}
                  </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-64 mx-auto"
                >
                  {/* Progress Bar Container */}
                  <div className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Animated Progress */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-blue-100 to-white rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: 'easeInOut',
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Progress Percentage */}
                  <motion.p
                    className="text-white/60 text-xs mt-3 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Math.round(progress)}%
                  </motion.p>
                </motion.div>

                {/* Decorative Dots */}
                <motion.div
                  className="flex gap-2 justify-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Language Button - Enhanced */}
      <motion.button
        onClick={switchLanguage}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        disabled={isTransitioning}
        className={`
          flex items-center gap-2 px-4 py-2 
          bg-gray-100 hover:bg-gray-200 
          text-gray-900 rounded-full 
          transition-all duration-300
          text-sm font-medium whitespace-nowrap
          disabled:opacity-50 disabled:cursor-not-allowed
          border border-gray-300
          hover:border-gray-400
          shadow-sm hover:shadow-md
          ${isMobile ? 'w-full justify-center' : ''}
          ${className}
        `}
        aria-label={currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      >
        <motion.div
          animate={{
            rotate: isTransitioning ? [0, 360] : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          <Globe className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold">{currentLang === 'ar' ? 'EN' : 'AR'}</span>
      </motion.button>
    </>
  );
}
