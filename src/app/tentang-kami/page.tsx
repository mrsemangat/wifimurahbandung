'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Wifi,
  Shield,
  Clock,
  Users,
  Award,
  Heart,
  Target,
  Eye,
  Zap,
  CheckCircle,
  MessageCircle,
  Headphones,
  TrendingUp,
} from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Button } from '@/components/ui/button'

const stats = [
  { icon: Users, value: '2,500+', label: 'Pelanggan Aktif' },
  { icon: Wifi, value: '6+', label: 'Provider Partner' },
  { icon: Award, value: '5+', label: 'Tahun Pengalaman' },
  { icon: TrendingUp, value: '99.5%', label: 'Kepuasan Pelanggan' },
]

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Layanan Terpercaya',
    desc: 'Bekerja sama dengan provider resmi dan terpercaya di Indonesia untuk menjamin kualitas koneksi Anda.',
  },
  {
    icon: Clock,
    title: 'Respons Cepat',
    desc: 'Tim kami siap merespons kebutuhan Anda dalam waktu 24 jam sejak pengajuan permintaan.',
  },
  {
    icon: Headphones,
    title: 'Support 7 Hari',
    desc: 'Layanan dukungan teknis tersedia 7 hari seminggu untuk memastikan koneksi Anda selalu optimal.',
  },
  {
    icon: Zap,
    title: 'Proses Cepat',
    desc: 'Pemasangan dapat dilakukan dalam 1-3 hari kerja setelah survey lokasi, tanpa proses yang berbelit.',
  },
  {
    icon: Heart,
    title: 'Harga Terjangkau',
    desc: 'Kami membantu Anda mendapatkan paket internet terbaik dengan harga yang paling kompetitif.',
  },
  {
    icon: CheckCircle,
    title: 'Garansi Layanan',
    desc: 'Jaminan kualitas layanan dengan dukungan teknis jika terjadi gangguan koneksi internet.',
  },
]

const team = [
  {
    name: 'Ahmad Rizky',
    role: 'Founder & CEO',
    desc: 'Berpengalaman lebih dari 10 tahun di industri telekomunikasi Indonesia.',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Customer Relations',
    desc: 'Memastikan setiap pelanggan mendapatkan pengalaman layanan terbaik.',
  },
  {
    name: 'Budi Santoso',
    role: 'Technical Lead',
    desc: 'Ahli dalam infrastruktur jaringan dan optimasi koneksi internet.',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Marketing Manager',
    desc: 'Mengembangkan strategi pemasaran dan membangun kemitraan provider.',
  },
]

export default function TentangKamiPage() {
  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent('Halo, saya ingin konsultasi pemasangan WiFi di Bandung.')
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
                Tentang Wifi Murah Bandung
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Mitra terpercaya Anda untuk layanan internet cepat dan terjangkau di Bandung Raya
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Description */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  Solusi Internet Terbaik untuk Bandung
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Wifi Murah Bandung</strong> adalah layanan
                    konsultasi dan pemasangan internet yang hadir untuk membantu masyarakat Bandung
                    mendapatkan koneksi internet yang cepat, stabil, dan terjangkau.
                  </p>
                  <p>
                    Kami bekerja sama dengan berbagai provider internet terkemuka seperti IndiHome,
                    Biznet, MyRepublic, First Media, CBN, dan MNC Play untuk memberikan pilihan
                    terbaik yang sesuai dengan kebutuhan dan budget Anda.
                  </p>
                  <p>
                    Dengan pengalaman lebih dari 5 tahun di industri telekomunikasi, kami memahami
                    kebutuhan unik pelanggan di Bandung — mulai dari rumah tangga, UMKM, hingga
                    perusahaan yang membutuhkan koneksi internet yang andal.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl aspect-square flex items-center justify-center"
              >
                <Wifi className="size-24 text-primary/30" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <stat.icon className="size-6 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card border rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="size-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Visi</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi mitra konsultasi internet terdepan di Bandung Raya yang memberikan
                  solusi konektivitas terbaik, membantu setiap rumah dan bisnis terhubung dengan
                  dunia digital secara mudah dan terjangkau.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card border rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="size-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Misi</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-primary mt-1 shrink-0" />
                    Memberikan konsultasi gratis yang jujur dan transparan tentang pilihan internet.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-primary mt-1 shrink-0" />
                    Memfasilitasi pemasangan internet dengan proses yang mudah dan cepat.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-primary mt-1 shrink-0" />
                    Menyediakan dukungan teknis yang responsif dan profesional.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-primary mt-1 shrink-0" />
                    Membangun kemitraan strategis dengan provider untuk harga terbaik.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Mengapa Memilih Kami?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Keunggulan layanan kami yang membuat ribuan pelanggan mempercayakan kebutuhan
                internet mereka kepada Wifi Murah Bandung.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tim Kami</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profesional berpengalaman yang siap membantu kebutuhan internet Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="size-7 text-primary/50" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.desc}</p>
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
                Siap Terhubung dengan Internet Cepat?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Konsultasikan kebutuhan internet Anda secara gratis. Tim kami siap membantu
                menemukan paket terbaik untuk Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green hover:bg-green/90 text-green-foreground">
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5 mr-2" />
                    Konsultasi Gratis
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="/#lead-form">Pasang Sekarang</Link>
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
