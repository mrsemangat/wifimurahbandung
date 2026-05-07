'use client'

import {
  BadgeDollarSign,
  Layers,
  HeartHandshake,
  MapPin,
  Wifi,
  Headphones,
} from 'lucide-react'
import { motion } from 'framer-motion'

const keunggulan = [
  {
    icon: BadgeDollarSign,
    title: 'Harga Lebih Hemat',
    description: 'Dapatkan harga terbaik dan promo spesial yang tidak tersedia jika Anda daftar sendiri.',
  },
  {
    icon: Layers,
    title: 'Banyak Pilihan Provider',
    description: 'Kami kerja sama dengan 6+ provider besar, jadi Anda bisa bandingkan dan pilih yang terbaik.',
  },
  {
    icon: HeartHandshake,
    title: 'Dibantu Pilih Paket Terbaik',
    description: 'Tim kami akan merekomendasikan paket paling sesuai dengan kebutuhan dan budget Anda.',
  },
  {
    icon: MapPin,
    title: 'Survey Area Gratis',
    description: 'Cek ketersediaan jaringan di lokasi Anda tanpa biaya dan tanpa komitmen.',
  },
  {
    icon: Wifi,
    title: 'Internet Stabil 24/7',
    description: 'Nikmati koneksi internet yang stabil sepanjang hari untuk kerja, belajar, dan hiburan.',
  },
  {
    icon: Headphones,
    title: 'Tim Responsif',
    description: 'Layanan after-sales yang responsif, siap membantu kapan pun Anda membutuhkan.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PromoKeunggulanSection() {
  return (
    <section id="keunggulan" className="py-16 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Mengapa Memilih Kami?
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Keunggulan yang membuat kami jadi pilihan terbaik di Bandung
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {keunggulan.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="bg-card rounded-xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon className="size-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
