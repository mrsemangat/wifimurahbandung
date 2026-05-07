'use client'

import { useState, useEffect } from 'react'
import {
  AlertTriangle,
  WifiOff,
  DollarSign,
  HelpCircle,
  PhoneOff,
  MapPinOff,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const defaultProblems = [
  'Internet lambat & sering buffering',
  'Bayar mahal tapi speed tidak sesuai',
  'Sering putus koneksi di saat penting',
  'Bingung pilih provider yang tepat',
  'Customer service tidak responsif',
  'Tidak tahu coverage di lokasi Anda',
]

const defaultSolutions = [
  'Kami bantu pilih provider terbaik sesuai lokasi & budget',
  'Konsultasi GRATIS tanpa komitmen',
  'Survey coverage area tanpa biaya',
  'Pemasangan cepat oleh teknisi berpengalaman',
  'Support after-sales yang responsif',
]

const problemIcons = [WifiOff, DollarSign, AlertTriangle, HelpCircle, PhoneOff, MapPinOff]

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

interface SectionSettings {
  problemTitle: string
  problemSubtitle: string
  problemItems: string[]
  solutionTitle: string
  solutionSubtitle: string
  solutionItems: string[]
}

export default function ProblemSolutionSection() {
  const [settings, setSettings] = useState<SectionSettings>({
    problemTitle: 'Masalah Internet yang Anda Alami?',
    problemSubtitle: 'Apakah Anda mengalami salah satu dari masalah ini?',
    problemItems: defaultProblems,
    solutionTitle: 'Kami Solusinya!',
    solutionSubtitle: 'Tinggalkan semua masalah internet Anda pada kami',
    solutionItems: defaultSolutions,
  })

  useEffect(() => {
    fetch('/api/admin/promo-settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object' && !('error' in data)) {
          setSettings({
            problemTitle: data.promo_problem_title || settings.problemTitle,
            problemSubtitle: data.promo_problem_subtitle || settings.problemSubtitle,
            problemItems: data.promo_problem_items
              ? data.promo_problem_items.split('\n').filter((s: string) => s.trim())
              : settings.problemItems,
            solutionTitle: data.promo_solution_title || settings.solutionTitle,
            solutionSubtitle: data.promo_solution_subtitle || settings.solutionSubtitle,
            solutionItems: data.promo_solution_items
              ? data.promo_solution_items.split('\n').filter((s: string) => s.trim())
              : settings.solutionItems,
          })
        }
      })
      .catch(() => {})
  }, [])

  const scrollToForm = () => {
    document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="masalah-solusi" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Problem Section */}
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
            {settings.problemSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {settings.problemItems.map((item, idx) => {
            const Icon = problemIcons[idx % problemIcons.length]
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-card rounded-xl border-l-4 border-l-destructive/70 border border-border p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <Icon className="size-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base pt-2">
                    {item}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Solution Section */}
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
              {settings.solutionSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-8">
            {settings.solutionItems.map((sol, i) => (
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 rounded-xl"
              onClick={scrollToForm}
            >
              <ArrowRight className="size-4 mr-2" />
              Cek Ketersediaan WiFi
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
