import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AnnouncementTicker from '@/components/AnnouncementTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AsciiCursorCanvas from '@/components/AsciiCursorCanvas';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CrystalShineOverlay from '@/components/CrystalShineOverlay';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ScrollTelemetryHUD from '@/components/ScrollTelemetryHUD';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://proxytech.dev'),
  title: {
    default: 'ProxyTech | Software Development & Digital Engineering Agency',
    template: '%s | ProxyTech',
  },
  description:
    'ProxyTech is an elite software engineering and digital services agency. We build and scale high-concurrency web applications, iOS/Android mobile apps, SaaS platforms, and technical SEO growth engines.',
  keywords: [
    'software development company',
    'app development company',
    'web development company',
    'mobile app development',
    'SEO services',
    'software development agency',
    'SaaS development',
    'custom software development',
    'Next.js development agency',
    'Supabase developers',
  ],
  authors: [{ name: 'ProxyTech Software Solutions' }],
  creator: 'ProxyTech Engineering',
  publisher: 'ProxyTech',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://proxytech.dev',
    title: 'ProxyTech | Software Development & Digital Engineering Agency',
    description:
      'Engineered for Scale. Built for Impact. Custom web development, mobile applications, multi-tenant SaaS platforms, and technical growth.',
    siteName: 'ProxyTech',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'ProxyTech Software Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProxyTech | Software Development & Digital Engineering Agency',
    description:
      'Engineered for Scale. Built for Impact. Custom web development, mobile applications, multi-tenant SaaS platforms, and technical growth.',
    creator: '@proxytech_dev',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
  },
  alternates: {
    canonical: 'https://proxytech.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ProxyTech',
    legalName: 'ProxyTech Software Solutions LLC',
    url: 'https://proxytech.dev',
    logo: 'https://proxytech.dev/icon.png',
    description:
      'High-performance software development, mobile app engineering, SaaS platforms, and digital agency services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '100 Montgomery St, Suite 1900',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-776-9983',
      contactType: 'sales and customer service',
      email: 'hello@proxytech.dev',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://github.com/proxytech-dev',
      'https://linkedin.com/company/proxytech-solutions',
      'https://x.com/proxytech_dev',
    ],
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ProxyTech',
    url: 'https://proxytech.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://proxytech.dev/services?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#040705] text-[#f3f4f6] selection:bg-[#22c55e] selection:text-[#040705] relative">
        <SmoothScrollProvider>
          <CrystalShineOverlay />
          <ScrollProgressBar />
          <ScrollTelemetryHUD />
          <AsciiCursorCanvas />
          <AnnouncementTicker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
