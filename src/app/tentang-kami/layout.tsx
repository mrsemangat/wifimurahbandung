import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami | Wifi Murah Bandung',
  description: 'Kenali Wifi Murah Bandung lebih dekat. Mitra terpercaya untuk layanan internet cepat dan terjangkau di Bandung Raya.',
  openGraph: {
    title: 'Tentang Kami | Wifi Murah Bandung',
    description: 'Mitra terpercaya untuk layanan internet cepat dan terjangkau di Bandung Raya.',
    url: 'https://wifimurahbandung.com/tentang-kami',
  },
}

export default function TentangKamiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
