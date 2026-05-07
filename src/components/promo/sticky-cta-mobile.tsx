'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWaLink } from './wa-config'

export default function PromoStickyCtaMobile() {
  const waLink = getWaLink(
    'Halo, saya ingin konsultasi pemasangan WiFi di Bandung.'
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="px-4 py-2">
        <Button
          asChild
          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold h-12 rounded-xl text-base"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5 mr-2" />
            Chat WhatsApp
          </a>
        </Button>
      </div>
    </div>
  )
}
