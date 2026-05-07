'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { getWaLink } from './wa-config'

const faqs = [
  {
    question: 'Provider apa saja yang tersedia?',
    answer:
      'Kami menyediakan layanan dari IndiHome, Biznet, MyRepublic, First Media, ICONNET, XL Satu dan provider lainnya. Kami bantu pilih yang terbaik untuk lokasi Anda.',
  },
  {
    question: 'Berapa biaya pemasangan?',
    answer:
      'Biaya pemasangan bervariasi tergantung provider dan paket yang dipilih. Sering ada promo bebas biaya pemasangan — hubungi kami untuk info promo terkini!',
  },
  {
    question: 'Berapa lama proses instalasi?',
    answer:
      'Proses instalasi biasanya memakan waktu 1-3 hari kerja setelah survey lokasi. Untuk area tertentu, pemasangan bisa dilakukan di hari yang sama.',
  },
  {
    question: 'Apakah tersedia di area saya?',
    answer:
      'Kami melayani area Bandung Raya termasuk Bandung Kota, Bandung Kabupaten, Cimahi, dan sekitarnya. Hubungi kami untuk cek ketersediaan di lokasi Anda.',
  },
  {
    question: 'Bisa untuk usaha/kantor?',
    answer:
      'Ya, kami juga menyediakan paket bisnis khusus untuk kantor, toko, kafe, dan usaha lainnya dengan kecepatan dan layanan prioritas.',
  },
]

export default function PromoFaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Jawaban untuk pertanyaan umum seputar layanan kami
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                  <a
                    href={getWaLink(
                      `Halo, saya ingin bertanya tentang: ${faq.question}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary font-medium hover:underline"
                  >
                    Hubungi kami untuk info lebih lanjut →
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
