import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hubungi Kami | Wifi Murah Bandung',
  description: 'Hubungi tim Wifi Murah Bandung untuk konsultasi gratis pemasangan internet. WhatsApp, email, atau kunjungi kantor kami.',
  openGraph: {
    title: 'Hubungi Kami | Wifi Murah Bandung',
    description: 'Hubungi tim Wifi Murah Bandung untuk konsultasi gratis pemasangan internet.',
    url: 'https://wifimurahbandung.com/kontak',
  },
}

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
