import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ghost Portfolio | Desarrollador Full Stack',
  description: 'Portfolio personal de desarrollo web con Next.js, TypeScript y Tailwind CSS',
  keywords: ['desarrollador', 'full stack', 'next.js', 'react', 'typescript', 'tailwind'],
  authors: [{ name: 'Camila Bastidas' }],
  creator: 'Camila Bastidas',
  openGraph: {
    title: 'Ghost Portfolio | Desarrollador Full Stack',
    description: 'Portfolio personal de desarrollo web',
    url: 'https://tu-dominio.vercel.app',
    siteName: 'Ghost Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghost Portfolio'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost Portfolio | Desarrollador Full Stack',
    description: 'Portfolio personal de desarrollo web',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}