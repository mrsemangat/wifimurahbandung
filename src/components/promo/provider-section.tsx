'use client'

import { ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const providers = [
  {
    name: 'IndiHome',
    initial: 'I',
    color: 'bg-red-500',
    description: 'Jaringan fiber terluas di Indonesia, stabil untuk rumah & bisnis.',
  },
  {
    name: 'Biznet',
    initial: 'B',
    color: 'bg-orange-500',
    description: 'Internet cepat hingga 250 Mbps, cocok untuk streaming & gaming.',
  },
  {
    name: 'MyRepublic',
    initial: 'M',
    color: 'bg-purple-500',
    description: 'Paket gaming & streaming dengan latency rendah.',
  },
  {
    name: 'First Media',
    initial: 'F',
    color: 'bg-blue-500',
    description: 'HFC & fiber network, paket combo internet + TV kabel.',
  },
  {
    name: 'ICONNET',
    initial: 'I',
    color: 'bg-teal-500',
    description: 'Internet fiber dari Indosat Ooredoo Hutchison, harga kompetitif.',
  },
  {
    name: 'XL Satu',
    initial: 'X',
    color: 'bg-indigo-500',
    description: 'Solusi internet rumah dari XL, mudah dipasang tanpa ribet.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PromoProviderSection() {
  const scrollToCta = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="provider" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Provider Internet Terpercaya
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Kami membantu Anda memilih provider terbaik sesuai kebutuhan
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.name}
              variants={cardVariants}
              className="bg-card rounded-xl border p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 ${provider.color} rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold`}
              >
                {provider.initial}
              </div>
              <h3 className="mt-3 font-semibold text-foreground text-sm sm:text-base">
                {provider.name}
              </h3>
              <p className="mt-1.5 text-muted-foreground text-xs leading-relaxed">
                {provider.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button
            size="lg"
            className="bg-orange hover:bg-orange/90 text-orange-foreground font-bold h-12 px-8 rounded-xl"
            onClick={scrollToCta}
          >
            <ArrowDown className="size-5 mr-2" />
            Lihat Penawaran Terbaik
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
