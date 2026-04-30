'use client';

import { useCallback } from 'react';
import { useSmoothScroll } from '@/contexts/SmoothScrollContext';

/**
 * Hook for smooth scrolling to sections within the same page
 *
 * Usage:
 * const scrollToSection = useSmoothScrollTo();
 * scrollToSection('about', { offset: -80 });
 */
export function useSmoothScrollTo() {
  const { scrollTo } = useSmoothScroll();

  const scrollToSection = useCallback(
    (sectionId: string, options?: { offset?: number; duration?: number }) => {
      const element = document.getElementById(sectionId);

      if (element) {
        // Use Lenis smooth scroll
        scrollTo(`#${sectionId}`, {
          offset: options?.offset ?? -80, // Default offset for fixed header
          duration: options?.duration ?? 1.5,
        });
      } else {
        // Fallback to native smooth scroll
        const targetElement = document.querySelector(`#${sectionId}`);
        if (targetElement) {
          const headerOffset = options?.offset ?? -80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset + headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    },
    [scrollTo]
  );

  return scrollToSection;
}
