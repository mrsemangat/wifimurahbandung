'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wifi } from 'lucide-react'

interface Notification {
  id: string
  name: string
  location: string
  action: string
  timeAgo: string
}

const defaultNotifications: Notification[] = [
  { id: '1', name: 'Rizky', location: 'Cimahi', action: 'konsultasi pemasangan WiFi', timeAgo: '2 menit lalu' },
  { id: '2', name: 'Sari', location: 'Dago', action: 'mendaftar paket Biznet', timeAgo: '5 menit lalu' },
  { id: '3', name: 'Budi', location: 'Coblong', action: 'cek coverage IndiHome', timeAgo: '8 menit lalu' },
  { id: '4', name: 'Dewi', location: 'Sukajadi', action: 'pasang WiFi untuk kantor', timeAgo: '12 menit lalu' },
  { id: '5', name: 'Andi', location: 'Cidadap', action: 'konsultasi paket gaming', timeAgo: '15 menit lalu' },
  { id: '6', name: 'Nita', location: 'Bandung Wetan', action: 'daftar paket MyRepublic', timeAgo: '20 menit lalu' },
]

export default function NotificationPopup() {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data)
        }
      })
      .catch(() => {})
  }, [])

  const showNotification = useCallback(() => {
    setVisible(true)
    setCurrentIdx((prev) => (prev + 1) % notifications.length)

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [notifications.length])

  useEffect(() => {
    // Show first notification after 8 seconds, then every 20 seconds
    const initialTimer = setTimeout(() => {
      showNotification()
    }, 8000)

    const interval = setInterval(() => {
      showNotification()
    }, 20000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [showNotification])

  const current = notifications[currentIdx]

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-xs"
        >
          <div className="bg-card border border-border rounded-xl shadow-lg p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Wifi className="size-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">
                <span className="font-semibold">{current.name}</span>{' '}
                dari {current.location} baru saja{' '}
                {current.action}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {current.timeAgo}
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
