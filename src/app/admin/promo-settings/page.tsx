'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'

const defaultSettings: Record<string, string> = {
  promo_hero_title: 'Pasang WiFi Murah Bandung',
  promo_hero_subtitle: 'Internet Cepat, Stabil & Harga Terjangkau',
  promo_hero_cta_text: 'Pasang WiFi Sekarang',
  promo_problem_title: 'Masalah Internet yang Anda Alami?',
  promo_problem_subtitle: 'Apakah Anda mengalami salah satu dari masalah ini?',
  promo_problem_items: 'Internet lambat & sering buffering\nBayar mahal tapi speed tidak sesuai\nSering putus koneksi di saat penting\nBingung pilih provider yang tepat\nCustomer service tidak responsif\nTidak tahu coverage di lokasi Anda',
  promo_cta_title: 'Siap Pasang WiFi di Bandung?',
  promo_cta_subtitle: 'Konsultasi gratis, tanpa komitmen. Tim kami siap membantu Anda!',
  promo_cta_button_text: 'Chat WhatsApp Sekarang',
  promo_countdown_enabled: 'true',
  promo_countdown_text: '🔥 Promo pemasangan bulan ini berakhir dalam:',
}

export default function PromoSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/promo-settings')
      .then(r => r.json())
      .then(data => {
        if (data && typeof data === 'object' && !('error' in data)) {
          setSettings(prev => ({ ...prev, ...data }))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/promo-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Pengaturan landing page berhasil disimpan!')
    } catch {
      toast.error('Gagal menyimpan pengaturan')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Landing Page</h1>
          <p className="text-sm text-muted-foreground">Kelola konten halaman Landing Page (/promo)</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Simpan Perubahan
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Hero</Label>
            <Input
              value={settings.promo_hero_title || ''}
              onChange={e => updateSetting('promo_hero_title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subjudul Hero</Label>
            <Input
              value={settings.promo_hero_subtitle || ''}
              onChange={e => updateSetting('promo_hero_subtitle', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Teks Tombol CTA Hero</Label>
            <Input
              value={settings.promo_hero_cta_text || ''}
              onChange={e => updateSetting('promo_hero_cta_text', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Problem Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Section Masalah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Section</Label>
            <Input
              value={settings.promo_problem_title || ''}
              onChange={e => updateSetting('promo_problem_title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subjudul Section</Label>
            <Input
              value={settings.promo_problem_subtitle || ''}
              onChange={e => updateSetting('promo_problem_subtitle', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Daftar Masalah (satu per baris)</Label>
            <Textarea
              value={settings.promo_problem_items || ''}
              onChange={e => updateSetting('promo_problem_items', e.target.value)}
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CTA Akhir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul CTA</Label>
            <Input
              value={settings.promo_cta_title || ''}
              onChange={e => updateSetting('promo_cta_title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subjudul CTA</Label>
            <Input
              value={settings.promo_cta_subtitle || ''}
              onChange={e => updateSetting('promo_cta_subtitle', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Teks Tombol CTA</Label>
            <Input
              value={settings.promo_cta_button_text || ''}
              onChange={e => updateSetting('promo_cta_button_text', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Countdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Countdown Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              checked={settings.promo_countdown_enabled === 'true'}
              onCheckedChange={checked => updateSetting('promo_countdown_enabled', checked ? 'true' : 'false')}
            />
            <Label>Tampilkan countdown timer</Label>
          </div>
          <div className="space-y-2">
            <Label>Teks Countdown</Label>
            <Input
              value={settings.promo_countdown_text || ''}
              onChange={e => updateSetting('promo_countdown_text', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
