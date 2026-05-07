'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Budi Santoso',
    location: 'Bandung Wetan',
    initial: 'B',
    color: 'bg-primary',
    rating: 5,
    review:
      'Pemasangan cepat dan harga sangat terjangkau. Internet stabil, anak-anak bisa belajar online tanpa gangguan. Recommended!',
  },
  {
    name: 'Siti Rahayu',
    location: 'Cimahi',
    initial: 'S',
    color: 'bg-orange',
    rating: 5,
    review:
      'Timnya ramah dan profesional. Dibantu pilih paket yang sesuai kebutuhan. Sekarang WFH jadi lancar, nggak pernah lag.',
  },
  {
    name: 'Ahmad Fadli',
    location: 'Soreang',
    initial: 'A',
    color: 'bg-green',
    rating: 5,
    review:
      'Awalnya ragu, tapi ternyata kualitasnya oke banget. Survey area gratis dan pemasangan cuma 1 hari. Top!',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PromoTestimonialSection() {
  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Testimoni nyata dari pelanggan yang sudah mempercayakan kebutuhan internetnya kepada kami
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    {t.name}
                  </h4>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mt-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                &ldquo;{t.review}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
