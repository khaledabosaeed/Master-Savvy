'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

export function useLocalizedPath() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Get path with lang prefix
  const getLocalizedPath = (path: string, lang?: 'en' | 'ar') => {
    const targetLang = lang || language;

    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Handle hash links (like #pricing)
    if (cleanPath.startsWith('#')) {
      return `/${targetLang}${cleanPath}`;
    }

    return `/${targetLang}/${cleanPath}`;
  };

  // Switch language while keeping the same page
  const switchLanguage = (newLang: 'en' | 'ar') => {
    // Get current path without lang prefix
    const currentPath = pathname.split('/').slice(2).join('/');
    const newPath = `/${newLang}/${currentPath}`;
    router.push(newPath);
  };

  return {
    getLocalizedPath,
    switchLanguage,
    currentLang: language,
  };
}
