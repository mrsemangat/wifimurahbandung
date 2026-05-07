'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, Shield, Zap, MessageCircle } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Users,
  MapPin,
  Shield,
  Zap,
  MessageCircle,
}

interface TrustIndicator {
  icon: string
  value: string // from DB it's a string like "2500+", "99%", "100 Mbps", "24/7"
  label: string
}

const defaultIndicators: TrustIndicator[] = [
  { icon: 'Users', value: '2500+', label: 'Pelanggan Aktif' },
  { icon: 'MapPin', value: '25+', label: 'Area Coverage' },
  { icon: 'Shield', value: '99%', label: 'Uptime Jaringan' },
  { icon: 'Zap', value: '100 Mbps', label: 'Kecepatan Maksimal' },
  { icon: 'MessageCircle', value: '24/7', label: 'Support Online' },
]

function parseValue(val: string): { num: number; suffix: string } {
  // Extract leading number from strings like "2500+", "99%", "100 Mbps", "24/7"
  const match = val.match(/^(\d+)/)
  if (match) {
    const num = parseInt(match[1], 10)
    const suffix = val.slice(match[1].length)
    return { num, suffix }
  }
  return { num: 0, suffix: val }
}

function AnimatedCounter({ value }: { value: string }) {
  const { num, suffix } = parseValue(value)
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let current = 0
    const increment = num / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [inView, num])

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export default function TrustIndicators() {
  const [indicators, setIndicators] = useState<TrustIndicator[]>(defaultIndicators)

  useEffect(() => {
    fetch('/api/settings/trust-indicators')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIndicators(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="trust" className="py-12 bg-muted/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {indicators.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Zap
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComp className="size-6 text-primary" />
                </div>
                <AnimatedCounter value={item.value} />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
