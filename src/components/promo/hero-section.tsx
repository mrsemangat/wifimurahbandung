'use client'

import { Check, Users, MapPin, Shield, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const sellingPoints = [
  { icon: Check, text: 'Banyak pilihan provider' },
  { icon: Check, text: 'Konsultasi GRATIS' },
  { icon: Check, text: 'Pemasangan cepat' },
]

const trustBadges = [
  { icon: Users, text: '1000+ Pelanggan' },
  { icon: MapPin, text: 'Bandung Raya' },
  { icon: Shield, text: 'Terpercaya' },
]

export default function PromoHeroSection() {
  const scrollToCta = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange rounded-full blur-3xl" />
      </div>

      {/* Hero BG overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Pasang WiFi
            <br />
            <span className="text-orange">Murah Bandung</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
        >
          Internet Cepat, Stabil & Harga Terjangkau
        </motion.p>

        {/* Selling points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          {sellingPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-2 text-white/90">
              <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0">
                <point.icon className="size-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm sm:text-base font-medium">{point.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button - scrolls to CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10"
        >
          <Button
            size="lg"
            className="bg-orange hover:bg-orange/90 text-orange-foreground font-bold text-lg h-14 px-8 sm:h-16 sm:px-10 rounded-xl shadow-lg shadow-orange/30"
            onClick={scrollToCta}
          >
            <ArrowDown className="size-5 mr-2" />
            Pasang WiFi Sekarang
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 sm:gap-10"
        >
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white/70">
              <badge.icon className="size-5" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
