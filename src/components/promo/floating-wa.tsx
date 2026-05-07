'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PromoFloatingWa() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToCta = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          href="#cta"
          onClick={(e) => {
            e.preventDefault()
            scrollToCta()
          }}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-14 h-14 bg-orange hover:bg-orange/90 rounded-full flex items-center justify-center shadow-lg animate-wa-pulse transition-colors"
          aria-label="Lihat Penawaran"
        >
          <MessageCircle className="size-7 text-orange-foreground" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
