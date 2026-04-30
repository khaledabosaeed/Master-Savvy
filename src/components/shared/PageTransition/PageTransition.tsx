'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
// import { prefersReducedMotion } from '@/lib/animations';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  // const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    setIsClient(true);
    // Instant scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // انتقالات محسّنة وأكثر سلاسة
  // const smoothTransition = {
  //   initial: { 
  //     opacity: 0,
  //     y: 20,
  //   },
  //   animate: { 
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: [0.16, 1, 0.3, 1], // easeOutExpo
  //     }
  //   },
  //   exit: { 
  //     opacity: 0,
  //     y: -20,
  //     transition: {
  //       duration: 0.3,
  //       ease: [0.16, 1, 0.3, 1],
  //     }
  //   },
  // };

  // Simplified animation for reduced motion preference
  // const animation = reducedMotion
  //   ? {
  //       initial: { opacity: 0 },
  //       animate: { opacity: 1 },
  //       exit: { opacity: 0 },
  //       transition: { duration: 0.2 },
  //     }
  //   : smoothTransition;

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        // variants={animation}
        style={{
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
