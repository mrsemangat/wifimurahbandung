'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const kebutuhanOptions = ['Rumah', 'Kantor', 'Gaming', 'CCTV', 'Usaha']
const budgetOptions = [
  { value: '<300rb', label: 'Kurang dari Rp 300.000' },
  { value: '300-500rb', label: 'Rp 300.000 - Rp 500.000' },
  { value: '500rb-1jt', label: 'Rp 500.000 - Rp 1.000.000' },
  { value: '>1jt', label: 'Lebih dari Rp 1.000.000' },
]
const providerOptions = ['IndiHome', 'Biznet', 'MyRepublic', 'First Media', 'CBN', 'MNC Play']

export default function LeadFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    location: '',
    needType: '',
    budget: '',
    providerIds: [] as string[],
  })
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleProviderToggle = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.whatsapp,
          address: formData.address,
          location: formData.location,
          needType: formData.needType,
          budget: formData.budget,
          source: 'lead-form',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false)
    }
  }

  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent(
    'Halo, saya sudah mengisi form di website. Saya ingin konsultasi pemasangan WiFi di Bandung.'
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <section id="lead-form" className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Cek Provider yang Cocok di{' '}
            <span className="text-primary">Lokasi Anda</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Isi formulir berikut untuk mendapatkan rekomendasi provider internet
            terbaik sesuai lokasi dan kebutuhan Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-8 text-green" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Data Berhasil Dikirim!
                </h3>
                <p className="text-muted-foreground">
                  Terima kasih! Tim kami akan menghubungi Anda dalam waktu 1x24
                  jam via WhatsApp untuk memberikan rekomendasi provider terbaik.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button asChild className="bg-green hover:bg-green/90 text-green-foreground">
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" />
                      Chat WhatsApp Sekarang
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        whatsapp: '',
                        address: '',
                        location: '',
                        needType: '',
                        budget: '',
                        providerIds: [],
                      })
                      setSelectedProviders([])
                    }}
                  >
                    Isi Form Lagi
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">Nama Lengkap *</Label>
                    <Input
                      id="lead-name"
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-wa">Nomor WhatsApp *</Label>
                    <Input
                      id="lead-wa"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-address">Alamat Lengkap *</Label>
                  <Textarea
                    id="lead-address"
                    placeholder="Masukkan alamat lengkap Anda di Bandung"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-location">Lokasi Google Maps (Opsional)</Label>
                  <Input
                    id="lead-location"
                    placeholder="Paste link Google Maps lokasi Anda"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Jenis Kebutuhan *</Label>
                    <Select
                      value={formData.needType}
                      onValueChange={(val) =>
                        setFormData({ ...formData, needType: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kebutuhan" />
                      </SelectTrigger>
                      <SelectContent>
                        {kebutuhanOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Internet *</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(val) =>
                        setFormData({ ...formData, budget: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pilihan Provider (Opsional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {providerOptions.map((provider) => {
                      const isSelected = selectedProviders.includes(provider)
                      return (
                        <button
                          key={provider}
                          type="button"
                          onClick={() => handleProviderToggle(provider)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-foreground border-border hover:bg-muted'
                          }`}
                        >
                          {provider}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange hover:bg-orange/90 text-orange-foreground font-semibold"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    'Memproses...'
                  ) : (
                    <>
                      <Send className="size-4" />
                      Cek Sekarang - GRATIS
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Data Anda aman & tidak akan dibagikan ke pihak ketiga. 100%
                  Gratis tanpa komitmen.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
