import type { Metadata } from "next";
import Script from "next/script";
import { Inter_Tight, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/contexts/SmoothScrollContext";
import ScrollRestorationHandler from "@/components/shared/ScrollRestorationHandler";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-inter",
  display: "swap",
});

// Inter for Arabic
const interArabic = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://savvyworld.ai'),

  title: {
    default: "ساڤي وورلد – بوابتك للعالم الجديد من الإكسبو والميديا والابتكار",
    template: "%s | Savvy World"
  },

  description: "نعرّفك على التقنيات الحسنة بطريقة بسيطة يقودها مستر ساڤي. منظومة تجمع بين الإعلام، والمعارض، والتقنيات الذكية لبناء مدن مستدامة ومتصلة. نربط بين الذكاء الاصطناعي، والتفاعل الرقمي، وحلول الطاقة النظيفة لتحويل المساحات الحضرية إلى تجارب ذكية ومريحة.",

  keywords: [
    'ساڤي وورلد',
    'ساڤي اكسبو',
    'ساڤي ميديا',
    'ساڤي ابتكار',
    'معارض تفاعلية',
    'تقنيات ذكية',
    'روبوت مستر ساڤي',
    'مدن مستدامة',
    'الذكاء الاصطناعي',
    'تفاعل رقمي',
    'محتوى',
    'شاشات ضخمة',
    'ابتكار',
    'شراكات استراتيجية',
    'تجارب تفاعلية',
    'طاقة نظيفة'
  ],

  authors: [{ name: 'Savvy World', url: 'https://savvyworld.ai' }],

  creator: 'Savvy World',

  icons: {
    icon: "/Savvy 2 1.svg",
    apple: "/Savvy 2 1.svg",
  },

  // Open Graph للمشاركة على Facebook, WhatsApp, LinkedIn
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://savvyworld.ai',
    title: 'ساڤي وورلد – بوابتك للعالم الجديد من الإكسبو والميديا والابتكار',
    description: 'منظومة تجمع بين الإعلام، المعارض، والابتكار لبناء مدن مستدامة ومتصلة. نعرّفك على التقنيات الحسنة بطريقة بسيطة يقودها مستر ساڤي.',
    siteName: 'Savvy World',
    images: [
      {
        url: '/og-image.jpg', // تحتاج إنشاء هذه الصورة 1200x630
        width: 1200,
        height: 630,
        alt: 'Savvy World - الإعلام والمعارض والابتكار',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ساڤي وورلد – الإكسبو والميديا والابتكار',
    description: 'نعرّفك على التقنيات الحسنة بطريقة بسيطة. منظومة تجمع الإعلام، المعارض، والابتكار لبناء مدن مستدامة ومتصلة.',
    images: ['/og-image.jpg'],
    creator: '@savvyworld',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  applicationName: 'Savvy World',
  referrer: 'origin-when-cross-origin',

  alternates: {
    canonical: 'https://savvyworld.ai',
    languages: {
      'ar-SA': 'https://savvyworld.ai/ar',
      'en-US': 'https://savvyworld.ai/en',
    },
  },

  // Verification (اختياري - للتحقق من ملكية الموقع)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${interArabic.variable} font-sans antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Script
          id="disable-scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
              }
              // Ensure scroll to top on page load
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  window.scrollTo(0, 0);
                });
                // Also try immediately
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <GoogleAnalytics gaId="G-W5W59KEFQX" />

        <SmoothScrollProvider>
          <ScrollRestorationHandler />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
/****
 * 
 * 
 * 
 * 
 */