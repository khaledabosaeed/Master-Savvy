'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the device is mobile
 * Returns true if viewport width is less than 768px
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if running in browser
    if (typeof window === 'undefined') return;

    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Listen for resize events with debounce
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
}

/**
 * Hook to get optimized animation config based on device
 */
export function useAnimationConfig() {
  const isMobile = useIsMobile();
  
  return {
    isMobile,
    // Reduce animation duration on mobile
    duration: isMobile ? 0.3 : 0.5,
    // Simplify stagger on mobile
    staggerDelay: isMobile ? 0.05 : 0.1,
    // Reduce movement distance on mobile
    distance: isMobile ? 20 : 40,
  };
}



