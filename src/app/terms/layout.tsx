import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | Wifi Murah Bandung',
  description: 'Syarat dan ketentuan penggunaan layanan Wifi Murah Bandung. Baca ketentuan lengkap sebelum menggunakan layanan kami.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
