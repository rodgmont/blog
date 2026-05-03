import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';
import DocumentLang from '@/components/layout/DocumentLang';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://franrodgmont.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fran Rodgmont',
  },
  description: 'Field notes on AI engineering, machine learning, and software development. Exploring ideas around open-source software and startups.',
  authors: [{ name: 'Fran Rodgmont', url: 'https://franrodgmont.com' }],
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/icons/192', type: 'image/png', sizes: '192x192' },
      { url: '/icons/512', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Fran Rodgmont',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rodgmont',
    creator: '@rodgmont',
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <DocumentLang />
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TF7NYD8KN3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TF7NYD8KN3');
          `}
        </Script>
      </body>
    </html>
  );
}
