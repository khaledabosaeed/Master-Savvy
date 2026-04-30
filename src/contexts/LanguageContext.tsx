'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;

    setLanguage(lang);

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/** Syncs html lang/dir and body classes when language changes (e.g. language switcher). */
export const LanguageEffects: React.FC = () => {
  const { language } = useLanguage();
  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', language === 'ar');
    document.body.classList.toggle('lang-en', language === 'en');
  }, [language]);
  return null;
};
