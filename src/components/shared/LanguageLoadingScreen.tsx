'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LanguageLoadingScreenProps {
  isVisible: boolean
}

export default function LanguageLoadingScreen({ isVisible }: LanguageLoadingScreenProps) {
  const floatingTexts = [
    'Expo', 'Media', 'Innovation', 'Contact',
    'المعارض', 'الإعلام', 'الابتكار', 'تواصل معنا',
    'Savvy Robot', 'ساڤي روبوت',
    'نعزز حضورك', 'نُظهر علامتك',
    'جدة', 'الخبر', 'الرياض',
    'Jeddah', 'Khobar', 'Riyadh',
    'العميل أولاً', 'Client First',
    'Savvy World', 'ساڤي وورلد',
    'Digital Solutions', 'الحلول الرقمية',
    'Excellence', 'التميز',
    'Expo', 'المعارض', 'Innovation', 'الابتكار',
    'Media', 'الإعلام', 'Contact', 'تواصل معنا',
    'Savvy', 'ساڤي', 'Robot', 'روبوت',
    'جدة', 'الرياض', 'الخبر',
  ]

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>  
          {/* النصف العلوي */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
            className="fixed top-0 left-0 right-0 h-1/2 z-[99999] bg-gradient-to-br from-[#1649F0] via-[#2B5FE8] to-[#4B8FFF]"
          />

          {/* النصف السفلي */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
            className="fixed bottom-0 left-0 right-0 h-1/2 z-[99999] bg-gradient-to-br from-[#4B8FFF] via-[#2B5FE8] to-[#1649F0]"
          />

          {/* المحتوى الرئيسي */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16,1,0.3,1] }}
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {/* خلفية ديكورية متحركة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ scale: [1,1.2,1], opacity: [0.3,0.5,0.3] }}
              exit={{ scale: [1,1.2,1], opacity: [0.3,0.5,0.3] }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
            />

            {/* النصوص الطافية */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {floatingTexts.map((text, index) => {
                const cols = 6
                const rows = Math.ceil(floatingTexts.length / cols)
                const col = index % cols
                const row = Math.floor(index / cols)
                const baseX = (col * (100 / cols)) + (10 / cols)
                const baseY = (row * (100 / rows)) + (10 / rows)
                const randomOffsetX = ((index * 17) % 20) - 10
                const randomOffsetY = ((index * 23) % 20) - 10
                const finalX = Math.max(2, Math.min(95, baseX + randomOffsetX))
                const finalY = Math.max(2, Math.min(95, baseY + randomOffsetY))
                const randomDuration = 18 + (index % 12) * 1.5
                const randomDelay = (index % 10) * 0.25
                const randomSize = 1.0 + (index % 7) * 0.3

                return (
                  <motion.div
                    key={`${text}-${index}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: [0,0.75,0.6,0.7,0.55,0.65,0.5,0],
                      scale: [0.7,1.1,0.95,1.15,0.9,1.05,0.85,0.7],
                      x: [0,-40,30,-25,40,-30,20,0],
                      y: [0,-50,-30,-60,-40,-55,-25,0],
                      rotate: [0,20,-15,28,-20,18,-10,0],
                    }}
                    exit={{
                      opacity: [0,0.75,0.6,0.7,0.55,0.65,0.5,0],
                      scale: [0.7,1.1,0.95,1.15,0.9,1.05,0.85,0.7],
                      x: [0,-40,30,-25,40,-30,20,0],
                      y: [0,-50,-30,-60,-40,-55,-25,0],
                      rotate: [0,20,-15,28,-20,18,-10,0],
                      transition: { duration: randomDuration, ease: "linear" } // بدون repeat
                    }}
                    transition={{
                      duration: randomDuration,
                      repeat: Infinity,
                      delay: randomDelay,
                      ease: "linear",
                    }}
                    className="absolute whitespace-nowrap"
                    style={{
                      left: `${finalX}%`,
                      top: `${finalY}%`,
                      fontSize: `${randomSize}rem`,
                      fontWeight: (index % 2 === 0) ? 900 : 700,
                    }}
                  >
                    <span
                      className="select-none"
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textShadow: '0 4px 16px rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.4)',
                      }}
                    >
                      {text}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* النص الرئيسي */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: 0.2 }}
              className="relative z-10 text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16,1,0.3,1], delay: 0.3 }}
                className="mb-8"
              >
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-8xl font-bold text-white"
                  style={{ textShadow: '0 8px 32px rgba(0,0,0,0.3),0 0 60px rgba(255,255,255,0.1)' }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: [0.7,1,0.7], x: 0 }}
                    exit={{ opacity: [0,0.7,0], x: -20 }}
                    transition={{
                      x: { duration: 0.5, delay: 0.4 },
                      opacity: { duration: 0.5 }
                    }}
                  >
                    savvy
                  </motion.span>{' '}
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: [1,0.7,1], x: 0 }}
                    exit={{ opacity: [0,0.7,0], x: 20 }}
                    transition={{
                      x: { duration: 0.5, delay: 0.5 },
                      opacity: { duration: 0.5 }
                    }}
                    className="text-white/95"
                  >
                    world
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* شريط التحميل */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16,1,0.3,1] }}
                className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mx-auto"
              >
                <motion.div
                  animate={{ x: ['0%', '150%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-full w-2/3 bg-gradient-to-r from-white/40 via-white to-white/40 rounded-full shadow-lg"
                />
              </motion.div>

              {/* نقاط متحركة */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                {[0,1,2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ y: [0,-12,0], opacity: [0.5,1,0.5], scale: [1,1.3,1] }}
                    exit={{ y: [0,-12,0], opacity: [0,0.5,0], scale: [1,1.3,1] }}
                    transition={{
                      opacity: { duration: 0.3, delay: 0.7 + i*0.1 },
                      scale: { duration: 0.3, delay: 0.7 + i*0.1 },
                      y: { duration: 1.2, repeat: Infinity, delay: i*0.2, ease: 'easeInOut' }
                    }}
                    className="w-2.5 h-2.5 bg-white rounded-full shadow-lg"
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* دوائر ديكورية */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ scale: [1,1.5,1], rotate: 360, opacity: 1 }}
              exit={{ scale: [1,1.5,1], rotate: 360, opacity: 0 }}
              transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.4 }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
              className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 border-2 border-white/10 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ scale: [1.5,1,1.5], rotate: -360, opacity: 1 }}
              exit={{ scale: [1.5,1,1.5], rotate: -360, opacity: 0 }}
              transition={{ opacity: { duration: 0.3, delay: 0.1 }, scale: { duration: 0.4, delay: 0.1 }, rotate: { duration: 10, repeat: Infinity, ease: 'linear' } }}
              className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 border-2 border-white/10 rounded-full"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
