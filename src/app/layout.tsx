import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import './globals.css'

const robotoSerif = localFont({
  src: [
    {
      path: '../lib/Roboto_Serif/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../lib/Roboto_Serif/RobotoSerif-Italic-VariableFont_GRAD,opsz,wdth,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-roboto-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    url: 'https://clarke.com',
    title: 'Clarke - Shopping that fits you',
    description: 'Shopping that fits you — not the other way around.',
    siteName: 'Clarke',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clarke - Shopping that fits you',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarke - Shopping that fits you',
    description: 'Shopping that fits you — not the other way around.',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${robotoSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${robotoSerif.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}