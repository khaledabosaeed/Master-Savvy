import PromoSection from "@/components/main-page/sections/PromoSection";
import UnifiedFooter from "@/components/shared/UnifiedFooter"
import PageTransition from "@/components/shared/PageTransition"
import PageTransitionProvider from "@/components/shared/PageTransitionProvider"
import { notFound } from "next/navigation";

type Language = 'en' | 'ar';

const languages: Language[] = ['en', 'ar'];

export default async function MainLayout({
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

  return (
    <>
      <PageTransitionProvider>
        <PageTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransition>
      </PageTransitionProvider>
      <PromoSection />
      <UnifiedFooter />
    </>
  );
}
