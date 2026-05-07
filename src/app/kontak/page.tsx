'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  Loader2,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactInfo = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '0812-3456-7890',
    desc: 'Chat langsung dengan tim kami',
    href: 'https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20WiFi.',
    color: 'bg-green/10 text-green',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@wifimurahbandung.com',
    desc: 'Kirim email untuk pertanyaan detail',
    href: 'mailto:info@wifimurahbandung.com',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: MapPin,
    title: 'Alamat',
    value: 'Jl. Dago No. 123',
    desc: 'Bandung, Jawa Barat 40135',
    href: null,
    color: 'bg-orange/10 text-orange',
  },
]

const operatingHours = [
  { day: 'Senin - Jumat', time: '08:00 - 20:00 WIB' },
  { day: 'Sabtu', time: '09:00 - 17:00 WIB' },
  { day: 'Minggu', time: '10:00 - 15:00 WIB' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'Youtube', href: '#' },
]

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitting(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.email,
          source: 'contact_form',
          notes: `${formData.subject}: ${formData.message}`,
        }),
      })
      setSubmitted(true)
    } catch {
      // silent fail
    } finally {
      setSubmitting(false)
    }
  }

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
                Hubungi Kami
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Ada pertanyaan atau ingin konsultasi? Tim kami siap membantu Anda kapan saja.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${info.color}`}
                  >
                    <info.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="font-medium text-primary mb-1">{info.value}</p>
                  <p className="text-xs text-muted-foreground mb-3">{info.desc}</p>
                  {info.href && (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      Hubungi →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-card border rounded-xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Isi formulir di bawah ini dan tim kami akan segera merespons.
                  </p>

                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="text-4xl mb-4">✅</div>
                      <h3 className="text-xl font-bold mb-2">Pesan Terkirim!</h3>
                      <p className="text-muted-foreground">
                        Terima kasih! Tim kami akan segera menghubungi Anda.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Nama Anda"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@contoh.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subjek</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Perihal pesan Anda"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tulis pesan Anda di sini..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                        {submitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin mr-2" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="size-4 mr-2" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Side Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* WhatsApp Direct */}
                <div className="bg-green/5 border border-green/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center">
                      <MessageCircle className="size-5 text-green-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chat WhatsApp</h3>
                      <p className="text-xs text-muted-foreground">Respon lebih cepat</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Untuk respon yang lebih cepat, hubungi kami langsung via WhatsApp.
                  </p>
                  <Button asChild className="w-full bg-green hover:bg-green/90 text-green-foreground">
                    <a
                      href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20WiFi."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-4 mr-2" />
                      Chat Sekarang
                    </a>
                  </Button>
                </div>

                {/* Operating Hours */}
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Jam Operasional</h3>
                  </div>
                  <div className="space-y-3">
                    {operatingHours.map(item => (
                      <div key={item.day} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Ikuti Kami</h3>
                  <div className="flex gap-3">
                    {socialLinks.map(social => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Telepon</h3>
                      <a href="tel:081234567890" className="text-sm text-primary hover:underline">
                        0812-3456-7890
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
