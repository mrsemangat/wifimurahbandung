'use client'

import { MessageCircle, MapPin, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StickyCtaMobile() {
  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent(
    'Halo, saya ingin konsultasi pemasangan WiFi di Bandung.'
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden safe-area-bottom">
      <div className="grid grid-cols-3 gap-0">
        <Button
          asChild
          variant="ghost"
          className="rounded-none flex-col gap-0.5 py-3 h-auto text-green"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            <span className="text-[10px] font-medium">WhatsApp</span>
          </a>
        </Button>
        <Button
          variant="ghost"
          className="rounded-none flex-col gap-0.5 py-3 h-auto text-primary"
          onClick={() => {
            document
              .querySelector('#lead-form')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <MapPin className="size-5" />
          <span className="text-[10px] font-medium">Cek Coverage</span>
        </Button>
        <Button
          variant="ghost"
          className="rounded-none flex-col gap-0.5 py-3 h-auto text-orange"
          onClick={() => {
            document
              .querySelector('#lead-form')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Zap className="size-5" />
          <span className="text-[10px] font-medium">Pasang Sekarang</span>
        </Button>
      </div>
    </div>
  )
}
