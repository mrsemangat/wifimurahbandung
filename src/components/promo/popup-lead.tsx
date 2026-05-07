'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PopupConfig {
  title: string
  subtitle: string
  ctaText: string
  delay: number
}

const defaultPopup: PopupConfig = {
  title: '🎉 Promo Pemasangan WiFi!',
  subtitle: 'Dapatkan GRATIS biaya pemasangan + modem untuk pelanggan baru. Terbatas!',
  ctaText: 'Lihat Penawaran',
  delay: 10,
}

export default function PromoPopupLead() {
  const [popup, setPopup] = useState<PopupConfig>(defaultPopup)
  const [visible, setVisible] = useState(false)
  const dismissedRef = useRef(false)

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('promo_popup_shown')) {
      dismissedRef.current = true
      return
    }

    fetch('/api/settings/popup')
      .then(r => r.json())
      .then(data => {
        if (data && data.title) {
          setPopup({
            title: data.title,
            subtitle: data.subtitle || defaultPopup.subtitle,
            ctaText: data.ctaText || defaultPopup.ctaText,
            delay: data.delay || defaultPopup.delay,
          })
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (dismissedRef.current) return

    const timer = setTimeout(() => {
      if (!dismissedRef.current) {
        setVisible(true)
        sessionStorage.setItem('promo_popup_shown', '1')
      }
    }, popup.delay * 1000)

    return () => clearTimeout(timer)
  }, [popup.delay])

  const handleClose = () => {
    setVisible(false)
    dismissedRef.current = true
  }

  const scrollToCta = () => {
    setVisible(false)
    dismissedRef.current = true
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                aria-label="Tutup"
              >
                <X className="size-4" />
              </button>

              {/* Header gradient */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-center">
                <Sparkles className="size-10 text-orange mx-auto mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {popup.title}
                </h3>
              </div>

              {/* Content */}
              <div className="px-6 py-6 text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {popup.subtitle}
                </p>
                <Button
                  size="lg"
                  className="w-full mt-5 bg-orange hover:bg-orange/90 text-orange-foreground font-bold h-12 rounded-xl"
                  onClick={scrollToCta}
                >
                  <ArrowDown className="size-4 mr-2" />
                  {popup.ctaText}
                </Button>
                <button
                  onClick={handleClose}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tidak, terima kasih
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
