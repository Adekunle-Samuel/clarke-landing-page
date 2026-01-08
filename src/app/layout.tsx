import type { Metadata, Viewport } from 'next'
import { Alegreya, Figtree } from 'next/font/google'
import './globals.css'

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Clarke - Shopping that fits you',
    template: '%s | Clarke'
  },
  description: 'Clarke builds a personal shopping feed around your body, your style, and your plans. Search by mood, not by maybes.',
  keywords: [
    'fashion',
    'shopping',
    'plus-size',
    'personal styling',
    'clothing',
    'size-inclusive',
    'body-positive',
    'personalized shopping'
  ],
  authors: [{ name: 'Clarke Team' }],
  creator: 'Clarke',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.useclarke.com',
    title: 'Clarke - Shopping Intelligence for Brands',
    description: 'Answer fit-based questions in real-time with Clarke, your personal shopping assistant.',
    siteName: 'Clarke',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clarke - Shopping Intelligence for Brands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarke - Built for Fashion Brands',
    description: 'Clarke helps brands reduce size-based returns',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.useclarke.com'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${figtree.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}