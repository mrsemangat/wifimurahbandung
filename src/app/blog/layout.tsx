import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Artikel | Wifi Murah Bandung',
  description: 'Tips, promo, dan informasi seputar internet di Bandung. Baca artikel terbaru tentang pemasangan WiFi, review provider, dan tutorial.',
  openGraph: {
    title: 'Blog & Artikel | Wifi Murah Bandung',
    description: 'Tips, promo, dan informasi seputar internet di Bandung.',
    url: 'https://wifimurahbandung.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
