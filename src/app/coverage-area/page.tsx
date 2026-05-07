'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Wifi,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Phone,
} from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Button } from '@/components/ui/button'

const coverageAreas = [
  {
    name: 'Bandung Kota',
    desc: 'Cakupan penuh di seluruh wilayah Kota Bandung termasuk Coblong, Sumur Bandung, Bandung Wetan, dan sekitarnya.',
    highlighted: true,
  },
  {
    name: 'Cimahi',
    desc: 'Area Cimahi Kota dan sekitarnya, termasuk Cimahi Utara, Cimahi Tengah, dan Cimahi Selatan.',
    highlighted: true,
  },
  {
    name: 'Kabupaten Bandung',
    desc: 'Wilayah Kabupaten Bandung termasuk Soreang, Baleendah, Banjaran, Majalaya, dan lainnya.',
    highlighted: false,
  },
  {
    name: 'Lembang',
    desc: 'Area Lembang dan sekitarnya di Kabupaten Bandung Barat, termasuk Parongpong dan Cisarua.',
    highlighted: false,
  },
  {
    name: 'Cibiru',
    desc: 'Wilayah Cibiru, Cileunyi, dan Rancaekek di Kabupaten Bandung bagian timur.',
    highlighted: false,
  },
  {
    name: 'Soreang',
    desc: 'Ibu kota Kabupaten Bandung dan sekitarnya, termasuk Katapang dan Kopo.',
    highlighted: false,
  },
  {
    name: 'Pasteur',
    desc: 'Area Pasteur, Setiabudi, Sukajadi, dan sekitarnya yang mudah diakses dari tol Pasteur.',
    highlighted: false,
  },
  {
    name: 'Bandung Barat',
    desc: 'Padalarang, Ngamprah, Cihampelas, dan wilayah Kabupaten Bandung Barat lainnya.',
    highlighted: false,
  },
  {
    name: 'Dago & Setiabudi',
    desc: 'Kawasan Dago, Setiabudi, dan sekitarnya — area premium dengan layanan prioritas.',
    highlighted: false,
  },
  {
    name: 'Buahbatu & Margaasih',
    desc: 'Area selatan Bandung termasuk Buahbatu, Margaasih, dan sekitarnya.',
    highlighted: false,
  },
  {
    name: 'Gedebage & Ujungberung',
    desc: 'Kawasan timur Bandung termasuk Gedebage, Ujungberung, dan Cibiru Hilir.',
    highlighted: false,
  },
  {
    name: 'Sumedang',
    desc: 'Area Jatinangor, Tanjungsari, dan sekitarnya yang berbatasan dengan Bandung.',
    highlighted: false,
  },
]

export default function CoverageAreaPage() {
  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent('Halo, saya ingin cek coverage WiFi di lokasi saya.')
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Coverage Area Bandung Raya
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Cek ketersediaan layanan internet di area Anda. Kami melayani pemasangan di seluruh
                wilayah Bandung Raya dan sekitarnya.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Coverage Map Placeholder */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-dashed border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto">
                <MapPin className="size-12 text-primary/40 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Peta Coverage Area</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Area layanan kami mencakup seluruh wilayah Bandung Raya. Hubungi kami untuk
                  konfirmasi ketersediaan di lokasi spesifik Anda.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                    Area Terjangkau
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary/30 inline-block" />
                    Area Terbatas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Wilayah Layanan Kami</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kami melayani pemasangan internet di berbagai area Bandung Raya. Klik untuk
                mengecek ketersediaan di lokasi Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coverageAreas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`bg-card border rounded-xl p-6 hover:shadow-md transition-all ${
                    area.highlighted ? 'ring-2 ring-primary/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        area.highlighted ? 'bg-primary' : 'bg-primary/10'
                      }`}
                    >
                      <MapPin
                        className={`size-4 ${
                          area.highlighted ? 'text-primary-foreground' : 'text-primary'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{area.name}</h3>
                      {area.highlighted && (
                        <span className="text-xs text-primary font-medium">Area Utama</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                    <CheckCircle className="size-3.5" />
                    <span>Tersedia</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Cek Coverage Lokasi Anda
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Belum yakin apakah lokasi Anda terjangkau? Hubungi kami dan kami akan melakukan
                pengecekan coverage secara gratis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green hover:bg-green/90 text-green-foreground">
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5 mr-2" />
                    Cek via WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="/#lead-form">
                    <Phone className="size-5 mr-2" />
                    Isi Form Lead
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
