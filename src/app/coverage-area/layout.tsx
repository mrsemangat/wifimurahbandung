import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coverage Area | Wifi Murah Bandung',
  description: 'Cek ketersediaan layanan internet di area Anda. Kami melayani pemasangan WiFi di seluruh wilayah Bandung Raya dan sekitarnya.',
  openGraph: {
    title: 'Coverage Area Bandung Raya | Wifi Murah Bandung',
    description: 'Cek ketersediaan layanan internet di area Anda di Bandung Raya.',
    url: 'https://wifimurahbandung.com/coverage-area',
  },
}

export default function CoverageAreaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
