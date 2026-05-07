'use client'

import { MessageCircle, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PromoStickyCtaMobile() {
  const scrollToCta = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.1)] safe-area-pb">
      <div className="px-4 py-3">
        <Button
          className="w-full bg-orange hover:bg-orange/90 text-orange-foreground font-bold h-12 rounded-xl text-base"
          onClick={scrollToCta}
        >
          <ArrowDown className="size-5 mr-2" />
          Lihat Penawaran Sekarang
        </Button>
      </div>
    </div>
  )
}
