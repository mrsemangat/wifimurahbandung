'use client'

import {
  AlertTriangle,
  WifiOff,
  DollarSign,
  HelpCircle,
  PhoneOff,
  MapPinOff,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const problems = [
  {
    icon: WifiOff,
    title: 'Internet lambat & sering buffering',
    desc: 'Video buffer, download lama, browsing lemot — sangat mengganggu aktivitas online Anda.',
  },
  {
    icon: DollarSign,
    title: 'Bayar mahal tapi speed tidak sesuai',
    desc: 'Sudah bayar mahal tapi kecepatan internet jauh dari yang dijanjikan provider.',
  },
  {
    icon: AlertTriangle,
    title: 'Sering putus koneksi di saat penting',
    desc: 'Internet down saat meeting, deadline, atau lagi seru-serunya streaming.',
  },
  {
    icon: HelpCircle,
    title: 'Bingung pilih provider yang tepat',
    desc: 'Terlalu banyak pilihan, tidak tahu mana yang terbaik untuk lokasi dan kebutuhan Anda.',
  },
  {
    icon: PhoneOff,
    title: 'Customer service tidak responsif',
    desc: 'Saat ada masalah, sulit menghubungi CS dan lama menunggu perbaikan.',
  },
  {
    icon: MapPinOff,
    title: 'Tidak tahu coverage di lokasi Anda',
    desc: 'Belum tahu provider mana yang tersedia dan terbaik di area tempat tinggal Anda.',
  },
]

const solutions = [
  'Kami bantu pilih provider terbaik sesuai lokasi & budget',
  'Konsultasi GRATIS tanpa komitmen',
  'Survey coverage area tanpa biaya',
  'Pemasangan cepat oleh teknisi berpengalaman',
  'Support after-sales yang responsif',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PromoProblemSection() {
  const scrollToCta = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="masalah" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Problem Section (Attention + Interest) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Masalah Internet yang{' '}
            <span className="text-destructive">Anda Alami</span>?
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Apakah Anda mengalami salah satu dari masalah ini?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {problems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="bg-card rounded-xl border-l-4 border-l-destructive/70 border border-border p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/20 transition-colors">
                  <item.icon className="size-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Section (Desire) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/5 via-primary/10 to-green/5 rounded-2xl border border-primary/20 p-6 sm:p-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green/10 text-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <CheckCircle2 className="size-4" />
              SOLUSI
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Kami <span className="text-primary">Solusinya</span>!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Tinggalkan semua masalah internet Anda pada kami
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-8">
            {solutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-white/60 rounded-lg px-4 py-3"
              >
                <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-foreground">{sol}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-orange hover:bg-orange/90 text-orange-foreground font-bold h-12 px-8 rounded-xl"
              onClick={scrollToCta}
            >
              <ArrowDown className="size-4 mr-2" />
              Lihat Penawaran Kami
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
