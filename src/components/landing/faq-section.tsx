'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Faq {
  id: string
  question: string
  answer: string
}

const defaultFaqs: Faq[] = [
  {
    id: '1',
    question: 'Berapa lama proses pemasangan WiFi?',
    answer:
      'Proses pemasangan biasanya memakan waktu 1-3 hari kerja setelah survey lokasi selesai. Untuk area yang sudah tercover, pemasangan bisa lebih cepat.',
  },
  {
    id: '2',
    question: 'Apakah ada biaya pemasangan?',
    answer:
      'Biaya pemasangan bervariasi tergantung provider dan paket yang dipilih. Beberapa provider menawarkan gratis biaya pemasangan untuk paket tertentu. Hubungi kami untuk info detail.',
  },
  {
    id: '3',
    question: 'Area mana saja yang tercover?',
    answer:
      'Kami melayani seluruh area Bandung dan sekitarnya, termasuk Bandung Kota, Bandung Kabupaten, Cimahi, Sumedang, dan Kabupaten Bandung Barat.',
  },
  {
    id: '4',
    question: 'Provider apa saja yang tersedia?',
    answer:
      'Kami bekerja sama dengan berbagai provider terkemuka seperti IndiHome, Biznet, MyRepublic, First Media, CBN, dan MNC Play. Kami bantu pilihkan yang paling cocok untuk Anda.',
  },
  {
    id: '5',
    question: 'Bagaimana jika internet bermasalah?',
    answer:
      'Kami menyediakan support 24/7 via WhatsApp dan telepon. Untuk gangguan teknis, tim kami siap datang on-site untuk menyelesaikan masalah.',
  },
  {
    id: '6',
    question: 'Apakah ada garansi layanan?',
    answer:
      'Ya, kami memberikan garansi 30 hari uang kembali jika layanan tidak sesuai dengan yang dijanjikan. Kepuasan pelanggan adalah prioritas kami.',
  },
  {
    id: '7',
    question: 'Bisa bayar bulanan atau harus kontrak?',
    answer:
      'Tersedia opsi bayar bulanan dan kontrak tahunan. Kontrak tahunan biasanya mendapat diskon dan benefit tambahan seperti gratis biaya pemasangan.',
  },
  {
    id: '8',
    question: 'Kecepatan internet yang tersedia berapa?',
    answer:
      'Kecepatan internet tersedia mulai dari 10 Mbps hingga 250 Mbps tergantung provider dan paket yang dipilih. Kami bantu rekomendasikan sesuai kebutuhan Anda.',
  },
]

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs)

  useEffect(() => {
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data)
        }
      })
      .catch(() => {})
  }, [])

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="py-16 sm:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pertanyaan yang Sering{' '}
            <span className="text-primary">Diajukan</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={faq.id} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* FAQ Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  )
}
