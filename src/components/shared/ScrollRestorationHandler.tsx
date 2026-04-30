'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/contexts/SmoothScrollContext';

/**
 * Component to handle scroll restoration and ensure pages start at top
 * Prevents browser from restoring scroll position on refresh
 */
export default function ScrollRestorationHandler() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    // Disable browser scroll restoration immediately
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // On initial mount, scroll to top immediately
    if (typeof window !== 'undefined') {
      // Clear any hash from URL on home page refresh
      const isHomePage = pathname === '/en' || pathname === '/ar' || pathname === '/en/' || pathname === '/ar/';
      
      if (isHomePage && window.location.hash) {
        // Remove hash from URL
        window.history.replaceState(null, '', pathname);
      }
      
      // Force scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []); // Only run on mount

  useEffect(() => {
    // On pathname change, ensure we're at the top
    if (typeof window !== 'undefined') {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        scrollTo(0, { duration: 0 });
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, scrollTo]);

  return null;
}

