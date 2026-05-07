'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Provider {
  id: string
  name: string
  slug: string
  description: string | null
  logo: string | null
}

const defaultProviders: Provider[] = [
  {
    id: '1',
    name: 'IndiHome',
    slug: 'indihome',
    description: 'Internet fiber optik dari Telkom dengan jangkauan luas di seluruh Bandung.',
    logo: null,
  },
  {
    id: '2',
    name: 'Biznet',
    slug: 'biznet',
    description: 'Internet cepat hingga 250 Mbps dengan harga kompetitif untuk rumah & bisnis.',
    logo: null,
  },
  {
    id: '3',
    name: 'MyRepublic',
    slug: 'myrepublic',
    description: 'Provider internet gaming dengan latensi rendah dan kecepatan tinggi.',
    logo: null,
  },
  {
    id: '4',
    name: 'First Media',
    slug: 'first-media',
    description: 'Internet + TV kabel dengan paket bundling menarik untuk keluarga.',
    logo: null,
  },
  {
    id: '5',
    name: 'CBN',
    slug: 'cbn',
    description: 'Internet fiber optik premium dengan layanan enterprise-grade.',
    logo: null,
  },
  {
    id: '6',
    name: 'MNC Play',
    slug: 'mnc-play',
    description: 'Internet fiber optik + TV streaming dengan konten eksklusif MNC Group.',
    logo: null,
  },
]

const providerColors: Record<string, string> = {
  indihome: '#E4002B',
  biznet: '#0055A5',
  myrepublic: '#FF6B00',
  'first-media': '#00875A',
  cbn: '#1A237E',
  'mnc-play': '#D32F2F',
}

export default function ProviderSection() {
  const [providers, setProviders] = useState<Provider[]>(defaultProviders)

  useEffect(() => {
    fetch('/api/providers')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProviders(data)
        }
      })
      .catch(() => {})
  }, [])

  const handleProviderClick = (provider: Provider) => {
    const waNumber = '6281234567890'
    const msg = encodeURIComponent(
      `Halo, saya ingin konsultasi pemasangan ${provider.name} di Bandung.`
    )
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank')
  }

  return (
    <section id="provider" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Provider Internet <span className="text-primary">Terpercaya</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Kami bekerja sama dengan provider internet terkemuka untuk
            memberikan pilihan terbaik sesuai kebutuhan Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {providers.map((provider, idx) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleProviderClick(provider)}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: providerColors[provider.slug] || '#6366f1' }}
              >
                {provider.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                {provider.name}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                {provider.description || ''}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Wifi className="size-4" />
            Cek Provider di Lokasi Anda
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
