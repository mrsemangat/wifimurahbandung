'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'

interface CountdownSettings {
  enabled: boolean
  text: string
  durationMinutes: number
}

const defaultSettings: CountdownSettings = {
  enabled: true,
  text: 'Penawaran terbatas! Berakhir dalam:',
  durationMinutes: 30,
}

// Evergreen: store end time in sessionStorage so it persists during the session
function getEndTime(durationMinutes: number): number {
  const STORAGE_KEY = 'promo_countdown_end'
  const stored = sessionStorage.getItem(STORAGE_KEY)

  if (stored) {
    const end = parseInt(stored, 10)
    if (end > Date.now()) return end
  }

  // Set new end time
  const end = Date.now() + durationMinutes * 60 * 1000
  sessionStorage.setItem(STORAGE_KEY, end.toString())
  return end
}

function calculateTimeLeft(endTime: number) {
  const diff = endTime - Date.now()

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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [endTime, setEndTime] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetch('/api/admin/promo-settings')
      .then((r) => r.json())
      .then((data) => {
        const enabled = data?.promo_countdown_enabled !== 'false'
        const duration = parseInt(data?.promo_countdown_duration || '30', 10)
        const newSettings: CountdownSettings = {
          enabled,
          text: data?.promo_countdown_text || defaultSettings.text,
          durationMinutes: duration > 0 ? duration : defaultSettings.durationMinutes,
        }
        setSettings(newSettings)
        const end = getEndTime(newSettings.durationMinutes)
        setEndTime(end)
        setTimeLeft(calculateTimeLeft(end))
      })
      .catch(() => {
        setSettings(defaultSettings)
        const end = getEndTime(defaultSettings.durationMinutes)
        setEndTime(end)
        setTimeLeft(calculateTimeLeft(end))
      })
  }, [])

  const tick = useCallback(() => {
    if (endTime) {
      setTimeLeft(calculateTimeLeft(endTime))
    }
  }, [endTime])

  useEffect(() => {
    if (!settings?.enabled || !endTime) return
    timerRef.current = setInterval(tick, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [settings, endTime, tick])

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5 sm:p-6"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="size-5 text-orange" />
            <span className="text-sm sm:text-base font-semibold text-white/90">
              {settings.text}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {blocks.map((block, idx) => (
              <div key={block.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      {String(block.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/60 mt-1.5 uppercase tracking-wider font-medium">
                    {block.label}
                  </span>
                </div>
                {idx < blocks.length - 1 && (
                  <span className="text-xl sm:text-2xl font-bold text-white/50 -mt-5">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
