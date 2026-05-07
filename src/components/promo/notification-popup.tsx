'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface Notification {
  id: string
  name: string
  location: string
  action: string
  timeAgo: string
}

const defaultNotifications: Notification[] = [
  { id: '1', name: 'Rizky', location: 'Cimahi', action: 'baru saja konsultasi pemasangan WiFi', timeAgo: '5 menit lalu' },
  { id: '2', name: 'Sari', location: 'Bandung Kota', action: 'baru saja cek coverage area', timeAgo: '12 menit lalu' },
  { id: '3', name: 'Budi', location: 'Cibiru', action: 'baru saja pasang internet rumah', timeAgo: '25 menit lalu' },
  { id: '4', name: 'Dewi', location: 'Lembang', action: 'baru saja daftar paket gaming', timeAgo: '1 jam lalu' },
  { id: '5', name: 'Ahmad', location: 'Soreang', action: 'baru saja konsultasi WiFi kantor', timeAgo: '2 jam lalu' },
  { id: '6', name: 'Linda', location: 'Pasteur', action: 'baru saja pasang WiFi usaha', timeAgo: '3 jam lalu' },
]

export default function PromoNotificationPopup() {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetch('/api/notifications')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    // Show first notification after 8 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true)
    }, 8000)

    return () => clearTimeout(initialTimer)
  }, [])

  useEffect(() => {
    if (!visible) return

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(hideTimer)
  }, [visible, currentIdx])

  useEffect(() => {
    // Rotate notifications every 20 seconds
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % notifications.length)
      setVisible(true)
    }, 20000)

    return () => clearInterval(interval)
  }, [notifications.length])

  const current = notifications[currentIdx]
  if (!current) return null

  const scrollToCta = () => {
    setVisible(false)
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-40 max-w-[320px]"
        >
          <button
            onClick={scrollToCta}
            className="w-full bg-white rounded-xl shadow-xl border border-border p-4 flex items-start gap-3 hover:shadow-2xl transition-shadow cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-sm">
                {current.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">
                <span className="font-semibold">{current.name}</span>
                {' '}dari{' '}
                <span className="font-semibold">{current.location}</span>
                {' '}{current.action}
              </p>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                <span>{current.timeAgo}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setVisible(false)
              }}
              className="text-muted-foreground hover:text-foreground text-lg leading-none shrink-0 ml-1"
              aria-label="Tutup"
            >
              ×
            </button>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
