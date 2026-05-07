'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  Clock,
  HeadphonesIcon,
  Wallet,
  Server,
  Award,
  Settings,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Shield,
  Clock,
  HeadphonesIcon,
  Wallet,
  Server,
  Award,
  Settings,
}

interface KeunggulanItem {
  icon: string
  title: string
  desc: string | null
}

const defaultKeunggulan: KeunggulanItem[] = [
  {
    icon: 'Zap',
    title: 'Internet Super Cepat',
    desc: 'Kecepatan hingga 100 Mbps untuk streaming, gaming, dan bekerja tanpa lag.',
  },
  {
    icon: 'Shield',
    title: 'Koneksi Stabil 24/7',
    desc: 'Jaringan fiber optik dengan uptime 99% menjamin koneksi selalu on.',
  },
  {
    icon: 'Wallet',
    title: 'Harga Terjangkau',
    desc: 'Mulai dari Rp 199.000/bulan dengan paket yang bisa disesuaikan kebutuhan.',
  },
  {
    icon: 'HeadphonesIcon',
    title: 'Support Responsif',
    desc: 'Tim teknis siap membantu 24/7 via WhatsApp, telepon, dan on-site.',
  },
  {
    icon: 'Clock',
    title: 'Pemasangan Cepat',
    desc: 'Proses pemasangan hanya 1-3 hari kerja setelah survey lokasi.',
  },
  {
    icon: 'Server',
    title: 'Multi Provider',
    desc: 'Kerjasama dengan berbagai provider terpercaya pilihan terbaik untuk Anda.',
  },
  {
    icon: 'Award',
    title: 'Garansi Layanan',
    desc: 'Garansi 30 hari uang kembali jika layanan tidak sesuai promise.',
  },
  {
    icon: 'Settings',
    title: 'Kustomisasi Paket',
    desc: 'Paket internet bisa disesuaikan dengan kebutuhan dan budget Anda.',
  },
]

export default function KeunggulanSection() {
  const [items, setItems] = useState<KeunggulanItem[]>(defaultKeunggulan)

  useEffect(() => {
    fetch('/api/settings/keunggulan')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="keunggulan" className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Mengapa Memilih <span className="text-primary">Kami</span>?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan layanan internet terbaik dengan harga terjangkau
            untuk seluruh wilayah Bandung dan sekitarnya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Zap
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <IconComp className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc || ''}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
