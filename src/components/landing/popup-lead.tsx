'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PopupData {
  id: string
  type: string
  title: string
  subtitle: string | null
  ctaText: string | null
  ctaUrl: string | null
  isActive: boolean
  delay: number
}

const defaultPopup: PopupData = {
  id: 'default',
  type: 'delay',
  title: 'Dapatkan Promo Pemasangan WiFi!',
  subtitle: 'Gratis biaya pemasangan untuk pelanggan baru bulan ini. Hubungi kami sekarang!',
  ctaText: 'Konsultasi Gratis',
  ctaUrl: null,
  isActive: true,
  delay: 10,
}

export default function PopupLead() {
  const [popup, setPopup] = useState<PopupData | null>(null)
  const [show, setShow] = useState(false)
  // Use lazy initializer to check sessionStorage before first render
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('popup-dismissed') === 'true'
    }
    return false
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (dismissed) return

    fetch('/api/settings/popup')
      .then((r) => r.json())
      .then((data) => {
        const p = data?.isActive ? data : defaultPopup
        setPopup(p)
        timerRef.current = setTimeout(() => {
          setShow(true)
        }, (p.delay || 10) * 1000)
      })
      .catch(() => {
        setPopup(defaultPopup)
        timerRef.current = setTimeout(() => {
          setShow(true)
        }, 10000)
      })

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [dismissed])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem('popup-dismissed', 'true')
  }

  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent(
    'Halo, saya tertarik dengan promo pemasangan WiFi di Bandung.'
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  if (dismissed || !popup?.isActive) return null

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleDismiss}
          />
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
              {/* Header gradient */}
              <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-center">
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Tutup"
                >
                  <X className="size-4 text-white" />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {popup.title}
                </h3>
              </div>
              <div className="p-6 text-center space-y-4">
                <p className="text-muted-foreground">
                  {popup.subtitle || ''}
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-green hover:bg-green/90 text-green-foreground"
                    size="lg"
                    onClick={handleDismiss}
                  >
                    <a href={popup.ctaUrl || waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" />
                      {popup.ctaText || 'Konsultasi Gratis'}
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={handleDismiss}
                  >
                    Nanti Saja
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
