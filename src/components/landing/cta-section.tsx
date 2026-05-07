'use client'

import { motion } from 'framer-motion'
import { MessageCircle, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CtaSection() {
  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent(
    'Halo, saya ingin konsultasi pemasangan WiFi di Bandung.'
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <section id="cta" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Bingung Pilih Provider Internet?
          </h2>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">
            Tim kami bantu pilihkan internet terbaik sesuai kebutuhan dan lokasi
            Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-green hover:bg-green/90 text-green-foreground font-semibold text-base px-8"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Konsultasi WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8"
              onClick={() => {
                document
                  .querySelector('#lead-form')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <MapPin className="size-5" />
              Cek Coverage Sekarang
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
