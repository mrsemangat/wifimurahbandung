import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Wifi Murah Bandung',
  description: 'Kebijakan privasi Wifi Murah Bandung. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.',
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
