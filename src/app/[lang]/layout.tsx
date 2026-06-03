import { LanguageProvider } from "@/contexts/LanguageContext";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { TranslationsProvider } from "@/i18n/client";
import { getDictionary } from "@/i18n/getDictionary";

type Language = 'en' | 'ar';

export const dynamic = "force-dynamic"



const expoArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/ExpoArabic-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ExpoArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const languages: Language[] = ['en', 'ar'];

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;

  // Validate language
  if (!languages.includes(rawLang as Language)) {
    notFound();
  }

  const lang = rawLang as Language;
  const dir = lang === "ar" ? "rtl" : "ltr"
  const localeResources = await getDictionary(lang)

  return (
    <LanguageProvider initialLanguage={lang}>
      <TranslationsProvider locale={lang} resources={localeResources as Record<string, unknown>}>
        <div dir={dir} className={lang === "ar" ? expoArabic.className : inter.className}>
          {children}
          <WhatsAppButton 
            phoneNumber="966580335989"
          />
        </div>
      </TranslationsProvider>
    </LanguageProvider>
  );
}
