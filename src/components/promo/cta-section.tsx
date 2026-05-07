'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getWaLink } from './wa-config'

export default function PromoCtaSection() {
  const waLink = getWaLink(
    'Halo, saya ingin konsultasi pemasangan WiFi murah di Bandung.'
  )

  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

      {/* Decorative circles */}
      <div className="absolute top-0 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
        >
          Siap Pasang WiFi di Bandung?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg sm:text-xl text-white/80"
        >
          Konsultasi gratis, tanpa komitmen.
          <br />
          Tim kami siap membantu Anda!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg h-16 px-10 rounded-xl animate-wa-pulse shadow-lg shadow-green/30"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-6 mr-2" />
              Chat WhatsApp Sekarang
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-4 text-white/60 text-sm"
        >
          Klik untuk chat langsung via WhatsApp
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 flex items-center justify-center gap-4 text-white/70 text-sm"
        >
          <span>Respon cepat</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Gratis konsultasi</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Tanpa komitmen</span>
        </motion.div>
      </div>
    </section>
  )
}
