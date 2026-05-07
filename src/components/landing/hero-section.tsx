'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Zap, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const waNumber = '6281234567890'

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    needType: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'hero-form',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false)
    }
  }

  const waMessage = encodeURIComponent('Halo, saya ingin konsultasi pemasangan WiFi di Bandung.')
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange rounded-full blur-3xl" />
      </div>
      {/* Decorative network pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="text-white space-y-6">
            <motion.div
              custom={0}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm"
            >
              <MapPin className="size-4 text-orange" />
              <span>Melayani Seluruh Area Bandung & Sekitarnya</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Pasang WiFi
              <br />
              Murah{' '}
              <span className="text-orange">Bandung</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-xl sm:text-2xl font-medium text-white/90"
            >
              Internet Cepat, Stabil & Harga Terjangkau
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-white/70 text-base max-w-lg"
            >
              Dapatkan koneksi internet terbaik untuk rumah dan bisnis Anda.
              Kami membantu memilih provider yang tepat sesuai lokasi dan
              kebutuhan Anda di Bandung.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                onClick={() => {
                  document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <MapPin className="size-4" />
                Cek Coverage
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Konsultasi Gratis
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-orange text-orange-foreground hover:bg-orange/90 font-semibold"
                onClick={() => {
                  document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Zap className="size-4" />
                Pasang Sekarang
              </Button>
            </motion.div>
          </div>

          {/* Right - Mini Lead Form */}
          <motion.div
            custom={5}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {submitted ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                    <Send className="size-8 text-green" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Terima Kasih!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Data Anda telah kami terima. Tim kami akan segera
                    menghubungi Anda via WhatsApp.
                  </p>
                  <Button asChild className="bg-green hover:bg-green/90 text-green-foreground">
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" />
                      Chat WhatsApp Sekarang
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground">
                      Cek Ketersediaan WiFi
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Isi data Anda untuk cek coverage & dapatkan penawaran
                      terbaik
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hero-name">Nama Lengkap</Label>
                      <Input
                        id="hero-name"
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-wa">Nomor WhatsApp</Label>
                      <Input
                        id="hero-wa"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-address">Alamat / Lokasi</Label>
                      <Input
                        id="hero-address"
                        placeholder="Contoh: Jl. Dago No. 123"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-needType">Kebutuhan</Label>
                      <Select
                        value={formData.needType}
                        onValueChange={(val) =>
                          setFormData({ ...formData, needType: val })
                        }
                      >
                        <SelectTrigger className="w-full" id="hero-needType">
                          <SelectValue placeholder="Pilih kebutuhan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rumah">Rumah</SelectItem>
                          <SelectItem value="Kantor">Kantor</SelectItem>
                          <SelectItem value="Gaming">Gaming</SelectItem>
                          <SelectItem value="CCTV">CCTV</SelectItem>
                          <SelectItem value="Usaha">Usaha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      size="lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        'Mengirim...'
                      ) : (
                        <>
                          <Send className="size-4" />
                          Cek Sekarang - GRATIS
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      100% Gratis | Tanpa Komitmen | Respon Cepat
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
