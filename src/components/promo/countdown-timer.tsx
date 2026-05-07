'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownSettings {
  enabled: boolean
  text: string
}

const defaultSettings: CountdownSettings = {
  enabled: true,
  text: '🔥 Promo pemasangan bulan ini berakhir dalam:',
}

function calculateTimeLeft() {
  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  const diff = endOfMonth.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function PromoCountdownTimer() {
  const [settings, setSettings] = useState<CountdownSettings | null>(null)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.countdown_enabled === 'true' || data?.countdownEnabled === 'true') {
          setSettings({
            enabled: true,
            text: data.countdown_text || data.countdownText || defaultSettings.text,
          })
        } else {
          setSettings(defaultSettings)
        }
      })
      .catch(() => {
        setSettings(defaultSettings)
      })
  }, [])

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft())
  }, [])

  useEffect(() => {
    if (!settings?.enabled) return
    timerRef.current = setInterval(tick, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [settings, tick])

  if (!settings?.enabled) return null

  const blocks = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange to-orange/90 text-orange-foreground py-3"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="text-sm sm:text-base font-medium">
              {settings.text}
            </span>
            <div className="flex items-center gap-2">
              {blocks.map((block, idx) => (
                <div key={block.label} className="flex items-center gap-2">
                  <div className="bg-white/20 rounded-md px-2.5 py-1 min-w-[48px] text-center">
                    <div className="text-lg font-bold leading-tight">
                      {String(block.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] opacity-80 uppercase tracking-wider">
                      {block.label}
                    </div>
                  </div>
                  {idx < blocks.length - 1 && (
                    <span className="text-xl font-bold">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
