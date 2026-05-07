'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingWhatsApp() {
  const [waNumber, setWaNumber] = useState('6281234567890')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fetch WA number from settings
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.waNumber) {
          setWaNumber(data.waNumber)
        }
      })
      .catch(() => {})

    // Show after a short delay
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const waMessage = encodeURIComponent(
    'Halo, saya ingin bertanya tentang pemasangan WiFi di Bandung.'
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg animate-wa-pulse transition-colors"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="size-7 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
